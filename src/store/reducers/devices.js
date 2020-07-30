import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
    devices: [],
    error: false,
    loading: false
}

// Local methods to update the state
const loadSuccess = (state, action) => {
    return updateState(state, {
        devices: action.data,
        loading: false,
        error: false
    });
}

const saveSuccess = (state, action) => {
    const newDevice = {
        ...action.device,
        id: action.deviceId
    }
    const updatedDevs = state.devices.concat(newDevice);

    localStorage.removeItem('devices');
    localStorage.setItem('devices', JSON.stringify(updatedDevs));
    console.log('Devs from devices reducer after device addition', updatedDevs);

    return updateState(state, {
        loading: false,
        devices: updatedDevs
    });
}


const changeDeviceState = (state, action) => {
    let updatedDevices = [...state.devices];

    for (let obj of updatedDevices) {
        if (obj.id === action.id) {
            console.log('Device initial state: ', obj.enabled, obj.state);
            obj.enabled = action.enabled;
            obj.state = action.state;
            console.log('Device state updated: ', obj.enabled, obj.state);
        }
    }

    localStorage.removeItem('devices');
    localStorage.setItem('devices', JSON.stringify(updatedDevices));

    return updateState(state, {
        devices: updatedDevices
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // load devices 
        case actionTypes.LOAD_DEVICES_SUCCESS: return loadSuccess(state, action);

        case actionTypes.LOAD_DEVICES_START: return updateState(state, { loading: true });

        case actionTypes.LOAD_DEVICES_FAIL: return updateState(state, { loading: false, error: true });

        // save device to db
        case actionTypes.SAVE_DEVICES_SUCCESS: return saveSuccess(state, action);

        case actionTypes.SAVE_DEVICES_START: return updateState(state, { loading: true });

        case actionTypes.SAVE_DEVICES_FAIL: return updateState(state, { loading: false, error: true });

        // control device state 
        case actionTypes.CHANGE_DEVICE_STATE_SUCCESS: return changeDeviceState(state, action);

        default: return state;
    }
}

export default reducer;