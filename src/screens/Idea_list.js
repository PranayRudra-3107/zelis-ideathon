import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Idea_list = () => {
  // Sample data
  const rows = [
    { id: 1, title: 'Idea 1', description: 'Description 1', status: 'Status 1' },
    { id: 2, title: 'Idea 2', description: 'Description 2', status: 'Status 2' },
    { id: 3, title: 'Idea 3', description: 'Description 3', status: 'Status 3' },
    { id: 4, title: 'Idea 4', description: 'Description 4', status: 'Status 4' },
    { id: 5, title: 'Idea 5', description: 'Description 5', status: 'Status 5' },
  ];
  

  // Column definitions
  const columns = [
    { field: 'title', headerName: 'Idea Title', width: 300 },
    { field: 'description', headerName: 'Idea Description', width: 500 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Ideas List</h1>
      <div style={{ height: 400, width: '90%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default Idea_list;
