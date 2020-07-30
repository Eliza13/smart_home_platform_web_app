import React, { Component } from 'react';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';

class Layout extends Component {

    // state
    state = {
        showSideDrawer: false
    }

    // implement the event handlers for the toggle btn 
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <div>
                <Toolbar isAuth={this.props.isAuthenticated}
                    openSideDrawer={this.sideDrawerToggleHandler} />

                <SideDrawer isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} />

                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout); 