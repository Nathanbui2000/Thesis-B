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

    MenuItem,
    TextField,
    Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../utils/axios-instance";

import { FileUploader } from "react-drag-drop-files";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import cookie from "js-cookie";
import { useUserContext } from "../store/user-context";
import {AppraiserAppointmentData} from "../type/Java/AppraiserAppointmentData";
import { ChooseAppointmentSuccessfulDialog } from "./informationDialog/ChooseAppointmentSuccessfulDialog";
interface CancelAppointmentDialog {
    appointmentID: number;
}
export const CancelAppointmentDialog = (props:CancelAppointmentDialog) => {
    const [appointmentData, setAppointmentData] = useState<AppraiserAppointmentData| null>(null);
    const appointmentID = props.appointmentID;
    const userCtx = useUserContext();
    const [UpLoadingDialog, setUpLoadingDialog] = useState(false);

    const retrieveAppointmentById = () => {
        const params = new URLSearchParams();
        params.append('appointmentID',props.appointmentID.toString());
        const getAppointmentOption= {
        method: "GET",
        params,
        url: "http://localhost:8080/api/v1/appraiser-user-appointment-view/get-by-appointment-id",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                setAppointmentData(response.data);
                console.log(appointmentData);
            }
        })
        .catch((error) => {
        console.log(error);
        });
    }

    const removeAppointment = () =>
    {
        console.log("Remove Appointment ");
        const params = new URLSearchParams();
        params.append('appointmentID',props.appointmentID.toString());

        const getAppointmentOption= {
        method: "POST",
        params,
        url: "http://localhost:8080/api/v1/appointment/appraiser-user-cancel-appointment",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                console.log("Successfully Remove Appointment");
                //Todo: Open Successfully Remove Appointment dialog
                
            }
        })
        .catch((error) => {
        console.log(error);
        });
    }

    useEffect(() => {
        retrieveAppointmentById();
    }, []);

    return (
        <>
        <Button variant="contained" onClick={() => setUpLoadingDialog(true)}>Cancel</Button>
        <Dialog open={UpLoadingDialog}
                    onClose={() => setUpLoadingDialog(false)}>
            <DialogTitle>
                <span style={{ color: "red" }}>Appointment Data</span>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Requester Name:</Typography>
                    <Typography variant="body1">{appointmentData?.antiqueOwnerFirstName} {appointmentData?.antiqueOwnerLastName}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Appointment Date and Time:</Typography>
                    <Typography variant="body1">{appointmentData?.appointmentDate} at {appointmentData?.appointmentTime}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                    <Typography variant="body1">{appointmentData?.appointmentDescription}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>User Contact Email:</Typography>
                    <Typography variant="body1">{appointmentData?.username}</Typography>
                    </Box>

                </Box>
            </DialogContent>


            <DialogActions>
                    <Button onClick={() => setUpLoadingDialog(false)}>Cancel</Button>
                    <Button onClick={() => removeAppointment()}
                            autoFocus>Confirm Remove</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}