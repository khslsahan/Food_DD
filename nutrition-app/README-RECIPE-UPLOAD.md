# Recipe Upload Feature

This feature allows users to upload Word documents (.docx) containing recipe information and automatically extract meals, components, and ingredients using AI-powered document processing.

## Features

- **File Upload**: Upload .docx files containing recipe data
- **AI Extraction**: Automatically extract meals, components, and ingredients from Word documents
- **User Verification**: Review and edit extracted data before saving
- **Database Integration**: Save verified recipes to the database
- **Real-time Processing**: Immediate feedback during upload and extraction

## Setup

### Prerequisites

1. **Python Dependencies**: Install the required Python packages for document processing:

```bash
cd nutrition-app/scripts
pip install -r requirements.txt
```

2. **Python 3**: Ensure Python 3 is installed and accessible via `python3` command

### File Structure

```
nutrition-app/
├── app/
│   ├── api/
│   │   └── upload-recipe/
│   │       └── route.ts          # API endpoint for file upload
│   └── upload/
│       └── page.tsx              # Upload page UI
├── components/
│   └── RecipeUploader.tsx        # Main upload component
├── scripts/
│   ├── extract_recipe.py         # Python script for document processing
│   └── requirements.txt          # Python dependencies
└── uploads/                      # Directory for uploaded files
```

## Usage

### 1. Access the Upload Page

Navigate to `/upload` in your application to access the recipe upload interface.

### 2. Upload a Document

1. Click "Select Recipe Document (.docx)" to choose a Word document
2. The system validates that the file is a .docx format
3. Click "Upload and Extract Recipe" to process the document

### 3. Review and Edit

After upload, the system displays the extracted recipe data:
- **Recipe Name**: The name of the recipe
- **Description**: Optional description
- **Components**: Each component of the recipe with:
  - Component name
  - Base quantity (in grams)
  - Ingredients list with:
    - Ingredient name
    - Quantity
    - Unit
    - Calories (optional)

### 4. Save to Database

1. Review all extracted data
2. Make any necessary corrections
3. Click "Save Recipe to Database" to store the recipe

## Document Format

The system expects Word documents with the following structure:

### Table Format
- Each component should be in a separate table
- Tables should have headers (first row)
- Ingredient columns should include:
  - Name
  - Quantity
  - Unit (optional)
  - Calories (optional)

### Example Document Structure
```
Breakfast Gourmet Week A

Component: Main Dish
| Ingredient | Quantity | Unit | Calories |
|------------|----------|------|----------|
| Chicken Breast | 200 | g | 165 |
| Olive Oil | 15 | ml | 135 |

Component: Side Dish
| Ingredient | Quantity | Unit | Calories |
|------------|----------|------|----------|
| Brown Rice | 100 | g | 111 |
| Vegetables | 150 | g | 50 |
```

## API Endpoints

### POST /api/upload-recipe
Uploads a file and extracts recipe data.

**Request**: FormData with file
**Response**: 
```json
{
  "success": true,
  "fileName": "timestamp-filename.docx",
  "recipe": {
    "name": "Recipe Name",
    "description": "Description",
    "components": [...]
  }
}
```

### PUT /api/upload-recipe
Saves verified recipe data to database.

**Request**: JSON with recipe data
**Response**:
```json
{
  "success": true,
  "message": "Recipe saved successfully",
  "mealId": 123
}
```

## Technical Details

### Document Processing
- Uses `python-docx` library to read Word documents
- Extracts tables and associated headers
- Parses ingredient data from table rows
- Handles various quantity formats and units

### Database Integration
- Creates meal records in the `meals` table
- Creates component records in the `components` table
- Creates ingredient records in the `ingredients` table (if new)
- Links components and ingredients via `recipe_ingredients` table

### Error Handling
- File type validation
- Document parsing error handling
- Database transaction rollback on errors
- User-friendly error messages

## Troubleshooting

### Common Issues

1. **Python script not found**
   - Ensure the script is in the correct location: `nutrition-app/scripts/extract_recipe.py`
   - Check file permissions

2. **Python dependencies missing**
   - Run `pip install -r requirements.txt` in the scripts directory

3. **File upload fails**
   - Check file size limits
   - Ensure file is a valid .docx format
   - Verify uploads directory permissions

4. **Extraction fails**
   - Check document format matches expected structure
   - Verify tables are properly formatted
   - Check Python script logs for detailed errors

### Logs
- Check browser console for frontend errors
- Check server logs for API errors
- Python script errors are logged to stderr

## Future Enhancements

- Integration with Gemini API for more advanced AI extraction
- Support for additional file formats (PDF, images)
- Batch upload functionality
- Nutritional information lookup via external APIs
- Recipe validation and quality checks
- Export functionality for processed recipes 