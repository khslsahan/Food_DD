#!/usr/bin/env python3
import sys
import json
import os
from pathlib import Path
from docx import Document
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_tables_with_headers(docx_path):
    """Extract tables and their associated headers from a Word document."""
    try:
        doc = Document(docx_path)
        tables = []
        paragraphs = list(doc.paragraphs)
        para_idx = 0
        
        for table in doc.tables:
            header = None
            # Look for header in preceding paragraphs
            for i in range(para_idx-1, -1, -1):
                text = paragraphs[i].text.strip()
                if text:
                    header = text
                    para_idx = i + 1
                    break
            
            rows = []
            for row in table.rows:
                cells = [cell.text.strip() for cell in row.cells]
                rows.append(cells)
            
            tables.append({'header': header, 'rows': rows})
            para_idx += 1
        
        return tables
    except Exception as e:
        logger.error(f"Error reading document: {e}")
        return []

def extract_document_content(docx_path):
    """Extract all text content from the Word document."""
    try:
        doc = Document(docx_path)
        content = []
        
        # Extract paragraphs
        for para in doc.paragraphs:
            if para.text.strip():
                content.append(para.text)
        
        # Extract table content
        for table in doc.tables:
            content.append("")  # Add spacing
            for row in table.rows:
                row_text = " | ".join([cell.text.strip() for cell in row.cells])
                if row_text.strip():
                    content.append(row_text)
            content.append("")  # Add spacing
        
        return "\n".join(content)
    except Exception as e:
        logger.error(f"Error extracting document content: {e}")
        return "Error extracting document content"

def table_to_markdown(table):
    """Convert a table to markdown format."""
    if not table['rows']:
        return ""
    
    markdown = "| " + " | ".join(table['rows'][0]) + " |\n"
    markdown += "| " + " | ".join(["---"] * len(table['rows'][0])) + " |\n"
    
    for row in table['rows'][1:]:
        markdown += "| " + " | ".join(row) + " |\n"
    
    return markdown

def parse_quantity(quantity_str):
    """Parse quantity string to numeric value."""
    if not quantity_str:
        return 0
    
    try:
        # Remove common units and extract number
        import re
        quantity_str = str(quantity_str).strip()
        # Extract first number found
        match = re.search(r'(\d+(?:\.\d+)?)', quantity_str)
        if match:
            return float(match.group(1))
        return 0
    except:
        return 0

def parse_nutrition_value(nutrition_str):
    """Parse nutrition value from string."""
    if not nutrition_str:
        return 0
    
    try:
        import re
        nutrition_str = str(nutrition_str).strip()
        # Extract first number found
        match = re.search(r'(\d+(?:\.\d+)?)', nutrition_str)
        if match:
            return float(match.group(1))
        return 0
    except:
        return 0

def is_summary_row(ingredient):
    """Check if ingredient row is a summary/total row."""
    name = ingredient.get('name', '').lower()
    return any(keyword in name for keyword in ['total', 'sum', 'subtotal'])

def get_ingredient_name(ingredient):
    """Extract ingredient name from ingredient data."""
    return ingredient.get('name', '').strip()

def extract_recipe_from_docx(docx_path):
    """Extract recipe data from a Word document."""
    try:
        tables = extract_tables_with_headers(docx_path)
        document_content = extract_document_content(docx_path)
        
        if not tables:
            return None, document_content
        
        # Build markdown sections for AI processing
        markdown_sections = []
        component_counter = 1
        
        for table in tables[:-1]:  # Skip the last table (usually portion options)
            component_name = table['header'] or f"Component {component_counter}"
            component_counter += 1
            markdown_table = table_to_markdown(table)
            markdown_sections.append(f"Component: {component_name}\n{markdown_table}")
        
        # For now, return a structured format based on table analysis
        # In a real implementation, you would send this to Gemini API
        recipe = {
            "name": Path(docx_path).stem,
            "description": f"Extracted from {Path(docx_path).name}",
            "components": []
        }
        
        for i, table in enumerate(tables[:-1]):
            component_name = table['header'] or f"Component {i+1}"
            component = {
                "name": component_name,
                "ingredients": []
            }
            
            if table['rows']:
                # Assume first row is header
                headers = table['rows'][0]
                for row in table['rows'][1:]:
                    if len(row) >= 2:  # At least name and quantity
                        ingredient_name = row[0].strip()
                        if ingredient_name and not is_summary_row({"name": ingredient_name}):
                            quantity = parse_quantity(row[1] if len(row) > 1 else "0")
                            unit = row[2] if len(row) > 2 else "g"
                            
                            # Try to extract nutrition values from various columns
                            calories = 0
                            fat = 0
                            protein = 0
                            carbohydrates = 0
                            
                            # Look for nutrition data in remaining columns
                            for col_idx in range(3, min(len(row), 7)):  # Check columns 3-6
                                cell_value = row[col_idx] if col_idx < len(row) else ""
                                cell_lower = cell_value.lower()
                                
                                # Try to identify nutrition type and extract value
                                if any(keyword in cell_lower for keyword in ['cal', 'kcal', 'calories']):
                                    calories = parse_nutrition_value(cell_value)
                                elif any(keyword in cell_lower for keyword in ['fat', 'lipids']):
                                    fat = parse_nutrition_value(cell_value)
                                elif any(keyword in cell_lower for keyword in ['protein', 'prot']):
                                    protein = parse_nutrition_value(cell_value)
                                elif any(keyword in cell_lower for keyword in ['carb', 'carbs', 'carbohydrates']):
                                    carbohydrates = parse_nutrition_value(cell_value)
                                elif col_idx == 3:  # Default to calories if it's the 4th column
                                    calories = parse_nutrition_value(cell_value)
                            
                            ingredient = {
                                "name": ingredient_name,
                                "quantity": quantity,
                                "unit": unit,
                                "calories": calories,
                                "fat": fat,
                                "protein": protein,
                                "carbohydrates": carbohydrates
                            }
                            component["ingredients"].append(ingredient)
            
            recipe["components"].append(component)
        
        return recipe, document_content
        
    except Exception as e:
        logger.error(f"Error extracting recipe: {e}")
        return None, "Error extracting document content"

def main():
    """Main function to be called from Node.js."""
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python extract_recipe.py <docx_path>"}))
        sys.exit(1)
    
    docx_path = sys.argv[1]
    
    if not os.path.exists(docx_path):
        print(json.dumps({"error": f"File not found: {docx_path}"}))
        sys.exit(1)
    
    try:
        recipe, document_content = extract_recipe_from_docx(docx_path)
        if recipe:
            print(json.dumps({
                "success": True, 
                "recipe": recipe,
                "documentContent": document_content
            }))
        else:
            print(json.dumps({
                "error": "Failed to extract recipe data",
                "documentContent": document_content
            }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main() 