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
import { MyProfile, UpdateCustomerProfile } from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
import { Countries, states } from "../Data/Data";
import EditProfile from "./EditProfile";

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
export default function UserProfile() {
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
  const [latitude, setLatitude] = useState(localStorage.getItem("latitude1"));
  const [longitude, setLongitude] = useState(
    localStorage.getItem("longitude1")
  );
  const updateMyProfile = () => {
    var data = {
      profileImage:
        "https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg",
      firstName: firstName,
      lastName: lastName,
      phoneNumber: 923060052374,
      address: address,
      unit: unit,
      city: city,
      state: state,
      zipcode: 44000,
      latitude: 1.099232,
      longitude: 2.33332,
      country: country,
    };
    setOpenLoader(true);
    UpdateCustomerProfile(data).then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          console.log(res.data.data);
          var user = res.data.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber("+" + user.phoneNumber);
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
          setEdit(false);
          // setAllProviders(res.data.Providers);
        }
      },
      (error) => {
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };
  const [edit, setEdit] = React.useState(false);

  // const EditProfile = () => {
  //   return (
  //     <Grid
  //       container
  //       direction="row"
  //       justify="center"
  //       style={{ marginTop: 30, padding: 20 }}
  //     >
  //       <img
  //         src={profileImage}
  //         style={{
  //           borderRadius: "50%",
  //           marginBottom: 10,
  //           width: 120,
  //           height: 120,
  //         }}
  //       ></img>
  //       <div style={{ width: "100%" }}></div>
  //       <Grid itemd md={6} xs={6}>
  //         {" "}
  //         <p className={classes.label} style={{ width: "90%" }}>
  //           First Name
  //         </p>
  //         <input
  //           className={classes.input}
  //           style={{ width: "90%" }}
  //           value={firstName}
  //           onChange={(e) => {
  //             setFirstName(e.target.value);
  //           }}
  //         ></input>
  //       </Grid>
  //       <Grid item md={6} xs={6}>
  //         <Grid container direction="row" justify="flex-end">
  //           {" "}
  //           <p className={classes.label} style={{ width: "90%" }}>
  //             Last Name
  //           </p>
  //           <input
  //             className={classes.input}
  //             style={{ width: "90%" }}
  //             value={lastName}
  //             onChange={(e) => {
  //               setLastName(e.target.value);
  //             }}
  //           ></input>
  //         </Grid>
  //       </Grid>
  //       <p
  //         className={classes.label}
  //         style={{ marginTop: 20, marginBottom: 20 }}
  //       >
  //         Phone Number
  //       </p>
  //       <PhoneInput
  //         // className={classes.input}
  //         placeholder="Enter phone number"
  //         value={phoneNumber}
  //         onChange={(e) => {
  //           console.log(e);
  //           setPhoneNumber(e);
  //         }}
  //       />
  //       <div className={classes.input} style={{ height: 10 }}></div>
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         Address
  //       </p>
  //       <input
  //         className={classes.input}
  //         value={address}
  //         onChange={(e) => {
  //           setAddress(e.target.value);
  //         }}
  //       ></input>
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         Unit/ Apt
  //       </p>
  //       <input
  //         className={classes.input}
  //         value={unit}
  //         onChange={(e) => {
  //           setUnit(e.target.value);
  //         }}
  //       ></input>
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         City
  //       </p>
  //       <input
  //         className={classes.input}
  //         value={city}
  //         onChange={(e) => {
  //           setCity(e.target.value);
  //         }}
  //       ></input>
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         State
  //       </p>
  //       <Autocomplete
  //         options={states}
  //         getOptionLabel={(option) => option.title}
  //         onChange={(event, values) => {
  //           if (values) {
  //             setState(value.title);
  //             localStorage.setItem("state1", values.title);
  //           }
  //         }}
  //         style={{
  //           // width: 300,
  //           // marginLeft: 20,
  //           // marginTop: 20,
  //           // marginBottom: 20
  //           border: "none",
  //           width: "100%",
  //         }}
  //         renderInput={(params) => (
  //           <TextField label={state ? state : ""} {...params} />
  //         )}
  //       />
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         Zipcode
  //       </p>
  //       <input
  //         className={classes.input}
  //         value={zipcode}
  //         onChange={(e) => {
  //           setZipcode(e.target.value);
  //         }}
  //       ></input>
  //       <p className={classes.label} style={{ marginTop: 10 }}>
  //         Country
  //       </p>
  //       <Autocomplete
  //         options={Countries}
  //         onChange={(event, values) => {
  //           if (values) {
  //             console.log("This is co", values.title);
  //             setCountry(value.title);
  //             localStorage.setItem("country1", values.title);
  //           }
  //         }}
  //         getOptionLabel={(option) => option.title}
  //         style={{
  //           // width: 300,
  //           // marginLeft: 20,
  //           // marginTop: 20,
  //           // marginBottom: 20
  //           border: "none",
  //           width: "100%",
  //         }}
  //         renderInput={(params) => (
  //           <TextField label={country ? country : ""} {...params} />
  //         )}
  //       />
  //       <button
  //         className={classes.button}
  //         onClick={() => {
  //           updateMyProfile();
  //         }}
  //       >
  //         Save
  //       </button>
  //     </Grid>
  //   );
  // };
  const Profile = () => {
    return (
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
        ></img>{" "}
        <div style={{ width: "100%" }}></div>
        <Grid item md={12} xs={12}>
          <Grid container direction="row" justify="center">
            <p
              style={{
                textAlign: "center",
                fontSize: 22,
                margin: 5,
                fontWeight: "bold",
              }}
            >
              {firstName + " " + lastName}
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: 16,
                margin: 5,
                width: "100%",
                color: "#b2b2b2",
                margin: 0,
              }}
            >
              {email}
            </p>
          </Grid>
        </Grid>{" "}
        <div style={{ width: "100%" }}></div>
        <div className={classes.input} style={{ height: 10 }}></div>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Phone Number
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{phoneNumber}</p>
        </Grid>
        <div style={{ width: "100%" }}></div>
        <div className={classes.input} style={{ height: 10 }}></div>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Address
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{address}</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Unit /APT
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{unit}</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            City
          </span>
          <p style={{ fontSize: 12, margin: 0 }}>{city}</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            State
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{state}</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Zipcode
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{zipcode}</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Country
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>{country}</p>
        </Grid>
        <button
          className={classes.button}
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      </Grid>
    );
  };

  const getMyProfile = () => {
    setOpenLoader(true);
    MyProfile().then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          console.log(res.data.data);
          var user = res.data.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber("+" + user.phoneNumber);
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
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const notify = (data) => toast(data);
  return (
    <div>
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
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setEdit(true);
          }}
          heading={"User Profile"}
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
        {edit ? (
          <EditProfile
            setEdit={setEdit}
            profileImage={profileImage}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            unit={unit}
            setUnit={setUnit}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zipcode={zipcode}
            setZipcode={setZipcode}
            country={country}
            setCountry={setCountry}
            updateMyProfile={updateMyProfile}
          ></EditProfile>
        ) : (
          <Profile></Profile>
        )}
      </div>
    </div>
  );
}
