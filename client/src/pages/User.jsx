import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Components
import TBAppBar from "../components/TBAppBar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        "& > *": {
            margin: "16px",
            width: "40%",
            height: "80%",
        },
    },
    paper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        height: "100%",
    },
    large: {
        margin: theme.spacing(1),
        width: "200px",
        height: "200px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        margin: "16px",
    },
}));

export default function User() {
    const classes = useStyles();
    return (
        <div>
            <TBAppBar />
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        className={classes.large}
                    />
                    <Typography variant="h3">Surname Name</Typography>
                    <Typography variant="h6">user id: ...</Typography>

                    <Typography variant="p">
                        Account created at: ....
                    </Typography>
                    <Typography variant="p">Last change at: ....</Typography>
                </Paper>
                <Paper>
                    <form className={classes.form}>
                        <TextField id="surname" label="Surname"></TextField>
                        <TextField id="name" label="Name"></TextField>
                        <TextField id="email" label="Email"></TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{
                                backgroundColor: "#3788d8",
                                margin: "16px",
                                width: "150px",
                                alignSelf: "flex-end",
                            }}
                            className={classes.submit}>
                            Submit
                        </Button>
                        <Button
                            style={{
                                alignSelf: "flex-end",
                                fontSize: "13px",
                                margin: "16px",
                            }}
                            color="secondary">
                            delete account
                        </Button>
                    </form>
                </Paper>
            </div>
        </div>
    );
}
