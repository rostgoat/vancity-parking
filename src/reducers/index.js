import { combineReducers } from "redux";
import areaReducer from "./areaReducer";
import searchReducer from "./searchReducer";
import mapReducer from "./mapReducer";

export default combineReducers({
  areas: areaReducer,
  searchResponse: searchReducer,
  mapReducer: mapReducer
});
