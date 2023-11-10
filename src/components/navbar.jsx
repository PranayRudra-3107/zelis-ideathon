import React, { useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
const Header = () => {
  const [value, setValue] = useState();

  return (
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <EmojiObjectsTwoToneIcon sx={{ transform: "scale(2)" }} />
          <Typography sx={{ fontSize: "2rem", paddingLeft: "1%" }}>
                IDEATHON
              </Typography>
          
              <Tabs
                sx={{ marginRight: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Idea" />
                <Tab label="My Idea" />
                <Tab label="Show Ideas Visually" />
              </Tabs>
              <Tab label="Logout" />
          
        </Toolbar>
      </AppBar>
  );
};

export default Header;