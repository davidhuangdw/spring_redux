
export const debug = func => (...args) => {
  console.log(JSON.stringify(args));
  return func(...args)
};
