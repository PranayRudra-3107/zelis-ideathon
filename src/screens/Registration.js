import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const nav = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [phoneNo, setPhoneNo]= useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alert,setAlert] = useState(null);
    const [registered,setRegistered] = useState(false);

    const [strength, setStrength] = useState(0);
    const calculateStrength = (password) => {
        let strength = 0;
        const criteria = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
        criteria.forEach((criterion) => {
          if (criterion.test(password)) strength += 25;
        });
        setStrength(strength);
    }
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
    useEffect(() => {
        
        if (registered) {
            setTimeout(function() {
                nav('/login');
            }, 2000); 
        }
    }, [registered]);
    const handleSubmit = (event) => 
    {
        calculateStrength(password);
        event.preventDefault();
        //firstname
        if (firstName === '') {
            setAlert({ severity: 'error', message: 'Firstname is required!' });
          }

        //lastname
        else if (lastName === '') {
            setAlert({ severity: 'error', message: 'Lastname is required!' });
          }
        else if (id === '') {
          setAlert({ severity: 'error', message: 'Employee ID is required!' });
        } else if (!/^\d{6}$/.test(id)) {
          setAlert({ severity: 'error', message: 'Employee ID should be 6 digits!' });
        } 
        else if(phoneNo ===''){
            setAlert({ severity: 'error', message: 'Phone number is required!' });
          } 
        else if(email === ''){
            setAlert({ severity: 'error', message: 'Email is required!' });
        }
        else if(!/^[\w-.]+@zelis\.com$/.test(email)){
            setAlert({ severity: 'error', message: 'Enter only zelis email address' });
        }
        else if(department===''){
            setAlert({ severity: 'error', message: 'Please select your department!' });
        }
        else if(role===''){
            setAlert({ severity: 'error', message: 'Please select your role!' });
        }
        
        else if(password===''){
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
        else if (password.includes(firstName) || password.includes(lastName) || password.includes(id)){
            setAlert({ severity: 'error', message: 'Password should not contain Firstname, Lastname or Employee ID' });
        }

        else if(confirmPassword!==password){
            setAlert({ severity: 'error', message: 'Passwords should match' });
        }

        else {
            debugger;
        setRegistered(true);
        setAlert({ severity: 'success', message: 'Registered Successfully' });

        fetch(`${global.base}/employee_details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            employee_id: id,
            phone_no: phoneNo,
            email: email,
            created_date: new Date(),
            updated_date: new Date(),
             password: password
          }),
        })
        .then(response => {
            return response.text();
          });


        fetch(`${global.base}/employee_mapping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            employee_id: id,
            department_id :department,
            role_id : role
          }),
        })
        .then(response => {
            return response.text();
          });       
        } 
    };

    return (
        <Container maxWidth="xs">
            <Box paddingTop="35%">
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item container direction="row" spacing={2}>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    name="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <TextField
                                    label="ID"
                                    variant="outlined"
                                    inputProps={{ maxLength: 6 }}
                                    name="id"
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <PhoneInput
                                    label="Phone Number"
                                    variant="outlined"
                                    country={"in"}
                                    enableSearch={true}
                                    name="phoneNo"
                                    onChange={setPhoneNo}
                                />
                            </Grid>
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <FormControl variant="outlined" fullWidth   >
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        label="Department"
                                        name="department"
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <MenuItem value="1">ZNA</MenuItem>
                                        <MenuItem value="2">CCS</MenuItem>
                                        <MenuItem value="3">PAYMENTS</MenuItem>
                                        <MenuItem value="4">SUPPORT</MenuItem>
                                        <MenuItem value="5">ZADA/ZDI</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs sx={6}>
                                <FormControl variant="outlined" fullWidth >
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        label="Role"

                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value="1">Manager</MenuItem>
                                        <MenuItem value="2">Employee</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"

                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <LinearProgress
                            variant="determinate"
                            value={strength}
                            style={{
                            width: '100%',
                            background: '#e0e0e0', // Background color of the progress bar
                            height: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            transition: 'background-color 0.5s ease', // Smooth color transition
                            backgroundColor: getColorForProgress(strength),
                            }}
                        />
                        <Grid item container justify="center" alignItems="center" xs sx={6}>
                            <Button variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                            
                        </Grid>
                        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}
export default Signup;

