import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ 
            position: 'fixed', 
            bottom: 0, 
            width: '100%', 
            height: '50px', 
            backgroundColor: '#f8f8f8', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }} >
            <p style={{fontSize: 12, margin: '0 0 10x 0'}}>© 2023 Zelis Healthcare All Rights Reserved</p>&nbsp;&nbsp;
            <p style={{fontSize: 12, margin: '0 0 10x 0'}}><a href="https://www.zelis.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | <a href="https://www.zelis.com/terms-of-use/" target="_blank" rel="noopener noreferrer">Terms of Use</a></p>
        </Box>
    );
};

export default Footer;
