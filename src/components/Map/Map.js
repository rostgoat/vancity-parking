import React, { Component, useState } from "react";
// import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import * as meterData from "../../data/parking-meters1.json";
import "./Map.css";
import mapStyles from "./mapStyles.json";

// const useMap = props => {
//   const [selectedMeter, setSelectedMeter] = useState(null);
//   return (
//     <GoogleMap defaultZoom={14} defaultCenter={{ lat: 49.2827, lng: -123.1207 }}>
//       {props.data
//         ? props.data.data.records.map(meter => (
//             <Marker
//               key={meter.recordid}
//               position={{ lat: meter.fields.geom.coordinates[1], lng: meter.fields.geom.coordinates[0] }}
//               // onClick={() => {
//               //   setSelectedMeter(meter);
//               // }}
//             />
//           ))
//         : null}

//       {/* shows info window about meter. onCloseClick allows you to close the info window and open another one, reseting state */}
//       {/* {selectedMeter && (
//         <InfoWindow
//           position={{ lat: selectedMeter.fields.geom.coordinates[1], lng: selectedMeter.fields.geom.coordinates[0] }}
//           onCloseClick={() => {
//             setSelectedMeter(null);
//           }}
//           // icon={{
//           //   url: "../../../public/circle.svg",
//           //   scaledSize: new.target.google.maps.Size(25,25)
//           // }}
//         >
//           <div>
//             <h3>
//               <b>Meter Information</b>
//             </h3>
//             <h4>PayByPhone : {selectedMeter.fields.pay_phone}</h4>
//             Rates: Mon-Fri 9:00 AM - 6:00 PM - {selectedMeter.fields.r_mf_9a_6p} ({selectedMeter.fields.t_mf_9a_6p})
//           </div>
//         </InfoWindow>
//       )} */}
//     </GoogleMap>
//   );
// };

// const WrappedMap = withScriptjs(withGoogleMap(useMap));

const onErrorHandle = error => {
  console.log("error :", error);
};
class Map extends Component {
  render() {
    const data = this.props.searchedResponse;
    const defaultMapOptions = {
      styles: mapStyles.styles
    };
    return (
      <div className="map">
        {/* //   <WrappedMap */}
        {/* //     defaultOptions={defaultMapOptions}
      //     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
      //     loadingElement={<div style={{ height: `100%` }} />}
      //     containerElement={<div style={{ height: `100vh` }} />}
      //     mapElement={<div style={{ height: `100%` }} />}
      //     data={data}
      //   /> */}
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY} onError={this.onErrorHandle}>
          <GoogleMap defaultZoom={14} defaultCenter={{ lat: 49.2827, lng: -123.1207 }}></GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default Map;
