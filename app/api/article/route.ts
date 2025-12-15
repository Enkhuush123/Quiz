// app/api/article/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const article = await prisma.article.create({
      data: {
        title,
        content,
        userId: dbUser.id,
        summary: "",
      },
    });

    return NextResponse.json({ article });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json({ articles });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
