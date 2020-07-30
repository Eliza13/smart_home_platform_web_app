import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {

    return dispatch => {

        dispatch(authStart()); // handle UI

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true // always needed
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC4YZeBGh_ygx_v_ZdCChcze6XnVRJ7pTY';

        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC4YZeBGh_ygx_v_ZdCChcze6XnVRJ7pTY';
        }

        axios.post(url, authData)
            .then(response => {

                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                //! save auth data in local storage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                // then continue with normal flow
                dispatch(authSuccess(response.data.idToken, response.data.localId));

                // check token still valid after an hour
                dispatch(checkAuthTimeOut(response.data.expiresIn));

            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

// action to log users out
export const logout = () => {

    //! remove local storage data about authentication
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    // //! remove devices for this user
    localStorage.removeItem('devices');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// check if the user is still signed in after one hour
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


//! create an action that checks if user is logged in if he refreshes the page
//! make use of local storage offered by the browser
export const authCheckState = () => {

    return dispatch => {

        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        }
        else {
            // we have a token, but we have to check if it is still valid 
            const exprDate = new Date(localStorage.getItem('expirationDate'));

            if (exprDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((exprDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(logout());
            }
        }
    }
} 
