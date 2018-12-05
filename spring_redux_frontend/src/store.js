import {createStore, combineReducers, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import {createLogger} from "redux-logger"
import { composeWithDevTools } from 'redux-devtools-extension';
import ActivitiesReducer from './activities/duck'

const reducer = combineReducers({
  activitiesState: ActivitiesReducer
});

export default createStore(reducer, {}, composeWithDevTools(applyMiddleware(reduxThunk, createLogger())))