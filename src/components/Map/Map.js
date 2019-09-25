import React, { Component } from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Marker";
class Map extends Component {
  state = {
    center: [49.2827, -123.1207],
    zoom: 14
  };

  onChange = (center, zoom) => {
    this.setState({
      center: center,
      zoom: zoom
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("prevProps :", prevProps);
    console.log("prevState :", prevState);
  }
  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
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
          // onChange={this.onChange}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
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
