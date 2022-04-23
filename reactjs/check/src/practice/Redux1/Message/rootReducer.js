import { combineReducers } from "redux";
import { messageReducer } from "./Message.reducer";
let rootReducer = combineReducers({ message: messageReducer });
export { rootReducer };
