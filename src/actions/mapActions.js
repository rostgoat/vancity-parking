import { SET_MAP_CENTER, SET_MAP_ZOOM } from "./types";

export const setMapCenter = (center = null) => dispatch => {
  try {
    dispatch({
      type: SET_MAP_CENTER,
      center
    });
  } catch (error) {
    return error;
  }
};

export const setMapZoom = () => dispatch => {
  try {
    dispatch({
      type: SET_MAP_ZOOM
    });
  } catch (error) {
    return error;
  }
};

export default {
  setMapCenter,
  setMapZoom
};
