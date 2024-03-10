"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineFingerPrint } from "react-icons/hi";
import { LiaUserLockSolid, LiaUserShieldSolid } from "react-icons/lia";
import ProfileNav from '@/Components/profile/profileNav';
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";


export default function Home() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/profiledata');
        setUserData({...res.data.user, dateofBirth: new Date(res.data.user.dateofBirth)});
      } catch (error: any) {
        console.log(error.message);
      }
    }
    
    getUserDetails();
  }, []);


  const handleOldPasswordChange = (event:any) => {
    const value = event.target.value;
    setOldPassword(value);
    setShowButton(
      value.length >= 8 && newPassword.length >= 8 && confirmNewPassword.length >= 8
    );
  };

  const handleNewPasswordChange = (event:any) => {
    const value = event.target.value;
    setNewPassword(value);
    setShowButton(
      oldPassword.length >= 8 && value.length >= 8 && confirmNewPassword.length >= 8
    );
  };

  const handleConfirmNewPasswordChange = (event:any) => {
    const value = event.target.value;
    setConfirmNewPassword(value);
    setShowButton(
      oldPassword.length >= 8 && newPassword.length >= 8 && value.length >= 8
    );
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
    // Clear inputs after saving if needed
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowButton(false);
  };

  return (
    <div className="border-2 border-slate-200 p-4 rounded-lg mb-2">
      <div className=" w-full flex items-center justify-between p-2">
      <div className="flex gap-5">
        <div className="w-44 h-44 rounded-lg overflow-hidden">
          <Image
            className="object-fill w-full h-full"
            width={20}
            height={20}
            src="/images/marguerite.jpg"
            alt="Profile Picture"
          />
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl pb-8 pt-2">{userData.firstName} {userData.lastName}</h1>
            <p className="flex items-end gap-2 font-medium"><LiaUserShieldSolid size={25} /> Admin</p>
            <p className="flex items-end gap-2 font-medium"><CiMail size={25} />{userData.email}</p>
        </div>
      </div>
      </div>
      {/* ==================================================================================== */}
      <br /> <hr /> <br />
      {/* ==================================================================================== */}
      < ProfileNav />
      {/* ==================================================================================== */}
      <hr /> <br />
      {/* ==================================================================================== */}
      <section className=" h-full flex flex-col py-24 gap-20">
        <div id="change_password" className="flex justify-center gap-x-56">
          <div id="Description">
            <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
              <HiOutlineFingerPrint size={25} color="rgb(236 72 153)" />
              Change password
            </h1>
            <p className="text-gray-400 text-xs ">
              We recommend changing your password <br />
              frenquently to keep your account secure.
            </p>
          </div>
          <div id="inputs" className="bg-pink-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Old Password
              </label>
              <input
                type="text"
                id="password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                New Password
              </label>
              <input
                type="text"
                id="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm new Password
              </label>
              <input
                type="text"
                id="password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>
            {showButton && (
              <button onClick={handleSave}
              className="text-pink-700 hover:text-white border border-pink-400 hover:bg-pink-400 focus:bg-pink-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
              Save Changes 
              </button>
            )}
            
          </div>
        </div>
        <div id="two_factor" className="flex justify-evenly">
          <div id="Description">
            <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
              <LiaUserLockSolid size={25} color="rgb(236 72 153)" />
              Two-factor authentication
            </h1>
            <p className="text-gray-400 text-xs ">
              Two-factor authentication (TFA) adds a <br />
              second layer of security to your account.
            </p>
          </div>
          <div id="inputs" className="bg-pink-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
            <h1 className="font-semibold text-xs ">TFA Configuration</h1>
            <p className="text-xs mb-10">
              After setting up next time you login it will require a code to
              validate your identity for extra security.
            </p>
            <button
              type="button"
              className="text-pink-700 hover:text-white border border-pink-400 hover:bg-pink-400 focus:bg-pink-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
              Enable two-factor authentication
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}