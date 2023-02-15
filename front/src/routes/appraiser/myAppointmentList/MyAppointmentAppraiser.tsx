import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbarAppraiser/NavBarAppraiser"
import "./myAppointment.css"
import cookie from "js-cookie";
import { useUserContext } from "../../../store/user-context";

interface MyAppointmentAppraiserProps {
  databaseControllerContract: any;
}
function MainDashboardAppraiser(props: MyAppointmentAppraiserProps) {
    const navigate = useNavigate();
    const databaseControllerContract = props.databaseControllerContract;
    console.log("Main Dashboard Database Contract Information");
    const customHeader = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        {props.value}
        </div>
    );

    const userCtx = useUserContext();

    console.log(databaseControllerContract);
    const columns: GridColDef[] = [
    {
        field: "appointmentDate",
        headerName: "Appointment Date", 
        minWidth: 150, 
        type:"date",
        headerAlign: "center",
        align:"center",
        headerClassName: "bold-header",
        // renderCell: (cellValues) => (
        // <div style={{ border: "1px solid black" }}>
        //   {cellValues.value}
        // </div>
        // ),
    },
    {
        field: "appointmentTime",
        flex: 1,
        headerName: "Time",
        minWidth: 100,
        editable: false, 
        type: "datetime",
        align: "center",
        headerAlign: "center",
        headerClassName: "bold-header", 
        // renderCell: (cellValues) => (
        // <div style={{ border: "1px solid black" }}>
        //   {cellValues.value}
        // </div>
        // ),
    },
    {
        field: "antiqueOwnerFirstName",
        headerName: "First Name",
        description: "First Name of the person who requsted the appointment",
        type: "string",
        minWidth: 120,
        editable: false,
        flex: 1,
        align:"center",
        headerAlign: "center",
        headerClassName: "bold-header",
    },
    {
        field: "antiqueOwnerLastName",
        headerName: "Last Name",
        flex: 1,
        
        description:
        "Family name of the person who requested the appointment",
        type: "string",
        minWidth: 120,
        editable: false,
        align: "center",
        headerAlign: "center",
        headerClassName: "bold-header",
    },
    {
        field: "appointmentDescription",
        headerName: "Description",
        description:
        "Some Information Regarding The Appointment",
        type: "string",
        minWidth: 100,
        flex: 1,
        editable: false,
        align: "center",
        headerAlign: "center",
        headerClassName: "bold-header",
    },
    {
        field: "appointmentStatus",
        flex: 1,
        headerName: "Appointment Status",
        description:
        "The Current Status of the appointment: confirmed time , await approve, approved ",
        type: "string",
        minWidth: 150,
        editable: false,
        align: "center",
        headerAlign: "center",
        headerClassName: "bold-header",
        renderCell: (cellValues) => (
            <div style=
                {{ 
                    fontWeight: "bold",
                    fontStyle: "italic",
                    fontSize: 15,
                    // border: "1px solid black" 
                }}>
                {cellValues.value}
            </div>
        ),
    },
    {
        field: "AnotherTimeButton",
        flex: 1,
        headerName: "Another Time",
        align:"center",
        minWidth: 150,
        headerAlign:"center",
        headerClassName: "bold-header",
        description: "Propose A Different Time For Appointment",
        renderCell: (cellValues) => {
        function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
            event.stopPropagation(); // 
            console.log(cellValues);  
            //Open Diaglog For Propose Another Time 
            }
            return (
                <Button
                variant="contained"
                style={{ backgroundColor: "#003399" }}
                onClick={(event) => {
                    handleClick(event, cellValues);
                }}
                >
                Change Time
                </Button>
            );
        }
    },
    {
        field: "CancelAppointment",
        flex: 1,
        headerName: "Cancel",
        align:"center",
        minWidth: 150,
        headerAlign:"center",
        headerClassName: "bold-header",
        description: "Please Consider Carefully Before Cancelling Appointment",
        renderCell: (cellValues) => {
        function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
            event.stopPropagation(); // 
            console.log(cellValues);  
            //Open Diaglog
            }
            return (
                <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    handleClick(event, cellValues);
                }}
                >
                Cancel
                </Button>
            );
        }
    }
    ];

    const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
    >([]);

    const retrieveAppraiserAppointment = () => 
    {
        const params = new URLSearchParams();
        const username= cookie.get("userName") || "" ;
        params.append('username',username);
        params.append('accessToken',userCtx.userSession.accessToken);
        const getAppointmentOption= {
        method: "GET",
        params,
        url: "http://localhost:8080/api/v1/appraiser-user-appointment-view/find-all-by-username",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                console.log(response);
                setDataRows(response.data);
            }
        })
        .catch((error) => {
        console.log(error);
        });
    };

    

    useEffect(() => {
        retrieveAppraiserAppointment();
        const dataRows = [
            {
            "id":1,
            "AppointmentDate": "2022-01-01",
            "AppointmentTime": "10:00 AM",
            "NormalFirstName": "John",
            "UserLastName": "Doe",
            "AppointmentStatus": "Await Prooved"
            },
            {
            "id":2,
            "AppointmentDate": "2022-01-02",
            "AppointmentTime": "11:00 AM",  
            "NormalFirstName": "Jane",
            "UserLastName": "Smith",
            "AppointmentStatus": "Approved",

            },
        ]
    //setDataRows(dataRows);
    }, []);

    return (
        <div>
        <NavBar />
        <Stack spacing={3} sx={{ mt: 3 }} style = {{width: "auto"}}>
            <div style={{ display: "center" }}>
            <Typography
                variant="h3"
                component="div"
                sx={{ justifySelf: "flex-start" }}
            >
                Your Appointment
            </Typography>
            </div>
            <div style={{ display: "center" }}>
            <Typography
                variant="h4"
                component="div"
                sx={{ justifySelf: "flex-start" }}
            >
                hi username, Your Upcoming Appointment Details!
            </Typography>
            </div>

            <Grow in={true} appear={true} style = {{width: "auto"}}>
            <div 
            style={{ 
                height: "500px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "20px",
                width: "auto",
            }}
            >
                <DataGrid
                sx={{
                    boxShadow: 5,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                rows={dataRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick={true}
                getRowId={(row) => {
                    return row.appointmentID;
                }}
                onRowClick={(row) => {
                    navigate(`/uos/${row.row.unitId}`);
                }}
                />
            </div>
            </Grow>
        </Stack>
        </div>
  );
}

export default MainDashboardAppraiser;
