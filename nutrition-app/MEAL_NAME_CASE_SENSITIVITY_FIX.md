# Meal Name Case Sensitivity Fix

## Problem
The application was using case-sensitive comparisons for `meal_name` fields, which could cause issues when:
- Users upload recipes with different casing (e.g., "Chicken Soup" vs "chicken soup")
- Creating meals with similar names but different casing
- Duplicate detection not working properly

## Solution Implemented

### 1. Case-Insensitive Database Queries
**File**: `lib/data.ts`
- Added `findMealByNameCaseInsensitive()` function that uses Prisma's `mode: 'insensitive'` option
- This function can be reused across the application for consistent case-insensitive lookups

```typescript
export async function findMealByNameCaseInsensitive(mealName: string) {
  return prisma.meals.findFirst({
    where: {
      meal_name: {
        equals: mealName,
        mode: 'insensitive'
      }
    }
  })
}
```

### 2. Updated Recipe Upload API
**File**: `app/api/upload-recipe/route.ts`
- Modified `saveRecipeToDatabase()` function to use case-insensitive meal lookup
- Updated duplicate checking logic to be case-insensitive
- Now properly detects existing meals regardless of casing

### 3. Enhanced Meal Creation API
**File**: `app/api/meals/route.ts`
- Added case-insensitive duplicate checking when creating new meals
- Returns proper error message when duplicate meal names are detected
- Prevents creation of meals with same name but different casing

## Places Where `meal_name` is Used

### Database Operations
- ✅ **Recipe Upload**: `app/api/upload-recipe/route.ts` - Case-insensitive duplicate checking
- ✅ **Meal Creation**: `app/api/meals/route.ts` - Case-insensitive validation
- ✅ **Meal Lookup**: `lib/data.ts` - Case-insensitive search function

### UI Components
- **Meal List**: `app/meals/columns.tsx` - Display and sorting
- **Meal Forms**: `app/meals/new/page.tsx` - Input validation
- **Dashboard**: `app/dashboard/page.tsx` - Display
- **Ingredient Usage**: `app/ingredients/columns.tsx` - Display

### Data Types
- **Type Definitions**: `lib/types.ts` - TypeScript interfaces
- **Prisma Schema**: `prisma/schema.prisma` - Database schema

## Benefits
1. **Consistent User Experience**: Users can't accidentally create duplicate meals with different casing
2. **Better Data Integrity**: Prevents data inconsistencies from case variations
3. **Improved Search**: Case-insensitive lookups work regardless of how data was entered
4. **Maintainable Code**: Centralized case-insensitive logic in utility function

## Testing Recommendations
1. Try creating meals with names like "Chicken Soup", "chicken soup", "CHICKEN SOUP"
2. Upload recipes with different casing than existing meals
3. Verify duplicate detection works across all casing variations
4. Test meal search and filtering functionality

## Future Considerations
- Consider adding case normalization (e.g., always store in Title Case)
- Add database migration if existing data needs case normalization
- Consider adding full-text search capabilities for better meal discovery 