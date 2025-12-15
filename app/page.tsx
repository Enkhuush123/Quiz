import prisma from "@/lib/prisma";
import { MainPage } from "./_feature/mainPage";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  return (
    <div className="m-auto">
      <MainPage />
    </div>
  );
}
