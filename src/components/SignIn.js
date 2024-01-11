import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const SignInForm = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [alert, setAlert] = useState(null);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${global.base}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
          rememberMe: state.rememberMe,
        }),
      });

      if (state.username !== "" && state.password !== "") {
        if (response.status === 200) {
          setAlert({ severity: "success", message: "Successfully logged in" });
          ReactSession.set("id", state.username);
          setTimeout(() => {
            navigate("/list");
          }, 2000);
        } else {
          setAlert({
            severity: "error",
            message: "Invalid credentials. Please try again.",
          });
        }
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetch(`${global.base}/employee_mapping/${state.username}`)
      .then((response) => response.json())
      .then((data) => {
        setRole(data.role_id);
        ReactSession.set("role", data.role_id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [state.username]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>

        <input
          type="text"
          placeholder="Employee ID"
          name="username"
          value={state.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />

        <div>
          <label>
            <input
              type="checkbox"
              checked={state.rememberMe}
              onChange={(e) => setState({ ...state, rememberMe: e.target.checked })}
            />
            Remember me
          </label>
        </div>

        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
    </div>
  );
};

export default SignInForm;
