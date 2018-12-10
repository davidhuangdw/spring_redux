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
export const toSelf = v => v;

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

export const startOfDay = time => moment(time).startOf('day');
export const today = () => startOfDay();
export const isSameDay = (a, b) => startOfDay(moment(a)).isSame(startOfDay(moment(b)));
export const isToday = time => isSameDay(time, today());

export const range = (k, {begin=0}={}) => {     // begin <= v < begin+k
  let ret = [];
  for(let i =0; i<k; i++)
    ret.push(i+begin);
  return ret;
};

export const compareValue = ((a,b)=> a===b ? 0 : a<b ? -1 : 1);
export const maxBy = (list, compare=compareValue) => list.reduce((max, v)=> max===undefined || compare(v, max) >= 0 ? v : max, undefined);
export const minBy = (list, compare=compareValue) => list.reduce((min, v)=> min===undefined || compare(v, min) < 0 ? v : min, undefined);
export const compareWithIndex = compare => (a, ai, b, bi) => compare(a,b)===0 ? compareValue(ai, bi) : compare(a,b);
export const findPrev = (x, list, compare=compareValue) => {
  if(!x) return;
  let ix = list.findIndex(v => v===x);
  if(ix === undefined) return;

  let comp = compareWithIndex(compare);
  let smallerList = list.filter((v,i) => comp(v, i, x, ix) < 0);

  let maxPair = maxBy(smallerList.map((v,i)=>[v,i]), (pa,pb)=>comp(...pa, ...pb));
  return maxPair && maxPair[0];
};
export const findNext = (x, list, compare=compareValue) => findPrev(x, [...list].reverse(), (a,b)=>-compare(a,b));

export const maxMoment = (x, y) => moment(x) < moment(y) ? moment(y) : moment(x);
export const minMoment = (x, y) => moment(x) < moment(y) ? moment(x) : moment(y);
export const HOUR_FORMAT = "HH:mm";
export const nextKHours = (baseMoment, k) => range(k).map(i => baseMoment.clone().add(i, 'hours'));
export const hourDuration = (from, to) => moment.duration(moment(to) - moment(from)).asHours();
export const hourTimeFormat = time => moment(time).format(HOUR_FORMAT);
export const parseHourFormat = str => moment(str, HOUR_FORMAT);
export const joinDayHour = (day, hourTime) => {
  return day.clone().hour(hourTime.hour()).minute(hourTime.minute());
};
export const dayFormat = time => (isToday(time) ? "(今天)" : "") + time.format('ll');

export const validateActivityRequestBody = ({beginHour, endHour, crossDay, description, category}) => {
  let begin = parseHourFormat(beginHour);
  let end = parseHourFormat(endHour);
  if(crossDay) end.add(1, 'day');
  let errors = [];

  if(!category) errors.push("Category is required");
  if(!begin.isValid()) errors.push("Begin is invalid");
  if(!end.isValid()) errors.push("End is invalid");
  if(begin >= end) errors.push("Begin shouldn't be great than End");
  return errors;
};

export const buildActivityPayload = ({id, beginHour, endHour, crossDay, description, category, day}) => {
  let plus = crossDay ? 1 : 0;
  let from = joinDayHour(day, parseHourFormat(beginHour)).toJSON();
  let to = joinDayHour(day, parseHourFormat(endHour)).add(plus, 'day').toJSON();
  return {id, from, to, description, category};
};

