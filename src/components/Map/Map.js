import React, { Component } from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 14
  };
  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
    const Markers = data
      ? data.data.records.map(marker => (
          <FaMapMarkerAlt
            color="red"
            size="2em"
            key={marker.recordid}
            lat={marker.fields.geom.coordinates[1]}
            lng={marker.fields.geom.coordinates[0]}
          />
        ))
      : null;
    return (
      <div className="map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={30}
          bootstrapURLKeys={{
            key: "AIzaSyBlh-6hh0jO_I2c7FWR-vNzFsDqebeaL9I"
          }}
        >
          {Markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
