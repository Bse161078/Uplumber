import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../assets/profile.png";
import { MyProfile, UpdateCustomerProfile, uploadImage } from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
import { Countries, states } from "../Data/Data";
import ConfirmOtp from "./ConfirmOTP";
import firebase from "firebase";
import {connectFirebase} from "../Config/firebase";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function UpdateUserProfile(props) {
    const [goToOtp, setGoToOtp] = useState(false);
    const [confirmResult, setConfirmResult] = useState();
    const [captchaCreated, setCaptchaCreated] = useState(false);




    const [openLoader, setOpenLoader] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState("");

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage1")
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName1")
  );

  const [email, setEmail] = useState(localStorage.getItem("firstName1"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName1"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber1")
  );
  const [address, setAddress] = useState(localStorage.getItem("address1"));
  const [unit, setUnit] = useState(localStorage.getItem("unit1"));
  const [city, setCity] = useState(localStorage.getItem("city1"));
  const [state, setState] = useState(localStorage.getItem("state1"));
  const [zipcode, setZipcode] = useState(localStorage.getItem("zipcode1"));
  const [country, setCountry] = useState(localStorage.getItem("country1"));
  const [latitude, setLatitude] = useState(
    localStorage.getItem("latitude1") || localStorage.getItem("latitude")
  );
  const [longitude, setLongitude] = useState(
    localStorage.getItem("longitude1") || localStorage.getItem("longitude")
  );
  const [oldPhoneNumber, setOldPhoneNumber] = useState(localStorage.getItem("phoneNumber1"));

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return true;
    } else {
      alert("App need your location work properly");
    }
    return false;
  };

  const showPosition = (position) => {
    setLatitude(position.coords.latitude);
    localStorage.setItem("latitude1", position.coords.latitude);
    setLongitude(position.coords.longitude);
    localStorage.setItem("longitude1", position.coords.longitude);
  };

  const updateMyProfile = () => {
    var data = {
      profileImage: profileImage,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      unit: unit,
      city: city,
      state: state,
      zipcode: zipcode,
      latitude: latitude,
      longitude: longitude,
      country: country,
    };
    console.log("THis is the data", data);
    setOpenLoader(true);
    UpdateCustomerProfile(data).then(
      (res) => {
        if (res.data.success || res.status === 200 || res.status === 201) {
          setOpenLoader(false);
          console.log(res.data.data);
          var user = res.data.data;
          props.setFirstName(user.firstName);
          props.setProfileImage(user.profileImage);
          props.setFirstName(user.firstName);
          props.setLastName(user.lastName);
          props.setPhoneNumber("+" + user.phoneNumber);
          props.setAddress(user.address);
          props.setCity(user.city);
          props.setState(user.state);
          props.setUnit(user.unit);
          props.setZipcode(user.zipcode);
          props.setCountry(user.country);
          props.setEdit(false);
          // setAllProviders(res.data.Providers);
        }
      },
      (error) => {
        if (error.response) {
          notify(error.response.data.message);
        }
        setOpenLoader(false);
        console.log("This is response", error.response);
      }
    );
  };

  const uploadMyImage = (image) => {
    setOpenLoader(true);
    // console.log("This is great", data);
    uploadImage(image).then(
      (res) => {
        console.log(res);
        if (res.data.success || res.status === 200 || res.status === 201) {
          setOpenLoader(false);
          console.log("This is res of image upload", res);
          setProfileImage(res.data);
          // localStorage.setItem("profileImage", res.data);
        }
      },
      (error) => {
        if (error.response) {
          notify(error.response.data.message);
        }
        setOpenLoader(false);
        console.log("This is response", error.response);
      }
    );
  };

  const [edit, setEdit] = React.useState(false);

  const getMyProfile = () => {
    setOpenLoader(true);
    MyProfile().then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200 ||
          res.statusText === 201 ||
          res.statusText === "OK" ||
          res.statusText === "Created" ||
          res.data.statusText === "OK" ||
          res.data.statusText === "Created" ||
          res.data.statusText === "OK"
        ) {
          setOpenLoader(false);
          console.log(res.data.data);
          var user = res.data.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber("+" + user.phoneNumber);
          setOldPhoneNumber("+" + user.phoneNumber)
          setAddress(user.address);
          setCity(user.city);
          setState(user.state);
          setUnit(user.unit);
          setZipcode(user.zipcode);
          setCountry(user.country);
          setLongitude(user.longitude);
          setLatitude(user.latitude);
          setEmail(user.email);
          setProfileImage(user.profileImage);

          // setAllProviders(res.data.Providers);
        }
      },
      (error) => {
        if (error.response) {
          notify(error.response.data.message);
        }
        setOpenLoader(false);
        console.log("This is response", error.response);
      }
    );
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    uploadMyImage(e.target.files[0]);
  };

  useEffect(() => {
    getLocation();
    getMyProfile();
    connectFirebase();

  }, []);




    const createRecapha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            }
        );
    };

    const validatePhoneNumber = (phoneNumber) => {
        console.log("This is validating phonenumeer", phoneNumber);
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
        return phoneNumber.match(/\d/g).length === 10;
    };

    const sendFirebaseOTP = () => {
        console.log("This is valid", validatePhoneNumber(phoneNumber));
        setOpenLoader(true);
        createRecapha();


        const appVerifier = window.recaptchaVerifier;
        // console.log("THis is appverifier", appVerifier);
        if (appVerifier) {
            setCaptchaCreated(true);
        }
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((result) => {
                console.log('result  =   ', result);
                setConfirmResult(result);
                setGoToOtp(true);
                setOpenLoader(false);
                window.recaptchaVerifier = null
            })
            .catch((error) => {
                notify(error.code);
                setOpenLoader(false);
                console.log("This is the error", error);
            });
    };


  const notify = (data) => toast(data);
  return (
      goToOtp ? (
              <ConfirmOtp
                  confirmResult={confirmResult}
                  phoneNumber={phoneNumber}
                  goBack={
                      () => {
                          setGoToOtp(false);
                          setOpenLoader(false)
                      }
                  }
                  sendFirebaseOTP={
                      () => {
                          sendFirebaseOTP()
                      }
                  }
                  notify={notify}
                  setOpenLoader={setOpenLoader}
                  onSuccessOtp={
                      async () => {
                          setOpenLoader(true)
                          updateMyProfile();
                      }
                  }
              ></ConfirmOtp>
          ):
    <div>
        <div id="recaptcha-container"></div>
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 30, padding: 20 }}
      >
        <img
          src={profileImage}
          style={{
            borderRadius: "50%",
            marginBottom: 10,
            width: 120,
            height: 120,
          }}
          onClick={() => {
            document.getElementById("upload").click();
          }}
        ></img>
        <input
          onChange={handleChange}
          type="file"
          // id="icon-button-file"
          style={{ visibility: "hidden", position: "absolute" }}
          id={"upload"}
        />
        <div style={{ width: "100%" }}></div>
        <Grid itemd md={6} xs={6}>
          {" "}
          <p className={classes.label} style={{ width: "90%" }}>
            First Name
          </p>
          <input
            className={classes.input}
            style={{ width: "90%" }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></input>
        </Grid>
        <Grid item md={6} xs={6}>
          <Grid container direction="row" justify="flex-end">
            {" "}
            <p className={classes.label} style={{ width: "90%" }}>
              Last Name
            </p>
            <input
              className={classes.input}
              style={{ width: "90%" }}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </Grid>
        </Grid>
        <p
          className={classes.label}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Phone Number
        </p>
        <PhoneInput
          // className={classes.input}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => {
            console.log(e);
            setPhoneNumber(e);
          }}
        />
        <div className={classes.input} style={{ height: 10 }}></div>
        <p className={classes.label} style={{ marginTop: 10 }}>
          Address
        </p>
        <input
          className={classes.input}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          Unit/ Apt
        </p>
        <input
          className={classes.input}
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
        ></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          City
        </p>
        <input
          className={classes.input}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          State
        </p>
        <Autocomplete
          options={states}
          getOptionLabel={(option) => option.title}
          onChange={(event, values) => {
            if (values) {
              setState(values.title);
              localStorage.setItem("state1", values.title);
            }
          }}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => (
            <TextField label={state ? state : ""} {...params} />
          )}
        />
        <p className={classes.label} style={{ marginTop: 10 }}>
          Zipcode
        </p>
        <input
          className={classes.input}
          value={zipcode}
          onChange={(e) => {
            setZipcode(e.target.value);
          }}
        ></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          Country
        </p>
        <Autocomplete
          options={Countries}
          onChange={(event, values) => {
            if (values) {
              console.log("This is co", values.title);
              setCountry(values.title);
              localStorage.setItem("country1", values.title);
            }
          }}
          getOptionLabel={(option) => option.title}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => (
            <TextField label={country ? country : ""} {...params} />
          )}
        />
        <button
          className={classes.button}
          onClick={() => {
            setOpenLoader(true);
            if(oldPhoneNumber!==phoneNumber){
                  sendFirebaseOTP();
              }else{
                  updateMyProfile();
              }

          }}
        >
          Save
        </button>
      </Grid>
    </div>
  );
}
