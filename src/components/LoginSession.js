import { useState , useEffect } from 'react';
import { ReactSession }  from 'react-client-session';

const LoginSession = () => {
    const [role, setRole] = useState([]);
    const username = ReactSession.get("username");
    useEffect(() => {

      fetch(`${global.base}/employee_mapping/${username}`)
        .then(response => response.json())
        .then(data => {
          setRole(data.role_id);
          ReactSession.set("role", data.role_id);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [username]);
  
    // rest of your component
  }
  export default LoginSession;


