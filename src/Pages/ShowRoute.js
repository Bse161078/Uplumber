import React, { useState } from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import MyRoute from "./MyRoute";
import { withScriptjs } from "react-google-maps";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 12,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
  },
  label: {
    width: "100%",
    // color: "#aeaeae",
    color: "#1075c2",
    margin: 0,
    fontSize: 13,
    marginTop: 20,
  },
  icon: {
    color: "#aeaeae",
  },
  button: {
    color: "white",
    border: "none",
    borderRadius: 15,
    width: "80%",
    background: "#1075c2",
    height: 45,
    marginTop: 20,
  },
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const MapLoader = withScriptjs(MyRoute);

  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [needModifications, setNeedModifications] = React.useState(false);
  const [modification, setModification] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Contacts");

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];
  //console.log("THis is great", props);
  return (
    <div
      style={{ background: "#f2f2f2", background: "white", maxWidth: "100vw" }}
    >
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Provider Tracking"}
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                document.getElementById("homepage").click();
              }}
            ></ArrowBackIosIcon>
          }
          rightIcon={<div></div>}
        ></Header>{" "}
      </div>
      {/* <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq27GUrA_sALBWCaEo3n4AtmGl4Krq7NA"
        loadingElement={<div style={{ height: `100%` }} />}
      /> */}
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2mTVqK-uOK_Pbo0tTXyUtUP84cClbS9Q"
        loadingElement={<div style={{ height: `100%` }} />}
      />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        style={{
          marginTop: 0,
          maxHeight: "calc( 100vh - 60px )",
          // minHeight: "calc( 100vh - 100px )",
          overflowY: "scroll",
        }}
      >
        <div className="sideBar">
          <Drawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer("bottom", false)}
          >
            <div style={{ width: "60vw" }}>
              <Sidebar></Sidebar>
            </div>
          </Drawer>
        </div>
      </Grid>
    </div>
  );
}
export default withRouter(ProviderDetail);
