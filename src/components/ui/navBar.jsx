import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-ligth mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link "
                            aria-current="page"
                            to="/"
                            exact
                        >
                            Главная
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <NavLink
                                className="nav-link "
                                aria-current="page"
                                to="/users"
                                exact
                            >
                                Пользователи
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <NavLink
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
