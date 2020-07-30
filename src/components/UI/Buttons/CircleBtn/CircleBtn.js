import React from 'react';
import classes from './CircleBtn.css';

const circleBtn = (props) => (
    <button className={classes.CircleBtn}>
        <i className={props.faIcon}></i>
        {props.text}
    </button>
);

export default circleBtn;