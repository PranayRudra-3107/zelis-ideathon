import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ReactSession} from "react-client-session";

const EndScreen = () => {
    const navigate = useNavigate();
    ReactSession.remove("id");
    ReactSession.remove("role");
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 1000);

        // Clear the timeout to avoid navigation if the component unmounts before the timeout
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50vh", transform: "translateY(-50%)" }}>
            <p style={{ fontWeight: "bold", fontSize: '30px'}}>
                logged out, but your ideas are logged in! <br/>We appreciate your valuable input.<br/>
                 Stay tuned for updates and continue being a beacon of creativity. <br/>Until next time!
            </p>
        </div>
    );
}

export default EndScreen;
