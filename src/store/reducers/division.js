import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
    rooms: [],
    categories: [],
    errorRooms: false,
    errorCategories: false,
    loading: false,
    loadingCategory: false
}

const loadRoomsSuccess = (state, action) => {
    console.log('Rooms in redux', action.data);
    return {
        ...state,
        rooms: action.data,
        loading: false
    };
}

const loadCategorySuccess = (state, action) => {
    return {
        ...state,
        categories: action.data,
        loadingCategory: false
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // load the rooms
        case actionTypes.LOAD_ROOMS_START: return updateState(state, { loading: true });
        case actionTypes.LOAD_ROOMS_SUCCESS: return loadRoomsSuccess(state, action);
        case actionTypes.LOAD_ROOMS_FAIL: return updateState(state, { errorRooms: true, loading: false });

        // load the categories
        case actionTypes.LOAD_CATEGORY_START: return updateState(state, { loadingCategory: true });
        case actionTypes.LOAD_CATEGORY_SUCCESS: return loadCategorySuccess(state, action);
        case actionTypes.LOAD_CATEGORY_FAIL: return updateState(state, { loadingCategory: false, errorCategories: true });

        // default case
        default: return state;
    }
}

export default reducer; 
