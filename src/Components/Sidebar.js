import React, { useState, useEffect } from "react";
import { Grid, Badge } from "@material-ui/core";
import Avatar from "../assets/avatar.png";
import { Link, withRouter } from "react-router-dom";

export default function Sidebar(props) {
  const [badgeValue, setBadgeValue] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("allNotifications")) {
      var notifications = JSON.parse(localStorage.getItem("allNotifications"));
      var count = 0;
      notifications.map((item) => {
        if (item.isView === false) {
          count = count + 1;
        }
      });
      setBadgeValue(count);
    }
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 50 }}
      >
        {localStorage.getItem("userData") ? (
          <img
            src={JSON.parse(localStorage.getItem("userData")).profileImage}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          ></img>
        ) : (
          <img
            src={Avatar}
            style={{ width: 80, height: 80, borderRadius: 25 }}
          ></img>
        )}

        {localStorage.getItem("token") != null ? (
          localStorage.getItem("userData") && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {JSON.parse(localStorage.getItem("userData")).firstName +
                " " +
                JSON.parse(localStorage.getItem("userData")).lastName}
            </p>
          )
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
            { name: "My Requests", href: "/current-requests" },
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
                    if (item.name === "New Request") {
                      if (props.emailverify && props.phoneverify === true) {
                        props.postMyRequest();

                      } else if (props.emailverify != true) {

                        alert("Your email is not verified")
                      }
                      else if (props.phoneverify != true) {

                        alert("Your phone is not verified")
                      }

                    } else {
                      document.getElementById(item.href).click();
                    }
                  }}
                >
                  {item.name}
                  {item.name === "Notifications" && (
                    <Badge
                      style={{ marginLeft: "40%" }}
                      badgeContent={badgeValue}
                      color="secondary"
                    ></Badge>
                  )}
                </p>
              </div>
            );
          })}
          <p
            style={{
              margin: 0,
              marginLeft: 15,
              fontWeight: 500,
              marginTop: 50,
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("userData");
              localStorage.removeItem("allNotifications");
              localStorage.removeItem("coords");
              localStorage.removeItem("area");
              localStorage.removeItem("userCurrentLocation");
              localStorage.removeItem("allContacts");
              localStorage.removeItem("tokenTemp");
              localStorage.removeItem("description");
              localStorage.removeItem("userPhone");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userPass");
              localStorage.removeItem("longitude");
              localStorage.removeItem("requestorStatus");
              localStorage.removeItem("userState");
              localStorage.removeItem("userName");
              localStorage.removeItem("allProviders");
              localStorage.removeItem("prevurl");
              localStorage.removeItem("lastName");
              localStorage.removeItem("structure");
              localStorage.removeItem("userCity");
              localStorage.removeItem("idTemp");
              localStorage.removeItem("already");
              localStorage.removeItem("latitude");
              localStorage.removeItem("userAddress");
              localStorage.removeItem("allNotifications");
              localStorage.removeItem("allOffers");
              localStorage.removeItem("email");
              localStorage.removeItem("userZipCode");
              localStorage.removeItem("_grecaptcha");
              localStorage.removeItem("firstName");
              localStorage.removeItem("activeTab");


              setTimeout(() => {
                window.location.reload();
              }, 800);
            }}
          >
            Logout
          </p>
          <div style={{ height: 100 }}></div>
        </div>
      )}
    </div>
  );
}
