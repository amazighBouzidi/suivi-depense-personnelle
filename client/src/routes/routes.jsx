import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';
import { ProtectRoute } from '../middleware/auth';
import Profile from '../views/Profile';
import PersonelSpent from '../views/PersonelSpent';

const routes = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/Home',
        element: (
            <ProtectRoute>
                <Home />
            </ProtectRoute>
        ),
    },
    {
        path: '/Profile',
        element: (
            <ProtectRoute>
                <Profile />
            </ProtectRoute>
        ),
    },
    {
        path: '/PersonelSpent',
        element: (
            <ProtectRoute>
                <PersonelSpent />
            </ProtectRoute>
        ),
    },
];

const router = createBrowserRouter(routes);

export default router;