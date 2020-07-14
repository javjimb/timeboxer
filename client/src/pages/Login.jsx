import React, { useState } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";

// Services
import AuthService from "../services/AuthService";

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

// Components
import TBAppBar from "../components/TBAppBar";
// helper
import auth from "../helper/auth";

// Media
import timeBoxer from "../images/time-head.jpg";

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    facebook: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "16px",
    },
    divider: {
        width: "45%",
    },
}));
require("dotenv").config();
const appId = process.env.REACT_APP_FB_APP_ID;
const imageToBase64 = require("image-to-base64");

export default function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const onSnackbarClose = (event) => {
        setShowSnackbar(false);
    };
    const loginUser = async (event) => {
        event.preventDefault();
        try {
            let response = await AuthService.loginUser(email, password);

            if (response.errors) {
                setShowSnackbar(true);
                setAlertMessage(response.errors);
            } else {
                auth.login(() => {
                    localStorage.setItem("token", response.token);
                    props.history.push("/");
                });
            }
        } catch (error) {
            setShowSnackbar(true);
            setAlertMessage(error);
        }
    };
    const responseFacebook = async (response) => {
        console.log(response);

        const data = {
            email: response.email,
            provider_id: response.id,
            provider: "facebook",
            surname: response.last_name,
            name: response.first_name,
            avatar: response.picture.data.url,
        };

        let base64String = await imageToBase64(response.picture.data.url);
        data.avatar = "data:image/jpeg;base64," + base64String;

        AuthService.socialLogin(data)
            .then((response) => {
                auth.login(() => {
                    localStorage.setItem("token", response.token);
                    props.history.push("/");
                });
            })
            .catch((error) => {
                setShowSnackbar(true);
                setAlertMessage(error);
                console.log(error);
            });
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
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={loginUser}>
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={passwordChangeHandler}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
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
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>

                        <div className={classes.facebook}>
                            <Divider className={classes.divider} />
                            <Typography variant="body2">OR</Typography>
                            <Divider className={classes.divider} />
                        </div>
                        <div>
                            <FacebookLogin
                                appId={appId}
                                autoLoad={false}
                                fields="last_name,first_name,email,picture"
                                callback={responseFacebook}
                                style={{ margin: "16px auto 16px auto" }}
                            />
                        </div>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
