import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const Idea_list = () => {
  const [ideas, setIdeas] = useState([]);
  const [refresh, setRefresh] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3001/idea_list')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setIdeas(data.map((idea) => ({ ...idea})));
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, [refresh]);

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
           {/* <IconButton sx={{ color: 'success.main' }} onClick={() => accept(params.row.id)}><CheckIcon /></IconButton>
          <IconButton sx={{ color: 'error.main' }} onClick={() => reject(params.row.id)}><CloseIcon /></IconButton> */}
          <IconButton onClick={() => navigate(`/edit/${params.row.id}`)}><EditIcon /></IconButton>
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
    fetch(`http://localhost:3001/idea_list/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setIdeas(ideas.filter(idea => idea.id !== id));
      setRefresh(!refresh); 
    })
    .catch(error => {
      console.error('Error deleting idea:', error);
    });
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
