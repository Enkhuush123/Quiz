import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShootingStarLight } from "react-icons/pi";

export default function Home() {
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
            <button className="w-12 h-10 shadow-sm flex items-center justify-center">
              <IoIosClose />
            </button>
          </div>
        </div>
        <div className="p-5 shadow-sm flex flex-col gap-5">
          <div className="flex justify-between">
            <h2>What was Genghis Khan's birth name</h2>
            <p>1/5</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <button className="w-[243px] h-10 shadow-sm">
                <p>Yesugei</p>
              </button>
              <button className="w-[243px] h-10 shadow-sm">
                <p>Jamukha</p>
              </button>
            </div>
            <div className="flex gap-5">
              <button className="w-[243px] h-10 shadow-sm">
                <p>Temujin</p>
              </button>
              <button className="w-[243px] h-10 shadow-sm">
                <p>Toghrul</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
