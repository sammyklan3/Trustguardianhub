import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react"
import { Homepage } from './pages/Home/Homepage';
import { AuthProvider } from './context/authContext';
import { Login } from './pages/auth/Login/Login';
import { Signup } from "./pages/auth/signup/Signup";
import { Error } from './pages/error/Error';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Logout } from './pages/auth/logout/Logout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "/logout",
    element: <Logout />,
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
