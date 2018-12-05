import {createSelector} from 'reselect'
import axios from "axios"
import {debug} from '../utils'


// action types:
const ACTIVITIES_API_FAIL = "ACTIVITIES_API_FAIL";
const ACTIVITIES_API_PENDING = "ACTIVITIES_API_PENDING";
const ACTIVITIES_FETCH_SUCC = "ACTIVITIES_FETCH_SUCC";
const ACTIVITIES_FETCH_ALL = "ACTIVITIES_FETCH_ALL";

// actions:
export function doActivityFetchAllPending(){
  return {type: ACTIVITIES_API_PENDING, apiType: 'fetchAll'}
}

export function doActivityFetchAllFail(error){
  return {type: ACTIVITIES_API_FAIL, apiType: 'fetchAll', error: error }
}

export function doActivityFetchAllSucc(activities){
  return {type: ACTIVITIES_FETCH_SUCC, activities}
}

export function doActivityFetchAll(){
  return dispatch => {
    dispatch(doActivityFetchAllPending());
    axios.get("/activities")
      .then(
        payload => dispatch(doActivityFetchAllSucc(payload.data._embedded.activities)),
        error => dispatch(doActivityFetchAllFail(error))
      )
  }
}



// state:
const initialState = {
  list:{}, // id as key
  newActivity:{},
  updateActivity:{},

  // api status:
  fetchAll:{},
  post:{},
  patch:{},
  delete:{},
};

// selectors:
const getActivitiesState = states => states.activitiesState;
const getActivitiesList = createSelector(getActivitiesState, state => state.list);
export const getFetchAll = createSelector(getActivitiesState, state => state.fetchall);
export const getActivitiesArray = createSelector(getActivitiesList, list => Object.keys(list).map(k => list[k]));

// reducer
export default function reducer(state=initialState, action){
  let {list, fetchAll} = state;
  let {type, apiType} = action;
  let apiStatus;

  switch (type) {
    case ACTIVITIES_FETCH_SUCC:
      let byId = action.activities.reduce((ret, activity) => (activity.id ? {...ret, [activity.id]:activity} : ret),
        {});
      list = {...list, ...byId};
      fetchAll = {...fetchAll, pending: false, error: null};
      return {...state, list, getAll: fetchAll};

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