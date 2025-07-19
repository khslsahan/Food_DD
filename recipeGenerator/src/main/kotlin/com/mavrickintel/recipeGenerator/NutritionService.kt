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

    fun getNutrition(foodItem: String, portion: Int): Mono<NutritionResponse> {
        println("Getting nutrition for food item: $foodItem, portion: $portion")
        return mealRepository.findByMealName(foodItem)
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
                                                                        .map { nutritionIngredients ->
                                                                            val totalCalories = nutritionIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.calories) }
                                                                            val totalFat = nutritionIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.fat) }
                                                                            val totalProtein = nutritionIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.protein) }
                                                                            val totalCarbs = nutritionIngredients.fold(BigDecimal.ZERO) { acc, ni -> acc.add(ni.carbs) }
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
                                                                            val ingredientDetails = nutritionIngredients.map {
                                                                                IngredientDetails(
                                                                                    ingredient_name = it.name,
                                                                                    calories = it.calories.multiply(scalingFactor).setScale(0, RoundingMode.HALF_UP).toInt(),
                                                                                    fat_g = it.fat.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                    protein_g = it.protein.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt(),
                                                                                    carbohydrates_g = it.carbs.multiply(scalingFactor).setScale(1, RoundingMode.HALF_UP).toDouble().toInt()
                                                                                )
                                                                            }
                                                                            Pair(componentMacroSummary, ingredientDetails)
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