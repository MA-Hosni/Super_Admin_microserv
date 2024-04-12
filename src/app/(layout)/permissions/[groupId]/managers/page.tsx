"use client"

import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { GoArrowBoth } from "react-icons/go";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaRegSquarePlus, FaArrowLeftLong } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LiaUserShieldSolid } from "react-icons/lia";
import axios from "axios";
import { AddUserToGroup } from "@/Components/permissions/addUserGroup";
import toast, { Toaster } from "react-hot-toast";
import { SwipeGroup } from "@/Components/permissions/swipeUser";

export default function Home({ params }:any) {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
          field: 'profilePhoto',
          headerName: 'Profile Photo',
          align: 'center',
          disableColumnMenu: true,
          sortable: false,
          width: 110,
          renderCell: (params) => (
            <div className="w-8 h-8 bg-transparent rounded-lg border-solid border border-gray-200">
              <img  className="object-fill w-full h-full rounded-lg" 
              src={params.row.profilePhoto}
              alt="Profile Picture"
              />
            </div>
          ),
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            width: 840,
            valueGetter: (params) => {
                return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
            },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          disableColumnMenu: true,
          sortable: false,
          align: 'center',
          width: 68,
          renderCell: (params) => (
            <button onClick={() => handleSwipeGroup(params.row.id)} className="border-2 p-2 rounded-full">
               <GoArrowBoth size={20} />
            </button>
          ),
        },
      ];
    const groupId = params.groupId;
    const router = useRouter();
    const pathname = usePathname();
    const [display, setDisplay] = useState(false);
    const [displayed, setDisplayed] = useState(false);
    const [group, setGroup] = useState({
        groupName: "",
    });
    const [rows, setRows] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const activeLinkStyle = "text-pink-500 font-bold border-b-2 border-pink-500 px-1";


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/permission/groupdata?id=${groupId}`);
            setGroup(response.data);
            const users = response.data.users.map((user: any) => ({
                id: user._id, // Assuming _id is unique for each user
                profilePhoto: user.profilePhoto,
                firstName: user.firstName,
                lastName: user.lastName,
            }));
            setRows(users);
        } catch (error) {
            console.error("Error fetching package data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const backToList = () => {
        router.push("/permissions");
    };

    const handleAddUsers = () => {
        setDisplay(true);
      };

    const handleSwipeGroup = (employee:any) => {
        setSelectedEmployee(employee);
        setDisplayed(!displayed);
    };

    const handleSwipeConfirm = async () => {
        try {
            const response = await axios.patch(`/api/permission/swipegroup?id=${selectedEmployee}`);
            toast.success('Admin moved successfully');
            setDisplayed(false);
            fetchData(); // Fetch updated data after deletion
          } catch (error) {
              toast.error('Error moving manager');
              console.error('Error moving manager:', error);
          }
    };
    return (
        <section className="mr-2 border-2 border-slate-200 rounded-lg flex flex-col mb-2">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex w-full h-14 justify-between items-center border-b-2 p-2">
                <button onClick={backToList} className="w-54 flex items-center gap-2 text-pink-500 font-bold mx-4 ">
                    <FaArrowLeftLong size={22} />
                    <span className="text-xl">Back</span>
                </button>
                <h1 className="font-semibold">{group.groupName}</h1>
                <button onClick={handleAddUsers}><FaRegSquarePlus className="text-pink-600"  size={30} /></button>
                {display && (
                    <AddUserToGroup
                    onClose={() => setDisplay(false)}
                    groupID = {groupId}
                    fetch = {fetchData}
                    />
                )}
            </div>

            <div className="flex w-full h-14 justify-center items-center">
                <ul className="flex gap-8">
                    <li className={`${pathname === `/permissions/${groupId}` ? activeLinkStyle : ''}`}>
                        <Link href={`/permissions/${groupId}`} className="flex gap-2">Permission</Link>
                    </li>
                    <li className={`${pathname === `/permissions/${groupId}/managers` ? activeLinkStyle : ''}`}>
                        <Link href={`/permissions/${groupId}/managers`} className="flex gap-2">Managers</Link>
                    </li>
                </ul>
            </div>
            {/* ==================================================================================== */}
            <hr /> <br />
            {/* ==================================================================================== */}
            <section className=" h-full py-14 px-12 flex flex-col gap-20">
                <div id="Description">
                    <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <LiaUserShieldSolid size={25} color="rgb(236 72 153)" />
                        Administrators
                    </h1>
                    <p className="text-gray-400 text-sm ">
                        List of all the Back-office Administrators.
                    </p>
                </div>
                <Box sx={{ height: '400px', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                    />
                </Box>
                { selectedEmployee && displayed && (
                  <SwipeGroup 
                    onClose={() => setDisplayed(false)}
                    employee={selectedEmployee}
                    groupID = {groupId}
                    fetch={fetchData}
                  />
                )}
            </section>

        </section>
    );
}