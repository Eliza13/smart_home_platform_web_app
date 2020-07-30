import React from 'react';
import ListItem from '../ListItem/ListItem';
import TrashCan from '../../UI/Buttons/TrashCan/TrashCan';

const listRoutine = (props) => (
    <ListItem name={props.name}
        description={props.description}
        state={props.state}
        handleChange={props.handleChange}>
        <TrashCan clickedTrashCan={props.clickedTrashCan} />
    </ListItem>
);

export default listRoutine;