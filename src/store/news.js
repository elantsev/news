
const SET_NEWS = 'SET_NEWS';
const SET_NEWS_ITEM = 'SET_NEWS_ITEM';


const initialNews = [
    { id: 4, approved: true, authorId: '55', createdAt: 'Thu Sep 11 2020 8:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 4', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." },
    { id: 3, approved: false, authorId: '55',createdAt: 'Thu Sep 11 2020 8:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 3', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." },
    { id: 2, approved: false, authorId: '123', createdAt: 'Thu Sep 24 2020 14:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 2', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." },
    { id: 1, approved: true, authorId: '123', createdAt: 'Thu Sep 11 2020 8:15:10 GMT+0300 (Moscow Standard Time)', title: 'News 1', text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." },

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
export const setNewsItem = (newsItem) => ({
    type: SET_NEWS_ITEM,
    payload: {
        id: Date.now(),
        createdAt: new Date(),
        ...newsItem
    }
});

export default news; 