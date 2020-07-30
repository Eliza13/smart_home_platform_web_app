import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
    routines: [],
    loading: false,
    error: false
}

const handleSuccess = (state, action) => {
    return updateState(state, {
        routines: action.data,
        loading: false
    });
}

const updateSwitchStateSuccess = (state, action) => {
    let updatedRoutines = [...state.routines];
    for (let obj of updatedRoutines) {
        if (obj.id === action.id) {
            console.log('Routine initial state: ', obj.enabled);
            obj.enabled = action.enabled;
            console.log('Routine state updated: ', obj.enabled);
        }
    }

    return updateState(state, {
        routines: updatedRoutines
    });
}

const deleteRoutine = (state, action) => {
    const updatedRoutines = state.routines.filter(el => {
        return el.id !== action.routineId
    });

    return updateState(state, {
        loading: false,
        routines: updatedRoutines
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // load routines 
        case actionTypes.LOAD_ROUTINES_START: return updateState(state, { loading: true });
        case actionTypes.LOAD_ROUTINES_SUCCESS: return handleSuccess(state, action);
        case actionTypes.LOAD_ROUTINES_FAIL: return updateState(state, { loading: false, error: true });

        // delete a routine 
        case actionTypes.DELETE_ROUTINE_START: return updateState(state, { loading: true });
        case actionTypes.DELETE_ROUTINE_SUCCESS: return deleteRoutine(state, action);
        case actionTypes.DELETE_ROUTINE_FAIL: return updateState(state, { loading: false, error: true });

        // update routines (switch change handler) 
        case actionTypes.CHANGE_CUSTOM_SWITCH_STATE_SUCCESS: return updateSwitchStateSuccess(state, action);
        default: return state;
    }
}

export default reducer;