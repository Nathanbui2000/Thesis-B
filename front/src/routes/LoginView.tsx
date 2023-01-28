import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
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
interface LoginViewProps {
  databaseControllerContract: any;
}
function LoginView(props: LoginViewProps) {
  const databaseControllerContract = props.databaseControllerContract;
  // const [userRole, setUserRole] = useState("");

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
  console.log("Login Contract Database Information");

  console.log(databaseControllerContract);
  const theme = createTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
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
