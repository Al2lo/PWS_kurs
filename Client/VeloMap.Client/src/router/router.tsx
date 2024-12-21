import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./protectedRoute";
import EventPage from "../pages/userPages/EventPage";
import ProfilePage from "../pages/userPages/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
              path: '/',
              element: (
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              ),
            },
            {
                path: 'events',
                element: <EventPage/>
            },
            {
              path: 'profile',
              element: <ProfilePage/>
            },
            {
                path: 'auth',
                element: <AuthPage />,
            }
        ]
    }
])

export default router;