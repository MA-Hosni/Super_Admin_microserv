"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GrBrush } from "react-icons/gr";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";



interface Pack {
    _id: string;
    packageName: string;
}

export default function Home({ params }:any) {
    const companyId = params.companyid;
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [packs, setPacks] = useState<Pack[]>([]);
    const [company, setCompany] = useState({
        logo: "https://logos-world.net/wp-content/uploads/2023/05/Anonymous-Logo.png",
        companyName:"",
        industry: "",
        companyAnnivesary: "",
        companyAddress: "",
        companyCity: "",
        companyZipCode: "",
        companyCountry: "",
        email: "",
        phoneNumber: "",
        pricingPlan: {
            _id: "",
            packageName: "",
        },
    })

    const getUserData = async () => {
        try {
            const response = await axios.get(`/api/companies/companydata?id=${companyId}`);
            console.log(response.data);
            const formattedAnniversary = new Date(response.data.companyAnnivesary).toISOString().slice(0, 10);
            setCompany({ ...response.data, companyAnnivesary: formattedAnniversary });
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }
    };

    useEffect(() => {
        async function fetchPacks() {
            try {
                const response = await axios.get("/api/packages/listpacks");
                setPacks(response.data);
            } catch (error) {
                console.error("Error fetching packs:", error);
            }
        }
        fetchPacks();
    }, []);

    useEffect(() => {

            getUserData();
    }, [companyId]);

    const backToList = () => {
        router.push("/companies/list");
    }
    const editCompanyData = () => {
        setEdit(!edit)
    } 

    const onUpdate = async () => {
        try {
            const response = await axios.patch(`/api/companies/companyupdate?id=${companyId}`, company);
            console.log("update success", response.data);
            toast.success("company updated successfully");
            getUserData();
            setEdit(false)
        } catch (error:any) {
            toast.error("Company update failed");
            console.log("Company update failed", error.message);
        }
    }

    const onCancel = async () => {
        try {
            const response = await axios.get(`/api/companies/companydata?id=${companyId}`);
            console.log(response.data);
            const formattedAnniversary = new Date(response.data.companyAnnivesary).toISOString().slice(0, 10);
            setCompany({ ...response.data, companyAnnivesary: formattedAnniversary });
            setEdit(false)
        } catch (error:any) {
        toast.error("Company update failed");
        console.log("Company update failed", error.message);
        }
    }
  return (
    <section className="mr-2 mb-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex justify-between mb-4">
        <button onClick={backToList} className="w-54 h-10 flex items-center gap-2 text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm p-1 mx-4 mb-9">
            <FaArrowLeftLong size={18} />
            <span className="text-lg">Back</span>
        </button>
        { edit ? null : (            
            <button onClick={editCompanyData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                <PiPencilSimpleLineLight size={20} />
                <p className="font-medium">Edit Manager</p>
            </button>
        ) }
        </div>
        <div className="flex items-center justify-around">
            <div className="w-[350px]">
                <h1 className="text-xl font-bold flex gap-2 mb-2"><GrBrush />Company Logo <p className="text-xs">(optional)</p></h1>
                <p>Upload your company’s logo here (max. 1MB). We recommend a PNG image with transparent background sized 200×200px.</p>
            </div>
            <div className="border-2 overflow-hidden rounded-lg w-[200px] h-[200px] cursor-pointer mt-12 ml-12">
                <img src={company.logo} alt="add company logo" className="object-fill w-full h-full"/>
            </div>
        </div>
        <br /><br /><hr /><br /><br />
        <section className=" h-full py-14 px-12 ">
            <h1 className="font-bold text-2xl text-pink-600 rounded-sm border-b-4 border-pink-600 pb-2 pl-1 w-72 ">Company Information</h1>
            <section className="flex gap-12 pb-4 mt-14">
                <div className="mb-3 w-full">
                <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900">
                    Company Name
                </label>
                <input
                    type="text"
                    id="company_name"
                    value={company.companyName}
                    onChange={(e) => setCompany({...company, companyName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="indestry" className="block mb-2 text-sm font-medium text-gray-900">
                    Indestry
                </label>
                <select 
                id="indestry" 
                defaultValue="other" 
                value={company.industry}
                onChange={(e) => setCompany({...company, industry: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                {...(edit ? {} : { disabled: true })}
                >
                    <option value="other">Other</option>
                    <option value="Industry">Industry</option>
                    <option value="Public Administration">Public Administration</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Food, Beverage & Tobacco">Food, Beverage & Tobacco</option>
                    <option value="Automotive & Components">Automotive & Components</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Banking & Insurance">Banking & Insurance</option>
                    <option value="Durable Goods & Apparel">Durable Goods & Apparel</option>
                    <option value="Construction & Engineering">Construction & Engineering</option>
                    <option value="Containers & Packaging">Containers & Packaging</option>
                    <option value="Roofing & Medical Services">Roofing & Medical Services</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Food Distribution & Staples">Food Distribution & Staples</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Diversified Finance">Diversified Finance</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Internet & Direct Business Marketing">Internet & Direct Business Marketing</option>
                    <option value="Software & IT Services">Software & IT Services</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Merchandise">Merchandise</option>
                    <option value="Hardware & Technology Equipment">Hardware & Technology Equipment</option>
                    <option value="Military">Military</option>
                    <option value="Media & Entertainment">Media & Entertainment</option>
                    <option value="Metals & Mining">Metals & Mining</option>
                    <option value="Non-Profit Organization Profit">Non-Profit Organization Profit</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Pharmaceuticals & Biotechnology">Pharmaceuticals & Biotechnology</option>
                    <option value="Semiconductors">Semiconductors</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Business & Professional Services">Business & Professional Services</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Public Services">Public Services</option>
                    <option value="Research & Consulting Services">Research & Consulting Services</option>
                    <option value="Trading Companies & Distributors">Trading Companies & Distributors</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Travel & Tourism">Travel & Tourism</option>
                    <option value="Education">Education</option>
                </select>
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={company.email}
                    onChange={(e) => setCompany({...company, email: e.target.value})}
                    placeholder="name@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                    Mobile Number
                </label>
                <input
                    type="text"
                    id="mobile"
                    value={company.phoneNumber}
                    onChange={(e) => setCompany({...company, phoneNumber: e.target.value})}
                    maxLength={8}
                    placeholder="## ### ###"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900">
                    Anniversary (optional)
                </label>
                <input
                    type="date"
                    id="birth"
                    value={company.companyAnnivesary}
                    onChange={(e) => setCompany({...company, companyAnnivesary: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                    Company Address
                </label>
                <input
                    type="text"
                    id="address"
                    value={company.companyAddress}
                    onChange={(e) => setCompany({...company, companyAddress: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full flex gap-5">
                    <div className="w-full">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={company.companyCity}
                            onChange={(e) => setCompany({...company, companyCity: e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                            {...(edit ? {} : { disabled: true })}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="zip_code" className="block mb-2 text-sm font-medium text-gray-900">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            id="zip_code"
                            value={company.companyZipCode}
                            maxLength={4}
                            onChange={(e) => setCompany({...company, companyZipCode: e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                            {...(edit ? {} : { disabled: true })}
                        />
                    </div>
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                    Country
                </label>
                <input
                    type="text"
                    id="country"
                    value={company.companyCountry}
                    onChange={(e) => setCompany({...company, companyCountry: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    {...(edit ? {} : { disabled: true })}
                />
                </div>
            </section>
            {edit ? (
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="pack" className="block mb-2 text-sm font-medium text-gray-900">
                    Pricing Plans
                </label>
                <select 
                id="pack" 
                value={company.pricingPlan._id} // Set the value to the _id of the chosen pricing plan
                onChange={(e) => setCompany({ ...company, pricingPlan: {
                    _id: e.target.value,
                    packageName: ""
                } })}
                defaultValue=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                >
                <option value="" disabled>Choose a Plan</option>
                {packs.map((pack) => (
                    <option key={pack._id} value={pack._id}>{pack.packageName}</option>
                ))}
                </select>
                </div>
            </section>
            ) : 
            (
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="pack" className="block mb-2 text-sm font-medium text-gray-900">
                    Pricing Plans
                </label>
                <select 
                id="pack" 
                value={company.pricingPlan._id} // Set the value to the _id of the chosen pricing plan
                onChange={(e) => setCompany({ ...company, pricingPlan: {
                    _id: e.target.value,
                    packageName: ""
                } })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                disabled
                >
                    <option value={company.pricingPlan._id}>
                    {company.pricingPlan.packageName}
                    </option>
                </select>
                </div>
            </section>
            )}
        </section>
        {edit ? (
                <div className="flex gap-4 self-end m-4">
                    <button onClick={onCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                            <p className="font-medium">Cancel</p>
                    </button>
                    <button onClick={onUpdate} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Update information</p>
                    </button>
                </div>
            ) : null}
    </section>
  );
}