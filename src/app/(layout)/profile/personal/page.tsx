"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileNav from '@/Components/profile/profileNav';
import { LiaUserShieldSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
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

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/profiledata');
      const formattedDateOfBirth = new Date(res.data.user.dateofBirth).toISOString().slice(0, 10);
      setUserData({ ...res.data.user, dateofBirth: formattedDateOfBirth });
      dispatch({
        type: "SET_USER",
        payload: {
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          profilePhoto: res.data.user.profilePhoto,
          groupName: res.data.user.permissionGroup.groupName,
          viewAllManagers: res.data.user.permissionGroup.viewAllManagers,
          viewManagerDetails: res.data.user.permissionGroup.viewManagerDetails,
          deleteManager: res.data.user.permissionGroup.deleteManager,
          addNewManager: res.data.user.permissionGroup.addNewManager,
          editManagerDetails: res.data.user.permissionGroup.editManagerDetails,
          viewAllCompanies: res.data.user.permissionGroup.viewAllCompanies,
          viewCompanyDetails: res.data.user.permissionGroup.viewCompanyDetails,
          deleteCompany: res.data.user.permissionGroup.deleteCompany,
          addNewCompany: res.data.user.permissionGroup.addNewCompany,
          editCompanyDetails: res.data.user.permissionGroup.editCompanyDetails,
          viewAllPackages: res.data.user.permissionGroup.viewAllPackages,
          viewPackageDetails: res.data.user.permissionGroup.viewPackageDetails,
          deletePackage: res.data.user.permissionGroup.deletePackage,
          addNewPackage: res.data.user.permissionGroup.addNewPackage,
          editPackageDetails: res.data.user.permissionGroup.editPackageDetails,
          viewAllPermissions: res.data.user.permissionGroup.viewAllPermissions,
          viewPermissionDetails: res.data.user.permissionGroup.viewPermissionDetails,
          deletePermission: res.data.user.permissionGroup.deletePermission,
          addNewPermission: res.data.user.permissionGroup.addNewPermission,
          editPermissionDetails: res.data.user.permissionGroup.editPermissionDetails,
          assignUsers: res.data.user.permissionGroup.assignUsers,
        }
      })
      console.log("user dispach normal", user)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const onCancel = async () => {
    getUserDetails();
    setEdit(false);
  }

  const updateUserData = async () => {
    try {
      const res = await axios.patch('/api/users/profileupdate', userData);
      dispatch({
        type: "SET_USER",
        payload: {
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          profilePhoto: res.data.user.profilePhoto,
        }
      })
      toast.success("manager updated successfully");
      setEdit(false);
    } catch (error: any) {
      toast.error("User update failed");
      console.log("User update failed", error.message);
    }
  }

  return (
  <div className="mr-2 border-2 border-slate-200 p-4 rounded-lg mb-2">
     <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className=" w-full flex items-center justify-between p-2">
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
            <button onClick={() => {setEdit(!edit)}} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                <PiPencilSimpleLineLight size={20} />
                <p className="font-medium">Edit Profile</p>
            </button>
            ) }
          </div>
          {/* ==================================================================================== */}
          <br /> <hr /> <br />
          {/* ==================================================================================== */}
          < ProfileNav />
          {/* ==================================================================================== */}
          <hr /> <br />
          {/* ==================================================================================== */}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  value={userData.phoneNumber}
                  onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                  maxLength={8}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
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
                  maxLength={8}
                  value={userData.cin}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
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
            </section>
            {edit ? (
                  <div className="flex gap-4 self-end mt-4">
                      <button onClick={onCancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                              <p className="font-medium">Cancel</p>
                      </button>
                      <button onClick={updateUserData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                          <p className="font-medium">Update information</p>
                      </button>
                  </div>
              ) : null}
          </section>
  </div>
  );
}