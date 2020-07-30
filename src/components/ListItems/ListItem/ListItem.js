import React from 'react';
import classes from './ListItem.css';
import CustomSwitch from '../../UI/Switch/Switch';

const listItem = (props) => {

    const children = props.children ? <div>{props.children}</div> : null;

    return (
        <div className={classes.ListItem}>
            <div>{props.name}</div>
            <div className={classes.blue}>{props.description}</div>
            <div><CustomSwitch state={props.state} handleChange={props.handleChange} /></div>
            {children}
        </div>
    );
}

export default listItem;