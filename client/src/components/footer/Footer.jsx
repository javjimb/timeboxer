import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

import './Footer.scss'

function Footer() {
    return (
        <Typography className="footer" variant="body2" color="textSecondary" align="center">
            Copyright &copy; {new Date().getFullYear()} time-boxer
            / <Link to="/privacy" target="_blank">Privacy policy</Link>
        </Typography>
    );
}

export default Footer;
