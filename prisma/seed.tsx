const { PrismaClient } = require('@prisma/client')
const Questions = require('./data/questions.tsx');
const prisma = new PrismaClient()


const load = async () => {
  try {
    // Delete existing data first
    await prisma.question.deleteMany()
    console.log('Deleted records in questions table')

    // Add seed data
    await prisma.question.createMany({
      data: Questions
    })

    console.log('Seeded successfully');
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()