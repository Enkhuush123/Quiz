import QuizClient from "@/app/_components/quizTest";
import prisma from "@/lib/prisma";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quizzes = await prisma.quiz.findMany({
    where: { articleId: params.id },
  });

  return <QuizClient quizzes={quizzes} articleId={params.id} />;
}
