"use client"

import { IoMdCheckmarkCircle, IoMdTrash } from "react-icons/io";
import { MdDisabledVisible, MdVisibility } from "react-icons/md";
import style from "@/Components/packages/pack.module.css";
import { useRouter } from "next/navigation";
import axios from 'axios';
import {useEffect, useState} from 'react';
import toast, { Toaster } from "react-hot-toast";


interface Package {
  _id: string;
  packageName: string;
  packagePrice: number;
  keyBenefits: string[];
  isActive: boolean;
}

export default function Package() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetchData();
}, []);
  const fetchData = async () => {
    try {
        const response = await axios.get("/api/packages/listpacks");
        setPackages(response.data);
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
  };
  const handleEdit = (packageId: string) => {
    router.push(`/packages/list/${packageId}`);
  }

  const handleDelete = async (packageId: string, action: string) => {
    try {
      if( action === 'ACTIVATE') {
        const response = await axios.patch(`/api/packages/packdelete?id=${packageId}`);
        await fetchData();
        toast.success("Package updated successfully");
      }
      if( action === 'DELETE') {
        const response = await axios.delete(`/api/packages/packdelete?id=${packageId}`);
        await fetchData();
        toast.success("Package deleted successfully");
      }
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
};

return (
  <div className="flex flex-wrap gap-3">
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <section className="bg-pink-50 rounded-md p-5 flex flex-wrap gap-3 w-full min-h-96 ">
      {packages.map((pack) => (
        <div key={pack._id} className="w-[285px] h-[450px] bg-pink-400 rounded-2xl flex flex-col text-white p-5 relative">
          <h2 className="font-bold text-2xl mb-2">{pack.packageName}</h2>
          <h1 className="font-extrabold text-5xl mb-8">${pack.packagePrice}/mo</h1>
          <ul id={style.list} className="flex flex-col gap-3 h-[240px]">
            {Array.isArray(pack.keyBenefits) && pack.keyBenefits.map((benefit, index) => (
              <li key={index} className="flex flex-wrap gap-2 items-start">
                <IoMdCheckmarkCircle size={20} />
                <textarea
                  id={style.message}
                  value={benefit}
                  readOnly
                />
              </li>
            ))}
          </ul>
          <button onClick={() => handleEdit(pack._id)} className="w-full bg-white text-pink-400 font-semibold rounded-md p-2 mt-4">Edit Pack</button>
          <button onClick={() => handleDelete(pack._id, 'ACTIVATE')} className="absolute top-3 right-3 rounded-md bg-pink-300 h-9 w-9 flex items-center justify-center">
          {pack.isActive === false ? (
              <MdDisabledVisible size={25} />
            ) : (
              <MdVisibility size={25} />
            )}
            
          </button>
          {/* <button onClick={() => handleDelete(pack._id, 'DELETE')} className="absolute top-3 right-14 rounded-md bg-pink-300 h-9 w-9 flex items-center justify-center">
              <IoMdTrash size={25} />
          </button> */}
        </div>
      ))}
    </section>
  </div>
);
}