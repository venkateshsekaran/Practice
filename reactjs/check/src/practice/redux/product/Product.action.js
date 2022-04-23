const INCR = "incr";
const DECR = "decr";

let incrAction = () => {
  return { type: INCR };
};
let decrAction = () => {
  return { type: DECR };
};
export { INCR, DECR, incrAction, decrAction };
