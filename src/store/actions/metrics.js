import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosLocal';

export const loadMetrics = (token, userId) => {
    return dispatch => {
        dispatch(loadMetricsStart());
        const queryParams = '?auth=' + token;
        axios.get(`/users/${userId}/metrics.json` + queryParams)
            .then(response => {
                console.log('metrics returned from fb', response.data);
                let array = [];
                for (let key in response.data) {
                    array.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(loadMetricsSuccess(array));
            })
            .catch(error => {
                console.log(error)
                dispatch(loadMetricsFail());
            });
    }
}

export const loadMetricsStart = () => {
    return {
        type: actionTypes.LOAD_METRICS_START
    }
}

export const loadMetricsSuccess = (data) => {
    return {
        type: actionTypes.LOAD_METRICS_SUCCESS,
        data: data
    }
}

export const loadMetricsFail = () => {
    return {
        type: actionTypes.LOAD_METRICS_FAIL
    }
}