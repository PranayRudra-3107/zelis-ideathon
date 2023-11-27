import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useNavigate } from 'react-router-dom';

// manager role - 1 , employee role -2 
const Idea_list = () => {
  const role = 2;
  const [ideas, setIdeas] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [updatedIdeas, setupdatedIdeas] = useState([]);
  //const nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/idea_list')
      .then(response => response.json())
      .then(data => {        
        setIdeas(data.map((idea) => ({ ...idea})));
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, []);

  // Column definitions
  const statuses = ["submitted", "in review", "manager approval", "director approval", "in progress", "deployed"];
 
const columns = [
    { field: 'idea_name', headerName: 'Idea Title', width: 300, editable: (params) => editRows.includes(params.row.id) },
    { field: 'idea_description', headerName: 'Idea Description', width: 500, editable:(params) => editRows.includes(params.row.id) },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 200,
      renderCell: (params) => {
        if (role === 1 && editRows.includes(params.row.id)) {
          return (
            <Select
              value={params.row.status}
              onChange={(event) => handleStatusChange(params.row.id, event.target.value)}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          );
        } else {
          return params.row.status;
        }
      },
      editable: role === 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const isEditing = editRows.includes(params.row.id);
        return (
          <>
            {isEditing ? (
              <>
                <IconButton sx={{ color: 'success.main' }} onClick={() => save(params.row.id)}><CheckIcon /></IconButton>
                <IconButton sx={{ color: 'error.main' }} onClick={() => cancel(params.row.id)}><CloseIcon /></IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => edit(params.row.id)}><EditIcon /></IconButton>
                {role === 2 && <IconButton sx={{ color: 'error.main' }} onClick={() => remove(params.row.id)}><DeleteIcon /></IconButton>}
              </>
            )}
          </>
        );
      },
    }
  ];


  const handleStatusChange = (id, newStatus) => {
    // Find the index of the idea with the given id in the state
    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
  
    if (ideaIndex !== -1) {
      // Create a copy of the ideas array to avoid mutating state directly
      const updatedIdeas = [...ideas];
  
      // Update the status of the idea at the found index
      updatedIdeas[ideaIndex] = {
        ...updatedIdeas[ideaIndex],
        status: newStatus,
      };
  
      // Update the state with the new array of ideas
      setIdeas(updatedIdeas);
    }
  };
  
  

  // Action handlers
  const edit = (id) => {
    setEditRows([...editRows, id]);
  };

  const save = (id) => {
    var updatedIdea;
    if(id === updatedIdeas.id){
       updatedIdea = updatedIdeas;
    }
    console.log(updatedIdea);
    const requestBody = {
      idea_name: updatedIdea.idea_name,
      idea_description: updatedIdea.idea_description,
      status: updatedIdea.status,
    };
    fetch(`http://localhost:3001/idea_list/${updatedIdea.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setEditRows(editRows.filter(rowId => rowId !== updatedIdea.id));
    })
    .catch(error => {
      console.error('Error updating idea:', error);
    });
  };

  const cancel = (id) => {
    setEditRows(editRows.filter(rowId => rowId !== id));
  };

  const remove = (id) => {
    fetch(`http://localhost:3001/idea_list/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIdeas(ideas.filter(idea => idea.id !== id));
      return response.json();
      
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
      <DataGrid 
        rows={ideas} 
        columns={columns} 
        pageSize={5} 
        onRowEditStop={(params, event) => {
          console.log('Row edit stopped:', params, event);

        }}
        processRowUpdate={(params) => {
          console.log('Row updated:', params);
          setupdatedIdeas(params);
        }}
      />
      </div>
    </Box>
  );
};

export default Idea_list;
