import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import ListItem from '../../components/ListItems/ListItem/ListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Account.css';
import * as actions from '../../store/actions/index';
import * as stringConstants from '../../shared/stringConstants';
import { checkInputValidity } from '../../shared/checkInputValidity';


class Account extends Component {
    componentDidMount() {
        this.props.onLoadRooms(this.props.token, this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadingRooms) {
            let ops = nextProps.rooms.map(r => {
                return { value: r.name, displayValue: r.name }
            });

            this.setState({
                ...this.state,
                inputs: {
                    ...this.state.inputs,
                    location: {
                        ...this.state.inputs.location,
                        elementConfig: {
                            ...this.state.inputs.location.options,
                            options: ops
                        },
                        value: ops[0].value
                    }
                }
            });
        }
    }

    state = {
        inputs: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Device name'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false
            },
            state: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: stringConstants.ON, displayValue: stringConstants.ON },
                        { value: stringConstants.OFF, displayValue: stringConstants.OFF },
                        { value: stringConstants.OPEN, displayValue: stringConstants.OPEN },
                        { value: stringConstants.CLOSE, displayValue: stringConstants.CLOSE }
                    ]
                },
                validation: {},
                value: stringConstants.ON,
                valid: true
            },
            location: {
                elementType: 'select',
                elementConfig: {
                    options: this.props.rooms.map(r => {
                        return { value: r.name, displayValue: r.name }
                    })
                },
                validation: {},
                value: '',
                valid: true
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: stringConstants.LIGHTS, displayValue: stringConstants.LIGHTS + ' Category' },
                        { value: stringConstants.LAUNDRY, displayValue: stringConstants.LAUNDRY + ' Category' },
                        { value: stringConstants.DOORS, displayValue: stringConstants.DOORS + ' Category' },
                        { value: stringConstants.WINDOWS, displayValue: stringConstants.WINDOWS + ' Category' },
                        { value: stringConstants.AUDIO, displayValue: stringConstants.AUDIO + ' Category' },
                        { value: stringConstants.HEAT, displayValue: stringConstants.HEAT + ' Category' },
                        { value: stringConstants.OTHER, displayValue: stringConstants.OTHER + ' Category' }
                    ]
                },
                validation: {},
                value: stringConstants.OTHER,
                valid: true
            },
        },
        formIsValid: false
    };


    // send device data to Firebase
    sendData = (event) => {
        event.preventDefault();
        let formData = {};

        for (let formKey in this.state.inputs) {
            formData[formKey] = this.state.inputs[formKey].value;
        }

        let en = true;
        if (formData.state === stringConstants.OFF || formData.state === stringConstants.CLOSE) {
            en = false;
        }

        if (formData.category === stringConstants.HEAT) {
            formData.temperature = 20;
        }

        if (formData.category === stringConstants.LIGHTS) {
            formData.intensity = 10;
        }

        formData.enabled = en;

        //! add device working state (show a warning if it breaks down)
        formData.warning = false;

        // send to database
        this.props.onSubmitDevice(formData, this.props.token, this.props.userId);

        // redirect 
        this.props.history.push('/home');
    }


    // handle input change for form
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.inputs,
            [inputIdentifier]: {
                ...this.state.inputs[inputIdentifier],
                value: event.target.value,
                valid: checkInputValidity(event.target.value, this.state.inputs[inputIdentifier].validation)
            }
        };

        // check if form is valid
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({ inputs: updatedControls, formIsValid: formIsValid });
    };


    render() {
        let form = <Spinner />;

        if (!this.props.loadingRooms) {
            const formElementsArray = [];
            for (let key in this.state.inputs) {
                formElementsArray.push({
                    id: key,
                    config: this.state.inputs[key]
                });
            }

            let inputs = formElementsArray.map(el => {
                return (
                    <Input
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        key={el.id}
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                );
            });

            form = (
                <form onSubmit={this.sendData} className={classes.FormData} >
                    {inputs}
                    <button disabled={!this.state.formIsValid}> Add </button>
                </form>
            );
        }

        return (
            <div>
                <h2> Security Settings </h2>
                <ListItem name="Block Phone Access" description="Restict Home Control" state={false} handleChange={() => console.log()} />
                <ListItem name="Receive Notifications" description="More Details" state={true} handleChange={() => console.log()} />
                <h2 style={{ marginTop: '60px' }} > Add Device </h2>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.devices.loading,
        error: state.devices.error,
        userId: state.auth.userId,
        token: state.auth.token,
        rooms: state.division.rooms,
        loadingRooms: state.division.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitDevice: (device, token, userId) => dispatch(actions.saveDevices(device, token, userId)),
        onLoadRooms: (token, userId) => dispatch(actions.loadRooms(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account); 