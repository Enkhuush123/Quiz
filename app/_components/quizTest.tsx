"use client";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";

interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export default function QuizClient({
  quizzes,
  articleId,
}: {
  quizzes: Quiz[];
  articleId: string;
}) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = quizzes[index];

  const handleAnswer = async (optionIndex: number) => {
    if (optionIndex.toString() === current.answer) {
      setScore((s) => s + 1);
    }

    if (index + 1 < quizzes.length) {
      setIndex((i) => i + 1);
    }
  };
  return (
    <div className=" m-auto w-auto flex flex-col gap-5">
      <div className="flex flex-col gap-10 rounded-md  p-10">
        <div className="flex  gap-2 flex-col">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col">
              <div className="flex  items-center gap-2">
                <PiShootingStarLight />
                <p className="font-semibold text-2xl ">Quick test</p>
              </div>
              <p className="font-normal text-base">
                Take a quick test about your knowledge from your content{" "}
              </p>
            </div>
            <button className="w-12 h-10 shadow-sm flex items-center justify-center cursor-pointer">
              <IoIosClose />
            </button>
          </div>
        </div>
        <div className="p-5 shadow-sm flex flex-col gap-5">
          <div className="flex justify-between">
            <h2>{current.question}</h2>
            <p>
              {index + 1}/{quizzes.length}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              {current.options.slice(0, 2).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-60.75 h-10 shadow-sm"
                >
                  <p>{option}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-5">
              {current.options.slice(2, 4).map((option, idx) => (
                <button
                  key={idx + 2}
                  onClick={() => handleAnswer(idx + 2)}
                  className="w-60.75 h-10 shadow-sm"
                >
                  <p>{option}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
