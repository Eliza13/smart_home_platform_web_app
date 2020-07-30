import React, { Component } from 'react';
import { connect } from 'react-redux';
import MetricsTile from '../../components/Tiles/MetricsTile/MetricsTile';
import classes from '../../index.css';
import * as actions from '../../store/actions/index';

class Metrics extends Component {
    componentDidMount() {
        this.props.onLoadMetrics(this.props.token, this.props.userId);
    }

    render() {
        let metrics = this.props.metrics.map(el => {
            return <MetricsTile key={el.id}
                src={require(`../../assets/icons/${el.icon}`)}
                title={el.name}
                description={el.value} />
        });

        if (this.props.metrics.length === 0) {
            metrics = <h3>No metrics yet.</h3>;
        }

        return (
            <div>
                <h2>Metrics</h2>
                <div className={classes.CardLayout} >
                    {metrics}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        metrics: state.metrics.metrics,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMetrics: (token, userId) => dispatch(actions.loadMetrics(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);


