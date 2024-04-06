import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Profile } from './pages/profile/Profile';
import { CreateReport } from './pages/AddReport/CreateReport';
import { Homepage } from './pages/Home/Homepage';
import { AuthProvider } from './context/authContext';
import { Login } from './pages/auth/Login/Login';
import { Signup } from "./pages/auth/signup/Signup";
import { Error } from './pages/error/Error';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ReportUpdate } from './pages/reportUpdate/ReportUpdate';
import { Logout } from './pages/auth/logout/Logout';
import { ReportPage } from './pages/reportPage/ReportPage';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AdminDashboard } from './pages/admin/dashboard/AdminDashboard';
import { Upgrade } from './pages/upgrade/Upgrade';

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
    path: "/admin",
    element: <AdminDashboard />
  },
  {
    path: "/upgrade",
    element: <Upgrade />
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/create-report",
    element: <CreateReport />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/update-report/:id",
    element: <ReportUpdate />,
  },
  {
    path: "/report/:id",
    element: <ReportPage />,
  },
  {
    path: "*",
    element: <Error />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Analytics />
      <SpeedInsights />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)