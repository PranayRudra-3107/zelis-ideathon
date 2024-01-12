import { Container, Box, Grid, TextField, Checkbox, FormControlLabel, Button, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert'; 
import { useNavigate } from "react-router-dom";
import { ReactSession }  from 'react-client-session';
import configData from "./config.json";
import {useAuth0} from '@auth0/auth0-react';
import { LoginButton } from '../components/login-button';

global.base = configData.SERVER_URL;
console.log(configData.SERVER_URL);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [ password, setEncryptedPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [alert,setAlert] = useState(null);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch(`${global.base}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          rememberMe,
        })
      });
   if(username!=null&&password!=null){
      if (response.status === 200) {
        setAlert({ severity: 'success', message: 'Successfully logged in' });
        debugger;
        ReactSession.set("id",username);
        setTimeout(() => {
          navigate('/list');
        }, 2000);
      } 
      else {
        setAlert({ severity: 'error', message: 'Invalid credentials. Please try again.' });
      }
    }
    } 
    catch (error) {
     setAlert({ severity: 'error', message: 'An error occurred. Please try again later.' });
    }

  };

  const{ loginWithPopup , loginWithRedirect , logout , user , isAuthenticated} = useAuth0();

  useEffect(() => {    
    // eslint-disable-next-line no-template-curly-in-string
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

  const backgroundImageStyle = {
    backgroundImage: 'url(E:\Projects\Zelis Ideathon\zelis-ideathon\src\components\assests\pink-yellow.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh', 
  };
  debugger;
  return (
    <Container maxWidth="xs">
      <Box paddingTop="20%" style={backgroundImageStyle}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item xs>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Our Application
            </Typography>
          </Grid>
          <Grid item xs>
            <LoginButton/>
          </Grid>
          <Grid item xs>
            <Button  variant="outlined" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs>
            <Typography variant="body2" align="center">
              Learn more about our application and its features.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LoginPage;
