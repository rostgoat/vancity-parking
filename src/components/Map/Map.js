import React, { Component, PureComponent } from "react";
import "./Map.scss";
// import Marker from "../Marker/Marker";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import _ from "lodash";
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

class Markers extends PureComponent {
  render() {
    return this.props.markers
      ? this.props.markers.map(marker => {
          return (
            <Marker
              position={{ lat: marker.fields.geom.coordinates[1], lng: marker.fields.geom.coordinates[0] }}
              key={marker.recordid}
              onClick={e => this.props.onMarkerClick(e, marker)}
              onMouseOver={this.onMarkerHover}
              {...this.props}
            />
          );
        })
      : null;
  }
}
/**
 * Map Class that renders the Google Map
 */
class MapContainer extends Component {
  state = {
    center: { lat, lng },
    zoom: defaultZoom,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
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
  onMarkerClick = (props, marker) => {
    console.log("marker child", marker);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPlace: props
    });
    this.onSendMarkerInfoToParent();
  };

  onSendMarkerInfoToParent = (e, marker) => {
    console.log("child");
    this.props.onSendMarkerInfoToParent(e, marker);
  };

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  render() {
    const data = this.props.searchedResponse;
    console.log("this.state.activeMarker", this.state.activeMarker);
    return (
      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap id="map" center={this.state.center} zoom={this.state.zoom}>
            <Markers
              markers={data && data.data && data.data.records ? data.data.records : null}
              onMarkerClick={this.onMarkerClick}
            />
            {this.state.showingInfoWindow && (
              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                position={{
                  lat: !_.isEmpty(this.state.activeMarker) ? this.state.activeMarker.fields.geom.coordinates[1] : null,
                  lng: !_.isEmpty(this.state.activeMarker) ? this.state.activeMarker.fields.geom.coordinates[0] : null
                }}
              >
                <div>{!_.isEmpty(this.state.activeMarker) ? rateTimeCalc(this.state.activeMarker) : null}</div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default MapContainer;
