import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress || "";
  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {},
    create: {
      clerkId: user.id,
      email,
    },
  });
  return Response.json(
    { message: "User created or updated successfully" },
    { status: 200 }
  );
}
