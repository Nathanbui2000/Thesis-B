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
import {Appointment} from "../type/Java/Appointment";
import { ChooseAppointmentSuccessfulDialog } from "./informationDialog/ChooseAppointmentSuccessfulDialog";
interface ChooseAppointmentDialog {
    appointmentID: number;
}
export const ChooseAppointmentDialog = (props:ChooseAppointmentDialog) => {
    const [appointmentData, setAppointmentData] = useState<Appointment| null>(null);
    const appointmentID = props.appointmentID;
    const userCtx = useUserContext();
    const [UpLoadingDialog, setUpLoadingDialog] = useState(false);

    const retrieveAppointmentById = () => {
        const params = new URLSearchParams();
        params.append('appointmentID',props.appointmentID.toString());
        const getAppointmentOption= {
        method: "GET",
        params,
        url: "http://localhost:8080/api/v1/all-appointment-view/get-by-id",
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

    const chooseAppointment = () =>
    {
        console.log("choosing appointment");
        const params = new URLSearchParams();
        params.append('appointmentID',props.appointmentID.toString());
        params.append('appraiserConfirmedAppointmentUsername',cookie.get("userName") || "");

        const getAppointmentOption= {
        method: "POST",
        params,
        url: "http://localhost:8080/api/v1/appointment/appraiser-choose-appointment",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                console.log("Successfully Choose Appointment");
                //Todo: Open Successfully Choose Appointment dialog
                <ChooseAppointmentSuccessfulDialog></ChooseAppointmentSuccessfulDialog>
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
        <Button variant="contained" onClick={() => setUpLoadingDialog(true)}>Choose Appointment</Button>
        <Dialog open={UpLoadingDialog}
                    onClose={() => setUpLoadingDialog(false)}>
            <DialogTitle>
                <span style={{ color: "red" }}>Confirm Appointment</span>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Requester Name:</Typography>
                    <Typography variant="body1">{appointmentData?.firstName}  {appointmentData?.lastName}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Appointment Date and Time:</Typography>
                    <Typography variant="body1">{appointmentData?.appointmentDate} at {appointmentData?.appointmentTime}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                    <Typography variant="body1">{appointmentData?.description}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>User Contact Email:</Typography>
                    <Typography variant="body1">{appointmentData?.username}</Typography>
                    </Box>

                </Box>
            </DialogContent>


            <DialogActions>
                    <Button onClick={() => setUpLoadingDialog(false)}>Cancel</Button>
                    <Button onClick={() => chooseAppointment()}
                            autoFocus>Confirm</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}