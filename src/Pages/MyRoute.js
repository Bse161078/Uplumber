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
    origin: { lat: 6.5244, lng: 3.3792 },
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      return true;
    } else {
      alert("App need your location work properly");
    }
    return false;
  };

  showPosition = (position) => {
    console.log("This is the position", position.coords);
    this.setState({
      origin: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
    console.log("This is data", {
      lat: JSON.parse(localStorage.getItem("plumberlat")),
      lng: JSON.parse(localStorage.getItem("plumberlong")),
    });
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        // localStorage.setItem("plumberlat", item.latitude);
        // localStorage.setItem("plumberlong", item.longitude);
        // destination: { lat: 6.5244, lng: 3.3792 },
        destination: {
          lat: JSON.parse(localStorage.getItem("plumberlat")),
          lng: JSON.parse(localStorage.getItem("plumberlong")),
          // lat: 32.785834,
          // lng: 72.406417,
        },
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
  };
  componentDidMount() {
    this.getLocation();

    const origin = { lat: 6.5244, lng: 3.3792 };
    const destination = { lat: 6.4667, lng: 3.45 };
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
