import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid,Box } from '@material-ui/core';
import "react-phone-input-2/lib/bootstrap.css";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate} from 'react-router-dom';
import { ReactSession }  from 'react-client-session';

const EditPassword = () => {
    const nav = useNavigate();    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [alert, setAlert] = useState(null);
    const [registered, setRegistered] = useState(false);
    const  employee_id  = ReactSession.get("id")


    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        calculateStrength(newPassword);
        setPassword(newPassword);
    }
    const getColorForProgress = (progress) => {
        if (progress <= 25) {
          return '#FF0000'; // Red
        } else if (progress <= 50) {
          return '#FFFF00'; // Yellow
        }else {
          return '#00FF00'; // Green
        }
    };
    const calculateStrength = (password) => {
        let strength = 0;
        const criteria = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
        criteria.forEach((criterion) => {
            if (criterion.test(password)) strength += 25;
        });
        setStrength(strength);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        calculateStrength(password);

        try {
            const response = await fetch(`${global.base}/edit_password`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                password
              })
            });
         if(password==null)
            setAlert({ severity: 'error', message: 'Old Password is mandatory' });

            else if (response.status === 200) {
                if(password===''){
                    setAlert({ severity: 'error', message: 'Password is mandatory' });
                }
                else if(password.length<8){
                    setAlert({ severity: 'error', message: 'Password should be at least 8 characters!' });
                }
                else if(!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)){
                    setAlert({ severity: 'error', message: 'Password should contain atleast one capital and one small letters' });
                }
                else if(!/^(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(password)){
                    setAlert({ severity: 'error', message: 'Password should contain atleast one numerical and one special character' });
                }
        
                else if(confirmPassword!==password){
                    setAlert({ severity: 'error', message: 'Passwords should match' });
                }
        
                else {
                    debugger;
                setRegistered(true);
                setAlert({ severity: 'success', message: 'Registered Successfully' });
                     // Use the fetch PUT method to update the employee data
                fetch(`${global.base}/employee_details/${employee_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        updated_date: new Date(),
                        password: password
                    }),
                })
                    .then(response => response.text())
                    .then(() => {
                        setRegistered(true);
                        setAlert({ severity: 'success', message: 'Updated Successfully' });
        
                        // Redirect to a different route after updating
                        setTimeout(function () {
                            nav('/list'); // Change the route accordingly
                        }, 2000);
                    })
                    .catch(error => {
                        console.error('Error updating employee data:', error);
                        setAlert({ severity: 'error', message: 'Failed to update data' });
                    });
                    
                } 
            } 
            else {
              setAlert({ severity: 'error', message: 'Please enter correct password' });
            }
          }
          catch (error) {
           setAlert({ severity: 'error', message: 'An error occurred. Please try again later.' });
          }

    };

return(
    <Container maxWidth="xs">
    <Box paddingTop="25%">
        <h1 align='center'>Update Password</h1>
        <form onSubmit={handleSubmit}>
    <Grid item container direction="column" spacing={2}  alignItems="center">
    <Grid item xs sx={6}>
        <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            name="password"
            onChange={handlePasswordChange}
        />
    </Grid>
    <Grid item xs sx={6}>
        <TextField
            label="New Password"
            type="password"
            variant="outlined"
            name="password"
            onChange={handlePasswordChange}
        />
    </Grid>
    <Grid item xs sx={6}>
        <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
    </Grid>
    <LinearProgress
    variant="determinate"
    value={strength}
    style={{
    width: '50%',
    margin: 'auto',
    background: '#e0e0e0', 
    height: 5,
    marginTop: 5,
    marginBottom: 5,
    transition: 'background-color 0.5s ease', 
    backgroundColor: getColorForProgress(strength),
    }}
/>  
<Button variant="contained" color="primary" type="submit">Update</Button> 
</Grid>
</form>
</Box>
</Container>
)
};
export default EditPassword;