import React from 'react';
import classes from './SquareBtn.css';

const squareBtn = (props) => (
    <button className={classes.SquareBtn} onClick={props.clicked} >
        <i className={props.faIcon}></i>
    </button>
);

export default squareBtn;