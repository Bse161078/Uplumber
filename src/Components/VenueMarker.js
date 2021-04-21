import React, { Fragment } from "react";
import { Marker } from "react-leaflet";
// import { VenueLocationIcon } from "./VenueLocationIcon";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <Marker key={index} position={venue.geometry} icon={LocationOnIcon}>
      {/* <MarkerPopup data={venue} /> */}
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>;
};

export default VenueMarkers;
