import style from "@/Components/permissions/newGroup.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegSquarePlus } from "react-icons/fa6";

export const UpdateGroupName = ({ group, onClose, fetch }:any) => {
    const { groupName, _id } = group;
    const [Name, setName] = useState({
        id: _id,
        name: `${groupName}`,
    });
    const [isFormFilled, setIsFormFilled] = useState(false);
    

    useEffect(() => {
        setIsFormFilled(Name.name.trim() !== "");
      }, [Name]);
    

    const handleRename = async () => {
        try {
            const response = await axios.patch("/api/permission/rename", Name);
            toast.success('Group renamed successfully');
        } catch (error:any) {
            toast.error('Error renamed group');
            console.log(error);
        }
        fetch();
        onClose();
      };
    return (
    <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div className={style.card}>
            <button className={style.dismiss} onClick={onClose}>×</button>
            <div className={style.header}>
                <label htmlFor="group_name" className=" mt-4 block mb-2 text-sm font-medium text-gray-900">Group name</label>
                <input 
                type="text" 
                id="group_name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                value={Name.name}
                onChange={(e) => setName({...Name, name: e.target.value})}
                autoFocus
                />
                <div className={style.actions}>
                    <button onClick={handleRename} className={style.history} disabled={!isFormFilled}>Update</button>
                </div>
            </div>
        </div>
    </div>
  )
}