// Libraries
import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import TodayIcon from "@material-ui/icons/Today";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ForwardIcon from "@material-ui/icons/Forward";
import Tooltip from "@material-ui/core/Tooltip";

// Components

// helper
import auth from "../helper/auth";

// Services
import { userContext } from "../contexts/userContext";

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
    paper: {
        marginRight: theme.spacing(2),
        backgroundColor: "white",
    },
    button: {
        color: "white"
    }
}));

export default function TBAppBar({ next, prev, today }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const { user } = useContext(userContext);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    let history = useHistory();
    function handleLogoutClick() {
        history.push("/login");
    }

    function handleAccountClick() {
        history.push("/auth/me");
    }

    // show AppBar elements according to pathname
    const userProfile = "/auth/me";
    const login = "/login";
    const signup = "/signup";
    const verify = "/user/verify";
    const password = "/password";
    var showAvatar = false;
    var showCalendarActions = false;
    let isLandingPage = window.location.pathname === '/';

    if (
        !isLandingPage &&
        ![login, signup, password].includes(window.location.pathname) &&
        !window.location.pathname.includes(verify)
    ) {
        showAvatar = true;
    }

    if (
        !isLandingPage &&
        ![login, signup, userProfile, password].includes(
            window.location.pathname
        ) &&
        !window.location.pathname.includes(verify)
    ) {
        showCalendarActions = true;
    }

    const showCalendar = window.location.pathname.includes(userProfile);


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#3788d8" }}>
                <Toolbar>
                    <div>
                        <Link to="/">
                            <img
                                src="https://res.cloudinary.com/dcmfiobqe/image/upload/v1590138327/timeboxer_white_p74w3f.png"
                                alt="logo"
                                style={{ height: "50px", padding: "3px" }}
                            />
                        </Link>
                    </div>
                    <Typography variant="h4" className={classes.title}>
                        Time Boxer
                    </Typography>
                    {isLandingPage ? (
                        <div>
                            <Tooltip title='Go to App'>
                                <IconButton color="inherit" onClick={() => history.push("/app")}>
                                    <ForwardIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    {
                        // show calendar actions only when path is '/'
                        showCalendarActions ? (
                            <div>
                                <Tooltip title='Previous day'>
                                    <IconButton color="inherit" onClick={prev}>
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Today'>
                                    <IconButton color="inherit" onClick={today}>
                                        <TodayIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Next day'>
                                    <IconButton color="inherit" onClick={next}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <React.Fragment />
                        )
                    }
                    {showCalendar ? (
                        <div>
                            <Link to="/app">
                                <Tooltip title='Back to task scheduler'>
                                    <IconButton  className={classes.button} >
                                        <TodayIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    {showAvatar ? (
                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={
                                    open ? "menu-list-grow" : undefined
                                }
                                aria-haspopup="true"
                                onClick={handleToggle}
                                color="inherit">
                                <Avatar
                                    alt={user.surname + " " + user.name}
                                    src={user.avatar}
                                />
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}>
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="menu-list-grow"
                                                    onKeyDown={
                                                        handleListKeyDown
                                                    }>
                                                    <MenuItem
                                                        onClick={
                                                            (handleClose,
                                                            handleAccountClick)
                                                        }>
                                                        <Button
                                                            startIcon={
                                                                <AccountCircleIcon />
                                                            }>
                                                            My account
                                                        </Button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Button
                                                            startIcon={
                                                                <ExitToAppIcon />
                                                            }
                                                            onClick={
                                                                (handleClose,
                                                                () => {
                                                                    auth.logout(
                                                                        handleLogoutClick
                                                                    );
                                                                })
                                                            }>
                                                            Logout
                                                        </Button>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
