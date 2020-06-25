// Library
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import 'typeface-roboto';

// CSS
import "./App.css";

// Components
import Main from "../src/pages/Main";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import { ProtectedRoute } from "./components/protected.route";
import User from "../src/pages/User";

// Services
import UserService from "../src/services/UserService";

function App() {
    return (
        <Router>
            <Switch>
                <ProtectedRoute exact path="/auth/me" component={User} />
                <ProtectedRoute exact path="/" component={Main} />
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="*" component={() => "404 Page not found"} />
            </Switch>
        </Router>
    );
}

export default App;
