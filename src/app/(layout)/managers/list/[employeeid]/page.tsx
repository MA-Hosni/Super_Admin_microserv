"use client"


import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LiaUserShieldSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Home({ params }:any) {
    const user = useSelector((state: any) => state.user);
    const managerId = params.employeeid;
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        matricule: "",
        phoneNumber: "",
        cin: "",
        dateofBirth: "",
        address: "",
        profilePhoto: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        permissionGroup: {
            groupName: "",
        },
      })
    const backToList = () => {
      router.push("/managers/list");
    }

    const editManagerData = () => {
        if(user.editManagerDetails){
            setEdit(!edit)
        } else {
            toast.error("You are not authorized")
        }
    }

    useEffect(() => {
    const getUserData = async () => {
        try {
          const response = await axios.get(`/api/managers/managerdata?id=${managerId}`);
          console.log(response.data);
        const formattedDateOfBirth = new Date(response.data.dateofBirth).toISOString().slice(0, 10);
        setUserData({ ...response.data, dateofBirth: formattedDateOfBirth });
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle errors appropriately (e.g., display an error message to the user)
        }
      };
      getUserData();
    }, [managerId]);
  

    const onUpdate = async () => {
        try {
                const response = await axios.patch(`/api/managers/managerupdate?id=${managerId}`, userData);
                console.log("manager updated successfully", response.data);
                toast.success("manager updated successfully");
                setEdit(false)
        } catch (error:any) {
            toast.error("Manager update failed");
            console.log("Manager update failed", error.message);
        }
    }

    const onCancel = async () => {
        try {
            const response = await axios.get(`/api/managers/managerdata?id=${managerId}`);
            console.log(response.data);
            const formattedDateOfBirth = new Date(response.data.dateofBirth).toISOString().slice(0, 10);
            setUserData({ ...response.data, dateofBirth: formattedDateOfBirth });
            setEdit(false)
        } catch (error:any) {
        toast.error("Manager update failed");
        console.log("Manager update failed", error.message);
        }
    }
    return (
        <div className="mr-2 border-2 border-slate-200 p-4 rounded-lg mb-2"> 
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <button onClick={backToList} className="w-54 flex items-center gap-2 text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm p-1 mx-4 mb-9">
                <FaArrowLeftLong size={18} />
                <span>Back</span>
            </button>
            <div className=" w-full flex items-center justify-between py-2 px-12">
                <div className="flex gap-5">
                    <div className="w-44 h-44 rounded-lg overflow-hidden">
                    <img
                        className="object-fill w-full h-full"
                        src={userData.profilePhoto}
                        alt="Profile Picture"
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl pb-8 pt-2">{userData.firstName} {userData.lastName}</h1>
                        <p className="flex items-baseline gap-2 font-medium"> <LiaUserShieldSolid size={24} />{userData.permissionGroup.groupName} </p>
                        <p className="flex items-end gap-2 font-medium"><CiMail size={24} />{userData.email}</p>
                    </div>
                </div>
                { edit ? null : (            
                <button onClick={editManagerData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                    <PiPencilSimpleLineLight size={20} />
                    <p className="font-medium">Edit Manager</p>
                </button>
                ) }

            </div>
            <section className=" h-full py-14 px-12 flex flex-col">
                <section className="flex gap-12 pb-4">
                    <div className="mb-3 w-full">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        value={userData.firstName}
                        onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                    <div className="mb-3 w-full">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        value={userData.lastName}
                        onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
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
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                    <div className="mb-3 w-full">
                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        value={userData.phoneNumber}
                        onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                </section>
                <section className="flex gap-12 pb-4">
                    <div className="mb-3 w-full">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                    <input
                        type="text"
                        id="role"
                        value={userData.permissionGroup.groupName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled
                    />
                    </div>
                    <div className="mb-3 w-full">
                    <label htmlFor="matricule" className="block mb-2 text-sm font-medium text-gray-900">
                        Matricule
                    </label>
                    <input
                        type="text"
                        id="matricule"
                        maxLength={6}
                        value={userData.matricule}
                        onChange={(e) => setUserData({...userData, matricule: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
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
                        value={userData.dateofBirth}
                        onChange={(e) => setUserData({...userData, dateofBirth: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                    <div className="mb-3 w-full">
                    <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900">
                        CIN
                    </label>
                    <input
                        type="text"
                        id="cin"
                        value={userData.cin}
                        onChange={(e) => setUserData({...userData, cin: e.target.value})}
                        maxLength={8}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                </section>
                <section className="flex gap-12 pb-4">
                    <div className="mb-3 w-full">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...(edit ? {} : { disabled: true })}
                    />
                    </div>
                    {/* <div className="mb-3 w-full">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled
                    />
                    </div> */}
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
        </div>
    );
}
