import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import MenuItem from '@mui/material/MenuItem';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <MenuItem onClick={handleLogout}>Logout</MenuItem>    
  );
};