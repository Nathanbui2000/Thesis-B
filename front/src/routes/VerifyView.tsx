import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

function VerifyView(){
    const [error, setError] = React.useState('');
    const { token } = useParams();
    const navigate = useNavigate(); 
    const params = new URLSearchParams();
    if(token !== null)
        {
            params.append('token',token!);
        }
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params,
        url: 'http://localhost:8080/api/v1/user/verify',
    };  

    axios(options)
        .then((response) => {
                console.log(response)
                console.log("verified")

                //? Save Token To User
                //? Navigate To Main Bar

        })
        .catch((err) =>
        {
            if (err.response.status === 403)
            {
                //? User Not Found Or Wrong Password
                setError('Error 403');
                console.log(err.response)
            }
        });
    return (<ThemeProvider theme={theme}>
        <h1>Your Account has been verified</h1>
    </ThemeProvider>);
}

export default VerifyView;