"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GrBrush, GrOrganization } from "react-icons/gr";
import { FiUnlock , FiLock } from "react-icons/fi";
import toast , { Toaster } from "react-hot-toast";
import { validateCompany } from "@/helpers/companies/addCompanyValidator";
import axios from "axios";



interface Pack {
    _id: string;
    packageName: string;
}

export default function Home() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [file, setFile] = useState(null)
    const [pwdVisible , setPwdVisible] = useState(false);
    const [loading, setLoading] = useState(false);
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
        pricingPlan: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        cin: "",
        role: "",
    })

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

    const createCompany = async () => {
        try {
            const validationResult = validateCompany(company.companyName,company.industry,company.companyAddress,company.companyCity,
                                        company.companyZipCode,company.companyCountry,company.pricingPlan,company.firstName,company.lastName,
                                        company.email,company.password,company.phoneNumber,company.cin,company.role);
            if (validationResult === true) {
                setLoading(true);
                if(file != null){
                    const form = new FormData()
                    form.append('file', file)
                    form.append("upload_preset", "bsxm6ivt");
                    await axios.post("https://api.cloudinary.com/v1_1/djfoa8ffg/upload", form).then((result) => {company.logo = result.data.secure_url});
                    console.log(company.logo);
                }
                const response = await axios.post("/api/companies/addcompany", company);
                console.log("New company created successfully", response.data);
                toast.success("New company created successfully");
                router.push("/companies/list");
            }
        } catch (error:any) {
            toast.error("company creation failed");
            console.log("company creation failed", error.message);
        } finally{
            setLoading(false);
        }
    }

    const handleImageClick = () => {
            inputRef.current?.click();
    }
    
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setImage(file);
        setFile(event.target.files[0]);
    }

    const handleCancel = () => {
        router.push("/companies/list");
    }
  return (
    <section className="mr-2 mb-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <span className="w-54 flex gap-2 text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm p-4 mb-20">
            <GrOrganization size={20} />ADD NEW COMPANY
        </span>
        <div className="flex items-center justify-around">
            <div className="w-[350px]">
                <h1 className="text-xl font-bold flex gap-2 mb-2"><GrBrush />Company Logo <p className="text-xs">(optional)</p></h1>
                <p>Upload your company’s logo here (max. 1MB). We recommend a PNG image with transparent background sized 260×80px.</p>
            </div>
            <div onClick={handleImageClick} className="border-2 overflow-hidden rounded-md w-[260px] h-[80px] cursor-pointer mt-12 ml-12">
            {image ? <Image className="object-fill w-full h-full" src={URL.createObjectURL(image)} alt="add company logo" width={100} height={100}></Image> : <Image className="object-fill translate-x-[200%] translate-y-[25%]" src="/images/favicon-removebg.png" alt="add manager pdp" width={50} height={50}></Image>}
            <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden"/>
            </div>
        </div>
        <br /><br /><hr /><br /><br />
        <section className=" h-full py-14 px-12 ">
            <h1 className="font-bold text-2xl text-pink-600 rounded-sm border-b-4 border-pink-600 pb-2 pl-1 w-64 ">General Information</h1>
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
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="indestry" className="block mb-2 text-sm font-medium text-gray-900">
                    Indestry
                </label>
                <select 
                id="indestry" 
                value={company.industry}
                onChange={(e) => setCompany({...company, industry: e.target.value})}
                defaultValue="other" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
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
                <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900">
                    Anniversary (optional)
                </label>
                <input
                    type="date"
                    id="birth"
                    value={company.companyAnnivesary}
                    onChange={(e) => setCompany({...company, companyAnnivesary: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
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
                            onChange={(e) => setCompany({...company, companyZipCode: e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
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
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="pack" className="block mb-2 text-sm font-medium text-gray-900">
                    Pricing Plans
                </label>
                <select 
                id="pack" 
                value={company.pricingPlan}
                onChange={(e) => setCompany({...company, pricingPlan: e.target.value})}
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
        </section>
        <br /><br /><hr /><br /><br />
        <section className=" h-full py-14 px-12 ">
            <h1 className="font-bold text-2xl text-pink-600 rounded-sm border-b-4 border-pink-600 pb-2 pl-1 w-[350px] ">Admin Account Information</h1>
            <section className="flex gap-12 pb-4 mt-14">
                <div className="mb-3 w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                First Name
                </label>
                <input
                    type="text"
                    id="first_name"
                    value={company.firstName}
                    onChange={(e) => setCompany({...company, firstName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                Last Name
                </label>
                <input
                    type="text"
                    id="last_name"
                    value={company.lastName}
                    onChange={(e) => setCompany({...company, lastName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email Adress
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="name@gmail.com"
                    value={company.email}
                    onChange={(e) => setCompany({...company, email: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                />
                </div>
                <div className="mb-3 w-full relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <input
                        type={pwdVisible ? "text" : "password"}
                        id="password"
                        value={company.password}
                        onChange={(e) => setCompany({...company, password: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    />
                    <div className="absolute top-11 right-5 cursor-pointer" onClick={() => setPwdVisible(!pwdVisible)} >
                    { pwdVisible ? <FiUnlock /> : <FiLock /> }
                    </div>
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                    Mobile Number
                </label>
                <input
                    type="text"
                    id="mobile"
                    value={company.phoneNumber}
                    onChange={(e) => setCompany({...company, phoneNumber: e.target.value})}
                    placeholder="## ### ###"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900">
                    CIN
                </label>
                <input
                    type="text"
                    id="cin"
                    value={company.cin}
                    onChange={(e) => setCompany({...company, cin: e.target.value})}
                    maxLength={8}
                    placeholder="8 digits"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                <select 
                id="role" 
                value={company.role}
                onChange={(e) => setCompany({...company, role: e.target.value})}
                defaultValue="other"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                >
                    <option value="other">Other</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="HR specialist">HR specialist</option>
                    <option value="IT department">IT department</option>
                    <option value="management team">management team</option>
                    <option value="operations team">operations team</option>
                    <option value="accounting">accounting</option>
                    <option value="intern">I am an intern</option>
                </select>
                </div>
            </section>
        </section>
        <div className="flex gap-4 self-end">
            {loading ? "" :
            <button onClick={handleCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                    <p className="font-medium">Cancel</p>
            </button>
            }
            <button onClick={createCompany} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                <p className="font-medium">{loading ? "Processing" : "Add Company"}</p>
            </button>
        </div>
    </section>
  );
}