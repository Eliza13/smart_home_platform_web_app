import React from "react";
import BasicTile from "../BasicTile/BasicTile";

const textTile = (props) => (
    <BasicTile src={props.src}
        clicked={props.clicked} >
        <p style={props.isRed ? { color: 'red', fontSize: '13px' } : null} >{props.title}</p>
        {props.children}
    </BasicTile>
);

export default textTile;
