import React from 'react';
import classes from './BasicTile.css';

const basicTile = (props) => {
    return (
        <div className={classes.BasicTile} onClick={props.clicked} >
            {props.src ? <img src={props.src} alt="Tile Icon" /> : null}
            {props.children}
        </div>
    );
}

export default basicTile; 