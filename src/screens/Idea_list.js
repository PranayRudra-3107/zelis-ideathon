import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const Idea_list = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    // Fetch ideas from local storage when the component mounts
    const storedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
    setIdeas(storedIdeas.map((idea, index) => ({ ...idea, id: index + 1 })));
  }, []);

  // Column definitions
  const columns = [
    { field: 'title', headerName: 'Idea Title', width: 300 },
    { field: 'description', headerName: 'Idea Description', width: 500 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params, GridActionsCellItem) => {
        return (
          <>
            <Button variant="contained" sx={{ bgcolor: 'success.main' }} onClick={() => accept(params.row.id)}>Accept</Button>
            <Button variant="contained" sx={{ bgcolor: 'error.main' }} onClick={() => reject(params.row.id)}>Reject</Button>
            <Button variant="outlined" onClick={() => edit(params.row.id)}>Edit</Button>
            {/* <Button variant="contained" sx={{ bgcolor: 'error.main' }} onClick={() => delete(params.row.id)}>Delete</Button> */}
          </>
        );
      },
    }
    
  ];

  // Action handlers
  const accept = (id) => {
    console.log(`Accept action for row with id: ${id}`);
    // Implement your accept logic here
  };

  const reject = (id) => {
    console.log(`Reject action for row with id: ${id}`);
    // Implement your reject logic here
  };

  const edit = (id) => {
    console.log(`Edit action for row with id: ${id}`);
    // Implement your edit logic here
  };

  // const delete = (id) => {
  //   console.log(`Delete action for row with id: ${id}`);
  //   // Implement your delete logic here
  // };

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
        <DataGrid rows={ideas} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default Idea_list;
