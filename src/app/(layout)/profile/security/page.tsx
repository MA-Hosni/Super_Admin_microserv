"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineFingerPrint } from "react-icons/hi";
import { LiaUserLockSolid, LiaUserShieldSolid } from "react-icons/lia";
import ProfileNav from '@/Components/profile/profileNav';
import { CiMail } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';
import { validateChangePassword } from '@/helpers/profile/changePasswordValidator';
import { FiLock, FiUnlock } from "react-icons/fi";


export default function Home() {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [pwdVisible , setPwdVisible] = useState(false);
  const [password, setPassword] = useState({
    oldPassword:'',
    newPassword:'',
    confirmNewPassword:'',
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    permissionGroup: {
      groupName: "",
    },
    twoFactor: false,
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

  useEffect(() => {
    setIsFormFilled(
      password.oldPassword !== '' &&
      password.newPassword !== '' &&
      password.confirmNewPassword !== ''
    );
  }, [password]);

  const handleSave = async () => {
    try {
      const validationResult = validateChangePassword(password.oldPassword,password.newPassword,password.confirmNewPassword);
      if (validationResult === true) {
        const res = await axios.post('/api/users/profilepasswordupdate', password);
        setPassword({
          oldPassword:'',
          newPassword:'',
          confirmNewPassword:'',
        })
        toast.success("Password updated successfully");
      }
    } catch (error:any) {
      toast.error("Old Password not Valid");
      console.log(error.message);
    }

  };

  const handleTFA = async (action: string) => {
    try {
      const response = await axios.post('/api/users/twofactorauth', { action });
      setUserData(response.data.user);
      if(response.data.success) {
        const message = action === 'Enable' ? "enabled" : "disabled";
        toast.success(`Two-factor authentication ${message} successfully`);
      }
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} Two-factor authentication`);
      console.error('Error with Two-factor Authentication:', error);
    }
};

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
            <div className="mb-3 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Old Password
              </label>
              <input
                type={pwdVisible ? "text" : "password"}
                id="password"
                value={password.oldPassword}
                onChange={(e) => setPassword({...password, oldPassword: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
              />
              <div className="absolute top-10 right-2 cursor-pointer" onClick={() => setPwdVisible(!pwdVisible)} >
                { pwdVisible ? <FiUnlock /> : <FiLock /> }
              </div>
            </div>
            <div className="mb-3 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                New Password
              </label>
              <input
                type={pwdVisible ? "text" : "password"}
                id="password"
                value={password.newPassword}
                onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
              />
              <div className="absolute top-10 right-2 cursor-pointer" onClick={() => setPwdVisible(!pwdVisible)} >
                { pwdVisible ? <FiUnlock /> : <FiLock /> }
              </div>
            </div>
            <div className="mb-3 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm new Password
              </label>
              <input
                type={pwdVisible ? "text" : "password"}
                id="password"
                value={password.confirmNewPassword}
                onChange={(e) => setPassword({...password, confirmNewPassword: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
              />
              <div className="absolute top-10 right-2 cursor-pointer" onClick={() => setPwdVisible(!pwdVisible)} >
                { pwdVisible ? <FiUnlock /> : <FiLock /> }
              </div>
            </div>
            {isFormFilled && (
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
            { userData.twoFactor ? (
              <button
                onClick={() => handleTFA('Disable')}
                type="button"
                className="text-pink-700 hover:text-white border border-pink-400 hover:bg-pink-400 focus:bg-pink-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                Disable two-factor authentication
              </button>
            ) : (
              <button
                onClick={() => handleTFA('Enable')}
                type="button"
                className="text-pink-700 hover:text-white border border-pink-400 hover:bg-pink-400 focus:bg-pink-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                Enable two-factor authentication
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}