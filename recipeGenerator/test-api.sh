#!/bin/bash

# Test script for the enhanced nutrition API
echo "Testing Enhanced Nutrition API"
echo "=============================="

# Test 1: Basic request with filtering
echo "Test 1: Basic request with Alfredo Pasta and filtering"
curl -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{
    "food_items": ["Alfredo Pasta with Cheese"],
    "dislikes": ["Tomato"],
    "allergen": ["Cheese"],
    "replacer": ["White Pasta"],
    "replacement": ["Whole Wheat Pasta"]
  }' | jq '.'

echo -e "\n\n"

# Test 2: Multiple food items with some invalid ones
echo "Test 2: Multiple food items with error handling"
curl -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{
    "food_items": ["Alfredo Pasta with Cheese", "Invalid Meal Name", "Grilled Chicken Sandwich"],
    "dislikes": ["Tomato"],
    "allergen": ["Cheese"]
  }' | jq '.'

echo -e "\n\n"

# Test 3: Case insensitive test
echo "Test 3: Case insensitive food item search"
curl -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{
    "food_items": ["alfredo pasta with cheese", "GRILLED CHICKEN SANDWICH"],
    "dislikes": ["tomato", "TOMATO"],
    "allergen": ["cheese", "CHEESE"]
  }' | jq '.'

echo -e "\n\n"

# Test 4: Empty request
echo "Test 4: Empty food items list"
curl -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{
    "food_items": [],
    "dislikes": ["Tomato"],
    "allergen": ["Cheese"]
  }' | jq '.'

echo -e "\n\n"

echo "API Testing Complete!" 