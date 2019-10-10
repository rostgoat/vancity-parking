import React, { Component } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Marker.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3"></Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);

class Marker extends Component {
  state = {
    markerData: {}
  };
  _onClick() {
    this.props.handleMarkerClick(this.props.marker);
  }

  handleClick = mapEvent => {
    mapEvent.origin = "popup";
  };
  static getDerivedStateFromProps(props, state) {
    // console.log("props", props);
    // console.log("state", state);

    if (props.markerData !== null) {
      if (props.markerData !== state.markerData) {
        return {
          markerData: props.markerData
        };
      }
    }
    return null;
  }
  render() {
    console.log("this.props.showPopup", this.props.showPopup);
    return (
      <div>
        <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
          <FaMapMarkerAlt size="2em" className="icon" />
        </OverlayTrigger>
      </div>
    );
  }
}

export default Marker;
