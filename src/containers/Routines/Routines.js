import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemRoutine from '../../components/ListItems/ListItemRoutine/ListItemRoutine';
import Spinner from '../../components/UI/Spinner/Spinner';
import { confirmAlert } from 'react-confirm-alert';
import './libCss.module.css';
import * as actions from '../../store/actions/index';

class Routines extends Component {
    componentDidMount() {
        this.props.onLoadRoutines(this.props.token, this.props.userId);
    };

    submit = (el) => {
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete your routine?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.onDeleteRoutine(el.id, this.props.token, this.props.userId)
                },
                {
                    label: 'No',
                    onClick: () => console.log('No')
                }
            ]
        })
    };

    render() {
        let routines = <Spinner />;
        let error = this.props.error ? <h3> Your routines couldn't be loaded !  </h3> : null;

        if (!this.props.loading) {
            routines = this.props.routines.map(el => {
                return <ListItemRoutine key={el.id}
                    name={el.name}
                    description={el.history}
                    state={el.enabled}
                    clickedTrashCan={() => this.submit(el)}
                    handleChange={() => this.props.onUpdateSwitchState(!el.enabled, el.id, this.props.token, this.props.userId)} />
            });
        }

        if (this.props.routines.length === 0) {
            routines = <h3>No routines yet.</h3>;
        }

        return (
            <div>
                <h2>Your Routines</h2>
                {routines}
                {error}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        routines: state.routines.routines,
        loading: state.routines.loading,
        error: state.routines.error,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadRoutines: (token, userId) => dispatch(actions.loadRoutines(token, userId)),
        onUpdateSwitchState: (enabled, routineId, token, userId) => dispatch(actions.changeCustomSwitchState(enabled, routineId, token, userId)),
        onDeleteRoutine: (routineId, token, userId) => dispatch(actions.deleteRoutine(routineId, token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines);