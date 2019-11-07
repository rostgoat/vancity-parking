import React, { Component, PureComponent } from "react";
import "./Map.scss";
import { connect } from "react-redux";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import _ from "lodash";
import "../Marker/Marker.scss";
import { setMapZoom, setMapCenter } from "../../actions/mapActions";
import { rateTimeCalc } from "../../utils/utils";

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
    console.log("i am called in map");

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
