import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Idea_list = () => {
  const [ideas, setIdeas] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const navigate = useNavigate();

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
  const columns = [
    { field: 'idea_name', headerName: 'Idea Title', width: 300, editable: true },
    { field: 'idea_description', headerName: 'Idea Description', width: 500, editable: true },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params, GridActionsCellItem) => {
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
                <IconButton sx={{ color: 'error.main' }} onClick={() => remove(params.row.id)}><DeleteIcon /></IconButton>
              </>
            )}
          </>
        );
      },
    }
  ];

  // Action handlers
  const edit = (id) => {
    setEditRows([...editRows, id]);
  };

  const save = (id) => {
    const updatedIdea = ideas.find(idea => idea.id === id);
    fetch(`http://localhost:3001/idea_list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedIdea),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setEditRows(editRows.filter(rowId => rowId !== id));
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
      return response.json();
    })
    .then(data => {
      console.log(data);
      setIdeas(ideas.filter(idea => idea.id !== id));
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
        <DataGrid rows={ideas} columns={columns} pageSize={5} onEditCellChangeCommitted={(e) => {
          const updatedIdeas = [...ideas];
          const updatedIdea = updatedIdeas.find(idea => idea.id === e.id);
          updatedIdea[e.field] = e.props.value;
          setIdeas(updatedIdeas);
        }} />
      </div>
    </Box>
  );
};

export default Idea_list;
