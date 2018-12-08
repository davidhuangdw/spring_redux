import {createSelector} from 'reselect'
import axios from "axios"
import {debug, idModelFromList, Moment, today} from '../utils'


// action types:
const ACTIVITIES_API_FAIL = "ACTIVITIES_API_FAIL";
const ACTIVITIES_API_PENDING = "ACTIVITIES_API_PENDING";
const ACTIVITIES_FETCH_SUCC = "ACTIVITIES_FETCH_SUCC";
const ACTIVITY_POST_SUCC = "ACTIVITY_POST_SUCC";
const ACTIVITY_PATCH_SUCC = "ACTIVITY_PATCH_SUCC";
const ACTIVITY_DELETE_SUCC = "ACTIVITY_DELETE_SUCC";

const ACTIVITY_FOCUSED = "ACTIVITY_FOCUSED";


// actions:
export const doFocusActivity = focusedActivityId => ({type: ACTIVITY_FOCUSED, focusedActivityId});

export const doActivityFetchAllPending = () =>({type: ACTIVITIES_API_PENDING, apiType: 'fetchAll'});
export const doActivityFetchAllFail = error => ({type: ACTIVITIES_API_FAIL, apiType: 'fetchAll', error: error });
export const doActivityFetchAllSucc = activities => ({type: ACTIVITIES_FETCH_SUCC, activities});
export const doActivityFetchAll = () => dispatch => {
  dispatch(doActivityFetchAllPending());
  return axios.get("/activities")
    .then(
      payload => dispatch(doActivityFetchAllSucc(payload.data._embedded.activities)),
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

  // view:
  day: today(),
  focusedActivityId: null,

  // api status:
  fetchAll:{},
  post:{},
  patch:{},
  deleteStatus:{},
};


// selectors:
const getActivitiesState = states => states.activitiesState;
const getActivitiesModel = createSelector(getActivitiesState, state => state.model);
export const getFetchAll = createSelector(getActivitiesState, state => state.fetchAll);
export const getPost = createSelector(getActivitiesState, state => state.post);
export const getPatch = createSelector(getActivitiesState, state => state.patch);
export const getDelete = createSelector(getActivitiesState, state => state.deleteStatus);
export const getDay = createSelector(getActivitiesState, state => state.day);
export const getFocusedActivityId = createSelector(getActivitiesState, state => state.focusedActivityId);

export const getFocusedActivity = createSelector(getActivitiesModel, getFocusedActivityId, (model,id) => id && model[id]);

export const getActivitiesArray = createSelector(getActivitiesModel, model => Object.keys(model).map(k => model[k]));
export const getDayActivitiesArray = createSelector(getActivitiesArray, getDay, (list, day) => {
  let nextDay = day.clone().add(1, 'day');
  return list.filter(({from,to}) => day < Moment(to) && Moment(from) < nextDay);
});


// reducer
export default function reducer(state=initialState, action){
  let {model, fetchAll, post, patch, deleteStatus} = state;
  let {type, apiType, error, activities, activity, deleteId, focusedActivityId} = action;
  let apiStatus;

  switch (type) {
    case ACTIVITY_FOCUSED:
      return {...state, focusedActivityId};

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