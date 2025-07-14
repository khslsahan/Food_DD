export interface User {
  id: number
  username: string
  password: string // In a real app, this would be hashed
}

export interface Meal {
  meal_id: number
  meal_name: string
  description?: string
  is_balanced: boolean
  is_gourmet: boolean
  is_weight_loss: boolean
  package?: string
  objective?: string
  item_code?: string
  created_at: string
  updated_at: string
}

export interface Component {
  component_id: number
  meal_id: number
  component_name: string
  before_cook_weight_g: number
  created_at: string
  updated_at: string
}

export interface PortionOption {
  portion_id: number
  meal_id: number
  size_name: string
  multiplier: number
  created_at: string
  updated_at: string
}

export interface Ingredient {
  ingredient_id: number
  ingredient_name: string
  default_unit: string
  calories_per_100g: number
  fat_g: number
  protein_g: number
  carbohydrates_g: number
  created_at: string
  updated_at: string
}

export interface RecipeIngredient {
  component_id: number
  ingredient_id: number
  raw_quantity_g: number
  cooked_quantity_g: number
  created_at: string
  updated_at: string
}
