import moment from "moment/min/moment-with-locales"
moment.locale('zh-cn');

export const Moment = moment;

const debugLog = (...args)=>{
  if(args.length <= 1) args = args[0];
  console.log("--------------debug:");
  console.log(JSON.stringify(args));
};

export const debug = func =>{
  if(typeof func === "function")
    return (...args) => {
      debugLog(...args);
      return func(...args)
    };
  else{
    let value = func;
    debugLog(value);
    return value;
  }
};

export const idModelFromList = (list, {model={}, tempId=10000}) => {
  let byId = {}, newTempId=tempId;
  for(let item of list)
    if(item.id)
      byId[item.id] = item;
    else
      byId[newTempId++] = item;
  let newModel = {...model, ...byId};
  return {newModel, newTempId};
};

export const today = () => moment().startOf('day');

export const range = (k, {begin=0}={}) => {     // begin <= v < begin+k
  let ret = [];
  for(let i =0; i<k; i++)
    ret.push(i+begin);
  return ret;
};

export const nextKHours = (baseMoment, k) => range(k).map(i => baseMoment.clone().add(i, 'hours'));
export const hourDuration = (from, to) => moment.duration(moment(to) - moment(from)).asHours();
export const hourTimeFormat = time => moment(time).format("HH:mm");
