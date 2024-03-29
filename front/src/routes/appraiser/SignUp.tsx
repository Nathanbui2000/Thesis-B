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
interface SignUpAppraiserViewProps {
  databaseControllerContract: any;
  blockchainController: any;
  mainTruffleUser: any;
}
function SignUpAppraiserView(props:SignUpAppraiserViewProps ) {

    //! Truffle Database Settings
    const databaseControllerContract = props.databaseControllerContract;
    const blockchainController = props.blockchainController;
    const mainTruffleUser = props.mainTruffleUser;
    
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

    const [userExperiences, setUserExperiences] = React.useState([
        { id: 0, value: "Less than 3 Years" },
        { id: 1, value: "Between 3 - 5 Years" },
        { id: 2, value: "Between 5 - 10 Years" },
        { id: 3, value: "Between 10 - 15 Years" },
        { id: 4, value: "Between 15 - 20 Years" },
        { id: 5, value: "More than 20 years" },
    ]);

    const [details, setDetails] = React.useState({
        username: "",
        firstName: "",
        lastName: "",
        userExperiences: "",
        password: "",
        userDriverLince:"",
        appraiserLinceNumber:"",
    });

    const retrieveUniversities = () => {
        const options = {
            method: "GET",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: "http://localhost:8080/api/v1/university/all",
        };
    }
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(data.get("university") == ""){

        setError("Can't leave blank box !");
        }
        else if (isValid) {
        setError("");
        //Call Backend
        let newAccount = await blockchainController.eth.personal.newAccount(data.get("password"));
            blockchainController.eth.personal.unlockAccount(newAccount,data.get("password"),20000);
            var sendID = await blockchainController.eth.sendTransaction({
                from: mainTruffleUser,
                to: newAccount , 
                value : blockchainController.utils.toWei('3','Ether')});
        const userDetail = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            username: data.get("email"),
            userExperiences: data.get("UserExperience"),
            userDriverLince: data.get("userDriverLince"),
            password: data.get("password"),
            blockchainAddress: newAccount,
        };

        const params = new URLSearchParams();
        if (
            userDetail.firstName !== null &&
            userDetail.lastName !== null &&
            userDetail.username !== null &&
            userDetail.userExperiences != null &&
            userDetail.userDriverLince != null &&
            userDetail.password !== null
        ) {
            params.append("firstName", userDetail.firstName.toString());
            params.append("lastName", userDetail.lastName.toString());
            params.append("username", userDetail.username.toString());
            params.append("appraiserExperience", userDetail.userExperiences.toString());
            params.append("nswDriverLicence", userDetail.userDriverLince.toString());
            params.append("password", userDetail.password.toString());
            params.append("blockchainAddress", userDetail.blockchainAddress.toString());

            //Todo: Retrieve Blockchain address
            
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
        url: "http://localhost:8080/api/v1/user/appraiser-user/sign-up",
        };
        axios(options)
        .then((response) => {
        console.log(response);
        console.log("signed up");

        //? Save Token To User
        //? Navigate To Main Bar
        navigate("/login");
        })
        .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
            //? User Not Found Or Wrong Password
            setError("Error 403");
        }
        if (err.response.status === 500) {
            setError("User already exists");
        }
        });
    };

    
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
                <Grid item xs={12}sm={7}>
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
                <Grid item xs={12}sm={7}>
                    <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    name="UserExperience"
                    label="Your Personal Experience"
                    id="UserExperience"
                    autoComplete="UserExperience"
                    onChange={(e) =>
                        setDetails({ ...details, userExperiences: e.target.value })
                    }
                    value={details.userExperiences}
                    >
                    {userExperiences.map((userExperiences) => (
                        <MenuItem key={userExperiences.id} value={userExperiences.value}>
                        {userExperiences.value}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                
                <Grid item xs={12} sm={7}>
                    <TextField
                    required
                    fullWidth
                    id="userDriverLince"
                    label="NSW Driver License Number"
                    name="userDriverLince"
                    autoComplete="userDriverLince"
                    ></TextField>
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


export default SignUpAppraiserView;
