import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

function ForgotPassword() {
    const navigate = useNavigate();
    const theme = createTheme();
    const emailRegex = /\S+@\S+\.\S+/;
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
        setIsValid(true);
    } else {
        setIsValid(false);
    }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (isValid) {
            setError("");
            //Call Backend
            const userDetail = {
            username: data.get("email"),
            };

            const params = new URLSearchParams();
            if (userDetail.username !== null) {
            params.append("username", userDetail.username.toString());
            }

            ForgotPassword(params);
        } else {
            setError("Email is invalid !");
        }
        console.log({
            username: data.get("username"),
        });
    };

    const ForgotPassword = (params: URLSearchParams) => {
        const options = {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            params,
            url: "http://localhost:8080/api/v1/user/forgot-password",
        };

        axios(options)
            .then((response) => {
            console.log(response);
            //? Save Token To User
            //? Navigate To Main Bar
            setError("Email Will Be Sent If Found In System");
            })
            .catch((err) => {
            if (err.response.status === 403) {
                //? User Not Found Or Wrong Password
                setError("Username or Password is Wrong !");
            }
            });

        const timeout = setTimeout(() => {
            navigate("/login");
        }, 5000);
        return () => clearTimeout(timeout);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Forgot Password
                </Typography>
                <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 6 }}
                >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={validateEmail}
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Get New Password
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="/login" variant="body2">
                        {"LogIn"}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/landing" variant="body2">
                        {"Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ForgotPassword;
