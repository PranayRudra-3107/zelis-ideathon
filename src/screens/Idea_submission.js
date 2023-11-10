import React, { useState } from "react";
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  Switch,
  FormControlLabel,
  Stack,
  Button,
  TextField,
} from "@mui/material";

const Idea_submission = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phnNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setcnfPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedUpdates, setCheckedUpdates] = useState(true);

  return (
    <div>
      <h1 style={{ color: "darkgrey" }}>Let's React's Form Container</h1>
      <h2 style={{ color: "Blue" }}>Registration form Example</h2>
      <form style={{ paddingTop: "10px", paddingLeft: "500px" }}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl>
            <InputLabel htmlFor="fname">First Name</InputLabel>
            <Input
              autoFocus="true"
              id="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Please enter your first name.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lname">Last Name</InputLabel>
            <Input
              id="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Please enter your last name.
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={email}
              aria-describedby="my-helper-text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phnNumber">Phone Number</InputLabel>
            <Input
              id="phnNumber"
              value={phnNumber}
              aria-describedby="my-helper-text"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Please enter your phone number here.
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControlLabel
            control={
              <TextField
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              ></TextField>
            }
            label="Select you date of birth"
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl>
            <InputLabel htmlFor="pswd">Password</InputLabel>
            <Input
              type="password"
              id="pswd"
              value={password}
              aria-describedby="my-helper-text"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Enter your password here.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="cnfPswd">Confirm Password</InputLabel>
            <Input
              type="password"
              id="cnfPswd"
              value={cnfpassword}
              aria-describedby="my-helper-text"
              onChange={(e) => setcnfPassword(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Please re-enter your password here.
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  // defaultChecked
                  checked={checkedUpdates}
                  onChange={(e) => setCheckedUpdates(e.target.checked)}
                />
              }
              label="Receive regular updates."
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  id="agree"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="I agree to the terms and conditions."
            />
          </FormControl>
        </Stack>
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={!checked}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Idea_submission;