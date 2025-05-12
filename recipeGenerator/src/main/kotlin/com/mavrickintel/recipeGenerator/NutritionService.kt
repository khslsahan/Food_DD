package com.mavrickintel.recipeGenerator

import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

@Service
class NutritionService(
    private val mealRepository: MealRepository,
    private val componentRepository: ComponentRepository,
    private val recipeIngredientRepository: RecipeIngredientRepository,
    private val ingredientRepository: IngredientRepository,
    private val portionOptionRepository: PortionOptionRepository
) {
    fun getNutrition(foodItem: String, portion: Int): Mono<NutritionResponse> {
        println("Getting nutrition for food item: $foodItem, portion: $portion")
        return mealRepository.findByMealName(foodItem)
            .switchIfEmpty(
                Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "Meal '$foodItem' not found in database"))
            )
            .doOnNext { meal -> println("Found meal: ${meal.mealName} with id: ${meal.mealId}") }
            .flatMap { meal ->
                // Find portion multiplier (default to 1.0 if not found)
                portionOptionRepository.findByMealIdAndSizeName(meal.mealId!!, "${portion}p")
                    .map { it.multiplier }
                    .defaultIfEmpty(1.0)
                    .doOnNext { multiplier -> println("Using portion multiplier: $multiplier") }
                    .flatMap { multiplier ->
                        componentRepository.findAllByMealId(meal.mealId)
                            .doOnNext { component -> println("Processing component: ${component.componentName}") }
                            .collectList()
                            .flatMap { components ->
                                if (components.isEmpty()) {
                                    Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "No components found for meal '$foodItem'"))
                                } else {
                                    // For each component, get its ingredients and calculate nutrition
                                    reactor.core.publisher.Flux.fromIterable(components)
                                        .flatMap { component ->
                                            recipeIngredientRepository.findAllByComponentId(component.componentId!!)
                                                .doOnNext { ri -> println("Found recipe ingredient with raw quantity: ${ri.rawQuantityG}g") }
                                                .flatMap { ri ->
                                                    ingredientRepository.findById(ri.ingredientId)
                                                        .doOnError { error -> 
                                                            println("Error finding ingredient ${ri.ingredientId}: ${error.message}")
                                                        }
                                                        .switchIfEmpty(
                                                            Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "Ingredient with ID ${ri.ingredientId} not found"))
                                                        )
                                                        .doOnNext { ingredient -> println("Processing ingredient: ${ingredient.ingredientName}") }
                                                        .map { ingredient ->
                                                            try {
                                                                // Calculate nutrition for this ingredient
                                                                val factor = (ri.rawQuantityG * multiplier) / 100.0
                                                                println("Calculating nutrition with factor: $factor for ${ingredient.ingredientName}")
                                                                NutritionIngredient(
                                                                    name = ingredient.ingredientName,
                                                                    calories = ingredient.caloriesPer100g * factor,
                                                                    fat = ingredient.fatG * factor,
                                                                    protein = ingredient.proteinG * factor,
                                                                    carbs = ingredient.carbohydratesG * factor
                                                                )
                                                            } catch (e: Exception) {
                                                                println("Error calculating nutrition for ${ingredient.ingredientName}: ${e.message}")
                                                                throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error calculating nutrition values")
                                                            }
                                                        }
                                                }
                                        }
                                        .collectList()
                                        .map { nutritionIngredients ->
                                            if (nutritionIngredients.isEmpty()) {
                                                throw ResponseStatusException(HttpStatus.NOT_FOUND, "No ingredients found for meal '$foodItem'")
                                            }
                                            // Sum up nutrition
                                            val totalCalories = nutritionIngredients.sumOf { it.calories }
                                            val totalFat = nutritionIngredients.sumOf { it.fat }
                                            val totalProtein = nutritionIngredients.sumOf { it.protein }
                                            val totalCarbs = nutritionIngredients.sumOf { it.carbs }
                                            println("Final nutrition values - Calories: $totalCalories, Fat: $totalFat, Protein: $totalProtein, Carbs: $totalCarbs")
                                            NutritionResponse(
                                                food_item = meal.mealName,
                                                calories = totalCalories.toInt(),
                                                serving_size = "${portion}p",
                                                fat_g = totalFat.toInt(),
                                                carbohydrates_g = totalCarbs.toInt(),
                                                protein_g = totalProtein.toInt(),
                                                ingredients = nutritionIngredients.map { it.name }
                                            )
                                        }
                                }
                            }
                    }
            }
            .doOnError { error ->
                println("Error processing nutrition request: ${error.message}")
            }
    }
}

data class NutritionIngredient(
    val name: String,
    val calories: Double,
    val fat: Double,
    val protein: Double,
    val carbs: Double
)