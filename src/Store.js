import {applyMiddleware, combineReducers, createStore} from "redux";
import mainReducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';


let Reducer = combineReducers({
    form: formReducer,
    todoReducer: mainReducer
})

let store = createStore(Reducer, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;