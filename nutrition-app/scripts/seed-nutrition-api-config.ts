const { setSystemConfig } = require('../lib/system-config');

async function seedNutritionApiConfig() {
  try {
    console.log('Seeding Nutrition API configuration...');
    
    // Set Nutrition API URL in system config
    await setSystemConfig(
      'NUTRITION_API_URL',
      'http://localhost:8080/api/nutrition',
      'Nutrition API Service URL'
    );
    
    console.log('✅ Nutrition API configuration seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Nutrition API configuration:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedNutritionApiConfig(); 