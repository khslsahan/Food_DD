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
    private val componentCategoryRepository: ComponentCategoryRepository,
    private val recipeIngredientRepository: RecipeIngredientRepository,
    private val ingredientRepository: IngredientRepository,
    private val portionOptionRepository: PortionOptionRepository,
    private val componentPortionRepository: ComponentPortionRepository
) {
    fun getAllMeals(): reactor.core.publisher.Flux<Meal> {
        return mealRepository.findAll()
    }

    fun getNutrition(
        foodItem: String, 
        portion: Int,
        dislikes: List<String> = emptyList(),
        allergens: List<String> = emptyList(),
        replacers: List<String> = emptyList(),
        replacements: List<String> = emptyList()
    ): Mono<NutritionResponse> {
        println("Getting nutrition for food item: $foodItem, portion: $portion")
        println("Filters - Dislikes: $dislikes, Allergens: $allergens, Replacers: $replacers, Replacements: $replacements")
        
        return mealRepository.findByMealNameIgnoreCase(foodItem)
            .switchIfEmpty(
                Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "Meal '$foodItem' not found in database"))
            )
            .doOnNext { meal -> println("Found meal: ${meal.mealName} with id: ${meal.mealId}") }
            .flatMap { meal ->
                val portionLabel = "2P"
                portionOptionRepository.findByMealIdAndSizeName(meal.mealId!!, portionLabel)
                    .map { it.multiplier }
                    .defaultIfEmpty(BigDecimal.ONE)
                    .doOnNext { multiplier -> println("Using portion multiplier: $multiplier") }
                    .flatMap { multiplier ->
                        componentRepository.findAllByMealId(meal.mealId)
                            .collectList()
                            .flatMap { components ->
                                if (components.isEmpty()) {
                                    Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "No components found for meal '$foodItem'"))
                                } else {
                                    return@flatMap reactor.core.publisher.Flux.fromIterable(components)
                                        .flatMap { component ->
                                            componentPortionRepository.findByComponentIdAndLabel(component.componentId!!, portionLabel)
                                                .switchIfEmpty(Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "No portion found for component '${component.componentName}' and label '$portionLabel'")))
                                                .flatMap { compPortion ->
                                                    // Get component category if available
                                                    val categoryMono: reactor.core.publisher.Mono<String> = if (component.categoryId != null) {
                                                        componentCategoryRepository.findById(component.categoryId)
                                                            .map { it.name }
                                                            .defaultIfEmpty("")
                                                    } else {
                                                        reactor.core.publisher.Mono.just("")
                                                    }
                                                    
                                                    categoryMono.flatMap { categoryName ->
                                                        recipeIngredientRepository.findAllByComponentId(component.componentId)
                                                            .collectList()
                                                            .flatMap { recipeIngredients ->
                                                                if (recipeIngredients.isEmpty()) {
                                                                    reactor.core.publisher.Mono.just(
                                                                        Pair(ComponentMacroSummary(
                                                                            component_name = component.componentName,
                                                                            component_category = categoryName,
                                                                            calories = 0,
                                                                            fat_g = 0,
                                                                            protein_g = 0,
                                                                            carbohydrates_g = 0
                                                                        ), emptyList<IngredientDetails>())
                                                                    )
                                                                } else {
                                                                    // Calculate total macros for the whole batch (using all ingredients and total cooked weight)
                                                                    reactor.core.publisher.Flux.fromIterable(recipeIngredients)
                                                                        .flatMap { ri ->
                                                                            ingredientRepository.findById(ri.ingredientId)
                                                                                .map { ingredient ->
                                                                                    val factor = ri.rawQuantityG.divide(BigDecimal(100), 6, RoundingMode.HALF_UP)
                                                                                    NutritionIngredient(
                                                                                        name = ingredient.ingredientName,
                                                                                        calories = ingredient.caloriesPer100g.multiply(factor),
                                                                                        fat = ingredient.fatG.multiply(factor),
                                                                                        protein = ingredient.proteinG.multiply(factor),
                                                                                        carbs = ingredient.carbohydratesG.multiply(factor)
                                                                                    )
                                                                                }
                                                                        }
                                                                        .collectList()
                                                                        .flatMap { nutritionIngredients ->
                                                                            // Apply ingredient filtering
                                                                            val filteredIngredients = applyIngredientFilters(
                                                                                nutritionIngredients,
                                                                                dislikes,
                                                                                allergens,
                                                                                replacers
                                                                            )
                                                                            
                                                                            // Add replacement ingredients
                                                                            val finalIngredients = if (replacements.isNotEmpty()) {
                                                                                addReplacementIngredients(filteredIngredients, replacements, compPortion.totalWeightG)
                                                                            } else {
                                                                                filteredIngredients
                                                                            }
                                                                            
                                                                            val totalCalories = finalIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.calories) }
                                                                            val totalFat = finalIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.fat) }
                                                                            val totalProtein = finalIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.protein) }
                                                                            val totalCarbs = finalIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.carbs) }
                                                                            val totalCooked = component.afterCookWeightG ?: compPortion.totalWeightG
                                                                            // Per-gram values
                                                                            val calPerG = if (totalCooked.compareTo(BigDecimal.ZERO) == 0) BigDecimal.ZERO else totalCalories.divide(totalCooked, 6, RoundingMode.HALF_UP)
                                                                            val fatPerG = if (totalCooked.compareTo(BigDecimal.ZERO) == 0) BigDecimal.ZERO else totalFat.divide(totalCooked, 6, RoundingMode.HALF_UP)
                                                                            val proteinPerG = if (totalCooked.compareTo(BigDecimal.ZERO) == 0) BigDecimal.ZERO else totalProtein.divide(totalCooked, 6, RoundingMode.HALF_UP)
                                                                            val carbsPerG = if (totalCooked.compareTo(BigDecimal.ZERO) == 0) BigDecimal.ZERO else totalCarbs.divide(totalCooked, 6, RoundingMode.HALF_UP)
                                                                            // Portion macros (use compPortion.totalWeightG as the portion size)
                                                                            val portionWeight = compPortion.totalWeightG
                                                                            val portionCalories = portionWeight.multiply(calPerG)
                                                                            val portionFat = portionWeight.multiply(fatPerG)
                                                                            val portionProtein = portionWeight.multiply(proteinPerG)
                                                                            val portionCarbs = portionWeight.multiply(carbsPerG)
                                                                            val componentMacroSummary = ComponentMacroSummary(
                                                                                component_name = component.componentName,
                                                                                component_category = categoryName,
                                                                                calories = portionCalories.setScale(0, RoundingMode.HALF_UP).toInt(),
                                                                                fat_g = portionFat.setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                protein_g = portionProtein.setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                carbohydrates_g = portionCarbs.setScale(1, RoundingMode.HALF_UP).toDouble().toInt()
                                                                            )

                                                                            val scalingFactor = if (totalCooked.compareTo(BigDecimal.ZERO) == 0) BigDecimal.ZERO else portionWeight.divide(totalCooked, 6, RoundingMode.HALF_UP)
                                                                            val ingredientDetails = finalIngredients.map {
                                                                                IngredientDetails(
                                                                                    ingredient_name = it.name,
                                                                                    calories = it.calories.multiply(scalingFactor).setScale(0, RoundingMode.HALF_UP).toInt(),
                                                                                    fat_g = it.fat.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                    protein_g = it.protein.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                    carbohydrates_g = it.carbs.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt()
                                                                                )
                                                                            }
                                                                            Mono.just(Pair(componentMacroSummary, ingredientDetails))
                                                                        }
                                                                }
                                                            }
                                                    }
                                                }
                                        }
                                        .collectList()
                                        .flatMap { results ->
                                            val componentMacros = results.map { it.first }
                                            val allIngredientDetails = results.flatMap { it.second }

                                            // Sum up all components for meal total
                                            val totalCalories = componentMacros.sumOf { it.calories }
                                            val totalFat = componentMacros.sumOf { it.fat_g }
                                            val totalProtein = componentMacros.sumOf { it.protein_g }
                                            val totalCarbs = componentMacros.sumOf { it.carbohydrates_g }
                                            Mono.just(
                                                NutritionResponse(
                                                    food_item = meal.mealName,
                                                    is_balanced = meal.isBalanced,
                                                    is_gourmet = meal.isGourmet,
                                                    is_weight_loss = meal.isWeightLoss,
                                                    calories = totalCalories,
                                                    serving_size = portionLabel,
                                                    fat_g = totalFat,
                                                    carbohydrates_g = totalCarbs,
                                                    protein_g = totalProtein,
                                                    packageName = meal.packageName,
                                                    objective = meal.objective,
                                                    item_code = meal.itemCode,
                                                    ingredients = allIngredientDetails,
                                                    components = componentMacros
                                                )
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

private fun applyIngredientFilters(
    ingredients: List<NutritionIngredient>,
    dislikes: List<String>,
    allergens: List<String>,
    replacers: List<String>
): List<NutritionIngredient> {
    var filteredIngredients = ingredients.toMutableList()
    
    // Normalize filter terms (trim whitespace, lowercase)
    val normalizedDislikes = dislikes.map { it.trim().lowercase() }
    val normalizedAllergens = allergens.map { it.trim().lowercase() }
    val normalizedReplacers = replacers.map { it.trim().lowercase() }
    
    // Remove disliked ingredients (word boundary matching for more precision)
    if (normalizedDislikes.isNotEmpty()) {
        filteredIngredients = filteredIngredients.filter { ingredient ->
            val ingredientName = ingredient.name.lowercase()
            normalizedDislikes.none { dislike ->
                // Use word boundary matching for more precise filtering
                ingredientName.matches(Regex(".*\\b${Regex.escape(dislike)}\\b.*", RegexOption.IGNORE_CASE)) ||
                ingredientName == dislike // Also match exact names
            }
        }.toMutableList()
        println("After removing dislikes: ${filteredIngredients.map { it.name }}")
    }
    
    // Remove allergen ingredients (word boundary matching)
    if (normalizedAllergens.isNotEmpty()) {
        filteredIngredients = filteredIngredients.filter { ingredient ->
            val ingredientName = ingredient.name.lowercase()
            normalizedAllergens.none { allergen ->
                ingredientName.matches(Regex(".*\\b${Regex.escape(allergen)}\\b.*", RegexOption.IGNORE_CASE)) ||
                ingredientName == allergen
            }
        }.toMutableList()
        println("After removing allergens: ${filteredIngredients.map { it.name }}")
    }
    
    // Remove replacer ingredients (word boundary matching)
    if (normalizedReplacers.isNotEmpty()) {
        filteredIngredients = filteredIngredients.filter { ingredient ->
            val ingredientName = ingredient.name.lowercase()
            normalizedReplacers.none { replacer ->
                ingredientName.matches(Regex(".*\\b${Regex.escape(replacer)}\\b.*", RegexOption.IGNORE_CASE)) ||
                ingredientName == replacer
            }
        }.toMutableList()
        println("After removing replacers: ${filteredIngredients.map { it.name }}")
    }
    
    return filteredIngredients
}

private fun addReplacementIngredients(
    existingIngredients: List<NutritionIngredient>,
    replacements: List<String>,
    portionWeight: BigDecimal
): List<NutritionIngredient> {
    val result = existingIngredients.toMutableList()
    
    // Normalize replacement terms and existing ingredient names
    val normalizedReplacements = replacements.map { it.trim() }
    val existingIngredientNames = existingIngredients.map { it.name.lowercase() }
    
    // Add replacement ingredients (avoid duplicates)
    normalizedReplacements.forEach { replacementName ->
        val normalizedReplacement = replacementName.lowercase()
        
        // Only add if it doesn't already exist
        if (!existingIngredientNames.contains(normalizedReplacement)) {
            // Use default nutritional values (should be looked up from DB in production)
            val factor = portionWeight.divide(BigDecimal(100), 6, RoundingMode.HALF_UP)
            val replacementIngredient = NutritionIngredient(
                name = replacementName,
                calories = BigDecimal("100").multiply(factor), // Default 100 cal per 100g
                fat = BigDecimal("2").multiply(factor),        // Default 2g fat per 100g
                protein = BigDecimal("5").multiply(factor),    // Default 5g protein per 100g
                carbs = BigDecimal("15").multiply(factor)      // Default 15g carbs per 100g
            )
            result.add(replacementIngredient)
            println("Added replacement ingredient: $replacementName")
        } else {
            println("Skipped duplicate replacement ingredient: $replacementName")
        }
    }
    
    return result
}