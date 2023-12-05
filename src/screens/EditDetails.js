import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, TextField, Grid, Box } from '@material-ui/core';
import PhoneInput from "react-phone-input-2";

const EditDetails = () => {
  const [employeeId, setEmployeeId] = useState(''); 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone_no: '',
    password: '', 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log("hello" + formData); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/employee_details/:employee_id}`, formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error updating employee:', error);
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
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    name="lastName"
                                    value={formData.lastname}
                                    onChange={handleChange}
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
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <PhoneInput
                                    label="Phone Number"
                                    variant="outlined"
                                    country={"in"}
                                    enableSearch={true}
                                    name="phoneNo"
                                    value={formData.phone_no}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                        </Grid>
                        
                        <Grid item container justify="center" alignItems="center" xs sx={6}>
                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
  );
};

export default EditDetails;
