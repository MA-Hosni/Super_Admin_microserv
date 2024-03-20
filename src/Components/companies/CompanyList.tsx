"use client";

import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PiTrashSimpleBold, PiEyeBold } from "react-icons/pi";
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import PopUpDelete from '@/Components/companies/popUpDelete';



export default function CompaniesList() {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 120 },
    {
      field: 'logo',
      headerName: 'Company Logo',
      align: 'center',
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <div className="w-24 h-8 bg-transparent rounded-lg border-solid border border-gray-200">
          <img  className="object-fill w-full h-full rounded-lg" 
          src={params.row.logo}
          alt="Profile Picture"
          />
        </div>
      ),
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 130,
    },
    {
      field: 'industry',
      headerName: 'Industry',
      type: 'singleSelect',
      width: 120,
    },
    {
      field: 'employees',
      headerName: 'Total Employees',
      width: 130,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 130,
    },
    {
      field: 'companyAddress',
      headerName: 'Address',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <Link href={`/companies/list/${params.row._id}`}><PiEyeBold size={20} style={{ cursor: 'pointer', marginRight: 8 }} /></Link>
          <button onClick={() => handleDelete(params.row)}>
            <PiTrashSimpleBold size={20} style={{ cursor: 'pointer', color: 'red' }} />
          </button>
        </>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [displayed, setDisplayed] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState({
    _id: "",
    companyName: "",
    email: "",
  }); // Details for DeleteChecker

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/companies/listcompanies");
        const dataWithId = response.data.map((row:any) => ({
          ...row,
          id: row._id
        }));
        setRows(dataWithId);
      } catch (error) {
        toast.error("Error fetching companies")
        console.error('Error fetching companies:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (company:any) => {
    setSelectedCompany(company);
    setDisplayed(!displayed);
  };

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <DataGrid
        rows={rows}
        columns={columns}
      />
      {selectedCompany && displayed && (
        <PopUpDelete
          company={selectedCompany}
          onClose={() => setDisplayed(false)}
        />
      )}
    </Box>
  );
}