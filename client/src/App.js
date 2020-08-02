// Library
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { unregister } from "./helper/interceptor.js";

// import 'typeface-roboto';

// CSS
import "./App.css";

// Components
import Main from "../src/pages/Main";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import { ProtectedRoute } from "./components/protected.route";
import User from "../src/pages/User";
import UserContextProvider from "./contexts/userContext";
import Verification from "../src/pages/Verification";
import Password from "./pages/Password";

require('dotenv').config();

function App() {
    return (
        <UserContextProvider>
            <Router>
                <Switch>
                    <ProtectedRoute exact path="/auth/me" component={User} />
                    <ProtectedRoute exact path="/" component={Main} />
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route
                        path="/user/verify/:token/:email"
                        component={Verification}></Route>
                    <Route path="/password" component={Password}></Route>
                    <Route path="*" component={() => "404 Page not found"} />
                </Switch>
            </Router>
        </UserContextProvider>
    );
}

export default App;
