package com.mavrickintel.recipeGenerator

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

// Request DTO
data class NutritionRequest(
    val food_items: List<String>,
    val objective_type: String? = null,
    val package_type: String? = null,
    val dislikes: String? = null,
    val replacement: String? = null,
    val comments: String? = null,
    val allergen: String? = null
)

// Response DTOs
data class ComponentMacroSummary(
    val component_name: String,
    val component_category: String,
    val calories: Int,
    val fat_g: Int,
    val protein_g: Int,
    val carbohydrates_g: Int
)

data class IngredientDetails(
    val ingredient_name: String,
    val calories: Int,
    val fat_g: Int,
    val protein_g: Int,
    val carbohydrates_g: Int
)

data class NutritionResponse(
    val food_item: String,
    val is_balanced: Boolean = false,
    val is_gourmet: Boolean = false,
    val is_weight_loss: Boolean = false,
    val calories: Int,
    val serving_size: String,
    val fat_g: Int,
    val carbohydrates_g: Int,
    val protein_g: Int,
    @JsonProperty("package") val packageName: String? = null,
    val objective: String? = null,
    val item_code: String? = null,
    val ingredients: List<IngredientDetails>,
    val components: List<ComponentMacroSummary>
)

// Improved response structure
data class FailedItem(
    val food_item: String,
    val error_message: String,
    val error_code: String? = null,
    val suggestion: String? = null
)

data class BatchNutritionResponse(
    val successful_items: List<NutritionResponse>,
    val failed_items: List<FailedItem>,
    val total_requested: Int,
    val successful_count: Int,
    val failed_count: Int,
    val summary: ResponseSummary
)

data class ResponseSummary(
    val total_calories: Int,
    val average_calories_per_meal: Double,
    val total_protein: Int,
    val total_fat: Int,
    val total_carbohydrates: Int,
    val balanced_meals_count: Int,
    val gourmet_meals_count: Int,
    val weight_loss_meals_count: Int
)

@RestController
class NutritionController(private val nutritionService: NutritionService) {

    @GetMapping("/api/meals")
    fun getAllMeals(): reactor.core.publisher.Flux<Meal> {
        return nutritionService.getAllMeals()
    }

    @GetMapping("/api/nutrition")
    fun getNutritionGet(): Mono<NutritionResponse> {
        println("getNutritionGet")
        return nutritionService.getNutrition("Grilled Chicken Sandwich", 1)
            .switchIfEmpty(Mono.error(ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Food item not found")))
    }

    @PostMapping("/api/nutrition")
    fun getNutrition(@RequestBody request: NutritionRequest): Mono<BatchNutritionResponse> {
        val successfulItems = mutableListOf<NutritionResponse>()
        val failedItems = mutableListOf<FailedItem>()
        
        return reactor.core.publisher.Flux.fromIterable(request.food_items)
            .flatMap { foodItem ->
                nutritionService.getNutrition(foodItem, 2)
                    .doOnNext { response ->
                        successfulItems.add(response)
                    }
                    .onErrorResume { error ->
                        val errorMessage = when (error) {
                            is ResponseStatusException -> error.reason ?: "Unknown error"
                            else -> error.message ?: "Unknown error"
                        }
                        
                        val suggestion = generateSuggestion(foodItem)
                        
                        failedItems.add(FailedItem(
                            food_item = foodItem,
                            error_message = errorMessage,
                            error_code = when (error) {
                                is ResponseStatusException -> error.statusCode.toString()
                                else -> "INTERNAL_ERROR"
                            },
                            suggestion = suggestion
                        ))
                        
                        Mono.empty<NutritionResponse>()
                    }
            }
            .collectList()
            .map { _ ->
                val summary = calculateSummary(successfulItems)
                
                BatchNutritionResponse(
                    successful_items = successfulItems,
                    failed_items = failedItems,
                    total_requested = request.food_items.size,
                    successful_count = successfulItems.size,
                    failed_count = failedItems.size,
                    summary = summary
                )
            }
    }
    
    private fun generateSuggestion(foodItem: String): String? {
        // Simple suggestion logic - can be enhanced with fuzzy matching
        return when {
            foodItem.contains("steak", ignoreCase = true) -> "Try 'Beef Steak' or 'Grilled Steak'"
            foodItem.contains("chicken", ignoreCase = true) -> "Try 'Grilled Chicken Sandwich' or 'Chicken Breast'"
            foodItem.contains("salmon", ignoreCase = true) -> "Try 'Grilled Salmon' or 'Salmon Fillet'"
            foodItem.contains("beef", ignoreCase = true) -> "Try 'Beef Steak' or 'Grilled Beef'"
            foodItem.contains("pasta", ignoreCase = true) -> "Try 'Pasta' or 'Spaghetti'"
            foodItem.contains("rice", ignoreCase = true) -> "Try 'Rice' or 'Steamed Rice'"
            else -> "Check spelling or try a similar meal name"
        }
    }
    
    private fun calculateSummary(successfulItems: List<NutritionResponse>): ResponseSummary {
        if (successfulItems.isEmpty()) {
            return ResponseSummary(
                total_calories = 0,
                average_calories_per_meal = 0.0,
                total_protein = 0,
                total_fat = 0,
                total_carbohydrates = 0,
                balanced_meals_count = 0,
                gourmet_meals_count = 0,
                weight_loss_meals_count = 0
            )
        }
        
        val totalCalories = successfulItems.sumOf { it.calories }
        val totalProtein = successfulItems.sumOf { it.protein_g }
        val totalFat = successfulItems.sumOf { it.fat_g }
        val totalCarbs = successfulItems.sumOf { it.carbohydrates_g }
        val balancedCount = successfulItems.count { it.is_balanced }
        val gourmetCount = successfulItems.count { it.is_gourmet }
        val weightLossCount = successfulItems.count { it.is_weight_loss }
        
        return ResponseSummary(
            total_calories = totalCalories,
            average_calories_per_meal = totalCalories.toDouble() / successfulItems.size,
            total_protein = totalProtein,
            total_fat = totalFat,
            total_carbohydrates = totalCarbs,
            balanced_meals_count = balancedCount,
            gourmet_meals_count = gourmetCount,
            weight_loss_meals_count = weightLossCount
        )
    }
} 