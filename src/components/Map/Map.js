import React, { Component, PureComponent } from "react";
import "./Map.scss";
import { connect } from "react-redux";
// import Marker from "../Marker/Marker";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import _ from "lodash";
import "../Marker/Marker.scss";
import { setMapZoom, setMapCenter } from "../../actions/mapActions";
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
  // static getDerivedStateFromProps(props, state) {
  //   const oldCenter = state.center;
  //   console.log("state", state);
  //   if (props.searchedResponse && props.searchedResponse.data.records.length > 0) {
  //     const newCenter = props.searchedResponse.data.records[0].fields.geom.coordinates;
  //     const newZoom = state.zoom;
  //     const [newLng, newLat] = [...newCenter];
  //     const { lat, lng } = oldCenter;

  //     if (lat !== newLat && lng !== newLng) {
  //       return {
  //         center: { lat: newLat, lng: newLng },
  //         zoom: newZoom
  //       };
  //     }
  //   }
  //   return null;
  // }

  /**
   * Display marker info window on hover
   */
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPlace: props
    });
    this.onSendMarkerInfoToParent();
  };

  onSendMarkerInfoToParent = (e, marker) => {
    this.props.onSendMarkerInfoToParent(e, marker);
  };

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  render() {
    const { areas } = this.props.areas;
    const { center, zoom } = this.props.map;

    if (areas && areas.data && areas.data.records) {
      const newCenter = areas.data.records[0].fields.geom.coordinates;
      const [newLng, newLat] = [...newCenter];
      this.props.setMapCenter({ lat: newLat, lng: newLng });
    }
    return (
      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap id="map" center={center} zoom={zoom}>
            <Markers
              markers={areas && areas.data && areas.data.records ? areas.data.records : null}
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
const mapStateToProps = state => {
  return {
    areas: state.areas,
    map: state.mapReducer
  };
};

export default connect(
  mapStateToProps,
  { setMapCenter, setMapZoom }
)(MapContainer);
