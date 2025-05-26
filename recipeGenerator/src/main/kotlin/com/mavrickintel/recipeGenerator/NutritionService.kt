package com.mavrickintel.recipeGenerator

import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException
import java.math.BigDecimal
import java.math.RoundingMode

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
                    .defaultIfEmpty(BigDecimal.ONE)
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
                                                                val factor = ri.rawQuantityG.multiply(multiplier).divide(BigDecimal(100), 4, RoundingMode.HALF_UP)
                                                                println("Calculating nutrition with factor: $factor for ${ingredient.ingredientName}")
                                                                NutritionIngredient(
                                                                    name = ingredient.ingredientName,
                                                                    calories = ingredient.caloriesPer100g.multiply(factor),
                                                                    fat = ingredient.fatG.multiply(factor),
                                                                    protein = ingredient.proteinG.multiply(factor),
                                                                    carbs = ingredient.carbohydratesG.multiply(factor)
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
                                            val totalCalories = nutritionIngredients.fold(BigDecimal.ZERO) { acc, it -> acc.add(it.calories) }
                                            val totalFat = nutritionIngredients.fold(BigDecimal.ZERO) { acc, it -> acc.add(it.fat) }
                                            val totalProtein = nutritionIngredients.fold(BigDecimal.ZERO) { acc, it -> acc.add(it.protein) }
                                            val totalCarbs = nutritionIngredients.fold(BigDecimal.ZERO) { acc, it -> acc.add(it.carbs) }
                                            
                                            println("Final nutrition values - Calories: $totalCalories, Fat: $totalFat, Protein: $totalProtein, Carbs: $totalCarbs")
                                            NutritionResponse(
                                                food_item = meal.mealName,
                                                calories = totalCalories.setScale(0, RoundingMode.HALF_UP).toInt(),
                                                serving_size = "${portion}p",
                                                fat_g = totalFat.setScale(0, RoundingMode.HALF_UP).toInt(),
                                                carbohydrates_g = totalCarbs.setScale(0, RoundingMode.HALF_UP).toInt(),
                                                protein_g = totalProtein.setScale(0, RoundingMode.HALF_UP).toInt(),
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
    val calories: BigDecimal,
    val fat: BigDecimal,
    val protein: BigDecimal,
    val carbs: BigDecimal
)