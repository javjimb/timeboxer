// Library
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Components
import TBAppBar from "../components/TBAppBar";
import Loading from "../components/Loading";

// Services
import TokenService from "../services/TokenService";

// Material UI

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

// Media
import timeBoxer from "../images/time-head.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
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
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#3788d8",
        color: "white",
        justifySelf: "flex-end",
        margin: "16px 0px",
        float: "right",
    },
}));

export default function Verification(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [verify, setVerify] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        TokenService.verifyUser(
            props.match.params.token,
            props.match.params.email
        )
            .then((response) => {
                if (response.email) {
                    setVerify(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [props.match.params.token, props.match.params.email]);

    const resendToken = () => {
        TokenService.resend(props.match.params.email)
            .then((response) => response.json)
            .catch((error) => console.log(error));
        setShowSnackbar(true);
        setAlertMessage(
            "The verification link has been resent. Please check your emails."
        );
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSnackbar(false);
    };
    let history = useHistory();
    const routeChange = () => {
        history.push(`/login`);
    };

    return (
        <div>
            <TBAppBar />
            {loading ? (
                <Loading />
            ) : (
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        className={classes.image}
                    />
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
                                Email Verification
                            </Typography>

                            <Grid container>
                                {verify ? (
                                    <Grid item xs style={{ marginTop: "16px" }}>
                                        <Alert severity="success">
                                            Your email is verified!
                                        </Alert>
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            onClick={routeChange}>
                                            Login
                                        </Button>
                                    </Grid>
                                ) : (
                                    <Grid item xs style={{ marginTop: "16px" }}>
                                        <Alert severity="error">
                                            Oops, something went wrong! Resend
                                            verification link.
                                        </Alert>
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            onClick={resendToken}>
                                            Resend link
                                        </Button>
                                        <Snackbar
                                            open={showSnackbar}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            onClose={handleClose}>
                                            <Alert
                                                onClose={handleClose}
                                                severity="success">
                                                {alertMessage}
                                            </Alert>
                                        </Snackbar>
                                    </Grid>
                                )}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}
