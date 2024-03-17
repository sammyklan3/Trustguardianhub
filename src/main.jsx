import React from 'react';
import ReactDOM from 'react-dom/client';
import { Homepage } from './pages/Home/Homepage';
import { Login } from './pages/auth/Login/Login';
import { Signup } from "./pages/auth/signup/Signup";
import { Error } from './pages/error/Error';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from './context/authContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Error />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
