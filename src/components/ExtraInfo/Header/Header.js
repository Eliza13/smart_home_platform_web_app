import React from 'react';
import SquareButton from '../../../components/UI/Buttons/SquareBtn/SquareBtn';
import classes from './Header.css';

const header = (props) => (
    <div className={classes.Header}>
        <SquareButton faIcon='fa fa-close' clicked={props.clicked} />
        <SquareButton faIcon='fa fa-cog' />
    </div>
);

export default header;