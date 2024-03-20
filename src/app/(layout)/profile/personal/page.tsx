"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileNav from '@/Components/profile/profileNav';
import { LiaUserShieldSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";

export default function Home() {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    matricule: "",
    phoneNumber: "",
    cin: "",
    dateofBirth: new Date(),
    address: "",
    profilePhoto: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
  })

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/profiledata');
        console.log(res.data.user);
        setUserData({...res.data.user, dateofBirth: new Date(res.data.user.dateofBirth)});
      } catch (error: any) {
        console.log(error.message);
      }
    }
    
    getUserDetails();
  }, []);

  const editManagerData = () => {
    setEdit(!edit)
  }


  return (
  <div className="mr-2 border-2 border-slate-200 p-4 rounded-lg mb-2">
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
                <p className="flex items-end gap-2 font-medium"><LiaUserShieldSolid size={25} /> Admin</p>
                <p className="flex items-end gap-2 font-medium"><CiMail size={25} />{userData.email}</p>
            </div>
          </div>
          { edit ? null : (            
            <button onClick={editManagerData} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...(edit ? {} : { disabled: true })}
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
                  value={userData.dateofBirth.toISOString().split('T')[0]}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...(edit ? {} : { disabled: true })}
                />
              </div>
            </section>
            {edit ? (
                  <div className="flex gap-4 self-end mt-4">
                      <button onClick={editManagerData} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                              <p className="font-medium">Cancel</p>
                      </button>
                      <button className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                          <p className="font-medium">Update information</p>
                      </button>
                  </div>
              ) : null}
          </section>
  </div>
  );
}