import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    return (
        <main>
            <AuthProvider>
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
            </AuthProvider>

            <ToastContainer />
        </main>
    );
};

export default App;
