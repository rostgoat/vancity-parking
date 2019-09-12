import React, { Component, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as meterData from "../../data/parking-meters1.json";
import "./Map.css";

function useMap() {
  const [selectedMeter, setSelectedMeter] = useState(null)
  
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 49.2827, lng: -123.1207 }}> 
      {meterData.data.map(meter => (
        <Marker 
          key={meter.recordid} 
          position={{lat: meter.fields.geom.coordinates[1], lng: meter.fields.geom.coordinates[0]}}
          onClick={() => {
            setSelectedMeter(meter);
          }}/>
      )
    )}

    {/* shows info window about meter. onCloseClick allows you to close the info window and open another one, reseting state */}
    {selectedMeter && (
      <InfoWindow
        position={{lat: selectedMeter.fields.geom.coordinates[1], lng: selectedMeter.fields.geom.coordinates[0]}}
        onCloseClick={() => {setSelectedMeter(null)}}
        >
        <div>deets</div>
      </InfoWindow>
    )} 
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(useMap));
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