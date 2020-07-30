import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemDevice from './ListItemDevice';
import * as actions from '../../../store/actions/index';
import * as stringConstants from '../../../shared/stringConstants';
import classes from './ListItemDevice.css';

class ListItemsDevices extends Component {

    handleChange = (id, enabled, state) => {
        let stateToBeUpdated = state;

        if (state === stringConstants.ON)
            stateToBeUpdated = stringConstants.OFF;
        else if (state === stringConstants.OFF)
            stateToBeUpdated = stringConstants.ON;

        if (state === stringConstants.OPEN)
            stateToBeUpdated = stringConstants.CLOSE;
        else if (state === stringConstants.CLOSE)
            stateToBeUpdated = stringConstants.OPEN;

        // update received params, then send to Firebase
        this.props.onDeviceStateChange(id, !enabled, stateToBeUpdated, this.props.token, this.props.userId);
    }


    render() {
        // boolean to check room or category division
        let locationBasedDevices = false;
        const { rooms, title } = this.props;
        for (let r of rooms) {
            if (r.name === title) {
                locationBasedDevices = true;
            }
        }

        const filteredDevices = this.props.devices.filter(el => {
            if (!locationBasedDevices)
                return el.category === title;
            else
                return el.location === title;
        });

        let devices = filteredDevices.map(el => {
            return <ListItemDevice name={el.name}
                key={el.id}
                description={el.state}
                state={el.enabled}
                warning={el.warning}
                handleChange={() => this.handleChange(el.id, el.enabled, el.state)} />
        });

        if (devices.length === 0)
            devices = <p>No devices in this {locationBasedDevices ? 'room' : 'category'} yet.</p>;


        return (
            <div className={classes.ListItemDevices} >
                {devices}
            </div>
        );
    }
}

const mapStateToProps = state => {

    const { rooms } = state.division;
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        rooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeviceStateChange: (id, enabled, state, token, userId) => dispatch(actions.changeDeviceState(id, enabled, state, token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItemsDevices);
