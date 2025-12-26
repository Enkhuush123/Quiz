"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

import { PiShootingStarLight } from "react-icons/pi";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export default function QuizClient({
  quizzes,
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

  const cancelQuiz = () => {
    router.push("/");
  };

  const handleAnswer = async (optionIndex: number) => {
    setAnswers((prev: number[] | null) => [...(prev || []), optionIndex]);
    if (optionIndex.toString() === current.answer) {
      setScore((s) => s + 1);
    }

    if (index + 1 < quizzes.length) {
      setIndex((i) => i + 1);
    } else setFinished(true);
  };
  console.log(quizzes, "quizs");

  if (finished) {
    return (
      <div className="m-auto w-150  ">
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

          <div className="overflow-auto h-130">
            {quizzes.map((q, i) => {
              const userAnswer = answers[i];
              const correctIndex = Number(q.answer);
              const isCorrect = userAnswer === correctIndex;

              return (
                <div key={q.id} className=" pb-3 flex flex-col">
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

          <div className="flex justify-between ">
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

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <IoIosClose />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <p className="font-normal text-sm text-red-500">
                      If you press Cancel, this quiz will restart from the
                      beginning.
                    </p>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-44.75">Go Back</Button>
                    </DialogClose>
                    <Button
                      className="w-44.75"
                      type="submit"
                      variant="outline"
                      onClick={cancelQuiz}
                    >
                      Cancel Quiz
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
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
