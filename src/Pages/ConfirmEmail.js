import React, {useState} from "react";
import {makeStyles, Grid, TextField} from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Verify from "../assets/verify.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OtpInput from "react-otp-input";
import {Link, withRouter} from "react-router-dom";
import {verifyPhone} from "../ApiHelper";

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
        background: "#1075c2",
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10
    },
}));
export default function ConfirmEmail(props) {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [OTP, setOTP] = useState("");
    const [typeConfirm, setTypeConfirm] = useState("text");

    const [state, setState] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };
    console.log("This is ", props.confirmResult);
    const handleVerifyCode = () => {
        // Request for OTP verification
        try {
            if (OTP.length == 6) {
                props.confirmResult
                    .confirm(OTP)
                    .then((user) => {
                        props.onSuccessOtp()
                    }).catch((error) => {
                    alert(error.message);
                    console.log(error);
                });
            } else {
                alert("Please enter a 6 digit OTP code.");
            }
        } catch (e) {
        }
    };

    return (
        <div>
            <Link id="homepage" to="/homepage"></Link>
            <div style={{borderBottom: "1px solid #e9e9e9", height: 60}}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{height: 60}}
                >
                    <p
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            margin: 0,
                        }}
                    >
                        Verify Email
                    </p>
                </Grid>
            </div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                <Grid item xs={12}>
                    <img
                        src={Verify}
                        style={{
                            marginBottom: 0,
                            width: "150",
                            height: 150,
                            textAlign: 'center'
                        }}
                    ></img>
                </Grid>
                <Grid item xs={12}>
                    <p
                        style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            margin: 0,
                        }}
                    >
                        Enter the 6 digit code that sent to your email
                    </p>
                </Grid>
                <Grid item xs={12}>
                    <OtpInput
                        className="otp"
                        onChange={(otp) => setOTP(otp)}
                        value={OTP}
                        numInputs={6}
                        separator={<span>-</span>}
                    />
                </Grid>


                <Grid item xs={12} alignItems="center" justifyContent="center" style={{width:'80vw',marginTop:10,textAlign:'center'}}>
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                        <Grid item xs={6}>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    handleVerifyCode();
                                }}
                            >
                                Verify
                            </button>
                        </Grid>

                        <Grid item xs={6}>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    props.goBack()
                                }}
                            >
                                Resend OTP
                            </button>
                        </Grid>
                    </Grid>
                </Grid>


                {/* <button
          className={classes.button}
          onClick={() => {
           props.goBack()
          }}
        >
          Change Phone
        </button> */}


                <Drawer
                    anchor={"bottom"}
                    open={state}
                    onClose={toggleDrawer("bottom", false)}
                >
                    <p style={{fontWeight: 600, fontSize: 26, textAlign: "center"}}>
                        Verificatin Code Sent
                    </p>
                    <Grid container direction="row" justify="center">
                        <p style={{width: "90%", textAlign: "center", marginTop: 0}}>
                            A 6 digit verification code has been send to you phone "
                            {props.phoneNumber}"
                        </p>

                        <p
                            className={classes.label}
                            style={{fontSize: 14, textAlign: "center"}}
                        >
                            Tap Continue to enter code
                        </p>
                        <button className={classes.button} style={{marginBottom: 40}}>
                            Continue
                        </button>
                    </Grid>
                </Drawer>
            </Grid>
        </div>
    );
}
