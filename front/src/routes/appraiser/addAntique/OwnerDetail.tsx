import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import {
    Alert,
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    Button,  
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { alignProperty } from "@mui/material/styles/cssUtils";
function OwnerDetail() {
    const [details, setDetails] = React.useState({
        emailAddress: "",
        firstName: "",
        lastName: "",
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
    };
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
        <div style={{ display: "center" }}>
            <Typography
            variant="h2"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Owner Details
            </Typography>
        </div>
        <div style={{ display: "center" }}>
            <Typography
            variant="h3"
            component="div"
            paddingTop = "2"
            sx={{ justifySelf: "flex-start" }}
            >
            Step 1: Please Verify Owner Details Information
            </Typography>
        </div>
        <div style=
        {{ 
            width: '1000px', 
            margin: '0 auto',
            border: '1px solid',
            padding: '10px',
        }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="UserFirstName"
                label="First Name"
                autoComplete="Owner Name"
            />  
            <TextField
                margin="normal"
                required
                fullWidth
                name="UserLastName"
                label="Last Name"
                autoComplete="Owner Name"
            />  
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '150px' }}
            >
                Verify User
            </Button>
        </div>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        </Box> */}

        </Stack>
    )
}
export default OwnerDetail;

