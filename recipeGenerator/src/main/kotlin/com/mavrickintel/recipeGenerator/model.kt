package com.mavrickintel.recipeGenerator

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.relational.core.mapping.Column
import java.time.OffsetDateTime

@Table("meals")
data class Meal(
    @Id @Column("meal_id") val mealId: Long? = null,
    @Column("meal_name") val mealName: String,
    val description: String?,
    @Column("serving_size") val servingSize: String,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("components")
data class Component(
    @Id @Column("component_id") val componentId: Long? = null,
    @Column("meal_id") val mealId: Long,
    @Column("component_name") val componentName: String,
    @Column("base_quantity_g") val baseQuantityG: Double,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("ingredients")
data class Ingredient(
    @Id @Column("ingredient_id") val ingredientId: Long? = null,
    @Column("ingredient_name") val ingredientName: String,
    @Column("default_unit") val defaultUnit: String,
    @Column("calories_per_100g") val caloriesPer100g: Double,
    @Column("fat_g") val fatG: Double,
    @Column("protein_g") val proteinG: Double,
    @Column("carbohydrates_g") val carbohydratesG: Double,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("recipe_ingredients")
data class RecipeIngredient(
    @Column("component_id") val componentId: Long,
    @Column("ingredient_id") val ingredientId: Long,
    @Column("raw_quantity_g") val rawQuantityG: Double,
    @Column("cooked_quantity_g") val cookedQuantityG: Double?,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("portion_options")
data class PortionOption(
    @Id @Column("portion_id") val portionId: Long? = null,
    @Column("meal_id") val mealId: Long,
    @Column("size_name") val sizeName: String,
    @Column("multiplier") val multiplier: Double,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
) 