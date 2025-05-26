package com.mavrickintel.recipeGenerator

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.relational.core.mapping.Column
import java.time.OffsetDateTime
import java.math.BigDecimal

@Table("meals")
data class Meal(
    @Id @Column("meal_id") val mealId: Long? = null,
    @Column("meal_name") val mealName: String,
    val description: String?,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("components")
data class Component(
    @Id @Column("component_id") val componentId: Long? = null,
    @Column("meal_id") val mealId: Long?,
    @Column("component_name") val componentName: String,
    @Column("before_cook_weight_g") val beforeCookWeightG: BigDecimal?,
    @Column("after_cook_weight_g") val afterCookWeightG: BigDecimal?,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("ingredients")
data class Ingredient(
    @Id @Column("ingredient_id") val ingredientId: Long? = null,
    @Column("ingredient_name") val ingredientName: String,
    @Column("default_unit") val defaultUnit: String,
    @Column("calories_per_100g") val caloriesPer100g: BigDecimal,
    @Column("fat_g") val fatG: BigDecimal,
    @Column("protein_g") val proteinG: BigDecimal,
    @Column("carbohydrates_g") val carbohydratesG: BigDecimal,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("recipe_ingredients")
data class RecipeIngredient(
    @Column("component_id") val componentId: Long,
    @Column("ingredient_id") val ingredientId: Long,
    @Column("raw_quantity_g") val rawQuantityG: BigDecimal,
    @Column("cooked_quantity_g") val cookedQuantityG: BigDecimal?,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("portion_options")
data class PortionOption(
    @Id @Column("portion_id") val portionId: Long? = null,
    @Column("meal_id") val mealId: Long?,
    @Column("size_name") val sizeName: String,
    @Column("multiplier") val multiplier: BigDecimal,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
)

@Table("component_portions")
data class ComponentPortion(
    @Id @Column("portion_id") val portionId: Long? = null,
    @Column("component_id") val componentId: Long,
    @Column("label") val label: String,
    @Column("total_weight_g") val totalWeightG: BigDecimal,
    @Column("created_at") val createdAt: OffsetDateTime? = null,
    @Column("updated_at") val updatedAt: OffsetDateTime? = null
) 