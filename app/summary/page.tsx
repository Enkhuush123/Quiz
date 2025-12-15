"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
}

export default function Home() {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/article")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles?.length) setArticle(data.articles[0]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-auto w-auto flex flex-col gap-5">
      <button
        onClick={() => router.push("/")}
        className="w-12 h-10 shadow-sm flex items-center justify-center cursor-pointer"
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="flex flex-col gap-10 rounded-md shadow-sm p-10">
        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-2">
            <PiShootingStarLight />
            <p className="font-semibold text-2xl">Article Quiz Generator</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IoBookOutline />
              <p className="font-normal text-neutral-400">Summarized content</p>
            </div>
            <div>
              <h1 className="font-semibold text-2xl">
                {article?.title || "No title yet"}
              </h1>
            </div>
            <div>
              <p>{article?.summary || "No summary"}</p>
            </div>
          </div>
        </div>

        <div className=" flex justify-between">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <p>See content</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{article?.title}</DialogTitle>
                </DialogHeader>
                <div>{article?.content}</div>
              </DialogContent>
            </form>
          </Dialog>
          <Button
            onClick={() => router.push("/quiz-test")}
            className="w-[108px] h-10 cursor-pointer"
          >
            Take a quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
