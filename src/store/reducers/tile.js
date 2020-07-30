import * as actionTypes from '../actions/actionTypes';
import { updateState } from './utility';

const initialState = {
    tileClicked: false,
    modalTitle: '',
    error: false,
    loading: false,
    actions: [],
    errorNotifications: false,
    loadingNotifications: false,
    notifications: []
};

const loadActionsSuccess = (state, action) => {
    return updateState(state, {
        actions: action.data,
        loading: false,
        error: false
    });
};

const loadNotificationsSuccess = (state, action) => {
    return updateState(state, {
        notifications: action.data,
        loadingNotifications: false,
        errorNotifications: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_MODAL_CLICK: return updateState(state, { tileClicked: true, modalTitle: action.modalTitle });
        case actionTypes.CLOSE_MODAL_CLICK: return updateState(state, { tileClicked: false });

        case actionTypes.LOAD_ACTONS_START: return updateState(state, { loading: true });
        case actionTypes.LOAD_ACTONS_FAIL: return updateState(state, { loading: false, error: true });
        case actionTypes.LOAD_ACTONS_SUCCESS: return loadActionsSuccess(state, action);

        case actionTypes.LOAD_NOTIFICATIONS_START: return updateState(state, { loadingNotifications: true });
        case actionTypes.LOAD_NOTIFICATIONS_FAIL: return updateState(state, { loadingNotifications: false, errorNotifications: true });
        case actionTypes.LOAD_NOTIFICATIONS_SUCCESS: return loadNotificationsSuccess(state, action);

        default: return state;
    }
};

export default reducer;