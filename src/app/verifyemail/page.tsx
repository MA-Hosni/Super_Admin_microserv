"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from '@/app/login/login.module.css';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                axios.post('/api/users/verifyemail', {token})
                setVerified(true);
            } catch (error:any) {
                setError(true);
                console.log(error.response.data);
            }
        }


        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className={style.container}>
        <Image className="absolute top-12 left-12"
        src="/images/favicon-removebg.png" alt="logo" 
        width={100} height={100} />
        <div>
        <h1 className="text-4xl mb-10">Verify Email</h1>
            {/* <h2>{token ? `${token}` : "no token"}</h2> */}

            {verified && (
                <div className="flex flex-col gap-4 items-center">
                    <h2 className="text-blue-500">Email Verified</h2>
                    <Link href={"/login"} className="border p-3 px-6 rounded-md bg-slate-100">
                        Go to Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-red-500">Error</h2>
                </div>
            )}
        </div>

        </div>
    )
}