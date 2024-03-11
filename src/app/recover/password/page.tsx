"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import style from './password.module.css';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { validateForgotPassword } from "@/helpers/forgotPasswordValidator";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState({ email: "" });
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPassword = async () => {
    try {
      const validationResult = validateForgotPassword(user.email);
      if (validationResult === true) {
        setLoading(true);
        const response = await axios.post("/api/users/forgotpasswordemail", user);
        console.log("Forgot password - Email sent", response.data);
        toast.success("Forgot password - Email sent");
        setForgotPasswordStatus(true);
        setUser({ email: "" });
      }
    } catch (error: any) {
      console.log("Forgot password - Email failed", error.message);
      toast.error(error.message);
      toast.error("mochkla fil front recover/password")
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Image className="absolute top-12 left-12"
      src="/images/favicon-removebg.png" alt="logo" 
      width={100} height={100} />
      <div className={style.form_container}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className={style.title_container}>
          <p className={style.title}>{loading ? "Processing" : "Forgot Password"}</p>
          <span className={style.subtitle}>Enter the email associated with your account and we will send you the link to reset your password</span>
        </div>
        <br />
        <div className={style.input_container}>
        <label className={style.input_label} htmlFor="email_field">Enter email address</label>
          <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className={style.icon}>
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
            <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
          </svg>
          <input 
          id="email_field"
          name="email"
          type="email"
          placeholder="name@email.com"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          className={style.input_field}
          />
        </div>
        
        <button onClick={forgotPassword} className={style.signin_btn}>
          <span>Send reset link</span>
        </button>

        <Link href={'/login'} className="flex items-center gap-1 mt-5 font-bold hover:underline" ><IoIosArrowBack size={20}/>Back To Login</Link>
      </div>
    </div>
  );
}