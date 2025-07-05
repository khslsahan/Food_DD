const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function testNutritionConfig() {
  try {
    console.log('Testing Nutrition API configuration retrieval...');
    
    const config = await prisma.systemConfig.findUnique({
      where: { config_key: 'NUTRITION_API_URL' },
      select: { config_value: true, description: true }
    });
    
    if (config) {
      console.log('✅ Successfully retrieved NUTRITION_API_URL from system config:');
      console.log('   URL:', config.config_value);
      console.log('   Description:', config.description);
    } else {
      console.log('❌ NUTRITION_API_URL not found in system config');
    }
  } catch (error) {
    console.error('❌ Error testing nutrition config:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testNutritionConfig(); 