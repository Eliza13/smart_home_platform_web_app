import React from 'react';
import ListItem from '../ListItem/ListItem';
import classes from './ListItemDevice.css';
import WarningBtn from '../../UI/Buttons/Warning/Warning';

const listDevice = (props) => (
    <div className={classes.ListItemDevice} >
        <ListItem name={props.name}
            description={props.description}
            state={props.state}
            handleChange={props.handleChange}>
            {props.warning ? <WarningBtn /> : null}
        </ListItem>
    </div>
);

export default listDevice;