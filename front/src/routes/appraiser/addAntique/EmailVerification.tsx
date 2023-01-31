import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
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
import { FormEvent } from "react";
function EmailVerification() {


    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log("EmailVerification Button CLicked!");
    }

    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <div style={{ display: "center" }}>
                <Typography
                variant="h2"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Verify Appraiser
                </Typography>
            </div>
            <div style={{ display: "center" }}>
                <Typography
                variant="h3"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Step 5: Please Verify Your Account
                </Typography>
            </div>
            <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                    >
                <div>
                    {/*Antique Verification Detail Input*/}
                    <div style={{ 
                            textAlign: 'center',
                            paddingLeft: "50px",
                            paddingTop: "50px",
                            paddingBottom:"50px",
                            fontWeight: "bold"
                        }}>
                            <Typography
                            variant="h4"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Verify Your Email Account
                            </Typography>

                                <TextField
                                    style={{width: '400px'}}
                                    margin="normal"
                                    required
                                    name="EstimateManufactureYear"
                                    label="Enter Verification Code"
                                    autoComplete="VerificationCode"
                                    id="VerificationCode"
                                /> 
                    </div>
                </div>
                {/*Upload Button*/}
                    <Button
                            variant="contained"
                            type="submit"
                            startIcon={<MarkEmailReadIcon />}
                            sx={{ mt: 1, mb: 2 }}
                            // onClick={handleUploadResource}
                            size="small"
                        >
                            Confirm
                    </Button>
            </Box>
        </Stack>
    )
}
export default EmailVerification;

