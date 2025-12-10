"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoBookOutline, IoDocumentTextOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";

export default function Home() {
  const router = useRouter();
  return (
    <div className=" m-auto w-auto flex flex-col gap-5">
      <button
        onClick={() => router.push("/")}
        className="w-12 h-10 shadow-sm flex items-center justify-center cursor-pointer"
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="flex flex-col gap-10  rounded-md shadow-sm p-10">
        <div className="flex  gap-2 flex-col">
          <div className="flex items-center gap-2">
            <PiShootingStarLight />
            <p className="font-semibold text-2xl ">Article Quiz Generator</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IoBookOutline />

              <p className="font-normal text-neutral-400">Summarized content</p>
            </div>
            <div>
              <h1 className="font-semibold text-2xl">Genghis khan</h1>
            </div>
          </div>
        </div>

        <div className="w-[800px] flex justify-between">
          <button className="w-[113px] h-10 shadow-sm cursor-pointer">
            <p>See content</p>
          </button>
          <Button
            onClick={() => {
              router.push("/quiz-test");
            }}
            className="w-[108px] h-10 cursor-pointer"
          >
            Take a quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
