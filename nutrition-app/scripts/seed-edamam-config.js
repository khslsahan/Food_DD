const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function seedEdamamConfig() {
  try {
    console.log('Seeding Edamam API configuration...');
    
    // Set Edamam API credentials in system config
    await prisma.systemConfig.upsert({
      where: { config_key: 'EDAMAM_APP_ID' },
      update: { 
        config_value: process.env.EDAMAM_APP_ID || 'YOUR_EDAMAM_APP_ID',
        description: 'Edamam Nutrition API Application ID'
      },
      create: {
        config_key: 'EDAMAM_APP_ID',
        config_value: process.env.EDAMAM_APP_ID || 'YOUR_EDAMAM_APP_ID',
        description: 'Edamam Nutrition API Application ID'
      }
    });
    
    await prisma.systemConfig.upsert({
      where: { config_key: 'EDAMAM_APP_KEY' },
      update: { 
        config_value: process.env.EDAMAM_APP_KEY || 'YOUR_EDAMAM_APP_KEY',
        description: 'Edamam Nutrition API Application Key'
      },
      create: {
        config_key: 'EDAMAM_APP_KEY',
        config_value: process.env.EDAMAM_APP_KEY || 'YOUR_EDAMAM_APP_KEY',
        description: 'Edamam Nutrition API Application Key'
      }
    });
    
    console.log('✅ Edamam API configuration seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Edamam configuration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedEdamamConfig(); 