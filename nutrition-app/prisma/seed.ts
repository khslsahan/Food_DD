const { PrismaClient } = require('../lib/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Kanchana@123', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: 'kanchana' },
    update: {},
    create: {
      username: 'kanchana',
      password: hashedPassword,
    },
  })

  // Seed component categories
  const categories = [
    'Carb',
    'Protein',
    'Garnish',
    'Fat',
  ];
  for (const name of categories) {
    await prisma.component_category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed system configurations (using environment variables)
  await prisma.systemConfig.upsert({
    where: { config_key: 'OPENAI_API_KEY' },
    update: { 
      config_value: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE', 
      description: 'OpenAI API Key' 
    },
    create: {
      config_key: 'OPENAI_API_KEY',
      config_value: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
      description: 'OpenAI API Key',
    },
  });
  console.log('OPENAI_API_KEY inserted/updated in SystemConfig table');

  await prisma.systemConfig.upsert({
    where: { config_key: 'NUTRITION_API_URL' },
    update: { config_value: process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition', description: 'Nutrition API Service URL' },
    create: {
      config_key: 'NUTRITION_API_URL',
      config_value: process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition',
      description: 'Nutrition API Service URL',
    },
  });
  console.log('NUTRITION_API_URL inserted/updated in SystemConfig table');

  console.log({ admin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 