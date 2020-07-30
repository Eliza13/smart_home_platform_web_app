import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
    metrics: [],
    loading: false,
    error: false
}

const loadSuccess = (state, action) => {
    return updateState(state, {
        metrics: action.data,
        loading: false,
        error: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_METRICS_START: return updateState(state, { loading: true });
        case actionTypes.LOAD_METRICS_SUCCESS: return loadSuccess(state, action);
        case actionTypes.LOAD_METRICS_FAIL: return updateState(state, { error: true, loading: false });
        default: return state;
    }
}

export default reducer; 
