const { setSystemConfig } = require('../lib/system-config');

async function seedEdamamConfig() {
  try {
    console.log('Seeding Edamam API configuration...');
    
    // Set Edamam API credentials in system config
    await setSystemConfig(
      'EDAMAM_APP_ID',
      'cc351e2a',
      'Edamam Nutrition API Application ID'
    );
    
    await setSystemConfig(
      'EDAMAM_APP_KEY',
      'ffeac0f43a1ac9cbe8446013cf7cee94',
      'Edamam Nutrition API Application Key'
    );
    
    console.log('✅ Edamam API configuration seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Edamam configuration:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedEdamamConfig(); 