import {createSelector} from 'reselect'
import {startOfDay, today} from "../utils";

// action types:
const SET_DAY = "SET_DAY";
const ACTIVITY_FOCUSED = "ACTIVITY_FOCUSED";


// action creators:
export const doSetDay = newDay => ({type: SET_DAY, newDay});
export const doFocusActivity = focusedActivityId => ({type: ACTIVITY_FOCUSED, focusedActivityId});


// selectors:
const getViewState = states => states.viewState;
export const getDay = createSelector(getViewState, state => state.day);
export const getFocusedActivityId = createSelector(getViewState, state => state.focusedActivityId);


// state:
const initialState = {
  day: today(),
  focusedActivityId: null,
  currentPath: null,
};


//reducer:
export default function reducer(state=initialState, action){
  let {type, newDay, focusedActivityId} = action;

  switch (type) {
    case SET_DAY:
      return {...state, day: startOfDay(newDay), focusedActivityId: undefined};

    case ACTIVITY_FOCUSED:
      return {...state, focusedActivityId};

    default:
      return state;
  }
}

