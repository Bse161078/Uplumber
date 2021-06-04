import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
class Map extends Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 6.5244, lng: 3.3792 };
    const destination = { lat: 6.4667, lng: 3.45 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={{ lat: 6.5244, lng: 3.3792 }} defaultZoom={13}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `100vh`, width: "100vw" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
