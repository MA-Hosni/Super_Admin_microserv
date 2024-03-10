"use client";

import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PiTrashSimpleBold, PiEyeBold } from "react-icons/pi";
import axios from 'axios';
import Link from 'next/link';

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
        <PiTrashSimpleBold size={20} style={{ cursor: 'pointer', color: 'red' }} />
      </>
    ),
  },
  
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];
export default function ManagerList() {
  const [rows, setRows] = useState([]);

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
  
  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}