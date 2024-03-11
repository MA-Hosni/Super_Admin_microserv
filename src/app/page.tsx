import Image from "next/image";
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
            <main>
              <h1>dashboard page</h1>
            </main>
        </div>
    </div>
    
  );
}