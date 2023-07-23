-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "answer_1" TEXT,
    "answer_2" TEXT,
    "answer_3" TEXT,
    "answer_4" TEXT,
    "correct_answer" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
