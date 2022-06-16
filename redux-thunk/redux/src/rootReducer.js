import { combineReducers } from "redux";
import { userReducer } from "./User.reducer";
let rootReducer = combineReducers({ users: userReducer });
export { rootReducer };
