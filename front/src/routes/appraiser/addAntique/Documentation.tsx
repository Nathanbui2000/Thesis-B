import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
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
function AntiqueDocumentation() {
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
        <div style={{ display: "center" }}>
            <Typography
            variant="h3"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Owner Details
            </Typography>
        </div>
        <div style={{ display: "center" }}>
            <Typography
            variant="h4"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Step 1: Please Verify Owner Details Information
            </Typography>
        </div>
    </Stack>
    )
}
export default AntiqueDocumentation;

