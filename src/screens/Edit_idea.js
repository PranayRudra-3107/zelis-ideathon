import React, { useState, useEffect } from 'react';
import IdeaForm from '../components/Ideaform';
import { useNavigate , useParams } from 'react-router-dom';

const Idea_edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    // Fetch the idea from the database
    fetch(`http://localhost:3001/idea_list/${id}`)
      .then(response => response.json())
      .then(data => setIdea(data));
  }, [id]);

  const handleSubmit = (updatedIdea) => {
    fetch(`http://localhost:3001/idea_list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedIdea),
    });  
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  // Render the form only after the idea has been fetched
  return idea ? <IdeaForm idea={idea} onSubmit={handleSubmit} /> : null;
};

export default Idea_edit;
