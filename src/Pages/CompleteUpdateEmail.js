import firebase from "firebase";
import {connectFirebase} from "../Config/firebase";
import {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {UpdateCustomerProfile, UpdateEmailVerificationStatus} from "../ApiHelper";

const CompleteUpdateEmail = (props) => {

    const [showLoader, setShowLoader] = useState(false);

    useEffect(async () => {

        setShowLoader(true);
        connectFirebase();
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            const data = Object.assign({}, JSON.parse(localStorage.getItem('dataForEditProfile')));
            console.log("data = ",data)
            if (!data || !data.email) {
                props.history.push('/')
            }

            localStorage.removeItem('dataForEditProfile');


            firebase.auth().signInWithEmailLink(data.email, window.location.href)
                .then(async (result) => {
                    try {
                        const data = await UpdateEmailVerificationStatus({emailVerified: false});
                        props.history.push('/homepage')

                        console.log("data = ", data)
                    } catch (e) {
                        props.history.push('/homepage')
                    }
                })
                .catch((error) => {
                    props.history.push('/homepage')
                });
        }

    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center">
            {showLoader ? <CircularProgress/> :
                <Paper style={{textAlign: "center", width: "30%", padding: 10}}>
                    <Typography variant="h6" gutterBottom component="div">
                        Email Verification
                    </Typography>

                    <Typography variant="subtitle1">
                        Verifying email please wait.
                    </Typography>

                </Paper>
            }
        </Grid>
    )
}
export default withRouter(CompleteUpdateEmail);