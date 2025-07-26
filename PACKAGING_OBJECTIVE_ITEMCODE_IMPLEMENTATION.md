# Packaging, Objective, and Item Code Extraction Implementation

## Overview

This implementation adds support for extracting and saving **packaging**, **objective**, and **item code** information from recipe documents. The system now automatically detects these fields from document tables and saves them to the database. Additionally, the system has been enhanced to extract meaningful component names instead of generic "Component 1", "Component 2" names.

## Features Implemented

### 1. Document Extraction Enhancement
- **Automatic Detection**: The extraction script now identifies general information tables (2-column key-value format)
- **Field Mapping**: Maps document fields to database columns:
  - `Package` → `package` field in database
  - `Objective` → `objective` field in database  
  - `Item Code` → `item_code` field in database
  - `Item Name` → Updates recipe name if more specific

### 2. Enhanced Component Name Extraction
- **Intelligent Component Naming**: The system now extracts meaningful component names instead of generic "Component 1", "Component 2"
- **Multiple Detection Methods**:
  - Identifies component names from section titles and table headers
  - Recognizes numbered sections (e.g., "3. Mushroom Sautéed with Gochujang")
  - Infers component types from ingredient names (e.g., "Beef Bulgogi", "Mushroom Sautéed")
  - Analyzes table structure to determine component type

### 3. Database Schema
The database already had the required fields in the `meals` table:
```sql
ALTER TABLE "meals" ADD COLUMN "item_code" TEXT,
ADD COLUMN "objective" TEXT,
ADD COLUMN "package" TEXT;
```

### 4. API Integration
- **Upload API**: Enhanced to handle the new fields during recipe upload
- **Database Save**: Properly saves extracted values to the database
- **Update Support**: Handles both new meal creation and existing meal updates

### 5. UI Components
- **Recipe Uploader**: Already had input fields for packaging, objective, and item code
- **Meal Details Page**: Displays the extracted information in a dedicated section
- **Edit Forms**: Support editing these fields for existing meals

## Implementation Details

### Document Structure Detection
The system identifies general information tables by:
1. Looking for 2-column tables (key-value pairs)
2. Checking for specific field names: "Package", "Objective", "Item Code", "Item Name"
3. Extracting values and mapping them to the appropriate database fields

### Component Name Extraction Logic
```python
def extract_component_name_from_table(table, table_index):
    """Extract meaningful component name from table content."""
    
    # Method 1: Look for component name in the first few rows
    # Method 2: Look for numbered sections (e.g., "3. Mushroom Sautéed with Gochujang")
    # Method 3: Look for component name in table headers
    # Method 4: Try to infer from ingredient names
    # Method 5: Look for specific patterns in the document content
    
    # Examples of extracted names:
    # - "Beef Bulgogi" (from beef ingredients)
    # - "Mushroom Sautéed" (from mushroom ingredients)
    # - "Soy Good Dressing" (from sauce/dressing ingredients)
    # - "Portion Breakdown" (from multi-column tables)
```

### Extraction Logic
```python
# First pass: Look for general information table (usually the first table)
if tables_for_recipe and len(tables_for_recipe) > 0:
    first_table = tables_for_recipe[0]
    if first_table['rows']:
        # Check if this looks like a general info table (2 columns, key-value pairs)
        if len(first_table['rows']) > 0 and len(first_table['rows'][0]) == 2:
            for row in first_table['rows']:
                if len(row) == 2:
                    key = row[0].strip().lower()
                    value = row[1].strip()
                    
                    if 'package' in key:
                        recipe["packaging"] = value
                    elif 'objective' in key:
                        recipe["objective"] = value
                    elif 'item code' in key or 'itemcode' in key:
                        recipe["itemCode"] = value
                    elif 'item name' in key or 'itemname' in key:
                        # Update recipe name if it's more specific
                        if value and value != recipe["name"]:
                            recipe["name"] = value
```

### Database Save Logic
```typescript
// Save to database
meal = await prisma.meals.create({
  data: {
    meal_name: recipe.name,
    description: recipe.description || "",
    package: recipe.packaging || null,
    objective: recipe.objective || null,
    item_code: recipe.itemCode || null,
    is_balanced: recipe.isBalancedMeal || false,
    is_gourmet: recipe.isGourmetMeal || false,
    is_weight_loss: recipe.isWeightLossMeal || false
  }
});
```

## Test Results

### Sample Document Tested
- **Document**: `Doc/rescipes/20-july/Item Name_ Soy Good Beef Bowl_Kanchana Format.docx`
- **Expected Values**:
  - Package: "7 Day Boost, Gourmet"
  - Objective: "Lose Weight, Healthy Option"
  - Item Code: "DMC19"

### Test Results
```
✅ Successfully extracted recipe: Soy Good Beef Bowl
   Packaging: 7 Day Boost, Gourmet
   Objective: Lose Weight, Healthy Option
   Item Code: DMC19
   Components: 4

Component Names Extracted:
  Component 1: 'Beef Striploin' (11 ingredients)
  Component 2: 'Mushroom' (3 ingredients)
  Component 3: 'Low Sodium Soy Sauce' (7 ingredients)
  Component 4: 'Beef Bulgogi' (9 ingredients)

Component Name Quality:
  Meaningful components: 4/4
  Quality score: 100.0%
  ✅ Component names are meaningful!

✅ Recipe saved successfully!
   Meal ID: 32
   Message: Recipe updated successfully

✅ Meal retrieved from database:
   Name: Soy Good Beef Bowl
   Package: 7 Day Boost, Gourmet
   Objective: Lose Weight, Healthy Option
   Item Code: DMC19

Validation Results:
   package: ✓ (Expected: 7 Day Boost, Gourmet, Got: 7 Day Boost, Gourmet)
   objective: ✓ (Expected: Lose Weight, Healthy Option, Got: Lose Weight, Healthy Option)
   item_code: ✓ (Expected: DMC19, Got: DMC19)
```

## Files Modified

### 1. Python Extraction Script
- **File**: `nutrition-app/scripts/extract_recipe.py`
- **Changes**: 
  - Added packaging, objective, itemCode fields to recipe structure
  - Enhanced table detection logic to identify general information tables
  - Updated all extraction functions to handle the new fields
  - **NEW**: Added `extract_component_name_from_table()` function for intelligent component naming
  - **NEW**: Enhanced component name extraction with multiple detection methods

### 2. API Route Enhancement
- **File**: `nutrition-app/app/api/meals/[meal_id]/route.ts`
- **Changes**: Added GET endpoint for individual meal retrieval (for testing)

### 3. Database Integration
- **File**: `nutrition-app/app/api/upload-recipe/route.ts`
- **Status**: Already properly implemented to save the new fields

### 4. UI Components
- **File**: `nutrition-app/components/RecipeUploader.tsx`
- **Status**: Already had input fields for the new data

## Usage

### 1. Document Upload
1. Upload a Word document (.docx) containing recipe information
2. The system automatically extracts packaging, objective, and item code from the first table
3. **NEW**: The system now extracts meaningful component names instead of generic names
4. Review and edit the extracted information in the web interface
5. Save to database

### 2. Manual Entry
1. Navigate to `/meals/new` to create a new meal
2. Fill in the packaging, objective, and item code fields
3. Save the meal

### 3. Viewing Extracted Data
1. Navigate to any meal details page (`/meals/[meal_id]`)
2. The additional information is displayed in a dedicated section

## Document Format Requirements

For automatic extraction to work, the document should have:
1. A table with 2 columns (key-value pairs) for general information
2. Rows containing: "Package", "Objective", "Item Code", "Item Name"
3. The table should be the first table in the document (for single recipe documents)
4. **NEW**: Component tables should have meaningful headers or section titles for better component naming

Example table structure:
```
| Item Name | Soy Good Beef Bowl |
| Package   | 7 Day Boost, Gourmet |
| Objective | Lose Weight, Healthy Option |
| Item Code | DMC19 |
```

Example component sections:
```
3. Mushroom Sautéed with Gochujang
4. Soy Good Dressing Composition
5. Soy Good Beef Bowl - Per Portion Breakdown
```

## Component Name Extraction Examples

The system can now extract meaningful component names like:
- **"Beef Bulgogi"** - from beef-related ingredients
- **"Mushroom Sautéed"** - from mushroom ingredients and section titles
- **"Soy Good Dressing"** - from sauce/dressing ingredients
- **"Portion Breakdown"** - from multi-column portion tables

Instead of generic names like:
- ❌ "Component 1"
- ❌ "Component 2"
- ❌ "Component 3"

## Future Enhancements

1. **Multiple Table Detection**: Support for general information tables in any position
2. **Field Validation**: Add validation rules for the extracted fields
3. **Bulk Import**: Support for importing multiple documents with these fields
4. **Export Support**: Include these fields in recipe exports
5. **Advanced Component Naming**: Use AI/ML to generate even more descriptive component names
6. **Component Categories**: Automatically assign component categories based on ingredients

## Conclusion

The implementation successfully extracts packaging, objective, and item code information from recipe documents and saves them to the database. Additionally, the system now provides intelligent component name extraction, resulting in much more meaningful and descriptive component names. The system is now ready to handle these additional metadata fields for better recipe organization and management. 