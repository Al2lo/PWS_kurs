import { Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import EventPage from "../pages/userPages/EventPage";
import ProfilePage from "../pages/userPages/ProfilePage";
import { useUser } from "../hooks/userHooks";
import RoutesAdminPage from "../pages/adminPages/RoutesAdminPage";
import EventsAdminPage from "../pages/adminPages/EventsAdminPage";
import UsersAdminPage from "../pages/adminPages/UsersAdminPage";
import ProtectedRouteAuth from "./protectedRouteAuth";
import ProtectedRouteAdmin from "./protectedRouteAdmin";

const Router = () => {
  const user = useUser();

  const getInitialRoute = () => {
    if (user == null) {
      return <Navigate to="/auth" replace />;
    }

    if (user.role === 0) {
      return <Navigate to="/routesAdmin" replace />;
    }

    if (user.role === 1) {
      return <Navigate to="/home" replace />;
    }

    return <Navigate to="/auth" replace />;
  };

  return [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: getInitialRoute(),
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
        {
          path: "/home",
          element: (
          <ProtectedRouteAuth>
              <HomePage />
          </ProtectedRouteAuth>
          ),
        },
        {
          path: "/profile",
          element: 
          (
            <ProtectedRouteAuth>
                <ProfilePage />
            </ProtectedRouteAuth>
          )
        },
        {
          path: "/events",
          element:
          (
            <ProtectedRouteAuth>
                <EventPage />
            </ProtectedRouteAuth>
          )
        },
        {
          path: "/routesAdmin",
          element:
          (
            <ProtectedRouteAdmin>
              <RoutesAdminPage />
            </ProtectedRouteAdmin>
          ) 
        },
        {
          path: "/eventsAdmin",
          element:
          (
            <ProtectedRouteAdmin>
              <EventsAdminPage />
            </ProtectedRouteAdmin>
          ) 
        },
        {
          path: "/usersAdmin",
          element: 
          (
            <ProtectedRouteAdmin>
              <UsersAdminPage />
            </ProtectedRouteAdmin>
          ) 
        },
      ],
    },
  ];
};

export default Router;