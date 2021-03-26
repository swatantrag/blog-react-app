const FETCH_BLOGS = 'FETCH_BLOGS';
const FETCH_COMMENTS = 'FETCH_COMMENTS';
const ERROR = 'ERROR';

const initialState = {
    blogsList: [],
    commentsList: [],
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOGS:
            return {
                ...state,
                blogsList: action.payload
            }
        case FETCH_COMMENTS:
            return {
                ...state,
                commentsList: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: {
                    isError: true,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}