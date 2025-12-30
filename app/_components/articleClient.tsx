"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoBookOutline, IoDocumentTextOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";
type Quiz = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type Article = {
  id: string;
  summary: string;
  title: string;
  content: string;
  quizzes: Quiz[];
};

export default function ArticleClient({ article }: { article: Article }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const hasQuiz = article.quizzes.length > 0;
  console.log(article, "gg");
  const handleGenerateQuiz = async () => {
    setLoading(true);
    await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ articleId: article.id }),
    });
    router.refresh();
  };
  return (
    <div className=" m-auto  w-220 flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="w-12 h-10 shadow-sm flex items-center justify-center bg-white"
      >
        <MdKeyboardArrowLeft />
      </button>

      <div className="flex flex-col gap-10 rounded-md shadow-sm p-10 bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <PiShootingStarLight />
            <p className="font-semibold text-2xl">Article Quiz Generator</p>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <IoBookOutline />
            <p>Summarized content</p>
          </div>

          <h1 className="font-semibold text-2xl">{article.title}</h1>
          <p className="whitespace-pre-line">{article.summary}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <IoDocumentTextOutline /> <p>Article Content</p>
          </div>
          <div className="line-clamp-3">
            <p>{article.content}</p>
          </div>
          <div className="flex w-full justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">See content</Button>
              </DialogTrigger>

              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>{article.title}</DialogTitle>
                </DialogHeader>
                <p className="whitespace-pre-line max-h-100 overflow-y-auto">
                  {article.content}
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex">
          {hasQuiz ? (
            <Button
              onClick={() => router.push(`/quiz/${article.id}`)}
              disabled={loading}
            >
              Take a quiz
            </Button>
          ) : (
            <Button onClick={handleGenerateQuiz} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
