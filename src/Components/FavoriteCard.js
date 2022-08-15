import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Avatar from "../assets/profile.png";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function ReviewCard(props) {
  console.log("THis is ", props.item.averageRating)
  return (
    <Grid container direction="row" justify="center">
      {" "}
      <Paper
        style={{ width: props.width || "90%", marginBottom: 10, padding: 10 }}
      >
        <Grid container direction="row">
          <Grid item md={2} xs={2}>
            <img
              src={props.item.profileImage}
              style={{ width: 50, height: 50 }}
            ></img>
          </Grid>
          <Grid item md={9} xs={9}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {" "}
                {props.item.firstName + " " + props.item.lastName}
              </p>
              <Rating
                value={props.item.averageRating}
                style={{ fontSize: 12 }}
              ></Rating>
              <span style={{ fontSize: 12 }}>
                {" "}
                {props.item.averageRating}({props.item.totalRatings}){" "}
              </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 12 }}>
                ${props.item.hourlyRates} / hr
              </span>


            </Grid>
          </Grid>
          <Grid item md={1} xs={1}>
            <FavoriteIcon style={{ color: "#1075c2" }}></FavoriteIcon>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
