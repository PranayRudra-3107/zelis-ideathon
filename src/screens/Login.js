import { Container, Box, Grid, TextField, Checkbox, FormControlLabel, Button, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert'; 
import { useNavigate } from "react-router-dom";
import { ReactSession }  from 'react-client-session';
import configData from "./config.json";
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';

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
  debugger;
  return (
    <Container maxWidth="xs">
      <Box paddingTop="45%">
          <form onSubmit={handleLogin}>
            <Grid container direction="column" spacing={2} align="center">
              <Grid item xs sx={6}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs sx={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  onChange={(e) => setEncryptedPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs sx={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item xs sx={6}>
                <a href="./register">Don't have account? Register</a>
              </Grid>
              <Grid item xs sx={6}>
                <Button type="submit"  variant="contained" color="primary">
                  Login
                </Button>
              </Grid>     
                               
            </Grid>
          </form>
      </Box>
     
    </Container>
  );
}

export default LoginPage;
