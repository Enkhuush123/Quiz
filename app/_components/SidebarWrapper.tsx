"use client";
import { useState } from "react";
import AppSidebar from "./sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [articles, setArticles] = useState([
    { id: "1", title: "Article 1" },
    { id: "2", title: "Article 2" },
  ]);

  const handleSelect = (id: string) => {
    console.log("Selected article:", id);
  };

  return (
    <div className="flex h-screen">
      <AppSidebar articles={articles} onSelect={handleSelect} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
