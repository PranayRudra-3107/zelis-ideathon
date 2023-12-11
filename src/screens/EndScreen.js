import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const EndScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    ReactSession.remove("id");
    ReactSession.remove("role");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 5000);

    const clearNavigationHistory = () => {
        if (window.history) {
            window.history.replaceState(null, '', '/','/login');
        }
    };
    },[navigate]);
    return (
        <Snackbar open={true} >
            <Alert severity="info" sx={{ fontSize: '15px' }} variant="filled">
                Logged out
            </Alert>
        </Snackbar>
    );
}
export default EndScreen;
