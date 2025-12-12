import prisma from "@/lib/prisma";
import { MainPage } from "./_feature/mainPage";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <div className="m-auto">
      <MainPage />
    </div>
  );
}
