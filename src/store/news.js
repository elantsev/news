
const SET_NEWS = 'SET_NEWS';
const SET_NEWS_ITEM = 'SET_NEWS_ITEM';


const initialNews = [
    { id: 2, createdAt: 'Thu Sep 24 2020 14:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 2', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis atque, dicta magni sed quidem necessitatibus quas nisi exercitationem quam consequuntur eum esse, nobis rem delectus voluptatibus? Optio nisi quo exercitationem officia commodi voluptat" },
    { id: 1, createdAt: 'Thu Sep 11 2020 8:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 1', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis atque, dicta magni sed quidem necessitatibus quas nisi exercitationem quam consequuntur eum esse, nobis rem delectus voluptatibus? Optio nisi quo exercitationem officia commodi voluptat" },

]
let initialState = {
    news: initialNews
};

const news = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.payload
            }
        case SET_NEWS_ITEM:
            const newsItem = {
                ...action.payload,

            }
            return {
                ...state,
                news: [newsItem, ...state.news,]
            }

        default:
            return state;
    }
}

export const setNews = (news) => ({ type: SET_NEWS, payload: news });
export const newsItem = (newsItem) => ({
    type: SET_NEWS_ITEM,
    payload: {
        id: Date.now(),
        createdAt: new Date(),
        ...newsItem
    }
});
// export const setResponseError = (responseError) => ({ type: SET_RESPONSE_ERROR, payload: responseError });
// export const setSubmitting = (isSubmitting) => ({ type: SET_SUBMITTING, payload: isSubmitting });
// export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, payload: isAuth });

// export const sendCredentials = (values) => {
//     return (dispatch) => {
//         dispatch(setResponseError(""));
//         dispatch(setSubmitting(true));
//         setTimeout(() => {
//             const { login, password } = values;
//             if (login === "admin" && password === "admin-1234") {
//                 dispatch(setUser({ login, password, status: 'admin' }));
//                 dispatch(setIsAuth(true));
//                 localStorage.setItem('user', JSON.stringify({ login, password, status: 'admin' }));
//             } else {
//                 dispatch(setResponseError("Логин или пароль указан не верно"));
//             }
//             dispatch(setSubmitting(false));
//         }, 1500)
//     };
// }

export default news; 