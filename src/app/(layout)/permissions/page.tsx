"use client"

import Group from "@/Components/permissions/group";
import { CiCirclePlus } from "react-icons/ci";
import { LiaUserLockSolid } from "react-icons/lia";

export default function Home() {
  return (
    <section className="mr-2 mb-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 m-5">
          <LiaUserLockSolid size={35} color="rgb(236 72 153)" />
          <h1 className="font-bold text-2xl">Permission Groups</h1>
          <p className="text-gray-400 text-xs ">Manage managers access</p>
        </div>

        <button className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
          <CiCirclePlus size={20} />
          <p className="font-medium">Create a Custom Group</p>
        </button>
      </div>

      <Group/>
    </section>
    
  );
}