const FETCH_BLOGS = 'FETCH_BLOGS';
const FETCH_COMMENTS = 'FETCH_COMMENTS';
const ERROR = 'ERROR';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';


const GET_BLOGS = 'posts';
const GET_COMMENTS = 'comments?postId=';


export const fetchBlogs = () => dispatch => {
    fetch(BASE_URL + GET_BLOGS)
        .then(res => res.json())
        .then(blogs => dispatch({
            type: FETCH_BLOGS,
            payload: blogs
        }))
        .catch(err =>  dispatch({
            type: ERROR,
            payload: err
        }));
}


export const fetchComments = (id) => dispatch => {
    fetch(BASE_URL + GET_COMMENTS + id)
        .then(res => res.json())
        .then(comments => dispatch({
            type: FETCH_COMMENTS,
            payload: comments
        }))
        .catch(err =>  dispatch({
            type: ERROR,
            payload: err
        }));
}

