"use client"

import { useState, useEffect } from "react";
import { FaArrowLeftLong, FaBuildingUser } from "react-icons/fa6";
import { FaUsersCog, FaRegEdit } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";

export default function Home({ params }:any) {
    const groupId = params.groupId;
    const user = useSelector((state: any) => state.user);
    const router = useRouter();
    const pathname = usePathname();
    const activeLinkStyle = "text-pink-500 font-bold border-b-2 border-pink-500 px-1";
    const [edit, setEdit] = useState(false);
    const [group, setGroup] = useState({
        groupName: "",
        viewAllManagers: false,
        viewManagerDetails: false,
        deleteManager: false,
        addNewManager: false,
        editManagerDetails: false,
        viewAllCompanies: false,
        viewCompanyDetails: false,
        deleteCompany: false,
        addNewCompany: false,
        editCompanyDetails: false,
        viewAllPackages: false,
        viewPackageDetails: false,
        deletePackage: false,
        addNewPackage: false,
        editPackageDetails: false,
        viewAllPermissions: false,
        viewPermissionDetails: false,
        deletePermission: false,
        addNewPermission: false,
        editPermissionDetails: false,
        assignUsers: false,
    });


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/permission/groupdata?id=${groupId}`);
            setGroup(response.data);
        } catch (error) {
            console.error("Error fetching package data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setGroup((prevGroup) => ({
            ...prevGroup,
            [name]: checked,
        }));
    };

    const backToList = () => {
        router.push("/permissions");
    };

    const onEdit = () => {
        if(user.editPermissionDetails) {
            setEdit(true);
        } else {
            toast.error("You are not authorized")
        }
    }

    const onUpdate = async () => {
        try {
            const response = await axios.patch(`/api/permission/groupupdate?id=${groupId}`, group);
            console.log("update success", response.data);
            setEdit(false)
            toast.success("Group updated successfully");
        } catch (error:any) {
            toast.error("Group update failed");
            console.log("Group update failed", error.message);
        }
    }

    const onCancel = async () => {
        fetchData();
        setEdit(false);
    }
    return (
        <section className="mr-2 border-2 border-slate-200 rounded-lg flex flex-col mb-2">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex w-full h-14 justify-between items-center border-b-2 p-2">
                <button onClick={backToList} className="w-54 flex items-center gap-2 text-pink-500 font-bold mx-4 ">
                    <FaArrowLeftLong size={22} />
                    <span className="text-xl">Back</span>
                </button>
                <h1 className="font-semibold">{group.groupName}</h1>
                { edit ? <div></div> : ( 
                    <button onClick={onEdit} className="w-54 flex items-center gap-2 text-pink-500 font-bold mx-4 ">
                        <FaRegEdit size={22} />
                    </button>
                ) }
            </div>

            <div className="flex w-full h-14 justify-center items-center">
                <ul className="flex gap-8">
                    <li className={`${pathname === `/permissions/${groupId}` ? activeLinkStyle : ''}`}>
                        <Link href={`/permissions/${groupId}`} className="flex gap-2">Permission</Link>
                    </li>
                    <li className={`${pathname === `/permissions/${groupId}/managers` ? activeLinkStyle : ''}`}>
                        <Link href={`/permissions/${groupId}/managers`} className="flex gap-2">Managers</Link>
                    </li>
                </ul>
            </div>
            {/* ==================================================================================== */}
            <hr /> <br />
            {/* ==================================================================================== */}
            <section className=" h-full py-14 px-12 flex flex-col">
                <div className="self-center flex flex-col items-center text-pink-600">
                    <FaUsersCog size={25} />
                    <h1 className="font-bold">Administrators</h1>
                </div>
                <section className="border-2 border-slate-200 rounded-md flex flex-col gap-6 m-2 p-8">
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage administrators</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the list of administrators. It does not allow editing it or creating new packs.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewAllManagers" 
                            type="checkbox"
                            checked={group.viewAllManagers} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage administrators Details</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the administrators details. It does not allow editing it.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewManagerDetails" 
                            type="checkbox"
                            checked={group.viewManagerDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Create new administrators</h1>
                            <p className="text-sm text-gray-500">Allows the user to create a subscription group and configure it. It does not allow assigning users to it or creating external users.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="addNewManager" 
                            type="checkbox"
                            checked={group.addNewManager} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Delete administrators</h1>
                            <p className="text-sm text-gray-500">Allows the user to delete a subscription group.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="deleteManager" 
                            type="checkbox"
                            checked={group.deleteManager} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Edit administrators</h1>
                            <p className="text-sm text-gray-500">Allows the user to edit the access group for each subscription.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="editManagerDetails" 
                            type="checkbox"
                            checked={group.editManagerDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                </section>
            </section>
            <section className=" h-full py-14 px-12 flex flex-col">
                <div className="self-center flex flex-col items-center text-pink-600">
                    <FaBuildingUser size={25} />
                    <h1 className="font-bold">Companies</h1>
                </div>
                <section className="border-2 border-slate-200 rounded-md flex flex-col gap-6 m-2 p-8">
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage companies</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the list of companies. It does not allow editing it or creating new packs.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewAllCompanies" 
                            type="checkbox"
                            checked={group.viewAllCompanies} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage companies Details</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the companies details. It does not allow editing it.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewCompanyDetails" 
                            type="checkbox"
                            checked={group.viewCompanyDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Create new companies</h1>
                            <p className="text-sm text-gray-500">Allows the user to create a subscription group and configure it. It does not allow assigning users to it or creating external users.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="addNewCompany" 
                            type="checkbox"
                            checked={group.addNewCompany} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Delete companies</h1>
                            <p className="text-sm text-gray-500">Allows the user to delete a subscription group.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="deleteCompany" 
                            type="checkbox"
                            checked={group.deleteCompany} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Edit companies</h1>
                            <p className="text-sm text-gray-500">Allows the user to edit the access group for each subscription.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="editCompanyDetails" 
                            type="checkbox"
                            checked={group.editCompanyDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                </section>
            </section>
            <section className=" h-full py-14 px-12 flex flex-col">
                <div className="self-center flex flex-col items-center text-pink-600">
                    <TbBusinessplan size={25} />
                    <h1 className="font-bold">Subscriptions</h1>
                </div>
                <section className="border-2 border-slate-200 rounded-md flex flex-col gap-6 m-2 p-8">
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage subscriptions packs</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the list of subscription packs. It does not allow editing it or creating new packs.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewAllPackages" 
                            type="checkbox"
                            checked={group.viewAllPackages} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage subscription packs Details</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the subscription packs details. It does not allow editing it.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewPackageDetails" 
                            type="checkbox"
                            checked={group.viewPackageDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Create subscriptions packs</h1>
                            <p className="text-sm text-gray-500">Allows the user to create a subscription group and configure it. It does not allow assigning users to it or creating external users.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="addNewPackage" 
                            type="checkbox"
                            checked={group.addNewPackage} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Delete subscriptions packs</h1>
                            <p className="text-sm text-gray-500">Allows the user to delete a subscription group.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="deletePackage" 
                            type="checkbox"
                            checked={group.deletePackage} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Edit subscriptions packs</h1>
                            <p className="text-sm text-gray-500">Allows the user to edit the access group for each subscription.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="editPackageDetails" 
                            type="checkbox"
                            checked={group.editPackageDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                </section>
            </section>
            <section className=" h-full py-14 px-12 flex flex-col">
                <div className="self-center flex flex-col items-center text-pink-600">
                    <RiShieldKeyholeLine size={25} />
                    <h1 className="font-bold">Permissions</h1>
                </div>
                <section className="border-2 border-slate-200 rounded-md flex flex-col gap-6 m-2 p-8">
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage permissions groups</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the list of permission groups. It does not allow editing it or creating new groups.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewAllPermissions" 
                            type="checkbox"
                            checked={group.viewAllPermissions} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Manage permission groups Details</h1>
                            <p className="text-sm text-gray-500">Allows the user to view the permission groups details. It does not allow editing it.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="viewPermissionDetails" 
                            type="checkbox"
                            checked={group.viewPermissionDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Create permissions groups</h1>
                            <p className="text-sm text-gray-500">Allows the user to create a permission group and configure it. It does not allow assigning users to it or creating external users.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="addNewPermission" 
                            type="checkbox"
                            checked={group.addNewPermission} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Delete permissions groups</h1>
                            <p className="text-sm text-gray-500">Allows the user to delete a permission group.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="deletePermission" 
                            type="checkbox"
                            checked={group.deletePermission} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Edit permissions groups</h1>
                            <p className="text-sm text-gray-500">Allows the user to edit the access group for each permission.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="editPermissionDetails" 
                            type="checkbox"
                            checked={group.editPermissionDetails} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center  gap-48">
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Assign Administrators</h1>
                            <p className="text-sm text-gray-500">Allows the user to assign/remove employees to the permission group.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input 
                            name="assignUsers" 
                            type="checkbox"
                            checked={group.assignUsers} 
                            onChange={handleChange}
                            {...(edit ? {} : { disabled: true })}
                            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed`}
                            />
                        </div>
                    </div>
                </section>
                {edit ? (
                <div className="flex gap-4 self-end m-4">
                    <button onClick={onCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                            <p className="font-medium">Cancel</p>
                    </button>
                    <button onClick={onUpdate} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Update</p>
                    </button>
                </div>
                ) : null}
            </section>
        </section>
    );
}