import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0ProviderWithNavigate } from './components/auth0-provider-with-navigate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Auth0ProviderWithNavigate>
            <App/>
        </Auth0ProviderWithNavigate>        
    </BrowserRouter>         
);
reportWebVitals();
