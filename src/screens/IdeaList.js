import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@material-ui/core/Select';
import { ReactSession }  from 'react-client-session';
import { useNavigate } from 'react-router-dom';

// manager role - 1 , employee role -2 
const Idea_list = () => {
  ReactSession.setStoreType("localStorage");
  const role = ReactSession.get("role");
  debugger;
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
    { field: 'idea_name', headerName: 'Idea Title', width: 300},
    { field: 'idea_description', headerName: 'Idea Description', width: 500},
    { 
      field: 'status_name', 
      headerName: 'Status', 
      width: 200,
      renderCell: (params) => {
        if (role === 1 && editRows.includes(params.row.id)) {
          return (           
            <NativeSelect
                value={params.row.status} // set the current status as the default value
                onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
              >
                {statuses.map((status, index) => (
              <option key={index + 1} value={index + 1}>
                {`${index + 1}. ${status}`}
              </option>
            ))}
              </NativeSelect>       
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
              </>
            )}
          </>
        );
      },
    }
  ];


  const handleStatusChange = (id, newStatus) => {
    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    
    const updatedIdeasCopy = [...ideas];
    updatedIdeasCopy[ideaIndex] = {
      ...updatedIdeasCopy[ideaIndex],
      status_id: newStatus,
    };
    setIdeas(updatedIdeasCopy);
   
  };
  
  

  // Action handlers
  const edit = (id) => {
    setEditRows([...editRows, id]);
  };

  const save = (id) => {
    debugger;
    const updatedIdea = ideas.find((idea) => idea.id === id);

    const requestBody = {
      idea_name: updatedIdea.idea_name,
      idea_description: updatedIdea.idea_description,
      status: parseInt(updatedIdea.status_id, 10),
    };

    fetch(`http://localhost:3001/idea_list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEditRows(editRows.filter((rowId) => rowId !== id));
      })
      .catch((error) => {
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
        // onRowEditStop={(params, event) => {
        //   console.log('Row edit stopped:', params, event);

        // }}
        // processRowUpdate={(params) => {
        //   console.log('Row updated:', params);
        //   setupdatedIdeas(params);
        // }}
      />
      </div>
    </Box>
  );
};

export default Idea_list;