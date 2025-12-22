"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShootingStarLight } from "react-icons/pi";
import { Summary } from "./summary";

type Step = "input" | "summary";

export const ArtcileInput = () => {
  const [step, setStep] = useState<Step>("input");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [article, setArticle] = useState<{
    id: string;
    title: string;
    summary: string;
    content: string;
  } | null>(null);

  const isDisabled = title.trim() === "" || content.trim() === "";
  const router = useRouter();

  const handleGenerate = async () => {
    if (isDisabled) return;

    const res = await fetch("/api/article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      console.error("Summary API error:", await res.text());
      return;
    }

    const data = await res.json();

    setArticle({
      id: data.article.id,
      title,
      content,
      summary: data.article.summary,
    });

    setStep("summary");
  };

  return (
    <div>
      {step === "summary" && article ? (
        <Summary article={article} onBack={() => setStep("input")} />
      ) : (
        <div className=" m-auto flex flex-col gap-10 rounded-md shadow-sm p-10">
          <div className="flex  gap-2 flex-col">
            <div className="flex items-center gap-2">
              <PiShootingStarLight />
              <p className="font-semibold text-2xl ">Article Quiz Generator</p>
            </div>
            <div>
              <p className="font-normal text-neutral-400">
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-2">
              <IoDocumentTextOutline /> <p>Article Title</p>
            </div>
            <input
              className="w-full p-2 shadow-sm outline-none"
              placeholder="Enter a title for your article..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-2">
              <IoDocumentTextOutline /> <p>Article Content</p>
            </div>
            <textarea
              className="w-full p-2 shadow-sm outline-none h-40"
              placeholder="Paste your article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <Button
              disabled={isDisabled}
              onClick={() => {
                handleGenerate();
              }}
              className={`w-40 h-10 cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Generate summary
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
