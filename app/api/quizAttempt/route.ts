import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) {
    return Response.json({ error: "user not found" }, { status: 404 });
  }
  const { quizId } = await req.json();
  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: dbUser.id,
      quizId,
    },
  });
  return Response.json({ attemptId: attempt.id });
}
