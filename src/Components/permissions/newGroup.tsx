import style from "@/Components/permissions/newGroup.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegSquarePlus } from "react-icons/fa6";

export const NewGroup = ({ onClose }:any) => {
    const [groupName, setGroupName] = useState({
        name: "",
    });
    const [isFormFilled, setIsFormFilled] = useState(false);
    

    useEffect(() => {
        setIsFormFilled(groupName.name.trim() !== "");
      }, [groupName]);
    

    const handleCreate = async () => {
        try {
            const response = await axios.post("/api/permission/addgroup", groupName);
            console.log("New group created successfully", response.data);
            toast.success('Group created successfully');
            
        } catch (error:any) {
            toast.error('Error creating group');
            console.log(error);
        }
        onClose();
      };
    return (
    <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div className={style.card}>
            <div className={style.logo}>
            <FaRegSquarePlus size={20} className="text-pink-500" />
            </div>
            <button className={style.dismiss} onClick={onClose}>×</button>
            <div className={style.header}>
                <span className={style.title}>
                Name the permissions group
                </span>
                <p className={style.description}>
                Give a name to this group of employees and customize their permissions.
                </p>

                <label htmlFor="group_name" className=" mt-4 block mb-2 text-sm font-medium text-gray-900">Group name</label>
                <input 
                type="text" 
                id="group_name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                value={groupName.name}
                onChange={(e) => setGroupName({...groupName, name: e.target.value})}
                autoFocus
                />
            
                <div className={style.actions}>
                    <button onClick={handleCreate} className={style.history} disabled={!isFormFilled}>Create</button>
                </div>
            </div>
        </div>
    </div>
  )
}
