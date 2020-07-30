import React from "react";
import BasicTile from "../BasicTile/BasicTile";

const metricsTile = (props) => (
    <BasicTile src={props.src} clicked={props.clicked} >
        <h4 style={{ color: '#02a5bc', marginBottom: '0px' }} > {props.title} </h4>
        <p style={{ color: 'white' }} > {props.description} </p>
    </BasicTile>
);

export default metricsTile;
