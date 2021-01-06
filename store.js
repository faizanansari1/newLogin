import {createStore, applyMiddleware } from 'redux';
import RootReducer from './src/reducer/RootReducer';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    return createStore(
        RootReducer,
        applyMiddleware(thunk)
    ) 
}