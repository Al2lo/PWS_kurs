import { FC } from "react"
import { Link, NavLink } from "react-router-dom";
import enterImg from '../assets/enter.png'
import exitImg from '../assets/exit.png'
import { useIsAuth } from "../hooks/userHooks";
import { useDispatch } from "react-redux";
import { logout } from "../store/user/userSlice";
import { AuthService } from "../Services/AuthService";
import { toast } from "react-toastify";

const Header : FC = () => {
    const isAuth = useIsAuth();
    const dispatch = useDispatch();
    const logOut = () => {
      AuthService.logout()
      .then((data)=>{
        dispatch(logout());
        toast.success(data.message)
      })
      .catch((e)=>{toast.error('error' + e)})
    };

    return (
        <header className="header">
          <Link to="/" className="logo">
            Logo
          </Link>
    
          {isAuth && (
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink
                    to="/"
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