import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, score } = await req.json();
  await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      quizId,
    },
  });

  await prisma.userScore.create({
    data: {
      userId: user.id,
      quizId,
      TotalScore: score,
    },
  });

  return NextResponse.json({ success: true });
}
