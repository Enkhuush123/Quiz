import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();

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
    contents: `Please provide a concise summary of this article: ${content}`,
  });

  const summary = response.text?.trim() || "";

  const article = await prisma.article.create({
    data: { title, content, summary, userId: dbUser.id },
  });

  return NextResponse.json({ article });
}
