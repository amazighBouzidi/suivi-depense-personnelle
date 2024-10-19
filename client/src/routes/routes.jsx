import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';
import { ProtectRoute } from '../middleware/auth';

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
];

const router = createBrowserRouter(routes);

export default router;