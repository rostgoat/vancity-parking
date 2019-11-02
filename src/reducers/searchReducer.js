import { SET_SEARCHED_RESPONSE } from "../actions/types";

const initialState = {
  searchResponse: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCHED_RESPONSE:
      return {
        ...state,
        searchResponse: action.searchResponse
      };
    default:
      return state;
  }
}
