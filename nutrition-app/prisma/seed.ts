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