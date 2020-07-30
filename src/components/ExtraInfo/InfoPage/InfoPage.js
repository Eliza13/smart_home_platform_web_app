import React from 'react';
import Header from '../Header/Header';
import classes from './InfoPage.css';

const infoPage = (props) => (
    <div className={classes.InfoPage}>
        <Header clicked={props.clicked} />
        <h2> {props.title} </h2>
        {props.children}
    </div>
);

export default infoPage;