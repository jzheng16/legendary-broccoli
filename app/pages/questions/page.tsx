import { getAllQuestions } from "@/app/pages/prisma";

interface Question {
    id: string;
    content: string;
    answerOne: string;
    answerTwo: string;
    answerThree: string;
    answerFour: string;
    correctAnswer: string;
}

interface Questions {

}

export default async function QuestionsPage() {
    const questions: Question[] = await getAllQuestions() as Question[];

    if (questions === undefined) {
        // TODO: Fix the undefined action
        return <div>There was a problem loading the questions!</div>
    }

    return (
        <div>
            <h1>Questions</h1>
            <ul>
                {questions.map((question: Question) => (
                    <li key={question.id}>{question.content}</li>
                ))}
            </ul>
        </div>
    );
}