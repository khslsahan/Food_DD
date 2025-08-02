#!/bin/bash

echo "🔍 CORNER CASES & EDGE SCENARIOS TESTING"
echo "========================================"

echo ""
echo "🧪 Test 1: Empty/Null Values"
echo "Testing: Empty food_items array"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": []}' | grep -o '"total_requested":[0-9]*\|"successful_count":[0-9]*\|"failed_count":[0-9]*'

echo ""
echo "🧪 Test 2: Null/Empty Filter Arrays"
echo "Testing: Empty dislikes, allergen, replacer, replacement arrays"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": [], "allergen": [], "replacer": [], "replacement": []}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 3: Special Characters in Filter Terms"
echo "Testing: Special characters in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Cooking-Cream", "Olive_Oil", "Sour.Cream"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 4: Very Long Filter Terms"
echo "Testing: Very long filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["ThisIsAVeryLongIngredientNameThatShouldBeHandledProperly"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 5: Case Sensitivity Edge Cases"
echo "Testing: Mixed case variations"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["BeEf StRoGaNoFf", "BEEF STROGANOFF", "beef stroganoff"], "dislikes": ["CoOkInG cReAm", "COOKING CREAM"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 6: Partial String Matching"
echo "Testing: Partial ingredient name matching"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Cream", "Oil"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 7: Overlapping Filter Terms"
echo "Testing: Overlapping terms in different filter categories"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Cream"], "allergen": ["Cream"], "replacer": ["Cream"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 8: Large Number of Filter Terms"
echo "Testing: Many filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Cream", "Oil", "Salt", "Pepper", "Onion", "Garlic", "Herbs", "Spices"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 9: Replacement with Existing Ingredients"
echo "Testing: Adding replacement that already exists"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "replacement": ["Beef Topside", "Salt"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 10: All Items Invalid"
echo "Testing: All food items are invalid"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Invalid Meal 1", "Invalid Meal 2", "Invalid Meal 3"]}' | grep -o '"successful_count":[0-9]*\|"failed_count":[0-9]*'

echo ""
echo "🧪 Test 11: Unicode/Special Characters"
echo "Testing: Unicode characters in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Café", "Crème", "Sauté"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 12: Whitespace Handling"
echo "Testing: Whitespace in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": [" Cooking Cream ", "  Olive Oil  "]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 13: Numbers in Filter Terms"
echo "Testing: Numbers in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["Cream2", "Oil3", "Salt1"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 14: SQL Injection Attempt"
echo "Testing: SQL injection attempt in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["\"; DROP TABLE ingredients; --"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 15: XSS Attempt"
echo "Testing: XSS attempt in filter terms"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff"], "dislikes": ["<script>alert(\"xss\")</script>"]}' | grep -o '"successful_count":[0-9]*'

echo ""
echo "🧪 Test 16: Very Large Request"
echo "Testing: Very large request with many items and filters"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff", "Mushroom Risotto", "Salmon with Honey Mustard Sauce & Beetroot Potato Mash"], "dislikes": ["Cream", "Oil", "Salt", "Pepper", "Onion", "Garlic", "Herbs", "Spices", "Butter", "Cheese"], "allergen": ["Dairy", "Nuts", "Gluten"], "replacer": ["Sour Cream", "Heavy Cream"], "replacement": ["Greek Yogurt", "Coconut Milk", "Almond Milk"]}' | grep -o '"successful_count":[0-9]*\|"failed_count":[0-9]*'

echo ""
echo "🧪 Test 17: Malformed JSON"
echo "Testing: Malformed JSON request"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff", "dislikes": ["Cream"]}' | head -c 200

echo ""
echo "🧪 Test 18: Missing Required Fields"
echo "Testing: Request without food_items"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"dislikes": ["Cream"]}' | head -c 200

echo ""
echo "🧪 Test 19: Invalid Content-Type"
echo "Testing: Invalid content type"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: text/plain" \
  -d '{"food_items": ["Beef Stroganoff"]}' | head -c 200

echo ""
echo "🧪 Test 20: Performance Test - Many Items"
echo "Testing: Performance with many items"
curl -s -X POST http://localhost:8080/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"food_items": ["Beef Stroganoff", "Mushroom Risotto", "Salmon with Honey Mustard Sauce & Beetroot Potato Mash", "Shrimp Noodles", "Chicken BBQ Pizza", "Shrimp kapse", "Almond Milk Chia Pudding", "THYME CROISSANT", "Philly Steak Sandwich", "Shrimp Pizza"]}' | grep -o '"successful_count":[0-9]*\|"failed_count":[0-9]*'

echo ""
echo "🎯 CORNER CASES TESTING COMPLETE!"
echo "=================================" 