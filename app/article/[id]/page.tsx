import ArticleClient from "@/app/_components/articleClient";
import prisma from "@/lib/prisma";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  if (!params) {
    return <div>Invalid Id</div>;
  }
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id: id },
    include: { quizzes: true },
  });

  if (!article) return <div>Article not found</div>;

  return <ArticleClient article={article} />;
}
