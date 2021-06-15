import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Badge,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
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
const DescriptionAndPhoto = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ padding: 20, height: "max-content" }}
    >
      <p style={{ textAlign: "justify" }}>
        Briefly describe your problem, please do not input any sensitive
        information here.
      </p>
      <textarea
        className={classes.input}
        style={{
          resize: "none",
          border: "1px solid #efefef",
          borderRadius: 20,
          height: 100,
          padding: 10,
        }}
        value={props.description}
        onChange={(e) => {
          localStorage.setItem("description", e.target.value);
          props.setRequestData("description", e.target.value);
        }}
      ></textarea>
      <p className={classes.label}>Add Photos</p>
      <div style={{ width: "100%", marginTop: 20 }}>
        <input
          // required
          type="file"
          name="image"
          id="images"
          multiple
          className="form-control"
          // value={post.image.name}
          style={{ display: "none" }}
          onChange={props.handleFileChange}
        />
        <Grid container direction="row" alignItems="center">
          {props.image.length > 0 &&
            props.image.map((img) => {
              return (
                <Badge
                  badgeContent={
                    <CancelIcon
                      style={{ color: "red", marginLeft: -40 }}
                      onClick={() => {
                        var temp = [];
                        props.image.map((data) => {
                          console.log("This is imaeg", img.name, data.name);
                          if (data != img) {
                            temp.push(data);
                          }
                        });
                        console.log("THis is ", temp);
                        props.setRequestData("image", temp);
                      }}
                    ></CancelIcon>
                  }
                  color=""
                >
                  <img src={img} className={classes.image} />
                </Badge>
              );
            })}
          <Grid
            style={{
              width: 100,
              height: 100,
              background: "#efefef",
              borderRadius: 5,
            }}
            container
            direction="row"
            justify="center"
            alignItems="center"
            onClick={() => {
              document.getElementById("images").click();
            }}
          >
            <CameraAltIcon></CameraAltIcon>
          </Grid>
        </Grid>
        <div
          style={{
            width: "100vw",
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
                props.setActiveTab("Property");
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
                props.setActiveTab("Inssurance");
              }}
            >
              Next
            </button>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default DescriptionAndPhoto;
