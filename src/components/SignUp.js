import React, { useState } from "react";

function SignUpForm() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    id: "",
    phoneNo: "",
    email: "",
    department: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);
  const [registered, setRegistered] = useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const {
      firstName,
      lastName,
      id,
      phoneNo,
      email,
      department,
      role,
      password,
      confirmPassword,
    } = state;

    if (firstName === "") {
      setAlert({ severity: "error", message: "Firstname is required!" });
    } else if (lastName === "") {
      setAlert({ severity: "error", message: "Lastname is required!" });
    } else if (id === "") {
      setAlert({ severity: "error", message: "Employee ID is required!" });
    } else if (!/^\d{6}$/.test(id)) {
      setAlert({ severity: "error", message: "Employee ID should be 6 digits!" });
    } else if (phoneNo === "") {
      setAlert({ severity: "error", message: "Phone number is required!" });
    } else if (email === "") {
      setAlert({ severity: "error", message: "Email is required!" });
    } else if (!/^[\w-.]+@zelis\.com$/.test(email)) {
      setAlert({ severity: "error", message: "Enter only zelis email address" });
    } else if (department === "") {
      setAlert({ severity: "error", message: "Please select your department!" });
    } else if (role === "") {
      setAlert({ severity: "error", message: "Please select your role!" });
    } else if (password === "") {
      setAlert({ severity: "error", message: "Password is mandatory" });
    } else if (password.length < 8) {
      setAlert({ severity: "error", message: "Password should be at least 8 characters!" });
    } else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      setAlert({ severity: "error", message: "Password should contain at least one capital and one small letter" });
    } else if (!/^(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(password)) {
      setAlert({ severity: "error", message: "Password should contain at least one numerical and one special character" });
    } else if (password.includes(firstName) || password.includes(lastName) || password.includes(id)) {
      setAlert({ severity: "error", message: "Password should not contain Firstname, Lastname, or Employee ID" });
    } else if (confirmPassword !== password) {
      setAlert({ severity: "error", message: "Passwords should match" });
    } else {
      setRegistered(true);
      setAlert({ severity: "success", message: "Registered Successfully" });

      // Perform your registration logic here, for example, make API calls
      // ...

      // Clear the form after successful registration
      for (const key in state) {
        setState({
          ...state,
          [key]: "",
        });
      }
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="id"
          value={state.id}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        <input
          type="text"
          name="phoneNo"
          value={state.phoneNo}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="department"
          value={state.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          type="text"
          name="role"
          value={state.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
        {alert && (
          <div style={{ color: alert.severity === "success" ? "green" : "red" }}>{alert.message}</div>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;
