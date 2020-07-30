import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navItems = (props) => {
    let items = (
        <ul className={classes.NavigationItems}>

            <NavigationItem link="/home" exact> Home </NavigationItem>
            <NavigationItem link="/appliances"> Appliances </NavigationItem>
            <NavigationItem link="/routines"> Routines </NavigationItem>
            <NavigationItem link="/metrics"> Metrics </NavigationItem>
            <NavigationItem link="/account"> Settings </NavigationItem>
            <NavigationItem link="/logout"> Sign Out </NavigationItem>

        </ul>
    );

    if (!props.isAuthenticated)
        items = null;

    return items;
}

export default navItems;