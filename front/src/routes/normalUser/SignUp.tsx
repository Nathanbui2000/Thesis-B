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
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function SignUpNormalUserView() {
    const navigate = useNavigate();
    const emailRegex = /\S+@\S+\.\S+/;
    const [isValid, setIsValid] = React.useState(false);
    const [error, setError] = React.useState("");

    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        if (emailRegex.test(email)) {
        setIsValid(true);
        } else {
        setIsValid(false);
        }
    };

    var count = 0;

    const [userRole, setUserRole] = React.useState([
    { id: 0, value: "Normal User" },
    { id: 1, value: "Professional Appraiser" },
    ]);

    const [details, setDetails] = React.useState({
        username: "",
        firstName: "",
        lastName: "",
        userRole: "",
        password: "",
    });

    const retrieveUniversities = () => {
        const options = {
            method: "GET",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: "http://localhost:8080/api/v1/university/all",
        };
    }

    // axios(options)
    //     .then((response) => {
    //         for (const university of response.data) {
    //         setUniversities((unis) => [
    //             ...unis,
    //             {
    //             id: university.id,
    //             value: university.name,
    //             },
    //         ]);
    //         }
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
    // };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(data.get("university") == ""){

        setError("Can't leave blank box !");
        }
        else if (isValid) {
        setError("");
        //Call Backend
        const userDetail = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            username: data.get("email"),
            university: data.get("university"),
            password: data.get("password"),
        };

        const params = new URLSearchParams();
        if (
            userDetail.firstName !== null &&
            userDetail.lastName !== null &&
            userDetail.username !== null &&
            userDetail.university !== null &&
            userDetail.password !== null
        ) {
            params.append("firstName", userDetail.firstName.toString());
            params.append("lastName", userDetail.lastName.toString());
            params.append("username", userDetail.username.toString());
            params.append("university", userDetail.university.toString());
            params.append("password", userDetail.password.toString());
        }
        console.log(userDetail);
        UserRegister(params);
        } else {
        setError("Can't leave blank box !");
        }
        // console.log({
        //   firstName: data.get('firstName'),
        //   lastName: data.get('lastName'),
        //   username: data.get('email'),
        //   university: data.get('university'),
        //   password: data.get('password'),
        // });
    };
    const UserRegister = (params: URLSearchParams) => {
        const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        params,
        url: "http://localhost:8080/api/v1/user/sign-up",
        };
    }

    // axios(options)
    //     .then((response) => {
    //     console.log(response);
    //     console.log("signed up");

    //     //? Save Token To User
    //     //? Navigate To Main Bar
    //     navigate("/login");
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     if (err.response.status === 403) {
    //         //? User Not Found Or Wrong Password
    //         setError("Error 403");
    //     }
    //     if (err.response.status === 500) {
    //         setError("User already exists");
    //     }
    //     });
    // };

    React.useEffect(() => {
        if (count <= 0) {
        retrieveUniversities();
        }
        count += 1;
    }, []);

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
                Sign up
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={validateEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                </Grid>

                {error && <Alert severity="error">{error}</Alert>}
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}


export default SignUpNormalUserView;
