import { Box,Typography,TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function description() {
    return (
        <Box>
            <Typography variant="h6">Step 2: Select your preferred payment method</Typography>
            <RadioGroup>
                <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="debit-card" control={<Radio />} label="Debit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
            </RadioGroup>
        </Box>

    )
}
export default description;

