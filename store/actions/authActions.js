export const SIGN_UP = 'SIGN_UP';

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
            throw new Error('Something went wrong!');
        }

        const respData = await response.json();
        console.log(respData);

        dispatch({
            type: SIGN_UP,

        })
    }
};