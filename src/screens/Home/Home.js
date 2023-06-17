import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import TopBar from "./TopBar";
import OnboardingTabs from "./OnboardingTabs";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { ArrowDropDown, Category } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../configs/constants";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Product from "./Product";

const Home = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [rows, setRows] = useState([]);
  const [catData, setCatData] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}items/getAllItems`)
      .then((response) => {
        console.log(typeof response.data?.allItems, response.data?.allItems[0]);
        let arr = [];
        for (let i = 0; i < response.data?.allItems.length; i++) {
          arr.push(response.data?.allItems[i]);
        }
        setRows(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Category]);

  useEffect(() => {
    axios
      .get(`${baseURL}categories/getAllCategories`)
      .then((response) => {
        setCatData(response?.data?.allCategories);
        response?.data?.allCategories.map((item) => {
          setButtons((prev) => [
            ...prev,
            <Button
              onClick={() => {
                axios
                  .post(`${baseURL}items/getAllItemsByCategory`, {
                    category: item.name,
                  })
                  .then((response) => {
                    console.log(response.data?.allItems);
                    setRows(response.data?.allItems);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              key={item._id}
            >
              {item.name}
            </Button>,
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className="h-screen">
      <TopBar />
      <Box marginX={20}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <img className="h-20" src="https://i.imgur.com/DRHnWjg.jpg"></img>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography className="cursor-pointer" fontWeight={"bold"}>
              Home
            </Typography>
            <Typography className="cursor-pointer" fontWeight={"bold"}>
              Shop
            </Typography>
            <Box>
              <Typography
                aria-describedby={id}
                onClick={handleClick}
                className="cursor-pointer"
                fontWeight={"bold"}
              >
                Category <ArrowDropDown></ArrowDropDown>
              </Typography>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <ButtonGroup
                  className=""
                  orientation="vertical"
                  aria-label="vertical outlined button group"
                >
                  {buttons}
                </ButtonGroup>
              </Popover>
            </Box>
            <Typography className="cursor-pointer" fontWeight={"bold"}>
              About Us
            </Typography>
            <Typography className="cursor-pointer" fontWeight={"bold"}>
              Contact
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography
              className="cursor-pointer underline"
              onClick={() => {
                navigate("/admin");
              }}
              color={"blue"}
            >
              Login / SignUp
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box className="h-96 bg-red-500 w-screen">
        <CCarousel controls interval={1000} indicators transition="crossfade">
          <CCarouselItem>
            <CImage
              className="h-96 w-full"
              src={
                "https://media.istockphoto.com/id/477979784/vector/first-aid-kit.jpg?s=612x612&w=0&k=20&c=t60RQoJVdUIJRqNQkmTnHIsvpChKS5xPbyJPu4UmuQs="
              }
              alt="slide 1"
            />
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="h-96 w-full"
              src={
                "https://media.istockphoto.com/id/624567292/photo/flat-lay-of-various-medical-supplies-on-gray-background.jpg?s=612x612&w=0&k=20&c=qAN0a4cAd-PkFXSoIO-pWlh8VtyU7qk0cxZXzKwuBjA="
              }
              alt="slide 2"
            />
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="h-96 w-full"
              src={
                "https://alliedusa.net/wp-content/uploads/2022/05/Are-Medical-Supplies-1099-Reportable.jpg"
              }
              alt="slide 3"
            />
          </CCarouselItem>
        </CCarousel>
        <Grid container spacing={1}>
          <Grid item lg={3}>
            <Box className="items-center mx-20 mt-10">
              <Stack spacing={3} justifyContent={"center"}>
                <Typography align="center" variant="h4">
                  Categories
                </Typography>
                <ButtonGroup
                  className=""
                  orientation="vertical"
                  aria-label="vertical outlined button group"
                >
                  {buttons}
                </ButtonGroup>
              </Stack>
            </Box>
          </Grid>
          <Grid item lg={9}>
            <Box>
              {rows &&
                rows.map((item) => {
                  return <Product item={item} />;
                })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
