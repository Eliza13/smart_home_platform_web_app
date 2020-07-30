import React from 'react';
import classes from './TrashCan.css';
import trashIcon from '../../../../assets/icons/trash.png';

const trashCan = (props) => (
    <button className={classes.TrashCan}
        onClick={props.clickedTrashCan}><img src={trashIcon} alt="Delete" /></button>
);

export default trashCan;

