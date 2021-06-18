import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import data from "../Data/locations.json";
import Markers from "./VenueMarker";
import { Grid, Paper, IconButton } from "@material-ui/core";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 52.52437, lng: 13.41053 },
      zoom: 4,
    };
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Markers venues={data.venues} />
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          style={{ height: "98%" }}
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            style={{ position: "relative", width: "50%", zIndex: 100000000000 }}
          >
            <Paper style={{ marginLeft: "2%" }}>
              <IconButton>
                <GpsFixedIcon></GpsFixedIcon>
              </IconButton>
            </Paper>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="flex-end"
            style={{ position: "relative", width: "50%", zIndex: 100000000000 }}
          >
            <Paper style={{ marginRight: "2%" }}>
              <IconButton>
                {" "}
                <GpsFixedIcon></GpsFixedIcon>
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Map>
    );
  }
}

export default MapView;
