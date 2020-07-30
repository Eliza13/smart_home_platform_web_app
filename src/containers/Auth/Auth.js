import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { checkInputValidity } from '../../shared/checkInputValidity';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            }
        },
        isSignup: false
    }

    // handle input change
    inputChangedHandler = (event, controlName) => {

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkInputValidity(event.target.value, this.state.controls[controlName].validation)
            }
        };

        this.setState({ controls: updatedControls });
    }

    // handle submission 
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }


    // switch to login page
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(el => {
            return <Input key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                changed={(event) => this.inputChangedHandler(event, el.id)} />

        });

        if (this.props.loading)
            form = <Spinner />;

        let errorMessage = null;
        if (this.props.error)
            errorMessage = <p>{this.props.error.message}</p>;

        // check authentication so we can redirect
        let authRedirect = null;
        if (this.props.isAuthenticated)
            authRedirect = < Redirect to='/home' />

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}

                <h2>Welcome</h2>

                <form onSubmit={this.submitHandler}>
                    {form}
                    <button className={classes.login} >{this.state.isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>

                <button className={classes.register}
                    onClick={this.switchAuthModeHandler}> Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);