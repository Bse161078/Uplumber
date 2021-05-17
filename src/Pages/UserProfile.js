import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Camera from "../assets/camera.PNG";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../assets/profile.png";
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
export default function LoginPage() {
  const classes = useStyles();
  const [value, setValue] = useState("");
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

  const EditProfile = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 30, padding: 20 }}
      >
        <img
          src={Avatar}
          style={{
            borderRadius: "50%",
            marginBottom: 10,
            width: 120,
            height: 120,
          }}
        ></img>
        <div style={{ width: "100%" }}></div>
        <Grid itemd md={6} xs={6}>
          {" "}
          <p className={classes.label} style={{ width: "90%" }}>
            First Name
          </p>
          <input className={classes.input} style={{ width: "90%" }}></input>
        </Grid>
        <Grid item md={6} xs={6}>
          <Grid container direction="row" justify="flex-end">
            {" "}
            <p className={classes.label} style={{ width: "90%" }}>
              Last Name
            </p>
            <input className={classes.input} style={{ width: "90%" }}></input>
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
          value={value}
          onChange={(e) => {
            console.log(e);
            setValue(e);
          }}
        />
        <div className={classes.input} style={{ height: 10 }}></div>
        <p className={classes.label} style={{ marginTop: 10 }}>
          Address
        </p>
        <input className={classes.input}></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          Unit/ Apt
        </p>
        <input className={classes.input}></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          City
        </p>
        <input className={classes.input}></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          State
        </p>
        <Autocomplete
          options={[
            { title: "All Activity", year: 1994 },
            { title: "Some Activity", year: 1994 },
          ]}
          getOptionLabel={(option) => option.title}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <p className={classes.label} style={{ marginTop: 10 }}>
          Zipcode
        </p>
        <input className={classes.input}></input>
        <p className={classes.label} style={{ marginTop: 10 }}>
          State
        </p>
        <Autocomplete
          options={[
            { title: "All Activity", year: 1994 },
            { title: "Some Activity", year: 1994 },
          ]}
          getOptionLabel={(option) => option.title}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <button
          className={classes.button}
          onClick={() => {
            setState(false);
          }}
        >
          Save
        </button>
      </Grid>
    );
  };
  const Profile = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 30, padding: 20 }}
      >
        <img
          src={Avatar}
          style={{
            borderRadius: "50%",
            marginBottom: 10,
            width: 120,
            height: 120,
          }}
        ></img>{" "}
        <div style={{ width: "100%" }}></div>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Phone Number
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>+123456789</p>
        </Grid>
        <div style={{ width: "100%" }}></div>
        <div className={classes.input} style={{ height: 10 }}></div>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Address
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>New York</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Unit /APT
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>123456</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            City
          </span>
          <p style={{ fontSize: 12, margin: 0 }}>New York</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            State
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>Albama</p>
        </Grid>
        <Grid item md={6} xs={6}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Zipcode
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>12345</p>
        </Grid>
        <Grid item md={12} xs={12}>
          <span style={{ color: "#60a3d6" }} className={classes.label}>
            Country
          </span>
          <p style={{ fontSize: 12, margin: 5 }}>USA</p>
        </Grid>
        <button
          className={classes.button}
          onClick={() => {
            setState(true);
          }}
        >
          Edit
        </button>
      </Grid>
    );
  };

  return (
    <div>
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
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
        {state ? <EditProfile></EditProfile> : <Profile></Profile>}
      </div>
    </div>
  );
}
