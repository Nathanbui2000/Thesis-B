import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import cookie from "js-cookie";

import { Select } from "@mui/material";
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
import { useUserContext } from '../store/user-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface LoginViewProps {
  databaseControllerContract: any;
}
function LoginView(props: LoginViewProps) {
  const databaseControllerContract = props.databaseControllerContract;
  // const [userRole, setUserRole] = useState("");
  const [isValid, setIsValid] = useState(false);
  const accessToken = cookie.get("accessToken");
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const emailRegex = /\S+@\S+\.\S+/;
  const [userRetrieveRole,setUserRole] = useState("");
  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const [details, setDetails] = React.useState({
    emailAddress: "",
    firstName: "",
    lastName: "",
    userRole: "",
    password: "",
  });

  const [userRoleList, setUserRoleList] = React.useState([
    { id: 0, value: "Normal User" },
    { id: 1, value: "Professional Appraisal"}
  ]);
  const [error, setError] = useState("");
  const clearTextError = () => {
    setError("");
  };


  console.log("Login Contract Database Information");

  console.log(databaseControllerContract);
  const theme = createTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      userRole: data.get("userRole")
    });
    if (isValid) {
      setError("");
      //Call Backend
      const userDetail = {
        username: data.get("email"),
        password: data.get("password"),
      };

      const params = new URLSearchParams();
      if (userDetail.username !== null && userDetail.password !== null) {
        params.append("username", userDetail.username.toString());
        params.append("password", userDetail.password.toString());
        UserLogin(params, userDetail.username.toString());
      }
    } else {
      setError("Email is invalid !");
    }
  };
  const UserLogin = (params: URLSearchParams, username: string) => {
    console.log("User Login Method Called");
    //? Step 1: Validate Email From username
    const Loginheaders = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const LoginOptions = {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/user/verified-email",
    };
    axios(LoginOptions)
      .then(async (response) => {
        if (response.data) {
          //? User Has Verified Email 
          //? Step 2: Retrieve User Role from Username
          const retrieveUserRoleOption= {
            method: "GET",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            params,
            url: "http://localhost:8080/api/v1/user/get-user-role-by-username",
          };
          await axios(retrieveUserRoleOption)
            .then(async (response) => {
              console.log(response);
              await setUserRole(response.data[0].roleName);
              console.log("User Role After Axios");
              console.log(userRetrieveRole);
              //? Try Log User In   
              const options = {
                method: "POST",
                headers: { "content-type": "application/x-www-form-urlencoded" },
                params,
                url: "http://localhost:8080/api/v1/login",
              };

              axios(options)
                .then((response) => {
                  console.log(response);
                  userCtx.setUserSession({
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token,
                    userName: username,
                  });
                  // cookie.set("access_token", response.data.access_token);
                  // cookie.set("refresh_token", response.data.refresh_token);
                  // Update User Tokens In Database
                  // updateTokenDatabase(username,
                  //                     response.data.access_Token,
                  //                     response.data.refresh_token)
                  //? Save Token To User
                  //? Navigate To Main Bar
                  if(userRetrieveRole === "ROLE_USER")
                  {
                    navigate("/normal/dashboard");
                  }
                  else if (userRetrieveRole === "ROLE_APPRAISER")
                  {
                    navigate("/appraiser/dashboard");
                  }
                  else 
                  {
                    setError("Something went wrong!");
                  }
                  //window.location.reload(); // Force reload
                })
                .catch((err) => {
                  if (err.response.status === 403) {
                    //? User Not Found Or Wrong Password
                    setError("Username or Password is Wrong !");
                  }
                });
          });
        } else {
          setError("Please Verify Your Email !");
        }
      })
      .catch((error) => {
        setError("Username or Password is Wrong ");
      });

  };

  // const updateUserRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setUserRole(event.target.value as string);
  // };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={validateEmail}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={clearTextError}
              />
            <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  name="userRole"
                  label="Position"
                  id="userRole"
                  autoComplete="userRole"
                  onChange={(e) =>
                    setDetails({ ...details, userRole: e.target.value })
                    
                  }
                  value={details.userRole}
                >
                  {userRoleList.map((userRoleListElement) => (
                    <MenuItem key={userRoleListElement.id} value={userRoleListElement.value}>
                      {userRoleListElement.value}
                    </MenuItem>
                  ))}
            </TextField>
            {error && <Alert severity="error">{error}</Alert>}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/landing" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}

export default LoginView;
