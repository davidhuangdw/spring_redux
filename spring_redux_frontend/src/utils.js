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
export const isToday = time => time.startOf('day').isSame(today());

export const range = (k, {begin=0}={}) => {     // begin <= v < begin+k
  let ret = [];
  for(let i =0; i<k; i++)
    ret.push(i+begin);
  return ret;
};

export const HOUR_FORMAT = "HH:mm";
export const nextKHours = (baseMoment, k) => range(k).map(i => baseMoment.clone().add(i, 'hours'));
export const hourDuration = (from, to) => moment.duration(moment(to) - moment(from)).asHours();
export const hourTimeFormat = time => moment(time).format(HOUR_FORMAT);
export const parseHourFormat = str => moment(str, HOUR_FORMAT);
export const joinDayHour = (day, hourStr) => {
  let hourTime = parseHourFormat(hourStr);
  return day.clone().hour(hourTime.hour()).minute(hourTime.minute());
};
export const dayFormat = time => (isToday(time) ? "(今天)" : "") + time.format('ll');

export const validateActivityRequestBody = ({beginHour, endHour, description, category}) => {
  let begin = parseHourFormat(beginHour);
  let end = parseHourFormat(endHour);
  let errors = [];
  if(!category) errors.push("Category is required");
  if(!begin.isValid()) errors.push("Begin is invalid");
  if(!end.isValid()) errors.push("End is invalid");
  if(begin >= end) errors.push("Begin shouldn't be great than End");
  return errors;
};

export const buildActivityPayload = ({id, beginHour, endHour, description, category, day}) => {
  let from = joinDayHour(day, beginHour).toJSON();
  let to = joinDayHour(day, endHour).toJSON();
  return {id, from, to,description, category};
};

