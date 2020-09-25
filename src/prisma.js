const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.person.create({data:{
      
      First_Name:"test14"
  }})
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })