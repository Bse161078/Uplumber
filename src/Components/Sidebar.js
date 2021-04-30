import React from "react";
import { Grid } from "@material-ui/core";
import Avatar from "../assets/avatar.png";
import { Link, withRouter } from "react-router-dom";

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
          { name: "Home", href: "/homepage" },
          { name: "New Request", href: "/homepage" },
          { name: "History", href: "/history" },
          { name: "Notifications", href: "/homepage" },
          { name: "Favourite Plumbers", href: "/favorite" },
          { name: "Help", href: "/homepage" },
          { name: "Settings", href: "/settings" },
          { name: "Profile", href: "/homepage" },
        ].map((item) => {
          return (
            <div>
              <Link id={item.href} to={item.href}></Link>
              <p
                style={{
                  margin: 0,
                  marginLeft: 15,
                  fontWeight: 500,
                  marginTop: 30,
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById(item.href).click();
                }}
              >
                {item.name}
              </p>
            </div>
          );
        })}
        <p
          style={{
            margin: 0,
            marginLeft: 15,
            fontWeight: 500,
            marginTop: 100,
            cursor: "pointer",
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}
