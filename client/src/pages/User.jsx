import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Services
import UserService from "../services/UserService";
import { userContext } from "../context/userContext";

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
    const globalState = useContext(userContext);
    const { dispatch } = globalState;
    const [user, setUser] = useState(globalState.state.user);

    useEffect(() => {
        const getUser = () => {
            UserService.getUser(JSON.stringify(globalState.state.user._id))
                .then((response) => {
                    setUser(response.user);
                })
                .catch((error) => console.log(error));
        };
    }, []);

    const handleChange = (event, type) => {
        switch (type) {
            case "name":
                console.log("user:", user);
                console.log(event.target.value);
                setUser(Object.assign({}, user, { name: event.target.value }));
                break;
            case "surname":
                setUser(
                    Object.assign({}, user, { surname: event.target.value })
                );
                break;
            case "avatar":
                let file = event.target.files[0];
                let reader = new FileReader();

                reader.onloadend = () => {
                    console.log("image changed");
                    setUser(
                        Object.assign({}, user, {
                            avatar: reader.result,
                        })
                    );
                };
                reader.readAsDataURL(file);

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
                    setUser(response);
                    dispatch({ type: "saveUser", userData: response });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log("globalState:", globalState);

    return (
        <div>
            <TBAppBar />
            <div className={classes.root}>
                <Paper>
                    <form className={classes.form} onSubmit={changeUserData}>
                        <Avatar
                            alt={user.surname + user.name}
                            src={user.avatar}
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
                            {user.name + " " + user.surname}
                        </Typography>
                        <Typography variant="h6">
                            user id: ${user._id}
                        </Typography>

                        <Typography variant="subtitle1">
                            Account created at: ${user.createdAt}
                        </Typography>
                        <Typography variant="subtitle1">
                            Last change at: ${user.updatedAt}
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
