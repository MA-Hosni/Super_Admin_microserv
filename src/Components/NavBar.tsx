"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { PiBell , PiCaretDownBold } from "react-icons/pi";
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
})

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/profiledata');
        setUserData(res.data.user);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getUserDetails();
  }, []);


  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
    }
  }

  return (
    <nav className='sticky top-0 w-full px-16 flex flex-row-reverse items-center h-16'>
        <button onClick={() => setIsDropdownOpen((prev) => !prev)} className="flex items-center ml-4 p-2 bg-white rounded-lg border-solid border-2 border-gray-200">
          <div className="w-8 h-8 bg-black rounded-lg border-solid border border-gray-200">
          <Image className="object-fill w-full h-full rounded-lg"
          width={32}
          height={32} 
          src="/images/marguerite.jpg"
          alt="Profile Picture"
          />
          </div>
          <div className="ml-4">
            <p className="text-base font-semibold">{userData.firstName} {userData.lastName}</p>
          </div>
          <div className="ml-4 ">
          <PiCaretDownBold />
          </div>
          {isDropdownOpen && (
          <div className="absolute top-full right-12 bg-white shadow-md rounded-lg mt-1">
            {/* Dropdown content goes here */}
            <ul className="pt-2 w-48">
              <li className='p-1'><Link href="/profile/personal" className="rounded border-b block px-4 py-2 text-gray-800 hover:bg-blue-100">My Profile</Link></li>
              <li className='p-1'><Link href="/profile/security" className="rounded border-b block px-4 py-2 text-gray-800 hover:bg-blue-100">Security</Link></li>
              <li className='p-1'><button onClick={logout} className="rounded block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full">Sign out</button></li>
            </ul>
          </div>
        )}
        </button>
        <Link href={"/"} className='grid place-items-center bg-blue-100 rounded-md h-10 w-10'>
            <button>
                <PiBell size={23} />
            </button>
        </Link>
    </nav>
  )
}

export default Navbar