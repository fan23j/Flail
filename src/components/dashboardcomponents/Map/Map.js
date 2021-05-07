import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 35.9049,
            lng: -79.0469,
          }}
        >
          <Marker lat={35.9049} lng={-79.0469} label={"fan23j 192"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAGrKAbeFq-V_gXPQfECtQQP-9OE_J8ltE",
})(MapContainer);
