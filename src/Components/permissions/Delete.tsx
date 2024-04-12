import style from "@/Components/permissions/newGroup.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DeleteGroup = ({ group, onClose, fetch }:any) => {
    const { groupName, _id } = group;
    const [Name, setName] = useState({
        name: "",
    });
    const [error, setError] = useState("");
  
    const handleConfirm = async () => {
      if (Name.name === groupName) {
        onDeleteConfirm(); // Call the callback to handle deletion
      } else {
        setError("Group name does not match!");
      }
    };  

    const onDeleteConfirm = async () => {
        try {
            const response = await axios.patch("/api/permission/groupdelete", group);
            toast.success('Group deleted successfully');
            fetch();
        } catch (error:any) {
            toast.error('Error deleting group');
            console.log(error);
        }
        onClose();
      };
    return (
    <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
        <div className="bg-white">
            <button className={style.dismiss} onClick={onClose}>×</button>
            <div className={style.header}>
                <span className="font-bold text-lg">
                    Delete Group {groupName}
                </span>
                <p
                    className="text-sm my-2"
                //  className={style.description}
                 >
                    This action cannot be undone. This will permanently delete {groupName}. <br /> Please type <b>{groupName}</b> to confirm.
                </p>
                <input 
                type="text" 
                id="group_name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                value={Name.name}
                onChange={(e) => setName({...Name, name: e.target.value})}
                autoFocus
                />
                {error && <p className="text-xs" style={{ color: 'red' }}>{error}</p>}
                <div className="flex flex-col items-end mt-3">
                    <button onClick={handleConfirm} className="text-white shadow-md bg-pink-500 py-1 px-2 rounded-md font-semibold cursor-pointer text-sm">Confirm Deletion</button>
                </div>
            </div>
        </div>
    </div>
  )
}