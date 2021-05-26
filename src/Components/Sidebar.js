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
        {localStorage.getItem("token") != null ? (
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
        ) : (
          <div style={{ width: "100%" }}>
            <Link id={"login"} to={"/login"}></Link>
            <Link id={"signup"} to={"/create-account"}></Link>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                // margin: 0,
                fontWeight: 600,
                fontSize: 16,
                color: "#1e7dc5",
                cursor: "pointer",
              }}
              onClick={() => {
                document.getElementById("login").click();
              }}
            >
              Login to your account
            </p>
            <p
              style={{
                width: "100%",
                textAlign: "center",

                fontWeight: 600,
                // color: "#1e7dc5",
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                document.getElementById("signup").click();
              }}
            >
              Create Account
            </p>
          </div>
        )}
      </Grid>
      {localStorage.getItem("token") && (
        <div>
          {[
            { name: "Home", href: "/homepage" },
            { name: "New Request", href: "/homepage" },
            { name: "History", href: "/history" },
            { name: "Notifications", href: "/notifications" },
            { name: "Favourite Plumbers", href: "/favorite" },
            { name: "Help", href: "/homepage" },
            { name: "Settings", href: "/settings" },
            { name: "Profile", href: "/userProfile" },
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
              marginTop: 80,
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
