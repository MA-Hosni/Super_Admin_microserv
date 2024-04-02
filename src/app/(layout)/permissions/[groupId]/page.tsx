"use client"

import { useState, useEffect } from "react";
import { FaRegSquarePlus, FaRegSquareMinus, FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { validatePack } from "@/helpers/pricePlans/packValidator";

export default function Home({ params }:any) {
    const packageId = params.packageid;
    console.log(packageId)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [textareas, setTextareas] = useState<string[]>([]);
    const [namePrice, setNamePrice] = useState({
        packageName: "",
        packagePrice: 0,
        packageType: "membership",
        minUsers: 1,
        maxUsers: 10,
    })
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        
    }, [packageId]);

    const addTextarea = () => {
        setTextareas([...textareas, '']);
    };

    const removeTextarea = (index: number) => {
        setTextareas(textareas.filter((_, i) => i !== index));
    };

    const handleTextareaChange = (index: number, value: string) => {
        const newInputs = [...textareas];
        newInputs[index] = value;
        setTextareas(newInputs);
    };

    const backToList = () => {
        router.push("/packages/list");
    };

    const editPackageData = () => {
        setEdit(!edit);
    };

    const onCancel = () => {
        setEdit(false);
    };

    const handleUpdate = async () => {
        
    };
    return (
        <section className="mr-2 border-2 border-slate-200 rounded-lg flex flex-col mb-2">
            <div className="flex w-full justify-between border-b-2 p-2">
                <button onClick={backToList} className="w-54 flex items-center gap-2 text-pink-500 font-bold mx-4 ">
                    <FaArrowLeftLong size={22} />
                    <span className="text-xl">Back</span>
                </button>
                <h1>Group Name</h1>
                <button>plus</button>
                {/* {edit ? null : (
                    <button onClick={editPackageData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4">
                        <PiPencilSimpleLineLight size={20} />
                        <p className="font-medium">Edit Pack</p>
                    </button>
                )} */}
            </div>

            <section className=" h-full py-14 px-12">
                <section className="flex gap-12 pb-4">
                    <div className="mb-3">
                        <label htmlFor="pack_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Package Name
                        </label>
                        <input
                            type="text"
                            id="pack_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                            value={namePrice.packageName}
                            onChange={(e) => setNamePrice({ ...namePrice, packageName: e.target.value })}
                            disabled={!edit}
                        />
                    </div>
                </section>
                <section className="flex gap-12 pb-4">
                    <div className="mb-3">
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex gap-1">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center px-3">
                                <input 
                                    id="horizontal-list-radio-license" 
                                    type="radio" 
                                    value="membership" 
                                    name="list-radio"
                                    checked={namePrice.packageType === "membership"} // Check if packageType is "membership"
                                    onChange={() => setNamePrice({...namePrice, packageType: "membership"})} // Update packageType on change
                                    disabled={!edit}
                                />
                                <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Membership </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center px-3">
                                <input 
                                    id="horizontal-list-radio-id" 
                                    type="radio" 
                                    value="per_user" 
                                    name="list-radio"
                                    checked={namePrice.packageType === "per_user"} // Check if packageType is "per_user"
                                    onChange={() => setNamePrice({...namePrice, packageType: "per_user"})} // Update packageType on change
                                    disabled={!edit}
                                />
                                <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Per User</label>
                            </div>
                        </li>
                    </ul>
                    </div>
                </section>
                <section className="flex gap-12 pb-4">
                    <div className="mb-3 ">
                        <label htmlFor="min_users" className="block mb-2 text-sm font-medium text-gray-900">
                        Minimum Number of users
                        </label>
                        <input
                            type="number"
                            id="min_users"
                            value={namePrice.minUsers}
                            onChange={(e) => setNamePrice({...namePrice, minUsers: parseInt(e.target.value)})}
                            className="bg-gray-50 border w-24 border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block p-2.5"
                            disabled={!edit}
                        />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="max_users" className="block mb-2 text-sm font-medium text-gray-900">
                            Maximum Number of users
                        </label>
                        <input
                            type="number"
                            id="max_users"
                            value={namePrice.maxUsers}
                            onChange={(e) => setNamePrice({...namePrice, maxUsers: parseInt(e.target.value)})}
                            className="bg-gray-50 border w-24 border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block p-2.5"
                            disabled={!edit}
                        />
                    </div>
                </section>
                <section className="flex gap-12 pb-4">
                    <div className="mb-3 ">
                        <label htmlFor="pack_price" className="block mb-2 text-sm font-medium text-gray-900">
                            Package Price
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="pack_price"
                                value={namePrice.packagePrice}
                                onChange={(e) => setNamePrice({...namePrice, packagePrice: parseInt(e.target.value)})}
                                className="bg-gray-50 border w-24 border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block p-2.5"
                                disabled={!edit}
                            />
                            <h1 className="font-bold text-2xl">DT/{namePrice.packageType === "membership" ? (<sub>month</sub>) : (<sub>user</sub>)}</h1>
                        </div>
                    </div>
                </section>
                {textareas.map((value, index) => (
                    <section key={index} className="flex gap-12 pb-4 items-center">
                        <div className="mb-3 ">
                            <label htmlFor={`textarea-${index}`} className="block mb-2 text-sm font-medium text-gray-900">
                                Key Benefit {index + 1}
                            </label>
                            <textarea
                                id={`textarea-${index}`}
                                rows={3}
                                cols={30}
                                maxLength={100}
                                value={value}
                                onChange={(e) => handleTextareaChange(index, e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                                placeholder="Write your feature here..."
                                disabled={!edit}
                            />
                        </div>
                        {/* Buttons */}
                        {edit ? (
                            <div className="flex gap-4">
                                <button onClick={addTextarea} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                                    <FaRegSquarePlus size={20} />
                                </button>
                                {textareas.length > 1 && (
                                    <button onClick={() => removeTextarea(index)} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                                        <FaRegSquareMinus size={20} />
                                    </button>
                                )}
                            </div>
                        ) : null}
                    </section>
                ))}
            </section>
            {edit ? (
                <div className="flex gap-4 self-end m-4">
                    {loading ? "" :
                    <button onClick={onCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Cancel</p>
                    </button>
                    }
                    <button onClick={handleUpdate} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4 disabled:cursor-none" disabled={loading}>
                        <p className="font-medium">{loading ? "Processing" : "Update Information"}</p>
                    </button>
                </div>
            ) : null}
        </section>
    );
}