
const SET_USER = 'SET_USER';
const SET_RESPONSE_ERROR = 'SET_RESPONSE_ERROR';
const SET_SUBMITTING = 'SET_SUBMITTING';
const SET_IS_AUTH = 'SET_IS_AUTH';


// вместо jwt token ;)
const authUser = localStorage.user ? JSON.parse(localStorage.user) : undefined
let initialState = {
    isAuth: !!authUser,
    user: authUser || {},
    responseError: undefined,
    isSubmitting: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_RESPONSE_ERROR:
            return {
                ...state,
                responseError: action.payload
            }
        case SET_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.payload
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }

        default:
            return state;
    }
}

export const setUser = (user) => ({ type: SET_USER, payload: { ...user } });
export const setResponseError = (responseError) => ({ type: SET_RESPONSE_ERROR, payload: responseError });
export const setSubmitting = (isSubmitting) => ({ type: SET_SUBMITTING, payload: isSubmitting });
export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, payload: isAuth });

export const sendCredentials = (values) => {
    return (dispatch) => {
        dispatch(setResponseError(""));
        dispatch(setSubmitting(true));
        setTimeout(() => {
            const { login, password } = values;
            if (login === "admin" && password === "admin-1234") {
                dispatch(setUser({ login, status: 'admin', id: '45' }));
                dispatch(setIsAuth(true));
                localStorage.setItem('user', JSON.stringify({ login, status: 'admin' }));
            } else if (login === "user" && password === "user-1234") {
                dispatch(setUser({ login, status: 'user', id: '123' }));
                dispatch(setIsAuth(true));
                localStorage.setItem('user', JSON.stringify({ login, status: 'user', id: '123' }));
            } else {
                dispatch(setResponseError("Логин или пароль указан не верно"));
            }
            dispatch(setSubmitting(false));
        }, 1500)
    };
}

export default user; 