import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  const question = await prisma.question.create({
    data: {
      content: 'Alice',
      answer_1: 'alice@prisma.io',
      answer_2: 'alice@prisma.io',
      answer_3: 'alice@prisma.io',
      answer_4: 'alice@prisma.io',
      correct_answer: 'answer_1'
    },
  })
  console.log(question)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })