import React, { useState, useEffect } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Verify from "../assets/verify.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OtpInput from "react-otp-input";
import { Link, withRouter, useHistory } from "react-router-dom";
import {
  emailVerification,
  UpdateEmailVerificationStatus,
  sendEmailVerification,
} from "../ApiHelper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@material-ui/core";
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
    background: "#1075c2",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const updateCustomeEmailStatus = async () => {
  try {
    const res = await UpdateEmailVerificationStatus();
    console.log("updateCustomeremailstatus", res.data.data);
    localStorage.setItem("userData", JSON.stringify(res.data));
  } catch (e) {
    console.log("updateCustomeremailstatuserror", e);
  }
};

export default function ConfirmEmail(props) {
  var currentUrl = window.location.href;
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("text");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //var referrer = history.go(-1)
  console.log(document.referrer, "hamza");
  const handleClose = () => {
    setOpen(false);
  };
  const VerificanEmail = async () => {
    try {
      const email = {
        email: localStorage.getItem("email"),
      };

      const res = await sendEmailVerification(email);
      setOpen(false);
      console.log("sendemailverificationcode", res);
    } catch (e) {
      console.log("sendemailverificationcode", e);
      setOpen(false);
    }
  };
  const handleVerifyCode = async () => {
    // Request for OTP verification

    console.log("OTP", OTP);
    if (OTP.length == 4) {
      try {
        debugger;
        const verify = {
          email: localStorage.getItem("email"),
          verificationCode: OTP,
        };
        const res = await emailVerification(verify);
        if (res.data.success === true) {
          console.log("emailverification", res);
          localStorage.setItem("email", verify.email);
          updateCustomeEmailStatus();
          setOpen(false);
          const back = localStorage.getItem("prevurl");
          if (back?.includes("complete-profile")) {
            if (localStorage.getItem("requestBeforeLogin") === true) {
              history.push("/homepage");
              localStorage.setItem("prevurl", "");
              alert("Profile Created! ");
            } else {
              const activeTab = localStorage.getItem("activeTab");

              if (activeTab === "ReviewRequest") {
                history.push("/requestAService/0");
              }
              // history.push('/requestAService/0')
              localStorage.setItem("prevurl", "");
              alert("Profile Created!");
            }
          } else {
            setOpenSnackbar(true);
            props.goBack();
            props.onSuccessOtp();
          }
        } else if (res.data.success === false) {
          alert(res.data.message);
          setOpen(false);
        }
      } catch (e) {
        alert(e.message);
        console.log("emailverification", e);
        setOpen(false);
      }
    } else {
      alert("Please enter a 4 digit OTP code.");
      setOpen(false);
    }
  };

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
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        message={"Email Updated"}
        autoHideDuration={2000}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Link id="homepage" to="/homepage"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ height: 60 }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 0,
            }}
          >
            Verify Email
          </p>
        </Grid>
      </div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <img
            src={Verify}
            style={{
              marginBottom: 0,
              width: "150",
              height: 150,
              textAlign: "center",
            }}
          ></img>
        </Grid>
        <Grid item xs={12}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 13,
              margin: 0,
            }}
          >
            Enter the 4 digit code that sent to your email
          </p>
        </Grid>
        <Grid item xs={12}>
          <OtpInput
            className="otp"
            onChange={(otp) => setOTP(otp)}
            value={OTP}
            numInputs={4}
            separator={<span>-</span>}
          />
        </Grid>

        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          style={{ width: "80vw", marginTop: 10, textAlign: "center" }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6}>
              <button
                className={classes.button}
                onClick={() => {
                  setOpen(true);
                  handleVerifyCode();
                }}
              >
                Verify
              </button>
            </Grid>

            <Grid item xs={6}>
              <button
                className={classes.button}
                onClick={() => {
                  const back = localStorage.getItem("prevurl");
                  if (back.includes("complete-profile")) {
                    setOpen(true);
                    VerificanEmail();
                  } else {
                    props.goBack();
                  }
                }}
              >
                Resend OTP
              </button>
            </Grid>
          </Grid>
        </Grid>

        {/* <button
          className={classes.button}
          onClick={() => {
           props.goBack()
          }}
        >
          Change Phone
        </button> */}

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
