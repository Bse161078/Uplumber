import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import UPlumberLogo from "../assets/uplumberlogo.png";
import Plumbers from "../assets/Plumbers.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { withRouter } from "react-router-dom";
import { firebase, onMessageListener } from "../Config/firebase";


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
    fontWeight: 500,
  },
  topDiv: {
    height: "50vh",
    [theme.breakpoints.up("sm")]: {
      height: "50vh",
    },
  },
  bottomDiv: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "50vh",
    [theme.breakpoints.up("sm")]: {
      // height: "100vh",
      width: "100vw",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "unset",
    },
  },
  logo: {
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
}));
function LandingPage(props) {
  const classes = useStyles();
  const [tokenFound, setTokenFound] = useState(null);

  console.log("landing pagesss")

  useEffect(() => {
    getTokens()
  }, []);
  const getTokens = (setTokenFound) => {

    return firebase
      .messaging()
      .getToken({ vapidKey: "BOVlu_RjNxUBXYELKc_BtKoZe_evMFXggd0CwWy9sVs2l5tUyvq2TiNFsymAnZDFXc2za6r6PpShkt7Z_xW8r9E" })
      .then((currentToken) => {
        if (currentToken) {

          console.log("current token for client: ", currentToken);
          localStorage.setItem("fcmToken", currentToken);
          setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #F6F6F6 50%, #F2F2F2 50%)",
      }}
    >
      <Link id="signup" to="/create-account"></Link>
      <Link id="login" to="/login"></Link>
      <Link id="home" to="/homepage"></Link>

      <Grid
        container
        direction="row"
        justify="center"
        className={classes.topDiv}
      >
        <img src={UPlumberLogo} className={classes.logo}></img>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.bottomDiv}
        style={{
          background: `url(${Plumbers})`,
        }}
      >
        <button
          className={classes.button}
          style={{ marginTop: 200 }}
          onClick={() => {
            document.getElementById("home").click();
          }}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            Start Exploring <ArrowRightAltIcon></ArrowRightAltIcon>
          </Grid>
        </button>{" "}
        <button
          className={classes.button}
          style={{ background: "white", color: "black" }}
          onClick={() => {
            document.getElementById("login").click();
          }}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            Login
          </Grid>
        </button>
        <p style={{ width: "80%", textAlign: "center" }}>
          By continuing you agree to our{" "}
          <span style={{ fontWeight: "bold" }}>Terms and conditions</span> and{" "}
          <span style={{ fontWeight: "bold" }}>Privacy Policy</span>
        </p>
      </Grid>
    </div>
  );
}
export default withRouter(LandingPage);
