
const SET_USER = 'SET_USER';


let initialState = {
    isAuth: undefined,
    user: undefined
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });

export default user; 