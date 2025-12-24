import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, clerkId } = await req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: { clerkId },
    });
    if (existingUser)
      return new Response(JSON.stringify({ message: "User Already Exists" }));
    const user = await prisma.user.create({
      data: {
        email,
        name,
        clerkId,
      },
    });
    return Response.json({ message: "success" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Failed" });
  }
}
