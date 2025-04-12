import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProfile userId="1" />
    </React.StrictMode>
);
