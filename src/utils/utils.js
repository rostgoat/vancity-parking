const formatAMPM = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
/**
 * Function returns length_of_stay of marker based on current day and time
 *
 * @param {Object} marker - marker object from the map
 */
export const rateTimeCalc = marker => {
  const { fields } = marker;

  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();
  const currentTime = formatAMPM(today);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };

  // weekdays
  if (day >= 1 || day <= 5) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return {
        rate_per_hour: fields.r_mf_9a_6p,
        length_of_stay: fields.t_mf_9a_6p,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return {
        rate_per_hour: fields.r_mf_6p_10,
        length_of_stay: fields.t_mf_6p_10,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 10pm - 9am
    } else {
      return {
        length_of_stay: "Free",
        day: days[day],
        currentTime
      };
    }
    // Saturday
  } else if (day === 6) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return {
        rate_per_hour: fields.r_sa_9a_6p,
        length_of_stay: fields.t_sa_9a_6p,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return {
        rate_per_hour: fields.r_sa_6p_10,
        length_of_stay: fields.t_sa_6p_10,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 10pm - 9am
    } else {
      return {
        length_of_stay: "Free",
        day: days[day],
        currentTime
      };
    }
    // Sunday
  } else if (day === 0) {
    // 9 am - 6pm
    if (hours >= 9 && hours < 18) {
      return {
        rate_per_hour: fields.r_su_9a_6p,
        length_of_stay: fields.t_su_9a_6p,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 6pm - 10pm
    } else if (hours >= 18 && hours < 22) {
      return {
        rate_per_hour: fields.r_su_6p_10,
        length_of_stay: fields.t_su_6p_10,
        day: days[day],
        currentTime,
        creditcard: fields.creditcard,
        pay_phone: fields.pay_phone
      };

      // 10pm - 9am
    } else {
      return {
        length_of_stay: "Free",
        day: days[day],
        currentTime
      };
    }
  }
};
