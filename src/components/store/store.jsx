import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer';


const initialState = {};

const middleware = [thunk];

const store = createStore(
    Reducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;