import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbarAppraiser/NavBarAppraiser"
import "./dashboard.css"
import cookie from "js-cookie";

interface MainDashboardAppraiserProps {
  databaseControllerContract: any;
}
function MainDashboardAppraiser(props: MainDashboardAppraiserProps) {
  const navigate = useNavigate();
  const databaseControllerContract = props.databaseControllerContract;
  console.log("Main Dashboard Database Contract Information");
  const customHeader = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
      {props.value}
    </div>
  );
  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    {
      field: "appointmentDate",
      headerName: "Appointment Date", 
      minWidth: 200, 
      type:"date",
      headerAlign: "center",
      align:"center",
      headerClassName: "bold-header",
      renderCell: (cellValues) => (
            <div style=
                {{ 
                    fontWeight: "bold",
                    fontSize: 11,
                    // border: "1px solid black" 
                }}>
                {cellValues.value}
            </div>
        ),
      // renderCell: (cellValues) => (
      // <div style={{ border: "1px solid black" }}>
      //   {cellValues.value}
      // </div>
      // ),
    },
    {
      field: "appointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      align: "center",
      headerAlign: "center",
      headerClassName: "bold-header",
      renderCell: (cellValues) => (
            <div style=
                {{ 
                    fontWeight: "bold",
                    fontSize: 11,
                    // border: "1px solid black" 
                }}>
                {cellValues.value}
            </div>
        ), 
      // renderCell: (cellValues) => (
      // <div style={{ border: "1px solid black" }}>
      //   {cellValues.value}
      // </div>
      // ),
    },
    {
      field: "firstName",
      headerName: "Requester First Name",
      description: "First name of the person who requested the meeting",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      align:"center",
      headerAlign: "center",
      headerClassName: "bold-header",
    },
    {
      field: "lastName",
      headerName: "Requester Last Name",
      description:
        "Family name of the person who requested the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold-header",
    },
    // {
    //   field: "ChooseAppointmentButton",
    //   headerName: "Choose Appointment",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   editable: false,
    //   type: "event",
    //   headerClassName: "bold-header",
    //   // renderCell: (cellValues) => (
    //   // <div style={{ border: "1px solid black" }}>
    //   //   {cellValues.value}
    //   // </div>
    //   // ),
    // },
    {
  field: "Choose Appointment",
  align:"center",
  minWidth: 150,
  headerAlign:"center",
  headerClassName: "bold-header",
  description: "Click to choose an appointment",
  renderCell: (cellValues) => {
    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
      event.stopPropagation(); // 
      console.log(cellValues);  
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
      >
        Choose
      </Button>
    );
  }
}
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);

  const retrieveAllAppointments = () => 
  {
    //Todo: Reieve All Appointments Information
    const params = new URLSearchParams();
    const username= cookie.get("userName") || "" ;
    params.append('antiqueOwnerUsername',username);
    const getAppointmentsOption =
    {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/all-appointment-view/all",
    };
      axios(getAppointmentsOption)
      .then((response) => {
          if (response.status === 200) {
              setDataRows(response.data);
              console.log(response.data); 
          }
      })
      .catch((error) => {
        console.log(error);
      });
    };


  useEffect(() => {
    const dataRows = [
      {
        "id":1,
        "AppointmentDate": "2022-01-01",
        "AppointmentTime": "10:00 AM",
        "NormalFirstName": "John",
        "UserLastName": "Doe",
        "ChooseAppointmentButton": "Choose"
      },
      {
        "id":2,
        "AppointmentDate": "2022-01-02",
        "AppointmentTime": "11:00 AM",  
        "NormalFirstName": "Jane",
        "UserLastName": "Smith",
        "ChooseAppointmentButton": "click"
      },
    ]
    // setDataRows(dataRows);
    retrieveAllAppointments();

  }, []);

  return (
    <div>
    <NavBar />
    <Stack spacing={3} sx={{ mt: 3 }}>
      <div style={{ display: "center" }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ justifySelf: "flex-start" }}
        >
          Welcome back to AntiqueIoTChain
        </Typography>
      </div>
      <div style={{ display: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ justifySelf: "flex-start" }}
        >
          username, Choose An Appointment Suit You!
        </Typography>
      </div>

      <Grow in={true} appear={true}>
        <div 
        style={{ 
          height: "500px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
        }}
        >
          <DataGrid
            sx={{
                boxShadow: 2,
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
              navigate(`/uos/${row.row.appointmentID}`);
            }}
          />
        </div>
      </Grow>
    </Stack>
    </div>
  );
}

export default MainDashboardAppraiser;


