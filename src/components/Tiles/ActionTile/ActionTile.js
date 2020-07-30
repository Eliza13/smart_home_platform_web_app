import React from 'react';
import TextTile from '../TextTile/TextTile';
import CircleBtn from '../../UI/Buttons/CircleBtn/CircleBtn';
import classes from './ActionTile.css';

const actionTile = (props) => (
    <div className={classes.ActionTile}>
        <TextTile src={props.src} title={props.title} >
            <CircleBtn text={props.state} />
        </TextTile >
    </div>
);

export default actionTile; 