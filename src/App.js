import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

// load components in a lazy way
const asyncHome = asyncComponent(() => {
  return import('./containers/Home/Home');
});

const asyncAppliances = asyncComponent(() => {
  return import('./containers/Appliances/Appliances');
});

const asyncRoutines = asyncComponent(() => {
  return import('./containers/Routines/Routines');
});

const asyncMetrics = asyncComponent(() => {
  return import('./containers/Metrics/Metrics');
});

const asyncAccount = asyncComponent(() => {
  return import('./containers/Account/Account');
});


class App extends Component {

  componentDidMount() {
    // Sign user back in if he refreshes the page
    this.props.onAutoSignIn();
  }


  render() {
    let routes = (
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" exact component={asyncHome} />
          <Route path="/appliances" exact component={asyncAppliances} />
          <Route path="/routines" component={asyncRoutines} />
          <Route path="/metrics" component={asyncMetrics} />
          <Route path="/account" component={asyncAccount} />
          <Route path="/logout" component={Logout} />

          <Route path="/" component={asyncHome} />
          <Redirect to="/" from='/' />
        </Switch>
      );
    }

    return (
      <Layout> {routes} </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
