import React, { useState } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import NotificationsIcon from "@material-ui/icons/Notifications";

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
export default function Header(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        borderBottom: "1px solid #e9e9e9",
        background: "white",
        height: 60,
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ height: 60 }}
      >
        <Grid md={2} xs={2}>
          <Grid container direction="row" justify="center">
            {props.leftIcon ? (
              props.leftIcon
            ) : (
              <ClearAllIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.onSidebarDisplay();
                }}
              ></ClearAllIcon>
            )}
          </Grid>
        </Grid>
        <Grid md={8} xs={8}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 0,
              textAlign: "center",
              width: "100%",
            }}
          >
            {props.heading}
          </p>
        </Grid>
        <Grid md={2} xs={2}>
          <Grid container direction="row" justify="center">
            {props.rightIcon ? (
              props.rightIcon
            ) : (
              <NotificationsIcon></NotificationsIcon>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
