let GM = "GM";
let GN = "GN";
let gmAction = () => {
  return { type: GM, payload: "Good morning Venkat" };
};
let gnAction = () => {
  return { type: GN };
};
export { gmAction, gnAction, GM, GN };
