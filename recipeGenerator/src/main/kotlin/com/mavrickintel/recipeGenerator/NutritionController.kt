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

// Response DTO
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
    fun getNutrition(@RequestBody request: NutritionRequest): Mono<List<NutritionResponse>> {
        return reactor.core.publisher.Flux.fromIterable(request.food_items)
            .flatMap { foodItem ->
                nutritionService.getNutrition(foodItem, 2)
                    .switchIfEmpty(Mono.error(ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Food item not found: $foodItem")))
            }
            .collectList()
    }
} 