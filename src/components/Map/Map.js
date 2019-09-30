import React, { Component } from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Marker";

// constant initial values
const defaultLat = 49.2827;
const defaultLng = -123.1207;
const defaultZoom = 14;

/**
 * Map Class that renders the Google Map
 */
class Map extends Component {
  state = {
    center: [defaultLat, defaultLng],
    zoom: defaultZoom
  };

  /**
   * Method re-centers map whenever new props are passed in
   *
   * @param { Object } props
   * @param { Object } state
   */
  static getDerivedStateFromProps(props, state) {
    const oldCenter = state.center;

    if (props.searchedResponse !== null) {
      const newCenter = props.searchedResponse.data.records[0].fields.geom.coordinates;

      const [newLng, newLat] = [...newCenter];
      const [oldLat, oldLng] = [...oldCenter];

      if (oldLat !== newLat && oldLng !== newLng) {
        return {
          center: [newLat, newLng],
          zoom: 16
        };
      }
    }
    return null;
  }

  render() {
    const data = this.props.searchedResponse;
    const Markers = data
      ? data.data.records.map(marker => (
          <Marker
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
          center={this.state.center}
          zoom={this.state.zoom}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY
          }}
        >
          {Markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
