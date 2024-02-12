import React, { useState,useEffect} from "react";
import { Badge } from "@mui/material";

import { Link, Outlet,useLocation } from 'react-router-dom';
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Box
} from "@mui/material";
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import { styled } from '@mui/system';
import {ReactSession} from 'react-client-session';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from "@mui/material/Tooltip";
import Chip from '@mui/material/Chip';


const RootContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
});

const IconContainer = styled('div')({
  transform: 'scale(2)',
  marginRight: '0.5rem',
});

const useStyles = {
  marginRight: "10px",
};

const Header = () => {
  const location = useLocation();
  const nonLoggedInPaths = ['/', '/login', '/register'];
  const isLoggedIn = !nonLoggedInPaths.includes(location.pathname);
  const [notifications, setNotifications] = useState([]);


  //  const [role_name,setRole]=useState();
  // useEffect(() => {
  //   const fetchRole = async () => {
  //     try {
  //       const response = await fetch(`${global.base}/roles`); 
  //       const data = await response.json();
  //       setRole(data.role_name);
  //     } catch (error) {
  //       console.error('Error fetching role:', error);
  //     }
  //   };
  //   fetchRole();
  // }, []);


  const [value, setValue] = useState();
  ReactSession.setStoreType("localStorage");
  const role = ReactSession.get("role");
  const [anchorEl, setAnchorEl] = React.useState(null);
const mopen = Boolean(anchorEl);

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

const [open, setOpen] = useState(false);




  return (
    <>
     <AppBar sx={{ background: "#063970" }}>
  <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RootContainer>
      <IconContainer>
        <EmojiObjectsTwoToneIcon />
      </IconContainer>
      <Typography sx={{ fontSize: "2rem" }}>
        Ideathon 
      </Typography>
      </RootContainer>

      {isLoggedIn && (
  <>
  
    <Tabs
      sx={useStyles}
      indicatorColor="secondary"
      textColor="inherit"
      value={value}
      onChange={(e, value) => setValue(value)}
    >
      <Tab label="Ideas" component={Link} to="/list" />
      <Tab label="My Idea" component={Link} to="/mylist" />
      <Tab label="Submit Idea" component={Link} to="/submit" />
      <Tab label="Show Ideas Visually" component={Link} to="/graphs" />
      {console.log(role)}
      {role !== 2 && (
        <Tab label="Employee Details" component={Link} to="/details" />
      )}
    </Tabs>
    
    <Chip
      style={role === 1 ? { backgroundColor:"#FA8182" } : {backgroundColor:"#ffd3b6"}} // Set specific color for Manager
      label={role === 1 ? "MANAGER" : "EMPLOYEE"}
    />
       debugger;
       <Box flexGrow={1} />
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
          <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {open && (
        <div className="notifications">
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}

      <Tooltip title="Profile">
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={mopen}
      onClose={handleClose}
    >
      <MenuItem component={Link} to="/edit_details">Profile</MenuItem>
      <MenuItem component={Link} to="/edit_password">Update Password</MenuItem>
      <MenuItem component={Link} to="/logout" onClick={handleClose}>Logout</MenuItem>    
    </Menu>
  </>
  
)}

      <Outlet/>
    </Toolbar>
  </AppBar>

    </>
  );
};

export default Header;