import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
    },
    colorPrimary: {
        color: "#3788d8",
    },
}));
export default function Loading(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <CircularProgress size={100} className={classes.colorPrimary} />
        </Box>
    );
}
