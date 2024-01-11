import IdeaForm from "../components/IdeaForm";
import { useNavigate } from "react-router-dom";
import {ReactSession} from "react-client-session";

const IdeaSubmission = () => {
  const navigate = useNavigate();
  debugger;
  ReactSession.setStoreType("localStorage");
  const empid =  parseInt(ReactSession.get("id"));
  const handleSubmit = (idea) => {
    debugger;
    fetch(`${global.base}/idea_list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...idea, status: 1 , employeeid:empid }),
    });  
  
    setTimeout(() => {
      navigate('/list');
    }, 2000);
  };

  return <IdeaForm onSubmit={handleSubmit}/>;
};

export default IdeaSubmission;