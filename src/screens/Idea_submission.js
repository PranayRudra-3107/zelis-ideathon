import IdeaForm from "../components/Ideaform";
import { useNavigate } from "react-router-dom";

const Idea_submission = () => {
  const navigate = useNavigate();

  const handleSubmit = (idea) => {
    fetch('http://localhost:3001/idea_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...idea, status: 'Submitted' , employeeid: 15747 }),
    });  
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  return <IdeaForm onSubmit={handleSubmit} />;
};

export default Idea_submission;