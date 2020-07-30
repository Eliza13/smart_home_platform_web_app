import React from 'react';
import classes from './Warning.css';
import warningIcon from '../../../../assets/icons/warning.png';

const warningBtn = (props) => (
    <button className={classes.Warning}>
        <img src={warningIcon} alt='Warning message' />
    </button>
);

export default warningBtn;

