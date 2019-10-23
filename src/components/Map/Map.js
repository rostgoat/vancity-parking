import React, { Component } from "react";
import "./Map.scss";
// import Marker from "../Marker/Marker";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "../Marker/Marker.scss";
// constant initial values
const lat = 49.2827;
const lng = -123.1207;
const defaultZoom = 17;
const iconPath =
  "M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0  C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6  s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z";

/**
 * Function returns rate of marker based on current day and time
 *
 * @param {Object} marker - marker object from the map
 */
const rateTimeCalc = marker => {
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

  /**
   * Display marker info window on hover
   */
  onMarkerHover = (e, marker) => {
    this.setState({
      selectedMarker: marker.recordid,
      showingInfoWindow: true
    });
    this.onSendMarkerInfoToParent();
  };

  /**
   * Display marker info window on hover
   */
  onMarkerUnHover = (e, marker) => {
    this.setState({
      selectedMarker: marker.recordid,
      showingInfoWindow: false
    });
    this.onSendMarkerInfoToParent();
  };

  onSendMarkerInfoToParent = (e, marker) => {
    console.log("child");
    this.props.onSendMarkerInfoToParent(e, marker);
  };

  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
    const Markers = props =>
      data
        ? data.data.records.map(marker => {
            return (
              <Marker
                position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
                key={marker.recordid}
                onClick={e => this.onMarkerClick(e, marker)}
                onMouseOver={e => this.onMarkerHover(e, marker)}
                onMouseOut={e => this.onMarkerUnHover(e, marker)}
                // icon={{
                //   path: iconPath,
                //   fillColor: `rgb(109, 162, 247)`,
                //   fillOpacity: 1.0,
                //   strokeWeight: 0,
                //   scale: 0.55
                // }}
              >
                {this.state.showingInfoWindow && this.state.selectedMarker === marker.recordid && (
                  <InfoWindow
                    className="info-window"
                    position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
                  >
                    <div>{rateTimeCalc(marker)}</div>
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
