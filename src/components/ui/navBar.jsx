import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink
                            className="nav-link "
                            aria-current="page"
                            to="/"
                            exact
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink
                            className="nav-link "
                            aria-current="page"
                            to="/users"
                            exact
                        >
                            Пользователи
                        </NavLink>
                    </li>

                    <li className="nav-item active">
                        <NavLink
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                            exact
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
