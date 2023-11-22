import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';

const IdeaForm = ({ idea, onSubmit }) => {
  
  const [title, setTitle] = useState(idea ? idea.title : '');
  const [description, setDescription] = useState(idea ? idea.description : '');
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (title === '' || description === '') {
      setAlert({ severity: 'error', message: 'Both fields are required.' });
    } else if (title.length > 20 || description.length > 250) {
      setAlert({ severity: 'info', message: 'Title or description is too long.' });
    } else {
      setAlert({ severity: 'success', message: 'Form submitted successfully.' });
      onSubmit({ title, description });
    }
  };

  useEffect(() => {
    document.title = idea ? "Edit Idea" : "Submit Idea";
  }, [idea]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' ,  paddingTop: '10%' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {idea ? "Edit Idea" : "Submit Idea"}
      </Typography>
      <TextField
        id="idea-title"
        label="Idea Title"
        variant="outlined"
        style={{ width: '30%' }}
        required
        error={submitted && title === ''}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ maxLength: 20 }}
      />
      <TextField
        id="idea-description"
        label="Idea Description"
        multiline
        rows={4}
        variant="outlined"
        style={{ width: '30%' }}
        required
        error={submitted && description === ''}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{ maxLength: 250 }}
      />
      <Button variant="contained" color="primary" type="submit">
        {idea ? "Update" : "Submit"}
      </Button>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
    </form>
  );
};

export default IdeaForm;
