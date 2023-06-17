import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../configs/constants";
import moment from "moment/moment";

export const Admin = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}patient/getPatientRecords`)
      .then((response) => {
        console.log(response.data);
        setRows(response.data.patients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "firstName",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Typography
          onClick={() => {
            navigate("/patientChart", { state: params.row });
          }}
          className="cursor-pointer"
        >
          {params?.row?.lastName ? params?.row?.lastName + "," : "no name"}{" "}
          {params?.value}
        </Typography>
      ),
    },
    {
      field: "info",
      headerName: "Information",
      width: 200,
      renderCell: (params) => (
        <Typography>
          {params?.row?.age ? params?.row?.age : ""}
          {params?.row?.gender?.charAt(0).toUpperCase()}{" "}
          {moment(params?.row?.dateOfBirth).format("MM/DD/YYYY")}
        </Typography>
      ),
    },
    // { field: "gender", headerName: "Gender", width: 200 },
    // { field: "age", headerName: "Age", width: 200 },
    // { field: "dateOfBirth", headerName: "Date of Birth", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    // { field: "email", headerName: "Email", width: 200 },
    // { field: "address", headerName: "Address", width: 200 },
  ];

  return (
    <Box className="mx-10">
      <Card className="w-full rounded-16 shadow">
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography
              variant="h4"
              color="inherit"
              className="flex-1 px-12  font-bold"
            >
              Items List
            </Typography>
            <Button
              onClick={() => {
                console.log("add Item Model");
              }}
              variant="contained"
            >
              Add Item
            </Button>
          </Toolbar>
        </AppBar>
        <CardContent>
          <Box sx={{ height: 620 }}>
            <DataGrid loading={loading} rows={rows} columns={columns} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
