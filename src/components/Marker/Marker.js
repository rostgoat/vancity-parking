import React, { Component } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

class Marker extends Component {
  render() {
    return (
      <div>
        <FaMapMarkerAlt color="red" size="2em" />
      </div>
    );
  }
}

export default Marker;
