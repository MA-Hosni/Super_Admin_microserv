"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import style from './verifyotp.module.css';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FiLock, FiUnlock } from "react-icons/fi";
import { MuiOtpInput } from 'mui-one-time-password-input'

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleChange = (newValue:any) => {
    setOtp(newValue);
  }

  const handleVerification = async () => {
    try {
      if(otp.length === 6){
        const response = await axios.post("/api/users/loginwithtfa", {otp});
        console.log("Login success", response.data);
        toast.success('Login success');
        router.push("/");
      } else {
        toast.error("Invalid Code");
      }
    } catch (error: any) {
        console.log("login failed", error.message);
        toast.error("Invalid Code");
    }
  }


  return (
    <div className={style.container}>
      <Image className="absolute top-12 left-12"
      src="/images/favicon-removebg.png" alt="logo" 
      width={100} height={100} />
      <div className={style.form_container}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className={style.title_container}>
        <p className={style.title}>OTP</p>
          <p className={style.title}>Verification Code</p>
          <span className={style.subtitle}>We have sent a verification code to your email.</span>
        </div>
        <br />

        <div className={style.input_container}>
          <MuiOtpInput value={otp} onChange={handleChange} length={6} autoFocus />
        </div>
        
        <button onClick={handleVerification} className={style.signin_btn}>
          <span>Verify OTP</span>
        </button>
      </div>
    </div>
  );
}
