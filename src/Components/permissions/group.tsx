"use client"
import { PiCrownLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { UpdateGroupName } from "./Rename";
import Link from "next/link";
import axios from "axios";
import { DeleteGroup } from "./Delete";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "@mui/material";



interface Group {
    _id: string;
    groupName: string;
    users: number,
    isCustom: boolean;
  }

const Group = () => {
  const user = useSelector((state: any) => state.user);
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
  const [displayedDelete, setDisplayedDelete] = useState<string | null>(null);
  const [displayedGroup, setDisplayedGroup] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        fetchData();
      }, []);
      
    
      const fetchData = async () => {
        try {
            const response = await axios.get("/api/permission/listgroup");
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
      };

  
      const toggleDropdown = (groupId: string) => {
        setOpenStates(prevStates => ({
          ...prevStates,
          [groupId]: !prevStates[groupId]
        }));
      };
    
      const handleUpdateName = (groupId: string) => {
        if(user.editPermissionDetails) {
          setDisplayedGroup(groupId);
          toggleDropdown(groupId);
        } else {
          toast.error("You are not authorized")
        }
      };

      const handleDelete = (groupId: string) => {
        if(user.deletePermission) {
          setDisplayedDelete(groupId);
          toggleDropdown(groupId);
        } else {
          toast.error("You are not authorized")
        }
      };

  return (
    <main className="flex flex-wrap gap-2 gap-y-20 justify-center py-20">
            {groups.map(group => (
                <section key={group._id} className="border rounded-lg w-[450px] flex flex-col items-center relative">
                    <div className="border w-20 h-20 rounded-3xl flex justify-center items-center text-pink-400 bg-white absolute top-[-45px]">
                        {group.isCustom ? (<FaRegUser  size={30} />) : (<PiCrownLight size={30} />)}
                    </div>
                    {group.isCustom && <p className="absolute left-3 top-3 py-1 px-3 rounded-md bg-pink-300 text-white font-medium">custom</p>}
                    {group.isCustom && (
                        <>
                        <button onClick={() => toggleDropdown(group._id)} className="absolute right-3 top-3 rounded-full border-2 p-1 hover:bg-slate-100 hover:border-slate-400 hover:border-2"><BsThreeDotsVertical size={20} /></button>
                        {openStates[group._id] && (
                            <ul className="absolute right-3 top-12 bg-white border rounded-md py-2">
                                <li className="hover:bg-slate-100"><button onClick={() => handleUpdateName(group._id)} className="px-14 py-1 font-medium mb-1">Rename</button></li>
                                <li className="hover:bg-slate-100"><button onClick={() => handleDelete(group._id)} className="px-14 py-1 font-medium">Delete</button></li>
                            </ul>
                        )}
                        {displayedGroup === group._id && (
                            <UpdateGroupName
                                group={group}
                                onClose={() => setDisplayedGroup(null)}
                                fetch={fetchData}
                            />
                        )}
                        {displayedDelete === group._id && (
                            <DeleteGroup
                                group={group}
                                onClose={() => setDisplayedDelete(null)}
                                fetch={fetchData}
                            />
                        )}
                        </>
                    )}
                    <div className="flex flex-col items-center gap-4 mt-20">
                        <h1 className="font-semibold text-xl">{group.groupName}</h1>
                        <p className="text-slate-300 text-sm">{group.users} user assigned</p>
                        { user.viewPermissionDetails ? (
                          <Link href={`/permissions/${group._id}`} className="mt-7 m-4 rounded-lg bg-pink-500 text-white font-semibold text-sm py-2 px-5">See Group</Link>
                        ) : (
                          <button className="mt-7 m-4 border-2 border-pink-500 rounded-lg cursor-not-allowed bg-white text-pink-500 font-semibold text-sm py-2 px-5" disabled>Not authorized</button>
                        )}
                    </div>
                </section>
            ))}
    </main>

  )
}

export default Group