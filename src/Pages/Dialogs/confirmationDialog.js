import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link, withRouter} from "react-router-dom";


const ConfirmationDialog=(props)=>{
    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        setOpen(false);
        if(props.createAccount)
        props.history.push('/homepage')

    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Email Verification"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    An email has been sent to your account.Please click on link to complete verification.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default withRouter(ConfirmationDialog);