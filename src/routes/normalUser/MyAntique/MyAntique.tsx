import { Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import axios from "../../utils/axios-instance";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar"
interface MyAntiqueProps {
  databaseControllerContract: any;
}
function MyAntiqueList(props:MyAntiqueProps ) {
  const navigate = useNavigate();
  const databaseControllerContract = props.databaseControllerContract;
  console.log("My AntiqueList Database Contract Information");''
  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    { 
      field: "UID",
      headerName: "UID", 
      minWidth: 50, 
      type:"number",
      headerAlign: "center"
    },

    {
      field: "AntiqueName",
      headerName: "Antique Name",
      minWidth: 200,
      editable: false, 
      type: "string",
      headerAlign: "center",
    },
    {
      field: "Verifier",
      headerName: "Verifier Name",
      description: "Person who examinated the antique",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "VerifyTime",
      headerName: "Verification Time",
      description: "Indicates when the antique is verified",
      type: "datetime",
      flex: 1,
      minWidth: 50,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "CreatedYear",
      headerName: "Estimated Created Year",
      description:
        "An Estimatation of when the antique is created",
      type: "string",
      flex: 1,
      editable: false,
      align: "left",
      headerAlign: "center",
      minWidth: 200,
    },
    {
      field: "Enthicity",
      headerName: "Antique Enthicity",
      description: "Indicates where antique is unique",
      flex: 1,
      align: "right",
      minWidth: 100,
      headerAlign: "center",
      editable: false,
      type: "boolean",
    },
    {
      field: "Rareness",
      headerName: "Rareness ",
      description: "Indicates the rareness of the Anitque",
      flex: 1,
      align: "right",
      headerAlign: "center",
      editable: false,
      type: "string",
    },
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);

//   useEffect(() => {
//     axios
//       .get("/uos", { params: {} })
//       .then((resp) => {
//         if (resp.status === 200) {
//           console.log(resp.data);
//           setDataRows(resp.data);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

  return (
    <div >
    <NavBar />
    <Stack spacing={3} sx={{ mt: 3 }}>
      <div style={{ display: "center" }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ justifySelf: "flex-start" }}
        >
          Here is your Antique List
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

export default MyAntiqueList;
