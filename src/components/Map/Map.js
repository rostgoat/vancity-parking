import React, { Component, useState } from "react";
import * as meterData from "../../data/parking-meters1.json";
import "./Map.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";

// const useMap = props => {
//   const [selectedMeter, setSelectedMeter] = useState(null);
//   let defaultLat, defaultLng;
//   if (props.data) {
//     defaultLat = props.data.data.records[0].fields.geom.coordinates[1];
//     defaultLng = props.data.data.records[0].fields.geom.coordinates[0];
//   } else {
//     defaultLat = 49.2827;
//     defaultLng = -123.1207;
//   }

//   return (
//     <GoogleMap
//       defaultZoom={14}
//       defaultCenter={{ lat: defaultLat, lng: defaultLng }}
//       panTo={{ lat: defaultLat, lng: defaultLng }}
//     >
//       {props.data
//         ? props.data.data.records.map(meter => (
//             <Marker
//               key={meter.recordid}
//               position={{ lat: meter.fields.geom.coordinates[1], lng: meter.fields.geom.coordinates[0] }}
//               onClick={() => {
//                 setSelectedMeter(meter);
//               }}
//             />
//           ))
//         : null}

//       {/* shows info window about meter. onCloseClick allows you to close the info window and open another one, reseting state */}
//       {selectedMeter && (
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
//       )}
//     </GoogleMap>
//   );
// };

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 14
  };
  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
    const Marker = ({ text }) => <div>{text}</div>;
    return (
      <div className="map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={{
            key: "AIzaSyBlh-6hh0jO_I2c7FWR-vNzFsDqebeaL9I"
          }}
        >
          {data
            ? data.data.records.map(marker => (
                <Marker
                  key={marker.recordid}
                  lat={marker.fields.geom.coordinates[1]}
                  lng={marker.fields.geom.coordinates[0]}
                  text={"M"}
                />
              ))
            : null}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
