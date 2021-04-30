import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Avatar from "../assets/profile.png";

export default function ReviewCard(props) {
  return (
    <Grid container direction="row" justify="center">
      {" "}
      <Paper
        style={{ width: props.width || "90%", marginBottom: 10, padding: 10 }}
      >
        <Grid container direction="row">
          <Grid item md={2} xs={2}>
            <img src={Avatar} style={{ width: 50, height: 50 }}></img>
          </Grid>
          <Grid item md={8} xs={8}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                Jane Doe
              </p>
              <Rating value={5} style={{ fontSize: 12 }}></Rating>
              <span style={{ fontSize: 12 }}>5.0(433) </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 12 }}>$25 / hr</span>
              <span style={{ fontSize: 11 }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore
              </span>
            </Grid>
          </Grid>
          <Grid item md={2} xs={2}>
            <span style={{ fontSize: 10, color: "gray" }}>$25 / hr</span>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
