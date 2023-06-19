import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const Product = ({ item }) => {
  const image = item.imageURL;
  const [open, setOpen] = useState(false);
  return (
    <Button
      onClick={() => setOpen(true)}
      className="w-64 flex flex-col items-center justify-center m-5"
      color="error"
    >
      <img alt="" className="w-40 h-40 object-contain" src={image} />
      <Box className="ml-3 mt-2 w-full">
        <Typography
          textAlign={"left"}
          fontWeight={"bold"}
          style={{ fontSize: 20 }}
        >
          {item.name}
        </Typography>
        <Typography textAlign={"left"} fontWeight={"bold"}>
          RS. {item.price}
        </Typography>
        <Modal
          className="w-screen h-screen flex items-center justify-center"
          open={open}
        >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box style={{ width: 1200, height: 600 }} className=" bg-white">
              <Grid container spacing={1}>
                <Grid item lg={4}>
                  <Box
                    style={{ height: 600 }}
                    className="flex bg-slate-100 h-full items-center justify-center"
                  >
                    <img alt="" src={image} />
                  </Box>
                </Grid>
                <Grid item lg={8}>
                  <Box
                    style={{ height: 600 }}
                    className="flex mx-10 h-full items-center justify-center"
                  >
                    <Stack>
                      <Typography
                        textAlign={"left"}
                        fontWeight={"bold"}
                        style={{ fontSize: 40 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        textAlign={"left"}
                        fontWeight={"bold"}
                        style={{ fontSize: 30 }}
                      >
                        Price : RS.{item.price}
                      </Typography>
                      <Typography
                        textAlign={"left"}
                        fontWeight={"bold"}
                        style={{ fontSize: 30 }}
                      >
                        Description
                      </Typography>
                      <Typography>{item.description}</Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </ClickAwayListener>
        </Modal>
      </Box>
    </Button>
  );
};

export default Product;
