import { Container, Box, Grid, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { useState } from 'react';
import Alert from '@mui/material/Alert'; 
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [ password, setEncryptedPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [alert,setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch('http://localhost:3001/login', {
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
  
      if (response.status === 200) {
        setAlert({ severity: 'success', message: 'Successfully logged in' });
        setTimeout(() => {
          navigate('/list');
        }, 2000);
      } 
      else {
        setAlert({ severity: 'error', message: 'Login failed. Please try again.' });
      }
    } 
    catch (error) {
     setAlert({ severity: 'error', message: 'An error occurred. Please try again later.' });
    }

  };
  

  return (
    <Container maxWidth="xs">
      <Box paddingTop="45%">
          <form onSubmit={handleLogin}>
            <Grid container direction="column" spacing={2} align="center">
              <Grid item xs sx={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs sx={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  onChange={(e) => setEncryptedPassword(e.target.value)}
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
                <a href="./register">Don't have account?Register</a>
              </Grid>
              <Grid item xs sx={6}>
                <Button type="submit"  variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
      </Box>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
    </Container>
  );
}

export default LoginPage;
