import {createSelector} from 'reselect'
import axios from "axios"
import {debug, idModelFromList, Moment} from '../utils'
import {doSetDay, getDay, getFocusedActivityId} from "../view/duck";


// action types:
const ACTIVITIES_API_FAIL = "ACTIVITIES_API_FAIL";
const ACTIVITIES_API_PENDING = "ACTIVITIES_API_PENDING";
const ACTIVITIES_FETCH_SUCC = "ACTIVITIES_FETCH_SUCC";
const ACTIVITY_POST_SUCC = "ACTIVITY_POST_SUCC";
const ACTIVITY_PATCH_SUCC = "ACTIVITY_PATCH_SUCC";
const ACTIVITY_DELETE_SUCC = "ACTIVITY_DELETE_SUCC";
const ACITIVITES_CACHED_DAY = "ACITIVITES_CACHED_DAY";


// action creators:
export const doChangeDay = newDay => dispatch => {
  dispatch(doSetDay(newDay));
  dispatch(doActivityFetchAll());
};
export const doCacheDay = (cacheDay, removeCache) => ({type: ACITIVITES_CACHED_DAY, cacheDay, removeCache});
export const doRefreshActivities = () => (dispatch, getState) => {
  let day = getDay(getState());
  dispatch(doCacheDay(day, true));  //remove cache
  dispatch(doActivityFetchAll());
};

export const doActivityFetchAllPending = () =>({type: ACTIVITIES_API_PENDING, apiType: 'fetchAll'});
export const doActivityFetchAllFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'fetchAll', error: error });
export const doActivityFetchAllSucc = activities => ({type: ACTIVITIES_FETCH_SUCC, activities});
export const doActivityFetchAll = () => (dispatch, getState) => {
  let day = getDay(getState());
  let cachedDays= getCachedDays(getState());
  if(cachedDays[day.toJSON()]) return;

  let nextDay = day.clone().add(1, 'day');
  dispatch(doActivityFetchAllPending());
  return axios.get(`/activities/search/findByToAfterAndFromBefore?toAfter=${day.toJSON()}&fromBefore=${nextDay.toJSON()}`)
    .then(
      payload => {
        dispatch(doActivityFetchAllSucc(payload.data._embedded.activities));
        dispatch(doCacheDay(day));
      },
      error => dispatch(doActivityFetchAllFail(error.message))
    )
};

export const doActivityPostPending = () => ({type: ACTIVITIES_API_PENDING, apiType: 'post'});
export const doActivityPostFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'post', error: error });
export const doActivityPostSucc = activity => ({type: ACTIVITY_POST_SUCC, activity});
export const doActivityPost = activity => dispatch => {
  dispatch(doActivityPostPending());
  return axios.post("/activities", activity)
    .then(
      payload => dispatch(doActivityPostSucc(payload.data)),
      error => dispatch(doActivityPostFail(error.message))
    )
};

export const doActivityPatchPending = () => ({type: ACTIVITIES_API_PENDING, apiType: 'patch'});
export const doActivityPatchFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'patch', error: error });
export const doActivityPatchSucc = activity => ({type: ACTIVITY_PATCH_SUCC, activity});
export const doActivityPatch = activity => dispatch => {
  dispatch(doActivityPatchPending());
  return axios.patch(`/activities/${activity.id}`, activity)
    .then(
      payload => dispatch(doActivityPatchSucc(payload.data)),
      error => dispatch(doActivityPatchFail(error.message))
    )
};

export const doActivityDeletePending = () => ({type: ACTIVITIES_API_PENDING, apiType: 'deleteStatus'});
export const doActivityDeleteFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'deleteStatus', error: error });
export const doActivityDeleteSucc = deleteId => ({type: ACTIVITY_DELETE_SUCC, deleteId});
export const doActivityDelete = id => dispatch => {
  dispatch(doActivityDeletePending());
  return axios.delete(`/activities/${id}`)
    .then(
      payload => dispatch(doActivityDeleteSucc(id)),
      error => dispatch(doActivityDeleteFail(error.message))
    )
};


// state:
const initialState = {
  model:{}, // id as key

  // api status:
  fetchAll:{},
  post:{},
  patch:{},
  deleteStatus:{},

  cachedDays: {}
};


// selectors:
const getActivitiesState = states => states.activitiesState;
const getActivitiesModel = createSelector(getActivitiesState, state => state.model);
export const getCachedDays = createSelector(getActivitiesState, state => state.cachedDays);
export const getActivityFetchAll = createSelector(getActivitiesState, state => state.fetchAll);
export const getActivityPost = createSelector(getActivitiesState, state => state.post);
export const getActivityPatch = createSelector(getActivitiesState, state => state.patch);
export const getActivityDelete = createSelector(getActivitiesState, state => state.deleteStatus);
export const getFocusedActivity = createSelector(getActivitiesModel, getFocusedActivityId, (model,id) => id && model[id]);

export const getActivityApiPendings = createSelector(getActivityFetchAll, getActivityPost, getActivityPatch, getActivityDelete,
  (...statues)=>statues.map(s => s.pending));

export const getActivitiesArray = createSelector(getActivitiesModel, model => Object.keys(model).map(k => model[k]));
export const getDayActivitiesArray = createSelector(getActivitiesArray, getDay, (list, day) => {
  let nextDay = day.clone().add(1, 'day');
  return list.filter(({from,to}) => day < Moment(to) && Moment(from) < nextDay);
});



// reducer
export default function reducer(state=initialState, action){
  let {model, fetchAll, post, patch, deleteStatus, cachedDays} = state;
  let {type, apiType, error, activities, activity, deleteId, cacheDay, removeCache} = action;
  let apiStatus;

  switch (type) {
    case ACITIVITES_CACHED_DAY:
      cachedDays = {...cachedDays, [cacheDay.toJSON()]: !removeCache};
      return {...state, cachedDays};

    case ACTIVITIES_FETCH_SUCC:
      let {newModel} = idModelFromList(activities, {model});
      model = newModel;
      fetchAll = {...fetchAll, pending: false, error: null};
      return {...state, model, fetchAll};

    case ACTIVITY_POST_SUCC:
      model = {...model, [activity.id]: activity};
      post = {...post, pending: false, error: null};
      return {...state, model, post};

    case ACTIVITY_PATCH_SUCC:
      model = {...model, [activity.id]: activity};
      patch = {...patch, pending: false, error: null};
      return {...state, model, patch};

    case ACTIVITY_DELETE_SUCC:
      model = {...model};
      delete model[deleteId];
      deleteStatus = {...deleteStatus, pending: false, error: null};
      return {...state, model, deleteStatus};

    case ACTIVITIES_API_FAIL:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: false, error};
      return {...state, [apiType]: apiStatus};

    case ACTIVITIES_API_PENDING:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: true, error: null};
      return {...state, [apiType]: apiStatus};

    default:
      return state
  }
}