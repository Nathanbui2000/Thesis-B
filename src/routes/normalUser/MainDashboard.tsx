import { Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios-instance";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar"

interface MainDashboardProps {
  databaseControllerContract: any;
}
function MainDashboard(props: MainDashboardProps) {
  const navigate = useNavigate();
  const databaseControllerContract = props.databaseControllerContract;
  console.log("Main Dashboard Database Contract Information");

  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    { field: "AppointmentDate", headerName: "Appointment Date", minWidth: 250, type:"date",headerAlign: "center"},
    {
      field: "AppointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      headerAlign: "center",
    },
    {
      field: "AppraisalFirstName",
      headerName: "First Name",
      description: "First name of the person who confirmed the appointment",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "AppraisalLastName",
      headerName: "Last Name",
      description:
        "Family name of the person who confirmed the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "ApproveStatus",
      headerName: "Approve Status",
      description: "The current status of the appointment",
      flex: 1,
      align: "right",
      headerAlign: "center",
      editable: false,
      type: "boolean",
    },
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);

  useEffect(() => {
    axios
      .get("/uos", { params: {} })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          setDataRows(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
          username, here is your upcoming appointment
        </Typography>
      </div>

      <Grow in={true} appear={true}>
        <div style={{ height: "500px" }}>
          <DataGrid
            rows={dataRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick={true}
            getRowId={(row) => {
              return row.unitId;
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

export default MainDashboard;
