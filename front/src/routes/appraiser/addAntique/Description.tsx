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
function Description() {
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
        <div style={{ display: "center" }}>
            <Typography
            variant="h3"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
                Antique Description Data
            </Typography>
        </div>
        <div style={{ display: "center" }}>
            <Typography
            variant="h4"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Step 2: Add Antique Description Details
            </Typography>
        </div>
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '50px'
            }}>
            {/*Antique Description Detail Form*/}
            <div style={{ 
                textAlign: 'left',
                paddingLeft: "50px",
                fontWeight: "bold"
            }}>
                <Typography
                variant="h4"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Material Created
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueMaterialName"
                    label="Materials Details "
                    autoComplete="OwnerName"
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Height (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueHeight"
                    label="The Heigth In Meters of Antiqe Object"
                    autoComplete="OwnerName"
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Length (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueLength"
                    label="The Length In Meters of Antiqe Object "
                    autoComplete="OwnerName"
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Width (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueWidth"
                    label="The Width In Meters of Antiqe Object"
                    autoComplete="OwnerName"
                /> 

            </div>
            <div>
                <Typography
                variant="h3"
                component="div"
                paddingRight='20px'
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Upload Image For Antique
                </Typography>
                <input 
                type="file" 
                style={{ width: '200px' }} 
                name="file" 
                id="file" 
                />
                <label htmlFor="file">Upload Image</label>
            </div>
        </div>

    </Stack>
    )
}
export default Description;

