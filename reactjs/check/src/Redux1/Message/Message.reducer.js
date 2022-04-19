import { GM, GN } from "./Message.action";
let initialState = {
  message: "Hello",
};
let messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GM:
      return { message: action.payload };
    case GN:
      return { message: "Good Night" };
    default:
      return state;
  }
};
export { messageReducer };
