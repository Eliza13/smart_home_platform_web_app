import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosLocal';

export const loadDevices = (token, userId) => {
    return dispatch => {
        dispatch(loadDevicesStart());
        axios.get(`/users/${userId}/devices.json?auth=${token}`)
            .then(response => {
                const fetchedDataToArray = [];

                for (let key in response.data) {
                    fetchedDataToArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                localStorage.setItem('devices', JSON.stringify(fetchedDataToArray));
                dispatch(loadDevicesSuccess(fetchedDataToArray));
            })
            .catch(error => {
                console.log(error);
                dispatch(loadDevicesFail());
            })
    }
}

export const loadDevicesStart = () => {
    return {
        type: actionTypes.LOAD_DEVICES_START
    }
}

export const loadDevicesSuccess = (data) => {
    return {
        type: actionTypes.LOAD_DEVICES_SUCCESS,
        data: data
    }
}

export const loadDevicesFail = () => {
    return {
        type: actionTypes.LOAD_DEVICES_FAIL
    }
}


// Load devices from local storage
export const loadDevicesFromLocalStorage = () => {
    return dispatch => {
        const devices = JSON.parse(localStorage.getItem('devices'));
        if (devices !== null) {
            dispatch(loadDevicesSuccess(devices));
        }
        else {
            console.log('No devices!');
        }
    }
}


// Save a new device and append it to the existing list of devices in the store
export const saveDevices = (device, token, userId) => {
    return dispatch => {
        dispatch(saveDevicesStart());
        axios.post(`/users/${userId}/devices.json?auth=${token}`, device)
            .then(response => {
                dispatch(saveDevicesSuccess(response.data.name, device));
            })
            .catch(error => {
                console.log(error);
                dispatch(saveDevicesFail());
            })
    }
}

export const saveDevicesStart = () => {
    return {
        type: actionTypes.SAVE_DEVICES_START
    }
}

export const saveDevicesSuccess = (deviceId, device) => {
    return {
        type: actionTypes.SAVE_DEVICES_SUCCESS,
        deviceId: deviceId,
        device: device
    }
}

export const saveDevicesFail = () => {
    return {
        type: actionTypes.SAVE_DEVICES_FAIL
    }
}


// Actions to control the devices - switch them on and off / update the toggle
export const changeDeviceState = (id, enabled, state, token, userId) => {
    return dispatch => {
        axios.patch(`/users/${userId}/devices/${id}.json?auth=${token}`, { 'enabled': enabled, 'state': state })
            .then(response => {
                dispatch(changeDeviceStateSuccess(id, response.data.enabled, response.data.state));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const changeDeviceStateSuccess = (id, enabled, state) => {
    return {
        type: actionTypes.CHANGE_DEVICE_STATE_SUCCESS,
        id: id,
        enabled: enabled,
        state: state
    }
}