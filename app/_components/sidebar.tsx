"use client";
import { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShootingStarLight } from "react-icons/pi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { useRouter } from "next/navigation";

type articles = {
  id: string;
  title: string;
};

export default function AppSidebar() {
  const [articles, setArticles] = useState<{ id: string; title: string }[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/articles`)
      .then((res) => res.json())
      .then(setArticles);
  }, []);
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen border-r  transition-all duration-300 flex flex-col`}
    >
      <div className="flex  justify-between p-4 ">
        <div className="flex items-center gap-5">
          {isOpen && (
            <div className="flex flex-col gap-3">
              <span className="font-bold text-lg">History</span>
              <div className="flex flex-col items-start">
                {articles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => router.push(`/article/${a.id}`)}
                    className="w-auto h-11 "
                  >
                    {a.title}
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
