import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@material-ui/core"

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
      Log In
    </Button>
  );
};