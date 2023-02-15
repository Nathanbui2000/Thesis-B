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

interface AppointmentView {
    appointmentID: number;
}
export const AppointmentView = (props:AppointmentView) => {
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

    useEffect(() => {
        retrieveAppointmentById();
    }, []);

    return (
        <>
        <Button variant="contained" onClick={() => setUpLoadingDialog(true)}>View</Button>
        <Dialog open={UpLoadingDialog}
                    onClose={() => setUpLoadingDialog(false)}>
            <DialogTitle>
                <span style={{ color: "red" }}>Appointment Details</span>
            </DialogTitle>
            <DialogContent>
            {/**NOTE - Dialog Detail Page */}
            {/** Antique Owner Name */}
            <Typography
                variant="h6"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Requester Name
            </Typography>
            <FormControl>
                <Input defaultValue={appointmentData?.firstName} inputProps={{ 'aria-label': 'description' }} disabled />
            </FormControl>

            {/** Appointment Date */}
            <Typography
                variant="h6"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Appointment Date
            </Typography>
            <FormControl>
                <Input defaultValue={appointmentData?.appointmentDate} inputProps={{ 'aria-label': 'description' }} disabled />
            </FormControl>

            {/** Appointment Time */}
            <Typography
                variant="h6"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Appointment Time 
            </Typography>
            <FormControl>
                <Input defaultValue={appointmentData?.appointmentTime} inputProps={{ 'aria-label': 'description' }} disabled />
            </FormControl>

            {/** Appointment Description */}
            <Typography
                variant="h6"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Description
            </Typography>
            <FormControl>
                <Input defaultValue={appointmentData?.description} inputProps={{ 'aria-label': 'description' }} disabled />
            </FormControl>

            {/** Antique Owner Contact Email */}
            <Typography
                variant="h6"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    User Contact Email
            </Typography>
            <FormControl>
                <Input defaultValue={appointmentData?.username} inputProps={{ 'aria-label': 'description' }} disabled />
            </FormControl>

            </DialogContent>
            <DialogActions>
                    <Button onClick={() => setUpLoadingDialog(false)}>Cancel</Button>
                    {/* <Button onClick={() => uploadDocumentation()}
                            autoFocus>Submit</Button> */}
            </DialogActions>
        </Dialog>
        </>
    )

}