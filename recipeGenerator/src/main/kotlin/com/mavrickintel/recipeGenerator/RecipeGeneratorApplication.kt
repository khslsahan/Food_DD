package com.mavrickintel.recipeGenerator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RecipeGeneratorApplication

fun main(args: Array<String>) {
	runApplication<RecipeGeneratorApplication>(*args)
}
