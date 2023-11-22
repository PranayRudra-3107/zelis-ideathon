import React, { useState } from "react";
import { BrowserRouter as Router, Link , Outlet} from 'react-router-dom';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: 'inherit',
    textDecoration: 'none',
  },
});
const Header = () => {
  const [value, setValue] = useState();
  const classes = useStyles();
  return (
    <>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
         <a href="/" className={classes.root}>
          <EmojiObjectsTwoToneIcon sx={{ transform: "scale(2)" }} />
          <Typography sx={{ fontSize: "2rem" }}>
                IDEATHON
              </Typography>
          </a>
              <Tabs
                sx={{ marginRight: "10px" }}
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