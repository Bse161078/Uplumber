import React from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import UPlumberLogo from "../assets/uplumberlogo.png";
import Plumbers from "../assets/Plumbers.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    border: "none",
    borderRadius: 15,
    width: "80%",
    background: "#1075c2",
    height: 45,
    cursor: "pointer",
    marginTop: 20,
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #F6F6F6 50%, #F2F2F2 50%)",
      }}
    >
      <Link id="signup" to="/create-account"></Link>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ height: "50vh" }}
      >
        <img src={UPlumberLogo} style={{ width: "90%" }}></img>
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          height: "inherit",
          background: `url(${Plumbers})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          //   height: "50vh",
        }}
      >
        <button
          className={classes.button}
          style={{ marginTop: 200 }}
          onClick={() => {
            document.getElementById("signup").click();
          }}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            Start Exploring <ArrowRightAltIcon></ArrowRightAltIcon>
          </Grid>
        </button>
        <p style={{ width: "80%", textAlign: "center" }}>
          By continuing you agreeto our{" "}
          <span style={{ fontWeight: "bold" }}>Terms and conditions</span> and{" "}
          <span style={{ fontWeight: "bold" }}>Privay Policy</span>
        </p>
      </Grid>
    </div>
  );
}
