/*
  Warnings:

  - You are about to drop the column `answer_1` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer_2` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer_3` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer_4` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `correct_answer` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer_1",
DROP COLUMN "answer_2",
DROP COLUMN "answer_3",
DROP COLUMN "answer_4",
DROP COLUMN "correct_answer",
ADD COLUMN     "answerFour" TEXT,
ADD COLUMN     "answerOne" TEXT,
ADD COLUMN     "answerThree" TEXT,
ADD COLUMN     "answerTwo" TEXT,
ADD COLUMN     "correctAnswer" TEXT;
