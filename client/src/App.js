// Library
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import 'typeface-roboto';

// CSS
import "./App.css";

// Components
import Main from "../src/pages/Main";
import Login from "../src/pages/Login";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
