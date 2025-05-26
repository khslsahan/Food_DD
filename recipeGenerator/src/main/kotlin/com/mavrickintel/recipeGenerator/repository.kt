package com.mavrickintel.recipeGenerator

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface MealRepository : ReactiveCrudRepository<Meal, Long> {
    fun findByMealName(mealName: String): reactor.core.publisher.Mono<Meal>
}

@Repository
interface ComponentRepository : ReactiveCrudRepository<Component, Long> {
    fun findAllByMealId(mealId: Long): reactor.core.publisher.Flux<Component>
}

@Repository
interface IngredientRepository : ReactiveCrudRepository<Ingredient, Long> {
    fun findByIngredientName(ingredientName: String): reactor.core.publisher.Mono<Ingredient>
}

@Repository
interface RecipeIngredientRepository : ReactiveCrudRepository<RecipeIngredient, Void> {
    fun findAllByComponentId(componentId: Long): reactor.core.publisher.Flux<RecipeIngredient>
}

@Repository
interface PortionOptionRepository : ReactiveCrudRepository<PortionOption, Long> {
    fun findByMealIdAndSizeName(mealId: Long, sizeName: String): reactor.core.publisher.Mono<PortionOption>
}

@Repository
interface ComponentPortionRepository : ReactiveCrudRepository<ComponentPortion, Long> {
    fun findAllByComponentId(componentId: Long): reactor.core.publisher.Flux<ComponentPortion>
    fun findByComponentIdAndLabel(componentId: Long, label: String): reactor.core.publisher.Mono<ComponentPortion>
} 