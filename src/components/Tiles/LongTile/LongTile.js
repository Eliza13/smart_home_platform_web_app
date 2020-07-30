import React from 'react';
import CircleBtn from '../../UI/Buttons/CircleBtn/CircleBtn';
import classes from './LongTile.css';

const longTile = (props) => (
    <div className={classes.LongTile} >
        <img src={props.src} alt="Tile" />
        <h2> {props.title} </h2>
        <CircleBtn faIcon='fa fa-plus' />
        <CircleBtn faIcon={props.faIcon} />
        <CircleBtn faIcon='fa fa-minus' />
    </div>
);

export default longTile; 