import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';

const Idea_submission = () => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      
      // let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
      // const idea = { id: ideas.length + 1, title, description , status: 'Submitted' };
      // ideas.push(idea);
      // localStorage.setItem('ideas', JSON.stringify(ideas));
      // console.log(JSON.parse(localStorage.getItem('ideas')));
    }

  };

  useEffect(() => {
    document.title = "Idea Submission";
  }, []);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' ,  paddingTop: '10%' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Idea Submission
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
        Submit
      </Button>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
    </form>
  );
};

export default Idea_submission;
