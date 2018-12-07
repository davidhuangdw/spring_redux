import {createSelector} from 'reselect'
import axios from "axios"
import {debug, idModelFromList, Moment, today} from '../utils'


// action types:
const ACTIVITIES_API_FAIL = "ACTIVITIES_API_FAIL";
const ACTIVITIES_API_PENDING = "ACTIVITIES_API_PENDING";
const ACTIVITIES_FETCH_SUCC = "ACTIVITIES_FETCH_SUCC";


// actions:
export const doActivityFetchAllPending = () =>({type: ACTIVITIES_API_PENDING, apiType: 'fetchAll'});
export const doActivityFetchAllFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'fetchAll', error: error });
export const doActivityFetchAllSucc = activities => ({type: ACTIVITIES_FETCH_SUCC, activities});

export const doActivityFetchAll = () => dispatch => {
  dispatch(doActivityFetchAllPending());
  axios.get("/activities")
    .then(
      payload => dispatch(doActivityFetchAllSucc(payload.data._embedded.activities)),
      error => dispatch(doActivityFetchAllFail(error))
    )
};



// state:
const initialState = {
  model:{}, // id as key

  // view:
  newActivity:{},
  updateActivity:{},
  day: today(),

  // api status:
  fetchAll:{},
  post:{},
  patch:{},
  delete:{},
};

// selectors:
const getActivitiesState = states => states.activitiesState;
const getActivitiesModel = createSelector(getActivitiesState, state => state.model);
export const getFetchAll = createSelector(getActivitiesState, state => state.fetchAll);
export const getDay = createSelector(getActivitiesState, state => state.day);
export const getActivitiesArray = createSelector(getActivitiesModel, list => Object.keys(list).map(k => list[k]));
export const getDayActivitiesArray = createSelector(getActivitiesArray, getDay, (list, day) => {
  let nextDay = day.clone().add(1, 'day');
  return list.filter(({from,to}) => day < Moment(to) && Moment(from) < nextDay);
});

// reducer
export default function reducer(state=initialState, action){
  let {model, fetchAll} = state;
  let {type, apiType} = action;
  let apiStatus;

  switch (type) {
    case ACTIVITIES_FETCH_SUCC:
      let {newModel} = idModelFromList(action.activities, {model});
      model = newModel;
      fetchAll = {...fetchAll, pending: false, error: null};
      return {...state, model, fetchAll};

    case ACTIVITIES_API_FAIL:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: false, error: action.error};
      return {...state, [apiType]: apiStatus};

    case ACTIVITIES_API_PENDING:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: true, error: null};
      return {...state, [apiType]: apiStatus};

    default:
      return state
  }

}