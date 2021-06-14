import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 12,
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
  heading: {
    fontSize: 16,
    margin: 0,
    marginTop: 10,
    fontWeight: 600,
  },
  icon: { marginTop: 10, fontSize: 16, color: "#2d86c9" },
  labelBlack: {
    width: "100%",
    margin: 0,
    fontSize: 13,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
}));
const ContactDetails = (props) => {
  const classes = useStyles();
  console.log("THis is  props for contact details", props);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ padding: 20, height: "max-content" }}
    >
      <p className={classes.label}>Name *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userName}
        onChange={(e) => {
          props.setRequestData("userName", e.target.value);
        }}
      ></input>

      <p className={classes.label}>Phone number *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userPhone}
        onChange={(e) => {
          props.setRequestData("userPhone", e.target.value);
        }}
      ></input>
      <p style={{ textAlign: "justify" }}>
        Do you allow U-Plumber to contact you via mobile phone number (text)?
        Please note this will help you get response from a plumber faster but it
        may cost you an extra charge (from your phone provider)
      </p>
      <div
        style={{
          width: "100vw",
          borderBottom: "1px solid #e9e9e9",
          display: "flex",
          height: 70,
        }}
      >
        <Grid item md={6} xs={6}>
          <button
            className={classes.button}
            style={{
              height: 30,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: 10,
              minWidth: "95%",
              fontSize: 11,
              width: "max-content",
              background: props.allowSms === true ? "#1075c2" : "#f2f2f2",
              color: props.allowSms === true ? "white" : "black",
            }}
            onClick={(e) => {
              props.setRequestData("allowSms", true);
            }}
          >
            Yes
          </button>
        </Grid>
        <Grid item md={6} xs={6}>
          <button
            className={classes.button}
            style={{
              height: 30,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: 10,
              minWidth: "95%",
              fontSize: 11,
              width: "max-content",
              background: props.allowSms === false ? "#1075c2" : "#f2f2f2",
              color: props.allowSms === false ? "white" : "black",
            }}
            onClick={(e) => {
              props.setRequestData("allowSms", false);
            }}
          >
            No
          </button>
        </Grid>
      </div>
      <p style={{ textAlign: "justify" }}>
        Enter you email this will allow U Plumber or provider to contact you via
        this email.
      </p>
      <p className={classes.label}>Email *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userEmail}
        onChange={(e) => {
          props.setRequestData("userEmail", e.target.value);
        }}
      ></input>
      <p className={classes.label}>Address *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userAddress}
        onChange={(e) => {
          props.setRequestData("userAddress", e.target.value);
        }}
      ></input>
      <p className={classes.label}>Unit/APT *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userUnit}
        onChange={(e) => {
          props.setRequestData("userUnit", e.target.value);
        }}
      ></input>
      <p className={classes.label}>City *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userCity}
        onChange={(e) => {
          props.setRequestData("userCity", e.target.value);
        }}
      ></input>
      <p className={classes.label}>State *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userState}
        onChange={(e) => {
          props.setRequestData("userState", e.target.value);
        }}
      ></input>
      <p className={classes.label}>Zipcode *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userZipCode}
        onChange={(e) => {
          props.setRequestData("userZipCode", e.target.value);
        }}
      ></input>
      <div style={{ height: 200, width: "100%" }}></div>
      <div
        style={{
          width: "100vw",
          borderBottom: "1px solid #e9e9e9",
          display: "flex",
          position: "absolute",
          bottom: 0,
          height: 70,
        }}
      >
        <Grid item md={6} xs={6}>
          <button
            className={classes.button}
            style={{
              height: 35,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: 10,
              fontSize: 11,
              borderRadius: 10,
              width: "95%",
              background: "#f2f2f2",
              color: "black",
            }}
            onClick={() => {
              props.setActiveTab("Inssurance");
            }}
          >
            Prev
          </button>
        </Grid>
        <Grid item md={6} xs={6}>
          <button
            className={classes.button}
            style={{
              height: 35,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: 10,
              fontSize: 11,
              borderRadius: 10,
              width: "95%",
            }}
            onClick={() => {
              props.setActiveTab("ReviewRequest");
            }}
          >
            Continue
          </button>
        </Grid>
      </div>
    </Grid>
  );
};
export default ContactDetails;
