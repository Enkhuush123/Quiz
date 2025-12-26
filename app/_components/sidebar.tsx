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
        isOpen ? "w-64" : "w-16"
      } h-screen border-r  transition-all duration-300 flex flex-col`}
    >
      <div className="flex  justify-between p-4 ">
        <div className="flex items-center gap-5">
          {isOpen && (
            <div className="flex flex-col gap-3 ">
              <span className="font-bold text-lg">History</span>
              <div className="flex flex-col items-start">
                {articles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => onSelect(a.id)}
                    className="w-auto  cursor-pointer hover:bg-black hover:text-white p-2 rounded-lg "
                  >
                    <p className="text-sm">{a.title}</p>
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
