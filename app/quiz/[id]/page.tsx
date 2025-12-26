import QuizClient from "@/app/_components/quizTest";
import prisma from "@/lib/prisma";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const quizzes = await prisma.quiz.findMany({
    where: { articleId: id },
    take: 5,
  });

  return <QuizClient quizzes={quizzes} articleId={id} />;
}
