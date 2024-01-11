import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain ='dev-eyd5v7wtcwrxj8je.us.auth0.com'
        clientId = 'bjAK0XpDRuNrjrZEZ6sPa7tM4Qp4r8Ns'
        redirectUri = {window.location.origin}
        //redirectUri = 'mTENxu4SJdMiey0xOfZsD2vUgVNg3T8cGfVNoBA8s0dNV2WbFf8A-YtFlWfscT2V' 
    >
        <App />
    </Auth0Provider>      
);
reportWebVitals();
