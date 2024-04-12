"use client"

import Group from "@/Components/permissions/group";
import { NewGroup } from "@/Components/permissions/newGroup";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { LiaUserLockSolid } from "react-icons/lia";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: any) => state.user);
  const [displayed, setDisplayed] = useState(false)

  const handleCreateGroup = () => {
    if(user.addNewPermission) {
      setDisplayed(true);
    } else {
      toast.error("You are not authorized")
    }
  };
  
  return (
    <section className="mr-2 mb-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 m-5">
          <LiaUserLockSolid size={35} color="rgb(236 72 153)" />
          <h1 className="font-bold text-2xl">Permission Groups</h1>
          <p className="text-gray-400 text-xs ">Manage managers access</p>
        </div>

        <button
          onClick={handleCreateGroup}
          className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8"
        >
          <CiCirclePlus size={20} />
          <p className="font-medium">Create a Custom Group</p>
        </button>
      </div>
      {displayed && <NewGroup onClose={() => setDisplayed(false)} />}
      {user.viewAllPermissions ? (
        <Group />
      ) : (
        <div
          className="flex items-center p-4 mb-4 text-sm text-pink-700 border border-pink-500 rounded-lg bg-pink-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Info alert!</span> You are Not Authorized to view the list of Permission Groups.
          </div>
        </div>
      )}
    </section>
  );
}