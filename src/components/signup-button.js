import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@material-ui/core"

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button  variant="outlined" color="primary" fullWidth onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};