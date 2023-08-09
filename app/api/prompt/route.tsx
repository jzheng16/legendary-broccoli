import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const fs = require("fs");
const { parse } = require("csv-parse");
const prisma = new PrismaClient()

const API_URL = 'https://api.openai.com/v1';

// POST http:localhost:3000/api/prompt 

// export async function POST(request: Request) {
//   const prompt = await request.json();
//   console.log(process.env.OPENAI_KEY)
//   console.log(process.env.ORGANIZATION_KEY)
//   console.log('request', typeof prompt)

//   const data = {
//     model: "text-davinci-003",
//     prompt: `${prompt}`,
//     max_tokens: 8,
//     n: 2


//   }



//   const res = await fetch(`${API_URL}/completions`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
//       'OpenAI-Organization': process.env.ORGANIZATION_KEY
//     },
//     method: 'POST',
//     body: JSON.stringify(data)
//   });
//   const completions = await res.json();
//   return NextResponse.json(completions);
// }
export async function POST(request: Request) {
  let data = [];
  fs.createReadStream("./questions.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
   
    data.push({
      content: row[0],
      answer_1: row[1],
      answer_2: row[2],
      answer_3: row[3],
      answer_4: row[4],
      correct_answer: row[5],
    })

  })
  .on('finish', async function() {
    console.log('data', data)
    const questions = await prisma.question.createMany({
      data: data
    })
    console.log(questions)

  })
}
export async function GET(request: Request) {
  const questions = await prisma.question.findMany({});
  return NextResponse.json(questions);
}

