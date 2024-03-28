"use client"
import { PiCrownLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

const Group = () => {
  return (
    <main className="flex flex-wrap gap-2 gap-y-20 justify-center py-20">
        <section className="border rounded-lg w-[450px] flex flex-col items-center relative">
            <div className="border w-20 h-20 rounded-3xl flex justify-center items-center text-pink-400 bg-white absolute top-[-45px]">
                <PiCrownLight size={30} />
            </div>
            <div className="flex flex-col items-center gap-4 mt-20">
            <h1 className="font-semibold text-xl">Super Administrators</h1>
            <p className="text-slate-300 text-sm">1 user assigned</p>
            <button className="mt-7 m-4 rounded-lg bg-pink-500 text-white font-semibold text-sm py-2 px-5">See Group</button>
            </div>
        </section>
        <section className="border rounded-lg w-[450px] flex flex-col items-center relative">
            <div className="border w-20 h-20 rounded-3xl flex justify-center items-center text-pink-400 bg-white absolute top-[-45px]">
                <FaRegUser  size={30} />
            </div>
            <div className="flex flex-col items-center gap-4 mt-20">
            <h1 className="font-semibold text-xl">Super Administrators</h1>
            <p className="text-slate-300 text-sm">1 user assigned</p>
            <button className="mt-7 m-4 rounded-lg bg-pink-500 text-white font-semibold text-sm py-2 px-5">See Group</button>
            </div>
        </section>
        <section className="border rounded-lg w-[450px] flex flex-col items-center relative">
            <div className="border w-20 h-20 rounded-3xl flex justify-center items-center text-pink-400 bg-white absolute top-[-45px]">
                <FaRegUser  size={30} />
            </div>
            <div className="flex flex-col items-center gap-4 mt-20">
            <h1 className="font-semibold text-xl">Super Administrators</h1>
            <p className="text-slate-300 text-sm">1 user assigned</p>
            <button className="mt-7 m-4 rounded-lg bg-pink-500 text-white font-semibold text-sm py-2 px-5">See Group</button>
            </div>
        </section>
    </main>

  )
}

export default Group