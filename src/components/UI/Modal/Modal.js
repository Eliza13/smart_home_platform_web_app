import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoPage from '../../ExtraInfo/InfoPage/InfoPage';
import Backdrop from '../Backdrop/Backdrop';
import ListItemsDevices from '../../ListItems/ListItemDevice/ListItemsDevices';
import classes from './Modal.css';
import * as actions from '../../../store/actions/index';

class Modal extends Component {
    state = {
        show: true,
        style: null
    }

    componentDidMount() {
        // load devices from local storage 
        this.props.onLoadDevices();
    }

    handleClosing = () => {
        const style = {
            transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)',
            display: 'none'
        };

        this.setState({ show: false, style: style });
        this.props.onModalClose();
    }

    render() {
        return (
            <div>
                <Backdrop show={this.state.show} clicked={this.handleClosing} />
                <div className={classes.Modal}
                    style={this.state.style} >

                    <InfoPage title={this.props.title} clicked={this.handleClosing} >
                        <ListItemsDevices title={this.props.title} devices={this.props.devices} />
                    </InfoPage>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        devices: state.devices.devices
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => dispatch(actions.closeModalClick()),
        onLoadDevices: () => dispatch(actions.loadDevicesFromLocalStorage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

