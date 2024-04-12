import style from "@/Components/permissions/newGroup.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUserSwitch } from "react-icons/ai";

interface Group {
    _id: string;
    groupName: string;
}

export const SwipeGroup = ({employee, groupID, onClose, fetch }: any) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupID, setSelectedGroupID] = useState({
        _id: "",
        groupName: "",
    });
    const [data, setData] = useState({
        currentGroupId: groupID,
        userId: employee,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/permission/listgroup");
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMove = async () => {
        const selectedGroup = await groups.find((group) => group._id === selectedGroupID._id);
        console.log(selectedGroup?._id);
        try {
            const response = await axios.patch(`/api/permission/swipegroup?id=${selectedGroup?._id}`, data);
            toast.success('Employee moved successfully');
          } catch (error) {
              toast.error('Error moving employee')
              console.error('Error moving employee:', error);
          }finally{
            onClose();
            fetch(); // Fetch updated data after deletion
          }
    };

    return (
        <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
            <div className={style.card}>
                <div className={style.logo}>
                    <AiOutlineUserSwitch size={20} className="text-pink-500" />
                </div>
                <button className={style.dismiss} onClick={onClose}>×</button>
                <div className={style.header}>
                    <span className={style.title}>Move to another group</span>
                    <p className={style.description}>Specify here the group you want to assign.</p>
                    <br />
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Group name</label>
                    <select 
                    id="countries" 
                    value={selectedGroupID._id}
                    onChange={(e) => setSelectedGroupID({...selectedGroupID, _id: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option value="" disabled>Choose a Group</option>
                        {groups.map((group) => (
                            <option key={group._id} value={group._id} disabled={groupID === group._id}>{group.groupName}</option>
                        ))}
                    </select>
                    <div className={style.actions}>
                        <button onClick={handleMove} className={style.history}>Move</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
