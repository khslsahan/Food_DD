package com.mavrickintel.recipeGenerator

import org.springframework.http.HttpStatus
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

// Custom error response DTO
data class ApiError(
    val status: Int,
    val error: String,
    val message: String,
    val path: String
)

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ResponseStatusException::class)
    fun handleResponseStatusException(
        ex: ResponseStatusException,
        request: ServerHttpRequest
    ): Mono<ApiError> {
        return Mono.just(
            ApiError(
                status = ex.statusCode.value(),
                error = ex.statusCode.toString(),
                message = ex.reason ?: "Resource not found",
                path = request.path.value()
            )
        )
    }
} 