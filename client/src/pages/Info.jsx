import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";

// CSS
import './Info.css';

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TBAppBar from "../components/TBAppBar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Time Boxer
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Info(props) {

    const history = useHistory();

    return (
        <div>
                <TBAppBar />
                <CssBaseline />
                <div className={'header'}>
                    <h1>Stay focused and maximize productivity with Time-boxer</h1>
                    <h4>A simple and effective way to manage your daily workload</h4>
                </div>
                <div className={'header-image'}>
                    <img src={process.env.PUBLIC_URL + '/assets/screenshot_1.png'} />
                </div>
                <div className={'content-white'}>
                    <h1>What is timeboxing?</h1>
                    <h4>
                        Timeboxing is a very simple technique to manage time and become more productive. The idea is to allocate a certain amount of time to an activity in advance and then complete the activity within that time frame.
                        <br />
                        The concept was first introduced by James Martin, the author of the book Rapid Application Development, as a part of agile software development.
                        <a href="https://en.wikipedia.org/wiki/Timeboxing" target="_blank">Learn more</a>
                    </h4>
                </div>
                <div className={'content-gray'}>
                    <h1>Start getting more things done</h1>
                    <h4>
                        <a href="/signup">Create your free account</a>
                        <br />
                        Or
                        use our demo account (demo:demo) to check it out
                    </h4>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push("/login")}>
                        Log in
                    </Button>
                </div>
        </div>
    );
}
export default withRouter(Info);
