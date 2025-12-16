"use client";

import { Button } from "@/components/ui/button";
import { IoBookOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  article: {
    id?: string;
    title: string;
    content: string;
    summary: string;
  };
  onBack: () => void;
}

export const Summary = ({ article, onBack }: Props) => {
  return (
    <div className="m-auto w-[880px] flex flex-col gap-5">
      <button
        onClick={onBack}
        className="w-12 h-10 shadow-sm flex items-center justify-center"
      >
        <MdKeyboardArrowLeft />
      </button>

      <div className="flex flex-col gap-10 rounded-md shadow-sm p-10">
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

        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">See content</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{article.title}</DialogTitle>
              </DialogHeader>
              <p className="whitespace-pre-line">{article.content}</p>
            </DialogContent>
          </Dialog>

          <Button onClick={() => alert("Quiz step next ")}>Take a quiz</Button>
        </div>
      </div>
    </div>
  );
};
