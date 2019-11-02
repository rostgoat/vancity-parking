import { FETCH_AREAS } from "./types";
import axios from "axios";

export const fetchAreas = () => async dispatch => {
  const onSuccess = areas => {
    dispatch({
      type: FETCH_AREAS,
      areas
    });
    return areas;
  };

  try {
    const areas = await axios.get(
      `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&rows=50&facet=geo_local_area&refine.geo_local_area=Hastings-Sunrise`
    );
    return onSuccess(areas);
  } catch (error) {
    return error;
  }
};
