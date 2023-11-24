import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import { styled } from '@mui/system';

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
  const [value, setValue] = useState();

  return (
    <>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <RootContainer as={Link} to="/login">
            <IconContainer>
              <EmojiObjectsTwoToneIcon />
            </IconContainer>
            <Typography sx={{ fontSize: "2rem" }}>
              IDEATHON
            </Typography>
          </RootContainer>

          <Tabs
            sx={useStyles}
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
          >
            <Tab label="Ideas" component={Link} to="/list" />
            <Tab label="My Idea" />
            <Tab label="Submit Idea" component={Link} to="/submit"/>
            <Tab label="Show Ideas Visually" component={Link} to="/graphs"/>
          </Tabs>

          <Tab label="Register" component={Link} to="/register"/>
          <Outlet/>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;