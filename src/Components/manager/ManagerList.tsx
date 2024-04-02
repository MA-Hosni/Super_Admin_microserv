"use client";

import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PiTrashSimpleBold, PiEyeBold } from "react-icons/pi";
import axios from 'axios';
import Link from 'next/link';
import DeleteChecker from '@/Components/manager/deleteChecker';
import toast, { Toaster } from 'react-hot-toast';



export default function ManagerList() {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'profilePhoto',
      headerName: 'Profile Photo',
      align: 'center',
      sortable: false,
      width: 100,
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
      field: 'firstName',
      headerName: 'First Name',
      width: 130,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 130,
    },
    {
      field: 'matricule',
      headerName: 'Manager ID',
      width: 120,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      align: 'center',
      width: 75,
      renderCell: (params) => (
        <>
          <Link href={`/managers/list/${params.row._id}`}><PiEyeBold size={20} style={{ cursor: 'pointer', marginRight: 8 }} /></Link>
          <button onClick={() => handleDelete(params.row)}>
            <PiTrashSimpleBold size={20} style={{ cursor: 'pointer', color: 'red' }} />
          </button>
        </>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [displayed, setDisplayed] = useState(false)
  const [selectedManager, setSelectedManager] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  }); // Details for DeleteChecker

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/managers/listmanagers");
      const dataWithId = response.data.map((row:any) => ({
        ...row,
        id: row._id
      }));
      setRows(dataWithId);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleDelete = (manager:any) => {
    setSelectedManager(manager);
    setDisplayed(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.patch(`/api/managers/managerdelete?id=${selectedManager._id}`);
      toast.success('Manager deleted successfully');
      setDisplayed(false);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      toast.error('Error deleting manager');
      console.error('Error deleting manager:', error);
    }
  };

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <DataGrid
        rows={rows}
        columns={columns}
      />
      {selectedManager && displayed && (
        <DeleteChecker
          manager={selectedManager}
          onClose={() => setDisplayed(false)}
          onDeleteConfirm={handleDeleteConfirm} // Pass callback to handle deletion
        />
      )}
    </Box>
  );
}