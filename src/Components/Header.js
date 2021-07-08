import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Badge } from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { CustomerNotifications, viewNotification } from "../ApiHelper";

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
  const [allNotifications, setAllNotifications] = useState("");
  const [badgeValue, setBadgeValue] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("allNotifications")) {
      setAllNotifications(JSON.parse(localStorage.getItem("allNotifications")));
      var notifications = JSON.parse(localStorage.getItem("allNotifications"));
      var count = 0;
      notifications.map((item) => {
        if (item.isView === false) {
          count = count + 1;
        }
      });
      setBadgeValue(count);
    }
    getAllNotifications();
  }, []);

  const getAllNotifications = () => {
    CustomerNotifications().then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setAllNotifications(res.data.Customers);
          localStorage.setItem(
            "allNotifications",
            JSON.stringify(res.data.Customers)
          );
        }
      },
      (error) => {
        console.log("This is response", error.response);
      }
    );
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #e9e9e9",
        background: "white",
        height: 60,
      }}
    >
      <Link id={"notifications"} to={"/notifications"}></Link>
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
              <Badge badgeContent={badgeValue} color="secondary">
                <NotificationsIcon
                  onClick={() => {
                    document.getElementById("notifications").click();
                  }}
                ></NotificationsIcon>
              </Badge>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
