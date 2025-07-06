const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function listAllConfigs() {
  try {
    console.log('🔍 Listing all system configurations from database...\n');
    
    const configs = await prisma.systemConfig.findMany({
      select: { 
        config_key: true, 
        config_value: true, 
        description: true,
        updated_at: true
      },
      orderBy: { config_key: 'asc' }
    });
    
    if (configs.length === 0) {
      console.log('❌ No system configurations found in database.');
      console.log('💡 Run the seed scripts to populate configurations:');
      console.log('   npm run prisma:seed');
      console.log('   npm run seed:nutrition-api');
      console.log('   npm run seed:edamam');
    } else {
      console.log(`✅ Found ${configs.length} system configuration(s):\n`);
      
      configs.forEach((config, index) => {
        console.log(`${index + 1}. ${config.config_key}`);
        console.log(`   Description: ${config.description || 'No description'}`);
        console.log(`   Value: ${config.config_value}`);
        console.log(`   Updated: ${config.updated_at}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error listing configurations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
listAllConfigs(); 