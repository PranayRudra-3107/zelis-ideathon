import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IdeaList from "./IdeaList";

const EndScreen = () => {
    const navigate = useNavigate();
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleLogout = () => {
        ReactSession.remove("id");
        ReactSession.remove("role");
        navigate('/login');
    };

    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
        navigate('/list'); // Redirect to idea list when "No" is clicked
    };

    React.useEffect(() => {
        handleConfirmationOpen();
    }, []);

    return (
        <div>
            <IdeaList /> {/* Render the Idea List component or content */}
            
            <Dialog
                open={confirmationOpen}
                onClose={handleConfirmationClose}
                aria-labelledby="logout-confirmation-dialog-title"
            >
                <DialogTitle id="logout-confirmation-dialog-title">
                    Are you sure you want to logout?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleConfirmationClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EndScreen;
