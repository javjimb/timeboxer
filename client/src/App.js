// Library
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { userContext } from "./userContext";

// import 'typeface-roboto';

// CSS
import "./App.css";

// Components
import Main from "../src/pages/Main";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import { ProtectedRoute } from "./components/protected.route";
import User from "../src/pages/User";
import TBAppBar from "./components/TBAppBar";

// Services
import UserService from "../src/services/UserService";

function App() {
    const [user, setUser] = useState({});

    const useEffect = () => {};
    return (
        <Router>
            <userContext.Provider value={user}>
                <Switch>
                    <ProtectedRoute exact path="/auth/me" component={User} />
                    <ProtectedRoute exact path="/" component={Main} />
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="*" component={() => "404 Page not found"} />
                </Switch>
            </userContext.Provider>
        </Router>
    );
}

export default App;
