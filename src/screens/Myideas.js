import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem , GridRowModes } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ReactSession }  from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import configData from "./config.json";

// manager role - 1 , employee role -2 
const My_Ideas = () => {
  const role = 2;
  const [ideas, setIdeas] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  
  ReactSession.setStoreType("localStorage");
  const empid = ReactSession.get("id");
  useEffect(() => {
    fetch(`${configData.SERVER_URL}/myidea_list/${empid}`)
      .then(response => response.json())
      .then(data => {        
        setIdeas(data.map((idea) => ({ ...idea})));
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, [empid]);

  const COLORS = ['#C6E2FF', 'gold', '#DAF7A6', '#F89E38', '#60F283', '#FF7373'];
  
const columns = [
    { field: 'idea_name', headerName: 'Idea Title',headerClassName: 'custom-header', flex :0.2 , editable: (params) => editRows.includes(params.row.id) },
    { field: 'idea_description', headerName: 'Idea Description',headerClassName: 'custom-header', flex :0.5, editable:(params) => editRows.includes(params.row.id) },
    { 
      field: 'status_name', 
      headerName: 'Status', 
      headerClassName: 'custom-header',
      flex :0.1,      
      renderCell: (params) => {
        return(
        <Chip
        key={params.row.status_id} 
        label={params.row.status_name} 
        style={{ backgroundColor: COLORS[(params.row.status_id)-1] }} 
        />)},
      editable: role === 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex :0.1,
      headerClassName: 'custom-header',
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

  const processRowUpdate = (params) =>{
    debugger;    
    if(params){
    const requestBody = {
      idea_name: params.idea_name,
      idea_description: params.idea_description,
      status: params.status_id,
    };
    fetch(`${configData.SERVER_URL}/idea_list/${params.id}`, {
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
      setEditRows(editRows.filter(rowId => rowId !== params.id));
    })
    .catch(error => {
      console.error('Error updating idea:', error);
    });
    }
  };

  // Action handlers
  const edit = (id) => {
    setRowModesModel((prevRowModesModel) => ({
      ...prevRowModesModel,
      [id]: { mode: GridRowModes.Edit },
    }));
    setEditRows([...editRows, id]);
  };

  const save = (id) => {    
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View},
    });        
  };

  const cancel = (id) => {
    setEditRows(editRows.filter(rowId => rowId !== id));
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const remove = (id) => {
    fetch(`${configData.SERVER_URL}/idea_list/${id}`, {
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
      <div style={{ height: '75%', width: '90%' }}>
      <DataGrid 
        rows={ideas} 
        columns={columns} 
        pageSize={5} 
        sx={{
          '& .custom-header': {
            backgroundColor: '#063970',
            color: 'white',
            fontWeight: 'bold'
          },          
        }}
        
        processRowUpdate={processRowUpdate}
        rowModesModel={rowModesModel}
      />
      </div>
    </Box>
  );
};

export default My_Ideas;
