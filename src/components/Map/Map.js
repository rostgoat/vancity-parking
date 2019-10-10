import React, { Component } from "react";
import "./Map.scss";
// import Marker from "../Marker/Marker";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
// constant initial values
const lat = 49.2827;
const lng = -123.1207;
const defaultZoom = 17;

/**
 * Map Class that renders the Google Map
 */
class MapContainer extends Component {
  state = {
    center: { lat, lng },
    zoom: defaultZoom,
    showPopup: false
  };

  /**
   * Method re-centers map whenever new props are passed in
   *
   * @param { Object } props
   * @param { Object } state
   */
  static getDerivedStateFromProps(props, state) {
    const oldCenter = state.center;

    if (props.searchedResponse && props.searchedResponse.data.records.length > 0) {
      const newCenter = props.searchedResponse.data.records[0].fields.geom.coordinates;
      const newZoom = state.zoom;
      const [newLng, newLat] = [...newCenter];
      const { lat, lng } = oldCenter;

      if (lat !== newLat && lng !== newLng) {
        return {
          center: { lat: newLat, lng: newLng },
          zoom: newZoom
        };
      }
    }
    return null;
  }

  togglePopup = () => this.setState(prevState => ({ showPopup: !prevState.showPopup }));
  render() {
    const data = this.props.searchedResponse;

    const Markers = data
      ? data.data.records.map(marker => {
          return (
            <Marker
              position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
              key={marker.recordid}
            />
          );
        })
      : null;
    return (
      <div className="map">
        <Map
          google={this.props.google}
          initialCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}
          zoom={this.state.zoom}
        >
          {Markers}

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1></h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer);
