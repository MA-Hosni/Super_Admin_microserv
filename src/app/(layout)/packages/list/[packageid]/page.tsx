"use client"

import { useState, useEffect } from "react";
import { FaRegSquarePlus, FaRegSquareMinus, FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home({ params }:any) {
    const packageId = params.packageid;
    console.log(packageId)
    const router = useRouter();
    const [textareas, setTextareas] = useState<string[]>([]);
    const [namePrice, setNamePrice] = useState({
        packageName: "",
        packagePrice: 0,
    })
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/packages/packdata?id=${packageId}`);
                const { packageName, packagePrice, keyBenefits } = response.data;
                setNamePrice({ packageName, packagePrice });
                setTextareas(keyBenefits);
            } catch (error) {
                console.error("Error fetching package data:", error);
            }
        };
        fetchData();
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
        try {
            // Update package data
            const updatedPackage = {
                packageName: namePrice.packageName,
                packagePrice: namePrice.packagePrice,
                keyBenefits: textareas
            };
            await axios.patch(`/api/packages/packupdate?id=${packageId}`, updatedPackage);
            setEdit(false);
            toast.success("Package updated successfully");
            console.log("Package updated successfully");
        } catch (error) {
            console.error("Error updating package:", error);
        }
    };
    return (
        <section className="mr-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex w-full justify-between">
                <button onClick={backToList} className="w-54 flex items-center gap-2 text-pink-500 font-bold mx-4 ">
                    <FaArrowLeftLong size={22} />
                    <span className="text-xl">Back</span>
                </button>
                {edit ? null : (
                    <button onClick={editPackageData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                        <PiPencilSimpleLineLight size={20} />
                        <p className="font-medium">Edit Pack</p>
                    </button>
                )}
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
                    <div className="mb-3 ">
                        <label htmlFor="pack_price" className="block mb-2 text-sm font-medium text-gray-900">
                            Package Price
                        </label>
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-3xl">$</h1>
                            <input
                                type="number"
                                id="pack_price"
                                className="bg-gray-50 border w-24 border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block p-2.5"
                                value={namePrice.packagePrice}
                                onChange={(e) => setNamePrice({ ...namePrice, packagePrice: parseFloat(e.target.value) })}
                                disabled={!edit}
                            />
                            <h1 className="font-bold text-xl self-end">/month</h1>
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
                    <button onClick={onCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Cancel</p>
                    </button>
                    <button onClick={handleUpdate} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Update Information</p>
                    </button>
                </div>
            ) : null}
        </section>
    );
}