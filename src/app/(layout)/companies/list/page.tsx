"use client"

import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import CompaniesList from "@/Components/companies/CompanyList";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  const handleNewCompany = () => {
    if(user.addNewCompany) {
      router.push("/companies/add-new-company");
    } else {
      toast.error("You are not authorized")
    }
  }

  return (
    <section className="mr-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <button onClick={handleNewCompany} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8 self-end">
          <CiCirclePlus size={20} />
          <p className="font-medium">Add New Company</p>
      </button>
      {user.viewAllCompanies ? (
        <CompaniesList />
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
            <span className="font-medium">Info alert!</span> You are Not Authorized to view the list of Companies.
          </div>
        </div>
      )}
    </section>
    
  );
}