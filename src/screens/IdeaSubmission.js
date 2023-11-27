import IdeaForm from "../components/IdeaForm";
import { useNavigate } from "react-router-dom";

const IdeaSubmission = () => {
  const navigate = useNavigate();

  const handleSubmit = (idea) => {
    fetch('http://localhost:3001/idea_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...idea, status: 1 , employeeid: 15747 }),
    });  
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  return <IdeaForm onSubmit={handleSubmit} />;
};

export default IdeaSubmission;