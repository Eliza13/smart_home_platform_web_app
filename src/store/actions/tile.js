import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosLocal';

export const loadModalClick = (title) => {
    return {
        type: actionTypes.LOAD_MODAL_CLICK,
        modalTitle: title
    }
};

export const closeModalClick = () => {
    return {
        type: actionTypes.CLOSE_MODAL_CLICK
    }
};

export const loadActions = (token, userId) => {
    return dispatch => {
        dispatch(loadActionsStart());
        const queryParams = '?auth=' + token;
        axios.get(`/users/${userId}/favorites.json` + queryParams)
            .then(response => {
                let array = [];
                for (let key in response.data) {
                    array.push({
                        id: key,
                        ...response.data[key]
                    });
                }

                dispatch(loadActionsSuccess(array));
            })
            .catch(error => {
                console.log(error);
                dispatch(loadActionsFail());
            });
    }
};

export const loadActionsSuccess = (data) => {
    return {
        type: actionTypes.LOAD_ACTONS_SUCCESS,
        data: data
    }
};

export const loadActionsStart = () => {
    return {
        type: actionTypes.LOAD_ACTONS_START
    }
};

export const loadActionsFail = () => {
    return {
        type: actionTypes.LOAD_ACTONS_FAIL
    }
};


// Actions to load notifications for Home page tiles
export const loadNotifications = (token, userId) => {
    return dispatch => {
        dispatch(loadNotificationsStart());
        const queryParams = '?auth=' + token;
        axios.get(`/users/${userId}/notifications.json` + queryParams)
            .then(response => {
                let array = [];
                for (const key in response.data) {
                    array.push({
                        id: key,
                        ...response.data[key]
                    });
                }

                dispatch(loadNotificationsSuccesss(array));
            })
            .catch(error => {
                console.log(error);
                dispatch(loadNotificationsFail());
            });
    };
};

export const loadNotificationsStart = () => {
    return {
        type: actionTypes.LOAD_NOTIFICATIONS_START
    };
};

export const loadNotificationsSuccesss = (data) => {
    return {
        type: actionTypes.LOAD_NOTIFICATIONS_SUCCESS,
        data
    };
};

export const loadNotificationsFail = () => {
    return {
        type: actionTypes.LOAD_NOTIFICATIONS_FAIL
    };
};
