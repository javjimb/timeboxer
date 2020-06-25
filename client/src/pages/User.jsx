import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Services
import UserService from "../services/UserService";

import { store } from "../store";

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
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [user, setUser] = useState(globalState.state.user);

    const handleChange = (event, type) => {
        switch (type) {
            case "name":
                console.log(user);
                console.log(event.target.value);
                setUser(Object.assign({}, user, { name: event.target.value }));
                break;
            case "surname":
                setUser(
                    Object.assign({}, user, { surname: event.target.value })
                );
                break;
            case "avatar":
                setUser(
                    Object.assign({}, user, { avatar: event.target.value })
                );
                break;
            default:
                break;
        }
    };
    const changeUserData = (event) => {
        event.preventDefault();
        UserService.updateUser(user._id, user)
            .then((response) => {
                if (response.errors) {
                    console.log(response.errors);
                } else {
                    setUser(response.user);
                    dispatch({ type: "setUser", userData: response.user });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(globalState);
    return (
        <div>
            <TBAppBar />
            <div className={classes.root}>
                <Paper>
                    <form className={classes.form} onSubmit={changeUserData}>
                        <Avatar
                            alt={
                                globalState.state.user.surname +
                                globalState.state.user.name
                            }
                            src="/static/images/avatar/1.jpg"
                            className={classes.large}
                        />
                        <input
                            accept="image/*"
                            className="fileUpload"
                            type="file"
                            style={{
                                width: "100%",
                                marginTop: "16px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid darkgrey",
                            }}
                            onChange={(event) => {
                                handleChange(event, "avatar");
                            }}
                        />
                        <Typography variant="h3">
                            {globalState.state.user.name +
                                " " +
                                globalState.state.user.surname}
                        </Typography>
                        <Typography variant="h6">
                            user id: ${globalState.state.user._id}
                        </Typography>

                        <Typography variant="subtitle1">
                            Account created at: $
                            {globalState.state.user.createdAt}
                        </Typography>
                        <Typography variant="subtitle1">
                            Last change at: ${globalState.state.user.updatedAt}
                        </Typography>
                        <TextField
                            id="name"
                            label="Name"
                            value={user.name}
                            onChange={(event) => {
                                handleChange(event, "name");
                            }}></TextField>
                        <TextField
                            id="surname"
                            label="Surname"
                            value={user.surname}
                            onChange={(event) => {
                                handleChange(event, "surname");
                            }}></TextField>
                        <TextField
                            id="email"
                            label={user.email}
                            disabled></TextField>

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
