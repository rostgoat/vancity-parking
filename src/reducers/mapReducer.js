import { SET_MAP_CENTER, SET_MAP_ZOOM } from "../actions/types";

const lat = 49.2827;
const lng = -123.1207;
const defaultZoom = 17;

const initialState = {
  center: { lat, lng },
  zoom: defaultZoom
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_CENTER:
      return {
        ...state,
        center: action.center
      };
    case SET_MAP_ZOOM:
      return {
        ...state,
        zoom: action.zoom
      };
    default:
      return state;
  }
}
