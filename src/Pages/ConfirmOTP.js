import React, { useState } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Verify from "../assets/verify.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OtpInput from "react-otp-input";
import { Link, withRouter } from "react-router-dom";
import { verifyPhone } from "../ApiHelper";
const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 16,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
  },
  label: {
    width: "100%",
    color: "#aeaeae",
    margin: 0,
    fontSize: 13,
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
export default function ConfirmOTP(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("text");

  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
  console.log("This is ", props.confirmResult);
  const handleVerifyCode = () => {
    // Request for OTP verification
    try {
      if (OTP.length == 6) {
        props.confirmResult
          .confirm(OTP)
          .then((user) => {
            verifyPhone().then(
              (res) => {
                if (res.statusText === "OK" || res.statusText === "Created") {
                  document.getElementById("homepage").click();
                }
              },
              (error) => {
                props.notify("Something went wrong!");
                props.setOpenLoader(false);
                console.log("This is response", error);
              }
            );
          })
          .catch((error) => {
            alert(error.message);
            console.log(error);
          });
      } else {
        alert("Please enter a 6 digit OTP code.");
      }
    } catch (e) {}
  };

  return (
    <div>
      <Link id="homepage" to="/homepage"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ height: 60 }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 0,
              textAlign: "center",
              width: "100%",
            }}
          >
            Verify Phone Number
          </p>
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 30, padding: 20 }}
      >
        <img
          src={Verify}
          style={{
            borderRadius: "50%",
            marginBottom: 10,
            width: "50%",
            height: 150,
          }}
        ></img>
        <div style={{ width: "100%" }}></div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 13,
            margin: 0,
            textAlign: "center",
            width: "100%",
            marginBottom: 20,
          }}
        >
          Enter the 6 digit code send to your phone number
        </p>
        <OtpInput
          className="otp"
          style={{ marginTop: 20 }}
          onChange={(otp) => setOTP(otp)}
          value={OTP}
          numInputs={6}
          separator={<span>-</span>}
        />
        <button
          className={classes.button}
          onClick={() => {
            handleVerifyCode();
          }}
        >
          Verify
        </button>
        <Drawer
          anchor={"bottom"}
          open={state}
          onClose={toggleDrawer("bottom", false)}
        >
          <p style={{ fontWeight: 600, fontSize: 26, textAlign: "center" }}>
            Verificatin Code Sent
          </p>
          <Grid container direction="row" justify="center">
            <p style={{ width: "90%", textAlign: "center", marginTop: 0 }}>
              A 6 digit verification code has been send to you phone "
              {props.phoneNumber}"
            </p>

            <p
              className={classes.label}
              style={{ fontSize: 14, textAlign: "center" }}
            >
              Tap Continue to enter code
            </p>
            <button className={classes.button} style={{ marginBottom: 40 }}>
              Continue
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
