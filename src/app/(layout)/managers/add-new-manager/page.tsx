"use client"

import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUnlock , FiLock } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { validateManager } from "@/helpers/validatorManager";

export default function Home() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [pwdVisible , setPwdVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        matricule: "",
        phoneNumber: "",
        cin: "",
        dateofBirth: "",
        address: "",
    })

    const onSignup = async () => {
        try {
            const validationResult = validateManager(user.firstName,user.lastName,user.email,user.password,user.matricule,user.phoneNumber,user.cin,user.dateofBirth,user.address);
            if (validationResult === true) {
                setLoading(true);
                const response = await axios.post("/api/users/signup", user);
                console.log("Sign up success", response.data);
                toast.success("New manager created successfully");
                router.push("/managers/list");
            }
        } catch (error:any) {
            toast.error("Manager creation failed");
            console.log("Sign up failed", error.message);
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
    }

    const handleCancel = () => {
        router.push("/managers/list");
    }
  return (
    <section className="border-2 border-slate-200 p-4 rounded-lg flex flex-col">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <span className="w-54 flex gap-2 text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm p-4">
            <FaUser size={20} />ADD NEW MANAGER
        </span>
        <div onClick={handleImageClick} className="border-2 overflow-hidden rounded-md w-32 h-28 cursor-pointer mt-12 ml-12">
            {image ? <Image className="object-fill w-full h-full" src={URL.createObjectURL(image)} alt="add manager pdp" width={100} height={100}></Image> : <Image className="my-6 mx-9" src="/images/camera.png" alt="add manager pdp" width={50} height={50}></Image>}
            <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden"/>
        </div>
        <section className=" h-full py-14 px-12">
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                    First Name
                </label>
                <input
                    type="text"
                    id="first_name"
                    value={user.firstName}
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                    Last Name
                </label>
                <input
                    type="text"
                    id="last_name"
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
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
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="name@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
                </div>
                <div className="mb-3 w-full relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <input
                        type={pwdVisible ? "text" : "password"}
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                        required
                        autoComplete="false"
                    />
                    <div className="absolute top-11 right-5 cursor-pointer" onClick={() => setPwdVisible(!pwdVisible)} >
                    { pwdVisible ? <FiUnlock /> : <FiLock /> }
                    </div>
                    
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                <input
                    type="text"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    disabled
                />
                {/* <select id="role" defaultValue="other" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5">
                    <option value="other">Other</option>
                    <option value="HRM">HR Manager</option>
                    <option value="HRS">HR specialist</option>
                    <option value="IT">IT department</option>
                    <option value="MT">management team</option>
                    <option value="OT">operations team</option>
                    <option value="accounting">accounting</option>
                    <option value="intern">I am an intern</option>
                </select> */}
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="matricule" className="block mb-2 text-sm font-medium text-gray-900">
                    ManagerID
                </label>
                <input
                    type="text"
                    id="matricule"
                    value={user.matricule}
                    onChange={(e) => setUser({...user, matricule: e.target.value})}
                    maxLength={6}
                    placeholder="6 digits"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
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
                    value={user.phoneNumber}
                    onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
                    placeholder="## ### ###"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900">
                    CIN
                </label>
                <input
                    type="text"
                    id="cin"
                    value={user.cin}
                    onChange={(e) => setUser({...user, cin: e.target.value})}
                    maxLength={8}
                    pattern="\d{8}"
                    placeholder="8 digits"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="birth"
                    value={user.dateofBirth}
                    onChange={(e) => setUser({...user, dateofBirth: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                />
                </div>
                <div className="mb-3 w-full">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    value={user.address}
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    placeholder="address, city, country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                    required
                    autoComplete="false"
                />
                </div>
            </section>
        </section>
        <div className="flex gap-4 self-end">
            {loading ? "" :
            <button onClick={handleCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                    <p className="font-medium">Cancel</p>
            </button>
            }
            <button onClick={onSignup} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                <p className="font-medium">{loading ? "Processing" : "Add Manager"}</p>
            </button>
        </div>
    </section>
  );
}