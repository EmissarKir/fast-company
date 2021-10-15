import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import User from "./components/user";

const App = () => {
    return (
        <main>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={User} />
                <Route path="/users" component={Users} />
                <Route path="/" component={Main} />
            </Switch>
        </main>
    );
};

export default App;
