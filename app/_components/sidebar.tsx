"use client";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShootingStarLight } from "react-icons/pi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";

interface SidebarProps {
  articles: { id: string; title: string }[];
  onSelect: (id: string) => void;
}

export default function AppSidebar({ articles, onSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen border-r  transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 ">
        <div className="flex items-center gap-2">
          {isOpen && <span className="font-bold text-lg">History</span>}
        </div>
        <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2"></div>
    </div>
  );
}
