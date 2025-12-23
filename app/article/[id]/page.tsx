import ArticleClient from "@/app/_components/articleClient";
import prisma from "@/lib/prisma";
import { use } from "react";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // unwrap the promise
  const resolvedParams = use(params);

  const article = use(
    prisma.article.findUnique({
      where: { id: resolvedParams.id },
      include: { quizzes: true },
    })
  );

  if (!article) return <div>Article not found</div>;

  return <ArticleClient article={article} />;
}
