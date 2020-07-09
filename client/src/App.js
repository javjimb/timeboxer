// Library
import React from "react";
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
import UserContextProvider from "./contexts/userContext";
import Verification from "../src/pages/Verification";

function App() {
    //const [user, setUser] = useState({});
    return (
        <UserContextProvider>
            <Router>
                <Switch>
                    <ProtectedRoute exact path="/auth/me" component={User} />
                    <ProtectedRoute exact path="/" component={Main} />
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route
                        path="/user/verify?/:token"
                        component={Verification}></Route>
                    <Route path="*" component={() => "404 Page not found"} />
                </Switch>
            </Router>
        </UserContextProvider>
    );
}

export default App;
