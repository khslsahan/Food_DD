import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.meals.updateMany({
    where: {},
    data: {
      is_balanced: true,
      is_gourmet: true,
      is_weight_loss: true,
    },
  });

  console.log(`Updated ${result.count} meals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 