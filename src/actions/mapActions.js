import { SET_MAP_CENTER, SET_MAP_ZOOM } from "./types";

export const setMapCenter = (center = null) => async dispatch => {
  try {
    dispatch({
      type: SET_MAP_CENTER,
      center
    });
  } catch (error) {
    return error;
  }
};

export const setMapZoom = (zoom = null) => async dispatch => {
  try {
    dispatch({
      type: SET_MAP_ZOOM,
      zoom
    });
  } catch (error) {
    return error;
  }
};

export default {
  setMapCenter,
  setMapZoom
};
