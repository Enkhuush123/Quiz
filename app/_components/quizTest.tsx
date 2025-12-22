"use client";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import {
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
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
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const current = quizzes[index];
  const router = useRouter();

  const handleAnswer = async (optionIndex: number) => {
    setAnswers((prev: number[] | null) => [...(prev || []), optionIndex]);
    if (optionIndex.toString() === current.answer) {
      setScore((s) => s + 1);
    }

    if (index + 1 < quizzes.length) {
      setIndex((i) => i + 1);
    } else setFinished(true);
  };
  if (finished) {
    return (
      <div className="m-auto w-150 ">
        <div className="flex items-center gap-3">
          <PiShootingStarLight />
          <h2 className="text-2xl font-semibold mb-2"> Quiz completed</h2>
        </div>
        <p className="text-gray-500 mb-6">Let’s see what you did</p>
        <div className="bg-white p-8 flex flex-col gap-5">
          <div className="">
            <p className="text-xl font-semibold">
              Your score: {score} / {quizzes.length}
            </p>
          </div>

          <div className="space-y-4">
            {quizzes.map((q, i) => {
              const userAnswer = answers[i];
              const correctIndex = Number(q.answer);
              const isCorrect = userAnswer === correctIndex;

              return (
                <div key={q.id} className="border-b pb-3 flex flex-col">
                  <div className="flex items-center gap-5">
                    <div>
                      {" "}
                      {isCorrect ? (
                        <IoCheckmarkCircleOutline className="text-green-500 text-3xl" />
                      ) : (
                        <IoCloseCircleOutline className="text-red-500 text-3xl" />
                      )}
                    </div>
                    <div className="flex  flex-col gap-3">
                      <p className="font-medium text-sm text-neutral-400">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-sm">
                        Your answer:{" "}
                        <span
                          className={
                            isCorrect ? "text-green-600" : "text-black"
                          }
                        >
                          {q.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">
                          Correct: {q.options[correctIndex]}
                        </p>
                      )}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIndex(0);
                setScore(0);
                setAnswers([]);
                setFinished(false);
              }}
            >
              Restart quiz
            </Button>

            <Button
              onClick={async () => {
                await fetch("/api/score", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    quizId: quizzes[0].id,
                    score,
                  }),
                });
                router.push("/");
              }}
            >
              Save and leave
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" m-auto w-160  flex flex-col gap-5 bg-white">
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
            <button className="w-12 h-10 shadow-sm flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors ">
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
          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="flex gap-5">
              {current.options.slice(0, 2).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-60.75  p-2 shadow-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
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
                  className="w-60.75  p-2 shadow-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
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
