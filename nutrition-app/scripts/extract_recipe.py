#!/usr/bin/env python3
import sys
import json
import os
import re
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

def detect_recipe_boundaries(docx_path):
    """Detect recipe boundaries in the document by looking for recipe titles."""
    try:
        doc = Document(docx_path)
        recipe_starts = []
        
        for i, para in enumerate(doc.paragraphs):
            text = para.text.strip()
            # Look for recipe title patterns
            if (text and 
                (text.isupper() or 
                 any(keyword in text.lower() for keyword in ['recipe', 'meal', 'dish', 'preparation']) or
                 re.match(r'^[A-Z][A-Z\s]+$', text)) and
                len(text) > 3 and len(text) < 100):
                recipe_starts.append(i)
        
        return recipe_starts
    except Exception as e:
        logger.error(f"Error detecting recipe boundaries: {e}")
        return []

def extract_recipe_sections(docx_path):
    """Extract different recipe sections from the document."""
    try:
        doc = Document(docx_path)
        recipe_boundaries = detect_recipe_boundaries(docx_path)
        
        if not recipe_boundaries:
            # If no clear boundaries, treat the whole document as one recipe
            return [{'start': 0, 'end': len(doc.paragraphs), 'name': Path(docx_path).stem}]
        
        sections = []
        for i, start_idx in enumerate(recipe_boundaries):
            end_idx = recipe_boundaries[i + 1] if i + 1 < len(recipe_boundaries) else len(doc.paragraphs)
            recipe_name = doc.paragraphs[start_idx].text.strip()
            sections.append({
                'start': start_idx,
                'end': end_idx,
                'name': recipe_name
            })
        
        return sections
    except Exception as e:
        logger.error(f"Error extracting recipe sections: {e}")
        return []

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

def extract_recipe_from_section(doc, section, tables_in_section):
    """Extract recipe data from a specific section of the document."""
    try:
        recipe = {
            "name": section['name'],
            "description": f"Extracted from {section['name']}",
            "components": []
        }
        
        # Find tables that belong to this section
        section_tables = []
        for table in tables_in_section:
            # Check if table is within this section's paragraph range
            # This is a simplified approach - in practice you might need more sophisticated logic
            section_tables.append(table)
        
        for i, table in enumerate(section_tables):
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
        
        return recipe
        
    except Exception as e:
        logger.error(f"Error extracting recipe from section: {e}")
        return None

def extract_multiple_recipes_from_docx(docx_path):
    """Extract multiple recipes from a Word document."""
    try:
        doc = Document(docx_path)
        tables = extract_tables_with_headers(docx_path)
        document_content = extract_document_content(docx_path)
        
        # Try to detect recipe sections
        recipe_sections = extract_recipe_sections(docx_path)
        
        recipes = []
        
        if len(recipe_sections) > 1:
            # Multiple recipes detected
            for section in recipe_sections:
                recipe = extract_recipe_from_section(doc, section, tables)
                if recipe and recipe['components']:
                    recipes.append(recipe)
        else:
            # Single recipe or no clear boundaries - use original logic
            recipe = extract_recipe_from_docx_single(docx_path)
            if recipe:
                recipes.append(recipe)
        
        # If no recipes found, create a default one
        if not recipes:
            recipe = {
                "name": Path(docx_path).stem,
                "description": f"Extracted from {Path(docx_path).name}",
                "components": []
            }
            
            for i, table in enumerate(tables[:-1]):  # Skip the last table (usually portion options)
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
            
            recipes.append(recipe)
        
        return recipes, document_content
        
    except Exception as e:
        logger.error(f"Error extracting multiple recipes: {e}")
        return [], "Error extracting document content"

def extract_recipe_from_docx_single(docx_path):
    """Extract single recipe data from a Word document (original function)."""
    try:
        tables = extract_tables_with_headers(docx_path)
        
        if not tables:
            return None
        
        recipe = {
            "name": Path(docx_path).stem,
            "description": f"Extracted from {Path(docx_path).name}",
            "components": []
        }
        
        for i, table in enumerate(tables[:-1]):  # Skip the last table (usually portion options)
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
        
        return recipe
        
    except Exception as e:
        logger.error(f"Error extracting recipe: {e}")
        return None

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
        recipes, document_content = extract_multiple_recipes_from_docx(docx_path)
        if recipes:
            print(json.dumps({
                "success": True, 
                "recipes": recipes,
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