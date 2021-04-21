import React from "react";
import { Grid } from "@material-ui/core";
import Avatar from "../assets/avatar.png";

export default function Sidebar() {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 50 }}
      >
        <img
          src={Avatar}
          style={{ width: 80, height: 80, borderRadius: 25 }}
        ></img>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            margin: 0,
            fontWeight: 600,
          }}
        >
          Jane Doe
        </p>
      </Grid>
      <div>
        {[
          "Home",
          "New Request",
          "History",
          "Notifications",
          "Favourite Plumbers",
          "Help",
          "Settings",
          "Profile",
        ].map((item) => {
          return (
            <p
              style={{
                margin: 0,
                marginLeft: 15,
                fontWeight: 500,
                marginTop: 30,
              }}
            >
              {item}
            </p>
          );
        })}
        <p
          style={{
            margin: 0,
            marginLeft: 15,
            fontWeight: 500,
            marginTop: 100,
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}
