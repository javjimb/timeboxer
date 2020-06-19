import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import TodayIcon from "@material-ui/icons/Today";

// Components

import auth from "../components/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function TBAppBar({ next, prev, today, props }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#3788d8" }}>
                <Toolbar>
                    <div>
                        <img
                            src="https://res.cloudinary.com/dcmfiobqe/image/upload/v1590138327/timeboxer_white_p74w3f.png"
                            alt="logo"
                            style={{ height: "80px", padding: "3px" }}
                        />
                    </div>
                    <Typography variant="h2" className={classes.title}>
                        Time Boxer
                    </Typography>
                    <IconButton color="inherit" onClick={prev}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={today}>
                        <TodayIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={next}>
                        <NavigateNextIcon />
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={() => {
                            auth.logout(() => {
                                props.history.push("/login");
                            });
                        }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
