import style from "@/Components/permissions/newGroup.module.css"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";



export const AddUserToGroup = ({groupID, onClose, fetch }:any) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
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
            width: 160,
            valueGetter: (params) => {
                return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
            },
        },
      ];

    
    const [rows, setRows] = useState([]);
    const [arrIds, setArrIds] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/permission/listtoadd?id=${groupID}`);
            const dataWithId = response.data.map((row:any) => ({
                ...row,
                id: row._id
              }));
              setRows(dataWithId);
        } catch (error) {
            console.error("Error fetching package data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleSave = async () => {
        console.log(arrIds);
        try {
            const response = await axios.post(`/api/permission/listtoadd?id=${groupID}`, arrIds);
            toast.success("Employees added successfully")
            fetch();
            onClose();
        } catch (error) {
            console.error("Error adding employees to the group:", error);
            toast.error('Error adding employees to the group')
        }
    };


    return (
    <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-20">
<div className={style.card}>
            <div className={style.logo}>
            <FaUserPlus size={20} className="text-pink-500" />
            </div>
            <button className={style.dismiss} onClick={onClose}>×</button>
            <div className={style.header}>
                <span className={style.title}>Add employees</span>
                <p className={style.description}>Select the employees you want to assign to this group.</p>
                <br />
                <Box sx={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    getRowId={(row) => row._id}
                    onRowSelectionModelChange={(ids:any) => {
                        setArrIds(ids);
                    }}
                />
                </Box>
                <div className={style.actions}>
                    <button onClick={handleSave} className={style.history} disabled={arrIds.length === 0}>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}
