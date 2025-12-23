"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "./sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [articles, setArticles] = useState<{ id: string; title: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles);
  }, []);

  const handleSelect = (id: string) => {
    router.push(`/article/${id}`);
  };

  return (
    <div className="flex h-screen">
      <AppSidebar articles={articles} onSelect={handleSelect} />
      <main className="w-full h-full bg-neutral-100 p-5">{children}</main>
    </div>
  );
}
