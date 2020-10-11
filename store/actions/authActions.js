import { AsyncStorage } from 'react-native';

// export const SIGN_UP = 'SIGN_UP';
// export const LOG_IN = 'LOG_IN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            token: token,
            userId: userId
        })
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArXyoO1LvqsXQljRb5cN6Z07thbbX1v3E', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_EXISTS') {
                message = "This email already exists!";
            }

            throw new Error(message)
        }

        const respData = await response.json();
        console.log(respData);

        dispatch(
            authenticate(
                respData.localId,
                respData.idToken,
                parseInt(respData.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
        saveDataToStorage(respData.idToken, respData.localId, expirationDate);
    }
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArXyoO1LvqsXQljRb5cN6Z07thbbX1v3E', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = "This email could not be found!";
            } else if (errorId === 'INVALID_PASSWORD') {
                message = "This password is not valid";
            }

            throw new Error(message)
        }

        const respData = await response.json();
        console.log(respData);

        dispatch(
            authenticate(
                respData.localId,
                respData.idToken,
                parseInt(respData.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
        saveDataToStorage(respData.idToken, respData.localId, expirationDate);
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return {
        type: LOGOUT
    };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime);
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
}