import Sidebar from "@/Components/sidebar/sidebarrr"
import Navbar from "@/Components/NavBar";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="container">
        <div className="menu">
            <Sidebar />    
        </div>    
        <div className="content">
            <Navbar />
            <main>
              {children}
            </main>
        </div>
    </div>
    )
}