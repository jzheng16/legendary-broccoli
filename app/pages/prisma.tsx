import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllQuestions() {
    try {
        const questions = await prisma.question.findMany();
        return questions;
    } catch(e) {
        console.log("error message: ", e);
    }
}