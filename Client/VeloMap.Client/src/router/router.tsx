import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
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