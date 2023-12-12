import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSession }  from 'react-client-session';

const EditDetails = () => {
    const nav = useNavigate();
    ReactSession.setStoreType("localStorage");
    const  employee_id  = ReactSession.get("id")
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alert, setAlert] = useState(null);
    const [registered, setRegistered] = useState(false);

    const [strength, setStrength] = useState(0);

    // Fetch existing data when component mounts
    useEffect(() => {
        // Fetch employee data using employee_id
        fetch(`${global.base}/employee_details/${employee_id}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with existing data
                setFirstName(data[0].firstname);
                setLastName(data[0].lastname);
                setId(data[0].employee_id);
                setPhoneNo(data[0].phone_no);
                setEmail(data[0].email);
                setDepartment(data[0].department_id);
                setRole(data[0].role_id);
            })
            .catch(error => console.error('Error fetching employee data:', error));
    }, [employee_id]);

    // Function to calculate password strength
    const calculateStrength = (password) => {
        let strength = 0;
        const criteria = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
        criteria.forEach((criterion) => {
            if (criterion.test(password)) strength += 25;
        });
        setStrength(strength);
    }

    const handleSubmit = (event) => {
        calculateStrength(password);
        event.preventDefault();

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
             // Use the fetch PUT method to update the employee data
        fetch(`${global.base}/employee_details/${employee_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                employee_id: id,
                phone_no: phoneNo,
                email: email,
                updated_date: new Date(),
                password: password,
                role_id: role,
                department_id: department
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

       
    };

    return (
        <Container maxWidth="xs">
            <Box paddingTop="55%">
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item container direction="row" spacing={2}>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    name="lastName"
                                    value={lastName}
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
                                    value={id}
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
                                    value={phoneNo}
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
                                value={email}
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
                                        value={department}
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
                                        value={role}
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
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <LinearProgress variant="determinate" value={strength} />
                        <Grid item container justify="center" alignItems="center" xs sx={6}>
                            <Button variant="contained" color="primary" type="submit">
                                Update
                            </Button>
                            
                        </Grid>
                        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default EditDetails;
