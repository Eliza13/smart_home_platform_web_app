import React from 'react';
import logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo} >
        <img src={logo} alt="ICT Group Logo" />
    </div>
);

export default Logo;