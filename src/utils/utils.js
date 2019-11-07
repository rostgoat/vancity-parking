/**
 * Function returns rate of marker based on current day and time
 *
 * @param {Object} marker - marker object from the map
 */
export const rateTimeCalc = marker => {
  const { fields } = marker;

  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  // weekdays
  if (day >= 1 || day <= 5) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return fields.r_mf_9a_6p;

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return fields.r_mf_6p_10;

      // 10pm - 9am
    } else {
      return "Free";
    }
    // Saturday
  } else if (day === 6) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return fields.r_sa_9a_6p;

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return fields.r_sa_6p_10;

      // 10pm - 9am
    } else {
      return "Free";
    }
    // Sunday
  } else if (day === 0) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return fields.r_su_9a_6p;

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return fields.r_su_6p_10;

      // 10pm - 9am
    } else {
      return "Free";
    }
  }
};
