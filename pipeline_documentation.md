# Recipe Uploader Pipeline Documentation

## Input Stage
- The system takes .docx files containing recipes as input
- These files are expected to be in a specific format with tables and headers
- Each recipe document can contain multiple components (tables) with ingredients

## Document Processing
- The system reads each Word document using the python-docx library
- It extracts tables along with their associated headers
- Tables are converted into a structured markdown format for better processing

## Recipe Extraction
- Uses Google's Gemini AI model (Gemini 1.5 Pro) to process the recipe data
- The system creates a detailed prompt that includes:
  - Component names from table headers
  - Ingredient details including:
    - Name
    - Quantity (numeric)
    - Unit
    - Calories
    - Raw and cooked weights (when available)
- The AI model extracts this information into a structured JSON format

## Data Transformation
- The extracted JSON data is processed to ensure:
  - All quantities are converted to numeric values
  - Units are standardized
  - Both raw and cooked weights are captured when present
  - Component base quantities are extracted from "Total" rows

## SQL Generation
- The structured recipe data is converted into SQL insert statements
- These statements are designed to populate the database with:
  - Recipe information
  - Component details
  - Ingredient specifications
  - Nutritional information

## Output Stage
- Generated SQL statements are written to a file
- The output is wrapped in a transaction (BEGIN/COMMIT)
- Logs are maintained for tracking the processing of each recipe
- The system creates an output directory if it doesn't exist

## Error Handling
- The pipeline includes comprehensive error handling
- Failed extractions are logged
- JSON parsing errors are handled gracefully
- The system continues processing other recipes even if one fails

This pipeline is designed to handle enterprise-scale recipe processing, with a focus on accuracy and data integrity. It's particularly good at handling complex recipes with multiple components and various types of measurements. 