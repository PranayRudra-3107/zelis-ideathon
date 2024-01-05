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
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
// manager role - 1 , employee role -2 
const Idea_list = () => {
  ReactSession.setStoreType("localStorage");
  const role = ReactSession.get("role");
  const [ideas, setIdeas] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [updatedIdeas, setupdatedIdeas] = useState([]);
  //const nav = useNavigate();

  useEffect(() => {
    fetch(`${global.base}/idea_list`)
      .then(response => response.json())
      .then(data => {        
        setIdeas(data.map((idea) => ({ ...idea})));
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, []);


  const statuses = ["submitted", "in review", "manager approval", "in progress", "deployed", "rejected"];
  const COLORS = ['#C6E2FF', 'gold', '#DAF7A6', '#F89E38', '#60F283', '#FF7373'];


const columns = [
    { field: 'idea_name', headerName: 'Idea Title', flex: 0.2, headerClassName: 'custom-header'},
    { field: 'idea_description', headerName: 'Idea Description',  flex: 0.5, headerClassName: 'custom-header'},
    { 
      field: 'status_name', 
      headerName: 'Status', 
      flex: 0.2,
      headerClassName: 'custom-header',
      renderCell: (params) => {
        if (role === 1 && editRows.includes(params.row.id)) {
          const sortedStatuses = [
            params.row.status_name, 
            ...statuses.filter(status => status !== params.row.status_name)
          ];
      
          return (
            <NativeSelect
              value={params.row.status_name} 
              onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
            >
              {sortedStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {`${status}`}
                </option>
              ))} 
            </NativeSelect>       
          );
        } else {
          return (
            <Chip
              key={params.row.status_id} 
              label={params.row.status_name} 
              style={{ backgroundColor: COLORS[(params.row.status_id)-1] }} 
            />
          );
        }
      },      
      
      editable: role === 1,
 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.1, 
      headerClassName: 'custom-header',
      renderCell: (params) => {
        const isEditing = editRows.includes(params.row.id);
        return (
          <>
            {role !== 2 && (
              <>
                {isEditing ? (
                  <>
                    <Tooltip title="Save"><IconButton sx={{ color: 'success.main' }} onClick={() => save(params.row.id)}><CheckIcon /></IconButton></Tooltip>
                    <Tooltip title="Cancel"><IconButton sx={{ color: 'error.main' }} onClick={() => cancel(params.row.id)}><CloseIcon /></IconButton></Tooltip>
                  </>
                ) : (
                  <Tooltip title="Edit">
                    <IconButton onClick={() => edit(params.row.id)}><EditIcon /></IconButton>                
                  </Tooltip>
                )}
              </>
            )}
          </>
        );
      },
    }
  ];


  const handleStatusChange = (id, newStatus) => {
    debugger;
    const ideaIndex = ideas.findIndex((idea) => idea.id === id);    
    const statusId = statuses.indexOf(newStatus) + 1;
    const updatedIdeasCopy = [...ideas];
    updatedIdeasCopy[ideaIndex] = {
      ...updatedIdeasCopy[ideaIndex],
      status_id: statusId,
      status_name: newStatus
    };
    setIdeas(updatedIdeasCopy);
   
  };
  
  

  // Action handlers
  const edit = (id) => {
    setEditRows([...editRows, id]);
  };

  const save = (id) => {
    const updatedIdea = ideas.find((idea) => idea.id === id);
  
    const requestBody = {
      idea_name: updatedIdea.idea_name,
      idea_description: updatedIdea.idea_description,
      status: parseInt(updatedIdea.status_id, 10),
    };
  
    fetch(`${global.base}/idea_list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedData = await response.json();
        const updatedIdeasCopy = ideas.map((idea) => {
          debugger;
          if (idea.id === id) {
            return { ...idea, ...updatedData };
          }
          return idea;
        });
        setIdeas(updatedIdeasCopy);
        setEditRows(editRows.filter(rowId => rowId !== id));
      })
      .catch((error) => {
        console.error('Error updating idea:', error);
      });
  };
  
 
  const cancel = (id) => {
    setEditRows(editRows.filter(rowId => rowId !== id));
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
        {...ideas}
        initialState={{
          ...ideas.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 30,100]}
        sx={{
          '& .custom-header': {
            backgroundColor: '#063970',
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
      </div>
    </Box>
  );
};

export default Idea_list;
