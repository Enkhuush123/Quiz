import { Button } from "@/components/ui/button";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShootingStarLight } from "react-icons/pi";

export default function Home() {
  return (
    <div className=" m-auto flex flex-col gap-10 rounded-md shadow-sm p-10">
      <div className="flex  gap-2 flex-col">
        <div className="flex items-center gap-2">
          <PiShootingStarLight />
          <p className="font-semibold text-2xl ">Article Quiz Generator</p>
        </div>
        <div>
          <p className="font-normal text-neutral-400">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
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
        ></input>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <IoDocumentTextOutline /> <p>Article Title</p>
        </div>
        <textarea
          className="w-full p-2 shadow-sm outline-none h-40"
          placeholder="Paste your article content here..."
        ></textarea>
      </div>
      <div className="w-full flex justify-end">
        <Button className="w-40 h-10">Generate summary</Button>
      </div>
    </div>
  );
}
