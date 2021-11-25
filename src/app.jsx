import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <main>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <QualitiesProvider>
                        <ProfessionProvider>
                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/" exact component={Main} />
                        </ProfessionProvider>
                    </QualitiesProvider>
                </Switch>
            </AuthProvider>

            <ToastContainer />
        </main>
    );
};

export default App;
