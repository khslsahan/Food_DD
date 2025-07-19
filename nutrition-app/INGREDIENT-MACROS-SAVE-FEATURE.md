# Ingredient Macros Save Feature

## Overview

This feature addresses the issue where users could fetch nutrition data for ingredients but had no way to save individual ingredient macros to the database. Previously, macros were only saved when entire recipes or components were saved.

## Problem Solved

- **Before**: Users could fetch nutrition data using the "Get Nutrition" button, but there was no way to save individual ingredient macros
- **After**: Each ingredient row now has a "Save Macros" button that allows users to save individual ingredient macros to the database

## Implementation

### 1. Enhanced IngredientRow Component

The `IngredientRow` component now includes:
- A "Save Macros" button next to the "Get Nutrition" button
- Validation to ensure all nutrition fields are filled before saving
- Support for both creating new ingredients and updating existing ones
- Loading state and user feedback via toast notifications

### 2. New API Endpoint

Added a `PUT` endpoint to `/api/ingredients/[ingredient_id]/route.ts`:
- Handles JSON updates for ingredients
- Includes authentication requirements
- Supports updating ingredient macros

### 3. Save Logic

The save functionality:
1. **Validates** that all nutrition fields (calories, fat, protein, carbohydrates) are filled
2. **Checks** if the ingredient already exists in the database
3. **Updates** existing ingredient if found, or **creates** new ingredient if not found
4. **Provides** user feedback via toast notifications
5. **Handles** errors gracefully with appropriate error messages

## Usage

### For Users

1. **Fetch Nutrition Data**: Click the "Get Nutrition" button to fetch nutrition data from external APIs or database
2. **Review Data**: Verify the fetched nutrition data in the ingredient fields
3. **Save Macros**: Click the "Save Macros" button to save the ingredient's nutrition data to the database
4. **Feedback**: Receive confirmation via toast notification

### Button States

- **Disabled**: When ingredient name is empty or nutrition data is missing
- **Loading**: Shows spinner while saving
- **Enabled**: When all required data is present

## Technical Details

### API Endpoints Used

- `GET /api/ingredients?search={name}` - Search for existing ingredients
- `POST /api/ingredients` - Create new ingredient
- `PUT /api/ingredients/{id}` - Update existing ingredient

### Data Flow

1. User clicks "Save Macros"
2. Component validates required fields
3. Component searches for existing ingredient
4. If found: Updates via PUT request
5. If not found: Creates via POST request
6. Shows success/error toast notification

### Error Handling

- **Missing Data**: Shows error if nutrition fields are empty
- **API Errors**: Shows error message from server
- **Network Errors**: Shows generic error message
- **Authentication**: Handles auth failures gracefully

## Benefits

1. **Individual Control**: Users can save macros for individual ingredients without saving entire recipes
2. **Database Building**: Helps build a comprehensive ingredient database over time
3. **Data Persistence**: Ensures nutrition data is preserved for future use
4. **User Experience**: Provides immediate feedback and clear error messages
5. **Flexibility**: Works with both new and existing ingredients

## Future Enhancements

Potential improvements could include:
- Bulk save functionality for multiple ingredients
- Auto-save on nutrition data fetch
- Validation of nutrition data ranges
- Integration with external nutrition databases
- Export/import functionality for ingredient databases 