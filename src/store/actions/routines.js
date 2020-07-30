import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosLocal';

// Load Routines
export const loadRoutines = (token, userId) => {
    return dispatch => {
        dispatch(loadRoutinesStart());
        const queryParams = '?auth=' + token;
        axios.get(`/users/${userId}/routines.json` + queryParams)
            .then(response => {
                let routinesToArray = [];
                for (let key in response.data) {
                    routinesToArray.push({
                        id: key,
                        ...response.data[key]
                    })
                }
                dispatch(loadRoutinesSuccess(routinesToArray));

            })
            .catch(error => {
                dispatch(loadRoutinesFail());
            });
    }
}

export const loadRoutinesStart = () => {
    return {
        type: actionTypes.LOAD_ROUTINES_START
    }
}

export const loadRoutinesSuccess = (data) => {
    return {
        type: actionTypes.LOAD_ROUTINES_SUCCESS,
        data: data
    }
}

export const loadRoutinesFail = () => {
    return {
        type: actionTypes.LOAD_ROUTINES_FAIL
    }
}

// Change Switch state 
export const changeCustomSwitchState = (enabled, id, token, userId) => {
    return dispatch => {
        axios.put(`/users/${userId}/routines/${id}/enabled.json?auth=${token}`, enabled)
            .then(response => {
                dispatch(changeCustomSwitchStateSuccess(response.data, id));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const changeCustomSwitchStateSuccess = (enabled, id) => {
    return {
        type: actionTypes.CHANGE_CUSTOM_SWITCH_STATE_SUCCESS,
        enabled: enabled,
        id: id
    }
}


// Delete Routines
export const deleteRoutine = (routineId, token, userId) => {
    return dispatch => {
        dispatch(deleteRoutineStart());
        axios.delete(`/users/${userId}/routines/${routineId}.json?auth=` + token)
            .then(response => {
                dispatch(deleteRoutineSuccess(routineId));
            })
            .catch(error => {
                console.log(error);
                dispatch(deleteRoutineFail());
            });
    }
}

export const deleteRoutineStart = () => {
    return {
        type: actionTypes.DELETE_ROUTINE_START
    }
}

export const deleteRoutineSuccess = (routineId) => {
    return {
        type: actionTypes.DELETE_ROUTINE_SUCCESS,
        routineId: routineId
    }
}

export const deleteRoutineFail = () => {
    return {
        type: actionTypes.DELETE_ROUTINE_FAIL
    }
}
