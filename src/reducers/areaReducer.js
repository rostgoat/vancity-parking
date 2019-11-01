import { FETCH_AREAS, NEW_POST } from "../actions/types";

const initialState = {
  areas: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AREAS:
      console.log("f");
      return {
        ...state,
        areas: action.areas
      };
    default:
      return state;
  }
}
