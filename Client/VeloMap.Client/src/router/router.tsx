import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./protectedRoute";

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
                //path: 'trans',
                //element: <fjsl/>
            },
            {
                path: 'auth',
                element: <AuthPage />,
            }
        ]
    }
])

export default router;