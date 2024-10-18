import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';

const routes = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/Home',
        element: <Home />,
    },
];

const router = createBrowserRouter(routes);

export default router;