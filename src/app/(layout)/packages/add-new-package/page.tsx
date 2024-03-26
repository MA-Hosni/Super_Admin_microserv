"use client"

import { useState } from "react";
import { LuPackagePlus } from "react-icons/lu";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { validatePack } from "@/helpers/pricePlans/packValidator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [textareas, setTextareas] = useState([{ value: '' }]);
    const [namePrice, setNamePrice] = useState({
        packageName: "",
        packagePrice: 0,
    })

    const addTextarea = () => {
        setTextareas([...textareas, { value: '' }]);
    };

    const removeTextarea = (index:any) => {
        setTextareas(textareas.filter((_, i) => i !== index));
    };

    const handleTextareaChange = (index:any, value:any) => {
        const newInputs = [...textareas];
        newInputs[index].value = value;
        setTextareas(newInputs);
    };

    const handleCancel = () => {
        router.push("/packages/list");
    }

    const handleAddPack = async () => {
        try {
            const validationResult = validatePack(namePrice.packageName, namePrice.packagePrice, textareas);
            if (validationResult === true) {
                setLoading(true);
                console.log("namePrice", namePrice)
                console.log("benefit", textareas)
                const packageData = {
                    packageName: namePrice.packageName,
                    packagePrice: namePrice.packagePrice,
                    keyBenefits: textareas.map(textarea => textarea.value.trim()) // Extract textarea values and trim whitespace
                };
                const response = await axios.post("/api/packages/addpack", packageData);
                console.log("New pack success", response.data);
                toast.success("New Pricing Plan created successfully");
                router.push("/packages/list");
            }
        } catch (error:any) {
            toast.error("Pricing Plan creation failed");
            console.log("New Pricing Plan failed", error.message);
        } finally{
            setLoading(false);
        }
    };
  return (
    <section className="mr-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <span className="w-54 flex gap-2 text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm p-4">
            <LuPackagePlus size={20} />ADD NEW PACKAGE
        </span>
        <section className=" h-full py-14 px-12">
            <section className="flex gap-12 pb-4">
                <div className="mb-3">
                <label htmlFor="pack_name" className="block mb-2 text-sm font-medium text-gray-900">
                    Package Name
                </label>
                <input
                    type="text"
                    id="pack_name"
                    value={namePrice.packageName}
                    onChange={(e) => setNamePrice({...namePrice, packageName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
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
                            value={namePrice.packagePrice}
                            onChange={(e) => setNamePrice({...namePrice, packagePrice: parseInt(e.target.value)})}
                            className="bg-gray-50 border w-24 border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block p-2.5"
                        />
                        <h1 className="font-bold text-xl self-end">/month</h1>
                    </div>
                </div>
            </section>
            {textareas.map((textarea, index) => (
                    <section key={index} className="flex gap-12 pb-4 items-center">
                        <div className="mb-3 ">
                            <label htmlFor={`textarea-${index}`} className="block mb-2 text-sm font-medium text-gray-900">
                                Key Benefits of choosing the plan
                            </label>
                            <textarea
                                id={`textarea-${index}`}
                                rows={3}
                                cols={30}
                                maxLength={100}
                                value={textarea.value}
                                onChange={(e) => handleTextareaChange(index, e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                                placeholder="Write your feature here..."
                            />
                        </div>
                        {/* Buttons */}
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
                    </section>
                ))}
            {/* <section className="flex gap-12 pb-4 items-center">
                <div className="mb-3">
                {textareas.map((textarea, index) => (
                    <div key={index} className="mb-3">
                        {textarea}
                    </div>
                ))}
                </div>
            </section> */}
        </section>
        <div className="flex gap-4 self-end">
            {loading ? "" :
            <button onClick={handleCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                    <p className="font-medium">Cancel</p>
            </button>
            }
            <button onClick={handleAddPack} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                <p className="font-medium">{loading ? "Processing" : "Add Pack"}</p>
            </button>
        </div>
    </section>
  );
}