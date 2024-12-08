import { FC } from "react"
import { Link, NavLink } from "react-router-dom";

const Header : FC = () => {
    const isAuth = true;
    return ( 
        <header>
        <Link to='/' className="logo">
            Logo
        </Link>
    
        {
            isAuth && (
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/events' className="nav-link">Events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/profile' className="nav-link">Profile</NavLink>
                        </li>
                    </ul>
                </nav>
            )
        }
    </header>
)
  ;
}

export default Header;