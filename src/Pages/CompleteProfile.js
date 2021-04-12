import React, { useState } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Camera from "../assets/camera.PNG";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

  return (
    <div>
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
            Complete Your Profile
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
          src={Camera}
          style={{ borderRadius: "50%", marginBottom: 10 }}
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
            setState(true);
          }}
        >
          Continue
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
              A 6 digit verification code has been send to you phone
              "+1-234-567-89"
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
