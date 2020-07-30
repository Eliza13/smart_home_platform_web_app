import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextTile from '../../components/Tiles/TextTile/TextTile';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../../index.css';
import * as actions from '../../store/actions/index';
import { HEAT } from '../../shared/stringConstants';

class Home extends Component {
    componentDidMount() {
        const { onLoad, onLoadActions, onLoadNotifications, token, userId } = this.props;
        onLoad(token, userId);
        onLoadActions(token, userId);
        onLoadNotifications(token, userId);
    }

    handleClick() {
        console.log("Test");
    }

    render() {
        let error1 = this.props.errorDevices ? <p>Overview can't be loaded!</p> : null;
        let error2 = this.props.errorActions ? <p>Actions can't be loaded!</p> : null;
        let error3 = this.props.errorNotifications ? <p>More notifications can't be loaded!</p> : null;
        let spinner1 = this.props.loadingDevices ? <Spinner /> : null;
        let spinner2 = this.props.loadingActions ? <Spinner /> : null;
        let spinner3 = this.props.loadingNotifications ? <Spinner /> : null;

        let sumDevicesOn = 0;
        let tileOn = null;
        let tileTemp = null;
        let tileAlert = null;
        let tileWashingDone = null;
        let actions = null;
        let notifications = null;
        const { thermoVal } = this.props;

        // load devices
        if (!this.props.loadingDevices) {
            for (let d of this.props.devices) {
                if (d.enabled) {
                    sumDevicesOn++;
                }
            }

            tileOn = <TextTile title={sumDevicesOn + ' Devices On'}
                clicked={this.handleClick}
                src={require(`../../assets/icons/lightbulb_white.png`)} />

            tileTemp = <TextTile title={thermoVal !== undefined ? `${thermoVal} °C` : ` 19 °C`}
                clicked={this.handleClick}
                src={require(`../../assets/icons/thermo.png`)} />

            tileAlert = <TextTile title={'Water Leakage Prevented'}
                clicked={this.handleClick}
                isRed={true}
                src={require(`../../assets/icons/notificationRed.png`)} />

            tileWashingDone = <TextTile title={'Laundry Done'}
                clicked={this.handleClick}
                src={require(`../../assets/icons/washingMachine.png`)} />
        }

        // load notifications
        if (!this.props.loadingNotifications) {
            notifications = this.props.notifications.map(el => {
                return <TextTile key={el.id}
                    title={el.body} />
            });
        }

        // load actions
        if (!this.props.loadingActions) {
            actions = this.props.actions.map(el => {
                return <TextTile key={el.id}
                    title={el.name}
                    src={require(`../../assets/icons/${el.appIcon}.png`)} />
            });
        }

        if (this.props.actions.length === 0) {
            actions = <h3>No actions yet.</h3>
        }

        return (
            <div>
                <h2>Overview</h2>
                {error1} {spinner1}
                <div className={classes.CardLayout} >
                    {tileAlert} {tileOn} {tileTemp}
                </div>

                <h2>Notifications</h2>
                {error3} {spinner3}
                <div className={classes.CardLayout} >
                    {tileWashingDone} {notifications}
                </div>

                <h2>Actions</h2>
                {error2} {spinner2}
                <div className={classes.CardLayout} >
                    {actions}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { devices } = state.devices;
    let thermoVal;
    devices.forEach(current => {
        if (current.category === HEAT) {
            thermoVal = current.temperature;
        }
    });

    return {
        devices,
        thermoVal,
        errorDevices: state.devices.error,
        loadingDevices: state.devices.loading,

        errorActions: state.tile.error,
        loadingActions: state.tile.loading,

        errorNotifications: state.tile.errorNotifications,
        loadingNotifications: state.tile.loadingNotifications,
        notifications: state.tile.notifications,

        actions: state.tile.actions,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (token, userId) => dispatch(actions.loadDevices(token, userId)),
        onLoadActions: (token, userId) => dispatch(actions.loadActions(token, userId)),
        onLoadNotifications: (token, userId) => dispatch(actions.loadNotifications(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home); 