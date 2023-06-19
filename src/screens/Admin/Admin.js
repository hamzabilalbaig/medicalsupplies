import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../configs/constants";
import moment from "moment/moment";
import { Close, Delete, Save } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import MenuIcon from "@mui/icons-material/Menu";

export const Admin = () => {
  const matches = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [open2, setOpen2] = useState(false);
  const [catname, setCatName] = useState("");
  const [catdata, setCatData] = useState([]);
  const [drawer, setDrawer] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}items/getAllItems`)
      .then((response) => {
        console.log(typeof response?.data?.allItems, response?.data?.allItems);

        setRows(response?.data?.allItems);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get(`${baseURL}categories/getAllCategories`)
      .then((response) => {
        console.log(
          typeof response?.data?.allCategories,
          response?.data?.allCategories
        );
        console.log("catdata");
        console.log(response?.data?.allCategories, "catdata");
        setCatData(response?.data?.allCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [refresh]);

  const handleDelete = async (id) => {
    setLoading(true);
    enqueueSnackbar("Deleting Item", { variant: "info" });
    await axios
      .delete(`${baseURL}items/deleteItem/${id}`)
      .then((response) => {
        enqueueSnackbar("Item Deleted", { variant: "success" });
        console.log(response.data);
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar("Error Occurred While Deleting Item", {
          variant: "error",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const columns = [
    {
      field: "delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => {
              handleDelete(params?.row?.id);
            }}
          >
            <Delete style={{ color: "red" }}></Delete>
          </Button>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Item Name",
      width: 200,
      //   renderCell: (params) => (
      //     <Typography
      //       onClick={() => {
      //         navigate("/patientChart", { state: params.row });
      //       }}
      //       className="cursor-pointer"
      //     >
      //       {params?.row?.lastName ? params?.row?.lastName + "," : "no name"}{" "}
      //       {params?.value}
      //     </Typography>
      //   ),
    },
    { field: "category", headerName: "Category", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 200,
      //   renderCell: (params) => (
      //     <Typography>
      //       {params?.row?.age ? params?.row?.age : ""}
      //       {params?.row?.gender?.charAt(0).toUpperCase()}{" "}
      //       {moment(params?.row?.dateOfBirth).format("MM/DD/YYYY")}
      //     </Typography>
      //   ),
    },

    { field: "description", headerName: "Description", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  const handlesubmit = () => {
    enqueueSnackbar("Creating Item", { variant: "info" });
    const data = new FormData();

    data.append("name", itemName);
    data.append("price", itemPrice);
    data.append("category", itemCategory);
    data.append("description", itemDescription);

    data.append("image", itemImage);
    axios
      .post(`${baseURL}items/createItem`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Item Created", { variant: "success" });
        setOpen(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        enqueueSnackbar("Error Occurred While Creating Item", {
          variant: "error",
        });
        console.log(err);
        setOpen(false);
      });
  };

  const handlesubmit2 = () => {
    axios
      .post(`${baseURL}categories/createCategory`, { name: catname })
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Category Created", { variant: "success" });
        setOpen2(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error Occurred While Creating Category", {
          variant: "error",
        });
        setOpen2(false);
      });
  };

  return (
    <Box marginX={matches ? 5 : 0}>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box className="h-screen w-screen flex flex-1 justify-center items-center">
          <Card className="sm:w-1/3 w-screen rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar>
                <Box className="flex flex-row justify-between  w-full">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1  font-medium"
                  >
                    Add Item
                  </Typography>
                  <Close
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                    }}
                  ></Close>
                </Box>
              </Toolbar>
            </AppBar>
            <CardContent className="flex flex-1 items-center justify-center">
              <Box className="">
                <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Item Name"
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />

                {/* <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Category"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                /> */}
                <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Price"
                  onChange={(e) => {
                    setItemPrice(e.target.value);
                  }}
                />

                <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Image"
                  type={"file"}
                  onChange={(e) => {
                    setItemImage(e.target.files[0]);
                  }}
                />
                <FormControl className="w-80 mt-2">
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemCategory}
                    label="Note Type"
                    onChange={(e) => setItemCategory(e.target.value)}
                  >
                    {catdata &&
                      catdata?.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Description"
                  multiline
                  rows={10}
                  onChange={(e) => {
                    setItemDescription(e.target.value);
                  }}
                />

                <Button
                  onClick={handlesubmit}
                  style={{ marginTop: 15 }}
                  className="w-full"
                >
                  <Save className="mr-2"></Save> Save Item
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open2}
        onClose={() => {
          setOpen2(false);
        }}
      >
        <Box className="h-screen w-screen flex flex-1 justify-center items-center">
          <Card className="sm:w-1/3 w-screen rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar>
                <Box className="flex flex-row justify-between  w-full">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1  font-medium"
                  >
                    Add Category
                  </Typography>
                  <Close
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen2(false);
                    }}
                  ></Close>
                </Box>
              </Toolbar>
            </AppBar>
            <CardContent className="flex flex-1 items-center justify-center">
              <Box className="">
                <TextField
                  style={{ marginTop: 15 }}
                  className="w-full"
                  variant="standard"
                  label="Category Name"
                  onChange={(e) => {
                    setCatName(e.target.value);
                  }}
                />

                <Button
                  onClick={handlesubmit2}
                  style={{ marginTop: 15 }}
                  className="w-full"
                >
                  <Save className="mr-2"></Save> Save Item
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Drawer
        anchor={"left"}
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {
            setDrawer(false);
          }}
          onKeyDown={() => {
            setDrawer(false);
          }}
        >
          <Stack
            marginTop={5}
            direction={"column"}
            spacing={5}
            alignItems={"center"}
          >
            <img className="h-20" src="https://i.imgur.com/DRHnWjg.jpg"></img>

            <Button
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Add Item
            </Button>
            <Button
              onClick={() => {
                setOpen2(true);
              }}
              variant="contained"
            >
              Add Category
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="contained"
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Card className="w-full rounded-16 shadow">
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Stack
              direction="row"
              spacing={90}
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems={"center"} spacing={2}>
                <Button
                  onClick={() => {
                    setDrawer(true);
                  }}
                >
                  <MenuIcon
                    style={{ color: "white" }}
                    hidden={matches}
                  ></MenuIcon>
                </Button>
                <Typography
                  noWrap
                  variant={matches ? "h4" : "h7"}
                  color="inherit"
                  className="flex-1 px-0 sm:px-12  font-bold"
                >
                  Items List
                </Typography>
              </Stack>

              <Stack hidden={!matches} direction="row" spacing={2}>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant="contained"
                >
                  Add Item
                </Button>
                <Button
                  onClick={() => {
                    setOpen2(true);
                  }}
                  variant="contained"
                >
                  Add Category
                </Button>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  variant="contained"
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
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
