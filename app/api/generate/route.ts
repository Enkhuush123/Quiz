import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { articleId } = await req.json();

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  console.log(article, "art");

  if (!article)
    return NextResponse.json({ error: "Article not found" }, { status: 404 });

  const prompt = `Generate 5 multiple choice questions based on this article: ${article.content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let quizzes: any[] = [];

  try {
    const cleaned =
      response.text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim() || "[]";

    quizzes = JSON.parse(cleaned);
  } catch (e) {
    console.error("generate failed", response.text);
  }

  await prisma.quiz.createMany({
    data: quizzes.map((q: any) => ({
      question: q.question,
      options: q.options,
      answer: String(q.answer),
      articleId,
    })),
  });

  return NextResponse.json({ success: true });
}
