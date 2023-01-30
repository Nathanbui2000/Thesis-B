import { Box,Typography,TextField } from "@mui/material";

function description() {

    return (
        <Box>
            <Typography variant="h6">Step 1: Enter Personal Information</Typography>
            <form>
                <TextField label="Name" variant="outlined" />
                <TextField label="Email" variant="outlined" />
                <TextField label="Phone Number" variant="outlined" />
            </form>
        </Box>
    )
}
export default description;

