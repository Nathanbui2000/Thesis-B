import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    FormControl,
    InputLabel,
    Input,
    DialogContentText,
    MenuItem,
    TextField,
    Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { FileUploader } from "react-drag-drop-files";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";



export const ChooseAppointmentSuccessfulDialog = () => {
    const [UpLoadingDialog, setUpLoadingDialog] = useState(false);


    return (
        <>
        <Button variant="contained" onClick={() => setUpLoadingDialog(true)}>Choose Appointment</Button>
        <Dialog open={UpLoadingDialog}
                    onClose={() => setUpLoadingDialog(false)}>
            <DialogTitle>
                <span style={{ color: "red" }}>Confirm Appointment</span>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Your appointment has been successfully chosen. We have sent your appointment details to your email. 
                Please check your inbox for further information.
            </DialogContentText>
        </DialogContent>

            <DialogActions>
                    <Button onClick={() => setUpLoadingDialog(false)}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}