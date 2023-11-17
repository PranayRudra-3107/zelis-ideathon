import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Idea_list = () => {
  const [ideas, setIdeas] = useState([]);

  // useEffect(() => {
  //   // Fetch ideas from local storage when the component mounts
  //   const storedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  //   setIdeas(storedIdeas.map((idea, index) => ({ ...idea, id: index + 1 })));
  // }, []);
  useEffect(() => {
    // Fetch ideas from the server when the component mounts
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setIdeas(data.map((idea, index) => ({ ...idea, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, [setIdeas]);

  // Column definitions
  const columns = [
    { field: 'idea_name', headerName: 'Idea Title', width: 300 },
    { field: 'idea_description', headerName: 'Idea Description', width: 500 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params, GridActionsCellItem) => {
        return (
          <>
           <IconButton sx={{ color: 'success.main' }} onClick={() => accept(params.row.id)}><CheckIcon /></IconButton>
          <IconButton sx={{ color: 'error.main' }} onClick={() => reject(params.row.id)}><CloseIcon /></IconButton>
          <IconButton onClick={() => edit(params.row.id)}><EditIcon /></IconButton>
          <IconButton sx={{ color: 'error.main' }} onClick={() => remove(params.row.id)}><DeleteIcon /></IconButton>

          </>
        );
      },
    }
    
  ];

  // Action handlers
  const accept = (id) => {
    console.log(`Accept action for row with id: ${id}`);
    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    console.log(ideas); // Debugging line
    let index = ideas.findIndex(idea => idea.id === id);
    if(index !== -1) {
      ideas[index].status = 'Accepted';
      localStorage.setItem('ideas', JSON.stringify(ideas));
      setIdeas(JSON.parse(localStorage.getItem('ideas')) || []);
    }
  };
  
  const reject = (id) => {
    console.log(`Reject action for row with id: ${id}`);
    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    let index = ideas.findIndex(idea => idea.id === id);
    if(index !== -1) {
      ideas[index].status = 'Rejected';
      localStorage.setItem('ideas', JSON.stringify(ideas));
      setIdeas(JSON.parse(localStorage.getItem('ideas')) || []);
    }
  };

  const edit = (id) => {
    console.log(`Edit action for row with id: ${id}`);
    // Implement your edit logic here
  };

  const remove = (id) => {
    localStorage.clear();
    console.log(`Delete action for row with id: ${id}`);
    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    let index = ideas.findIndex(idea => idea.id === id);
    if(index !== -1) {
      ideas.splice(index, 1);
      localStorage.setItem('ideas', JSON.stringify(ideas));
      setIdeas(JSON.parse(localStorage.getItem('ideas')) || []); // This will cause the component to re-render
    }
  };
  

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
