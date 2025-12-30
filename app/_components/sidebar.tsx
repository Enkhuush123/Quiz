"use client";
import { useState } from "react";

import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";

type Article = {
  id: string;
  title: string;
};

export default function AppSidebar({
  articles,
  onSelect,
}: {
  articles: Article[];
  onSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64 max-sm:w-full " : "w-16"
      } h-screen border-r  transition-all duration-300 flex flex-col`}
    >
      <div className="flex  justify-between p-4 ">
        <div className="flex items-center gap-5">
          {isOpen && (
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg">History</p>
              <div className="flex flex-col items-start gap-3 ">
                {articles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => onSelect(a.id)}
                    className="w-50  cursor-pointer hover:bg-black hover:text-white p-2 rounded-lg max-sm:w-full  "
                  >
                    <p className="text-sm items-start flex">{a.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <GoSidebarExpand className="text-xl" />
            ) : (
              <GoSidebarCollapse className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2"></div>
    </div>
  );
}
