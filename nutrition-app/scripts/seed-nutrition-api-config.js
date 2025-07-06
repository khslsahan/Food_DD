const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function seedNutritionApiConfig() {
  try {
    console.log('Seeding Nutrition API configuration...');
    
    // Set Nutrition API URL in system config
    await prisma.systemConfig.upsert({
      where: { config_key: 'NUTRITION_API_URL' },
      update: { 
        config_value: process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition',
        description: 'Nutrition API Service URL'
      },
      create: {
        config_key: 'NUTRITION_API_URL',
        config_value: process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition',
        description: 'Nutrition API Service URL'
      }
    });
    
    console.log('✅ Nutrition API configuration seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Nutrition API configuration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedNutritionApiConfig(); 