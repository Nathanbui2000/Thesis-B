
import * as React from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar"
import moment from 'moment';
import { render } from "@testing-library/react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import cookie from "js-cookie";

import "react-datepicker/dist/react-datepicker.css";
function  Appointment() 
{
    const [appointmentDescription, setAppointmentDescription] = useState("");
    const [appointmentDateTimeValue, setAppointmentDateTimeValue] = useState("");
    const [isPastDateDialogOpen, setIsPastDateDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const handlePastDate = () => {
        setIsPastDateDialogOpen(true);
    };
    const handleSubmit = () =>
    {
         //Todo: Validate Current Date time picker value
        const dateTimeObj = moment(appointmentDateTimeValue.appointmentDateTimeValue);
        const date = dateTimeObj.format('MMMM Do YYYY');
        const time = dateTimeObj.format('HH:mm');
        if (dateTimeObj.isBefore())
        {
            //Todo: Open Dialog For Invalid Date Time
            setDialogTitle("Invalid Date Time");
            setDialogContent(
                <Typography>
                <strong>{date}</strong> at <strong>{time}</strong> is already in the past. Please select a future date and time.
                </Typography>
            );
            handlePastDate();
        }
        else if (dateTimeObj.isAfter())
        {
            //Todo: Process Request
            //Todo: Send Backend Request To Make Appointment  
            const params = new URLSearchParams();
            const username= cookie.get("userName") || "" ;
            params.append('antiqueOwnerUsername',username);
            params.append('appointmentDate',date);
            params.append('appointmentTime',time);
            params.append('appointmentConfirmed',false);
            params.append('appointmentDescription',appointmentDescription.appointmentDescription);
            params.append('appointmentStatus',"Awaiting Confirmation");

            const getAppointmentsOption =
            {
            method: "POST",
            params,
            url: "http://localhost:8080/api/v1/appointment/add-appointment",
            };
            axios(getAppointmentsOption)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    //Open Successful Dialog
                    setAppointmentDescription("");
                    setAppointmentDateTimeValue("");

                    setDialogTitle("Appointment Booked Successfully !");
                    setDialogContent(
                        <Typography>
                        <strong>Your Appointment On: {date}</strong> at <strong>{time}</strong> has been booked Successfully. 
                        <br></br>

                        An Email Will Be Sent As a Confirmation. Our Staffs will connect with you ASAP
                        </Typography>
                    );
                    handlePastDate();
                    //Clear Input Data

                }
            })
            .catch((error) => {
                //? Open Dialog With Something Went Wrong
                setDialogTitle("Unable To Book Appointment");
                setDialogContent(
                    <Typography>
                    <strong>Book Appointment Failed.</strong> Something Went Wrong. Please Try Again Later.
                    </Typography>
                );
                handlePastDate();
            });
            
        }
        else 
        {
            //Todo: Open Dialog For Urgent Date Time
            setDialogTitle("Urgent Appointment");
            setDialogContent(
                <Typography>
                You have selected an appointment for <strong>{date}</strong> at <strong>{time}</strong>. Are you sure you want to book this appointment?
                </Typography>
            );
            handlePastDate();

        }

    }
    return ( 
        <>
        <NavBar/>
        <Stack spacing={3} sx={{ mt: 3 }}>
            {/*Book Appointment Label*/}
            <div style={{ 
                display: "center" }}>
                <Typography
                    variant="h3"
                    component="div"
                    sx={{ justifySelf: "flex-start" }}
                >
                    Book An Appointment With Our Professional Appraiser
                </Typography>
            </div>

            <div
            style=
                {{
                    display: "center", 
                    border: "1px solid black",
                    paddingTop: "50px",
                    paddingLeft:"50px",
                    paddingRight:"50px",
                    maxwidth:"800px",
                    height: "500px",
                    
                }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ justifySelf: "flex-start" }}
                    paddingBottom = "50px"
                >
                    Please Choose Your Referal Date and Time
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/**NOTE - Choose Date Time Appointment */ }
                    <div>
                    <TextField
                        id="datetime-local"
                        label="Choose Your Appointment"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        onChange={(e) => {
                            setAppointmentDateTimeValue(prevState => ({...prevState, appointmentDateTimeValue: e.target.value}));
                            console.log(appointmentDateTimeValue);
                            }}
                        sx={{ width: 500 }}
                        InputLabelProps={{
                            shrink: true,
                    }}
                    />
                    </div>
                    {/**NOTE - Appointment Description Input */}
                    <div style={{ 
                        display: "flex", 
                    flexDirection: "column" 
                    }}
                    
                    >
                        <Typography variant="h5" style={{ alignItems: "flex-start" ,textAlign: "left" }}     paddingTop= "50px">
                            Enter Information For Your Appointment
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="AppointmentDescription"
                            onChange={(e) => {
                            setAppointmentDescription(prevState => ({...prevState, appointmentDescription: e.target.value}));
                            console.log(appointmentDescription.appointmentDescription);
                            }}
                            label="Appointment Description"
                        />
                    </div>
                    {/**NOTE - Button Confirmation */}
                    <div>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirm Appointment
                        </Button>
                    </div>
                </Box>
            </div>
        </Stack>
        <Dialog open={isPastDateDialogOpen} onClose={() => setIsPastDateDialogOpen(false)}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
                <Button onClick={() => setIsPastDateDialogOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>
        

        </>
    )
}

export default Appointment;