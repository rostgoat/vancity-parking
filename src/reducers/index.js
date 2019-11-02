import { combineReducers } from "redux";
import areaReducer from "./areaReducer";

export default combineReducers({
  areas: areaReducer
});
