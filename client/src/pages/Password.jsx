// Library
import React, { useState } from "react";
// Services
import PasswordService from "../services/PasswordService";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";
import FacebookIcon from "@material-ui/icons/Facebook";

// Components
import TBAppBar from "../components/TBAppBar";
// helper
import auth from "../helper/auth";

// Media
import timeBoxer from "../images/time-head.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100%",
    },
    image: {
        backgroundImage: `url(${timeBoxer})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

export default function Password(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
    const resendPassword = (event) => {
        event.preventDefault();

        PasswordService.resetPassword(email)
            .then(() => {
                setShowSnackbarSuccess(true);
                setAlertMessage(
                    "Your new password has been sent. Please check your email account and login with your new password."
                );
                setTimeout(() => props.history.push("/login"), 4000);
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar(true);
                setAlertMessage(
                    "Someting went wrong. Please check if you used the corect email address and try again." +
                        error
                );
            });
    };
    const onSnackbarClose = (event) => {
        setShowSnackbar(false);
    };
    return (
        <div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={onSnackbarClose}>
                <Alert
                    onClose={onSnackbarClose}
                    severity="error"
                    variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={showSnackbarSuccess}
                autoHideDuration={3000}
                onClose={onSnackbarClose}>
                <Alert
                    onClose={onSnackbarClose}
                    severity="success"
                    variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <TBAppBar />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Password Reset
                        </Typography>
                        <Typography variant="body2">
                            Enter the email address that you used to register
                            for Time Boxer. We'll send you a new password.
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={resendPassword}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={emailChangeHandler}
                                autoComplete="email"
                                autoFocus
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                    backgroundColor: "#3788d8",
                                    color: "white",
                                }}
                                className={classes.submit}>
                                Send
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
