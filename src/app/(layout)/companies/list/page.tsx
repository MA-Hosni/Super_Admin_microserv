"use client"

import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import CompaniesList from "@/Components/companies/CompanyList";

export default function Home() {
  const router = useRouter();

  const handleNewCompany = () => {
    router.push("/companies/add-new-company");
  }

  return (
    <section className="mr-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
      <button onClick={handleNewCompany} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8 self-end">
          <CiCirclePlus size={20} />
          <p className="font-medium">Add New Company</p>
      </button>
      <CompaniesList />
    </section>
    
  );
}