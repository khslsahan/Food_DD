package com.mavrickintel.recipeGenerator

import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

// Request DTO
data class NutritionRequest(
    val food_item: String,
    val portion: Int
)

// Response DTO
data class NutritionResponse(
    val food_item: String,
    val calories: Int,
    val serving_size: String,
    val fat_g: Int,
    val carbohydrates_g: Int,
    val protein_g: Int,
    val ingredients: List<String>
)

@RestController
class NutritionController(private val nutritionService: NutritionService) {

    @GetMapping("/api/nutrition")
    fun getNutritionGet(): Mono<NutritionResponse> {
        println("getNutritionGet")
        return nutritionService.getNutrition("Grilled Chicken Sandwich" , 1)
            .switchIfEmpty(Mono.error(ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Food item not found")))
    }

    @PostMapping("/api/nutrition")
    fun getNutrition(@RequestBody request: NutritionRequest): Mono<NutritionResponse> {
        return nutritionService.getNutrition(request.food_item, request.portion)
            .switchIfEmpty(Mono.error(ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Food item not found")))
    }
} 