import { FETCH_AREAS } from "../actions/types";

const initialState = {
  areas: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AREAS:
      return {
        ...state,
        areas: action.areas
      };
    default:
      return state;
  }
}
