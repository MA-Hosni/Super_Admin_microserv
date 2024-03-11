"use client"

import { CiCirclePlus } from "react-icons/ci";
import ManagerList from "@/Components/manager/ManagerList";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNewManager = () => {
    router.push("/managers/add-new-manager");
  }

  return (
    <section className="border-2 border-slate-200 p-4 rounded-lg flex flex-col">
      <button onClick={handleNewManager} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8 self-end">
          <CiCirclePlus size={20} />
          <p className="font-medium">Add New Manager</p>
      </button>

      <ManagerList />
    </section>
    
  );
}