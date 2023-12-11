import React, { useState, useEffect } from 'react';
import IdeaForm from '../components/IdeaForm';
import { useNavigate , useParams } from 'react-router-dom';
import configData from "./config.json";

const IdeaEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    fetch(`${configData.SERVER_URL}/idea_list/${id}`)
      .then(response => response.json())
      .then(data => setIdea({
        title: data.idea_name,
        description: data.idea_description,
      }))
      .then(console.log(idea));
  }, [id]);
  
  const handleSubmit = (updatedIdea) => {
    fetch(`${configData.SERVER_URL}/idea_list/${id}`, {
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
  return <IdeaForm idea={idea} onSubmit={handleSubmit} /> 
};

export default IdeaEdit;
