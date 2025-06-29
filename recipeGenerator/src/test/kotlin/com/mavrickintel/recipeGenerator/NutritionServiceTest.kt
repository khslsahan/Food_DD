package com.mavrickintel.recipeGenerator

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource
import org.springframework.beans.factory.annotation.Autowired
import reactor.test.StepVerifier
import org.junit.jupiter.api.Assertions.*

@SpringBootTest
@TestPropertySource(properties = [
    "spring.r2dbc.url=r2dbc:h2:mem:///testdb",
    "spring.r2dbc.username=sa",
    "spring.r2dbc.password="
])
class NutritionServiceTest {

    @Autowired
    private lateinit var nutritionService: NutritionService

    @Test
    fun `test get nutrition response includes boolean categories`() {
        StepVerifier.create(nutritionService.getNutrition("Shrimp Noodles", 2))
            .expectNextMatches { response ->
                response.food_item == "Shrimp Noodles" && 
                (response.is_balanced || response.is_gourmet || response.is_weight_loss)
            }
            .verifyComplete()
    }
} 