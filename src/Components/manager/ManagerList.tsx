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
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
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
      width: 230,
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
      width: 120,
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

    fetchData();
  }, []);

  const handleDelete = (manager:any) => {
    setSelectedManager(manager);
    setDisplayed(!displayed);
  };

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <DataGrid
        rows={rows}
        columns={columns}
      />
      {selectedManager && displayed && (
        <DeleteChecker
          manager={selectedManager}
          onClose={() => setDisplayed(false)}
        />
      )}
    </Box>
  );
}