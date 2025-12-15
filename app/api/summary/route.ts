import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.firstName || "no name",
      },
    });

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
          Summarize the following article clearly.
          Use short paragraphs or bullet points.
          
          Article: ${content}`,
    });
    const summary = response.text?.trim() || "";

    const article = await prisma.article.create({
      data: { title, content, summary, userId: dbUser.id },
    });

    return NextResponse.json({ article });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const articles = await prisma.article.findFirst({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, content: true, summary: true },
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
