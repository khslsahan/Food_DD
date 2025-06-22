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