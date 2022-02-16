import firebase from "firebase";
import {connectFirebase} from "../Config/firebase";
import {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const VerifyEmail = (props) => {

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true);
        connectFirebase();
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            const user=JSON.parse(localStorage.getItem('emailForSignIn'));
            let email = user.email;
            if (!email) {
                props.history.push("/");
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    props.history.push({
                        pathname: '/complete-profile',
                        state: { email: user.email,password:user.password }
                    })
                })
                .catch((error) => {
                    setShowLoader(false);
                    console.log("error = ", error);

                });

        } else {

        }
    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center">
            {showLoader?<CircularProgress/>:
            <Paper style={{textAlign: "center", width: "30%",padding:10}}>
                <Typography variant="h6" gutterBottom component="div">
                    Try verifying your email again
                </Typography>

                <Typography variant="subtitle1">
                    Your request to verify your email has expired or the link has already been used
                </Typography>
            </Paper>
            }
        </Grid>
    )
}
export default withRouter(VerifyEmail);