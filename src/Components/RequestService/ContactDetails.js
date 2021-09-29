import React, { useState } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { Countries, states } from "../../Data/Data";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

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

  const handleAddressChange = (address) => {
    props.setRequestData("userAddress", address);
    // localStorage.setItem("userAddress", address);
    // console.log("This is the adress", address);
  };

  const handleSelect = (address) => {
    console.log("This is the dares", address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success these are latlongs", latLng);
        props.setRequestData("currentLocation", {
          latitude: latLng.lat,
          longitude: latLng.lng,
        });

        localStorage.setItem(
          "userCurrentLocation",
          JSON.stringify({ latitude: latLng.lat, longitude: latLng.lng })
        );

        props.setRequestData("userAddress", address);
        localStorage.setItem("userAddress", address);
      })
      .catch((error) => console.error("Error", error));
  };

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
          localStorage.setItem("userName", e.target.value);
        }}
      ></input>

      <p className={classes.label}>Phone number *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userPhone}
        onChange={(e) => {
          props.setRequestData("userPhone", e.target.value);
          localStorage.setItem("userPhone", e.target.value);
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
              localStorage.setItem("allowSms", true);
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
              localStorage.setItem("allowSms", false);
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
          localStorage.setItem("userEmail", e.target.value);
        }}
      ></input>
      <p className={classes.label}>Address *</p>
      <PlacesAutocomplete
        value={props.userAddress}
        onChange={handleAddressChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ width: "100%" }}>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
              className={classes.input}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* <input
        className={classes.input}
        type={"text"}
        value={props.userAddress}
        onChange={(e) => {
          props.setRequestData("userAddress", e.target.value);
          localStorage.setItem("userAddress", e.target.value);
        }}
      ></input> */}
      <p className={classes.label}>Unit/APT </p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userUnit}
        onChange={(e) => {
          props.setRequestData("userUnit", e.target.value);
          localStorage.setItem("userUnit", e.target.value);
        }}
      ></input>
      <p className={classes.label}>City *</p>
      <input
        className={classes.input}
        type={"text"}
        placeholder="City"
        value={props.userCity}
        onChange={(e) => {
          props.setRequestData("userCity", e.target.value);
          localStorage.setItem("userCity", e.target.value);
        }}
      ></input>
      <p className={classes.label}>State *</p>
      {/* <input
        className={classes.input}
        type={"text"}
        value={props.userState}
        onChange={(e) => {
          props.setRequestData("userState", e.target.value);
        }}
      ></input> */}

      <Autocomplete
        options={states}
        getOptionLabel={(option) => option.title}
        onChange={(event, values) => {
          if (values) {
            props.setRequestData("userState", values.title);
            localStorage.setItem("userState", values.title);
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
          <TextField
            label={props.userState ? props.userState : "State"}
            {...params}
          />
        )}
      />
      <p className={classes.label}>Zipcode *</p>
      <input
        className={classes.input}
        type={"text"}
        value={props.userZipCode}
        onChange={(e) => {
          props.setRequestData("userZipCode", e.target.value);
          localStorage.setItem("userZipCode", e.target.value);
        }}
      ></input>
      <div style={{ height: 50, width: "100%" }}></div>
      <div
        style={{
          width: "95vw",
          borderBottom: "1px solid #e9e9e9",
          display: "flex",
          // position: "absolute",
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

              props.setActiveTab("Insurance");
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
