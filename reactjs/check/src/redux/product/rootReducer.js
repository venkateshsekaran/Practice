import { combineReducers } from "redux";

import { productReducer } from "./Product.reducer";
let rootReducer = combineReducers({ product: productReducer });
export { rootReducer };
