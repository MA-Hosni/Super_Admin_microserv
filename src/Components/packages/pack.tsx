"use client"

import { IoMdCheckmarkCircle, IoMdTrash } from "react-icons/io";
import { MdDisabledVisible, MdVisibility } from "react-icons/md";
import style from "@/Components/packages/pack.module.css";
import { useRouter } from "next/navigation";
import axios from 'axios';
import {useEffect, useState} from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


interface Package {
  _id: string;
  packageName: string;
  packagePrice: number;
  packageType: string,
  minUsers: number,
  maxUsers: number,
  keyBenefits: string[];
  isActive: boolean;
}

export default function Package() {
  const plan = useSelector((state: any) => state.plan);
  const router = useRouter();
  const dispatch = useDispatch();
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetchData();
  }, [packages]);
  

  const fetchData = async () => {
    try {
        const response = await axios.get("/api/packages/listpacks");
        const packagesData = response.data.map((pack: Package) => ({
            id: pack._id,
            isActive: pack.isActive,
        }));
        setPackages(response.data);
        dispatch({
            type: "SET_PACK",
            payload: packagesData,
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
  };

  const handleEdit = (packageId: string) => {
    router.push(`/packages/list/${packageId}`);
  }

  const handleDelete = async (packageId: string) => {
    try {
        const response = await axios.patch(`/api/packages/packdelete?id=${packageId}`);
        fetchData();
        toast.success("Package updated successfully");
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
          <h1 className="font-extrabold text-4xl mb-8">{pack.packagePrice} DT/{pack.packageType === "membership" ? (<sub>month</sub>) : (<sub>user</sub>)}</h1>
          <ul id={style.list} className="flex flex-col gap-3 h-[240px]">
            <li className="flex flex-wrap gap-2 items-start">
                <IoMdCheckmarkCircle size={20} /> 
                <p>{pack.minUsers} - {pack.maxUsers} Users</p>
            </li>
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
          <button onClick={() => handleDelete(pack._id)} className="absolute top-3 right-3 rounded-md bg-pink-300 h-9 w-9 flex items-center justify-center">
          {plan.packages.find((pkg: any) => pkg.id === pack._id)?.isActive ? <MdVisibility size={25} /> : <MdDisabledVisible size={25} />}
          </button>
        </div>
      ))}
    </section>
  </div>
);
}