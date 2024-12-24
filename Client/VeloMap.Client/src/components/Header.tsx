import { FC } from "react"
import { Link, NavLink } from "react-router-dom";
import enterImg from '../assets/enter.png'
import exitImg from '../assets/exit.png'
import { useIsAuth, useUser } from "../hooks/userHooks";
import { useDispatch } from "react-redux";
import { logout } from "../store/user/userSlice";
import { AuthService } from "../Services/AuthService";
import { toast } from "react-toastify";
import { updateIsLike, updateRoute } from "../store/route/routeSlice";

const Header : FC = () => {
    const user = useUser();
    const isAuth = useIsAuth();
    const dispatch = useDispatch();
    const logOut = () => {
      AuthService.logout()
      .then((data)=>{
        dispatch(logout());
        dispatch(updateRoute(null));
        dispatch(updateIsLike(false));
        toast.success(data.message)
      })
      .catch((e)=>{toast.error('error' + e)})
    };

    return (
        <header className="header">
          {isAuth && user != null && user.role == 1  && (
            <Link to="/home" className="logo">
              VeloMap
            </Link>
          )}
          {isAuth && user != null && user.role == 0  && (
            <Link to="/routesAdmin" className="logo">
              Logo
            </Link>
          )}

          {isAuth && user != null && user.role == 1  && (
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink
                    to="/home"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/events"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}

          {isAuth && user != null && user.role == 0  && (
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink
                    to="/routesAdmin"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Routes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/eventsAdmin"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/usersAdmin"
                    className={({ isActive }) => (isActive ? 'nav-link active-nav-link' : 'nav-link')}
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
    
    {isAuth ? (
  <button className="logout-button"
  onClick={()=>logOut()}
  >
    <span>Log out</span>
    <img src={exitImg} alt="Logout" className="button-icon" />
  </button>
) : (
  <NavLink className="signin-button" to={'/auth'}>
    <span>Sign in</span>
    <img src={enterImg} alt="Sign in" className="button-icon" />
  </NavLink>
)}
        </header>
      );
}

export default Header;