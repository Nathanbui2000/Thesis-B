import { Box,Typography,TextField, Stack, Grow, IconButton } from "@mui/material";
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
    InputAdornment,
    
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, useState } from "react";
function EmailVerification() {

    const [searchValue, setSearchValue] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log("EmailVerification Button CLicked!");
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        throw new Error("Function not implemented.");
    }

   const sendVerificationCode = () => {
        console.log("Send Verification Code Button Clicked!");
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
                            fontWeight: "bold"
                        }}>
                            <Typography
                            variant="h4"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Verify Your Email Account
                            </Typography>

            <div>
                <TextField
                    id="standard-search"
                    label="Enter Verification Code"
                    type="search"
                    variant="outlined"
                    style={{ width: "50%" }}
                    value={searchValue}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={sendVerificationCode}
                                >
                                    Send Verification Code
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
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

