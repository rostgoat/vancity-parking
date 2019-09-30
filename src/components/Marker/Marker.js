import React, { Component } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Marker.scss";

class Marker extends Component {
  render() {
    return (
      <div>
        <FaMapMarkerAlt size="2em" className="icon" />
      </div>
    );
  }
}

export default Marker;
