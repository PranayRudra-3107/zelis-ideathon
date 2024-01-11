import React, { useState, useEffect } from "react";
import "./styles.css"; // Assuming your styles are in a file named App.css
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function App() {
  const [type, setType] = useState("signIn");

  useEffect(() => {
    // Apply a class to the body element when the component mounts
    document.body.classList.add("app-body");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("app-body");
    };
  }, []);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="app-container">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost " id="signUp" onClick={() => handleOnClick("signUp")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
