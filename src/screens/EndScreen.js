import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LoginPage from './Login'

const EndScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    ReactSession.remove("id");
    ReactSession.remove("role");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 1000);

    const clearNavigationHistory = () => {
        if (window.history) {
            window.history.replaceState(null, '', '/','/login');
        }
    };
    },[navigate]);
    return (
      <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      style={{
          marginTop: '5%', 
          marginLeft: '85%', 
          position: 'absolute',
      }}
  >
      <Alert severity="info" sx={{ fontSize: '15px' }} variant="filled">
          Logged out
      </Alert>
  </Snackbar>
      
    );
}
export default EndScreen;
