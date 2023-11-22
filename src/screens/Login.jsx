import { Container, Box, Grid, TextField, Checkbox, FormControlLabel, Button, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [alert,setAlert] = useState(null);
  const nav=useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
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
                  onChange={(e) => setPassword(e.target.value)}
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
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </Box>
    </Container>
  );
}

export default LoginPage;
