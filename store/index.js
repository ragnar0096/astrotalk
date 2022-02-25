import categoryReducer from "./category";
import { combineReducers } from "redux";
import friendsFamilyReducer from "./friendsFamily";

const reducers = combineReducers({ categoryReducer, friendsFamilyReducer });
export default reducers;
