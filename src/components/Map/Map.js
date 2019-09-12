import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import * as meterData from "../../data/parking-meters1.json";
import "./Map.css";

function map() {
  console.log('meterData :', meterData);
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 49.2827, lng: -123.1207 }}> 
      {meterData.data.map(meter => (
        <Marker 
          key={meter.recordid} 
          position={{lat: meter.fields.geom.coordinates[1], lng: meter.fields.geom.coordinates[0]}}
          />
      )
    )} 
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(map));
class Map extends Component {
  render() {
    return (
      <div className="map">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBlh-6hh0jO_I2c7FWR-vNzFsDqebeaL9I`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
