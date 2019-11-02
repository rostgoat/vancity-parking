import { SET_SEARCHED_RESPONSE } from "./types";

export const setSearchResponse = (areas = null) => async dispatch => {

  try {
    dispatch({
        type: SET_SEARCHED_RESPONSE,
        searchResponse: areas
      });
  } catch (error) {
    return error;
  }
};
