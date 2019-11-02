import { combineReducers } from "redux";
import areaReducer from "./areaReducer";
import searchReducer from "./searchReducer";


export default combineReducers({
  areas: areaReducer,
  searchResponse: searchReducer,
});
