import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosLocal';

// Load rooms
export const loadRooms = (token, userId) => {
    return dispatch => {
        dispatch(loadRoomsStart());
        axios.get(`/users/${userId}/rooms.json?auth=${token}`)
            .then(response => {
                let roomsArray = [];
                for (let key in response.data) {
                    roomsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                dispatch(loadRoomsSuccess(roomsArray));
            })
            .catch(error => {
                console.log(error);
                dispatch(loadRoomsFail());
            });
    }
}

export const loadRoomsStart = () => {
    return {
        type: actionTypes.LOAD_ROOMS_START
    }
}

export const loadRoomsSuccess = (data) => {
    return {
        type: actionTypes.LOAD_ROOMS_SUCCESS,
        data: data
    }
}

export const loadRoomsFail = () => {
    return {
        type: actionTypes.LOAD_ROOMS_FAIL
    }
}


// Load based on category
export const loadCategory = (token) => {
    return dispatch => {
        dispatch(loadCategoryStart());
        axios.get(`/category.json?auth=${token}`)
            .then(response => {
                let array = [];
                for (let key in response.data) {
                    array.push({
                        ...response.data[key],
                        id: key
                    });
                }

                dispatch(loadCategorySuccess(array));
            })
            .catch(error => {
                console.log(error);
                dispatch(loadCategoryFail());
            })
    }
}

export const loadCategoryStart = () => {
    return {
        type: actionTypes.LOAD_CATEGORY_START
    }
}

export const loadCategorySuccess = (data) => {
    return {
        type: actionTypes.LOAD_CATEGORY_SUCCESS,
        data: data
    }
}

export const loadCategoryFail = () => {
    return {
        type: actionTypes.LOAD_CATEGORY_FAIL
    }
}

