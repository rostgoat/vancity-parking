import React, { Component } from "react";
import "./Map.scss";
// import Marker from "../Marker/Marker";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "../Marker/Marker.scss";
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
    showingInfoWindow: false,
    selectedMarker: ""
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

  onMarkerClick = (e, marker) => {
    console.log("marker", marker);
    this.setState({
      selectedMarker: marker.recordid,
      showingInfoWindow: true
    });
  };

  onSendMarkerInfoToParent = e => {
    console.log("g");
    this.props.onSendMarkerInfoToParent(e);
  };

  render() {
    const data = this.props.searchedResponse;
    const Markers = props =>
      data
        ? data.data.records.map(marker => {
            return (
              <Marker
                position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
                key={marker.recordid}
                onClick={e => this.onMarkerClick(e, marker)}
                icon={{
                  path:
                    "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                  fillColor: "#0000ff",
                  fillOpacity: 1.0,
                  strokeWeight: 0,
                  scale: 1.25
                }}
              >
                {this.state.showingInfoWindow && this.state.selectedMarker === marker.recordid && (
                  <InfoWindow
                    className="info-window"
                    position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
                    onSendMarkerInfoToParent={this.onSendMarkerInfoToParent}
                  >
                    <div>{marker.recordid}</div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })
        : null;
    return (
      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap id="map" center={this.state.center} zoom={this.state.zoom}>
            <Markers />
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default MapContainer;
