"use client";

import { FaUser, FaFileShield } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

// Define a constant for the active link styles
const activeLinkStyle = "text-pink-500 font-bold border-b-4 border-pink-500 rounded-sm pr-2";

const ProfileNav = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4">
      <li className={`pr-2 ${pathname === '/profile/personal' ? activeLinkStyle : ''}`}>
      <Link href={'personal'} className="flex gap-2"><FaUser size={20} />Personal Information</Link>
      </li>
      <li className={`${pathname === '/profile/security' ? activeLinkStyle : ''}`}>
      <Link href={'security'} className="flex gap-2"><FaFileShield size={20} />Security</Link>
      </li>
    </ul>
  );
};

export default ProfileNav;