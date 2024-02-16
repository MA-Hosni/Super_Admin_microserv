import Image from "next/image";
import React from "react";
import Sidebar from "@/Components/sidebar/sidebarrr"
import Navbar from "@/Components/NavBar";

export default function Home() {
  return (
    <div className="container">
        <div className="menu">
            <Sidebar />    
        </div>    
        <div className="content">
            <Navbar />
            <main className="bg-pink-500">
              <h1>login page</h1>
            </main>
        </div>
    </div>
    
  );
}