import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <main>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </main>
    );
};

export default App;
