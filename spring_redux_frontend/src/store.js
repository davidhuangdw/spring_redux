import {createStore, combineReducers, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import {createLogger} from "redux-logger"
import { composeWithDevTools } from 'redux-devtools-extension';
import ActivitiesReducer from './activities/duck'
import ViewReducer from './view/duck'

const reducer = combineReducers({
  activitiesState: ActivitiesReducer,
  viewState: ViewReducer,
});

export default createStore(reducer, {}, composeWithDevTools(applyMiddleware(
  reduxThunk,
  // createLogger(),
  )))