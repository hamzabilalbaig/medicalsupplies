import { Icon, Stack, Typography } from "@mui/material";
import React from "react";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { topbarTextSize } from "../../configs/constants";
import useMediaQuery from "@mui/material/useMediaQuery";
const TopBar = () => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div className="px-10 sm:px-44 w-screen overflow-hidden bg-[#ececec]  ">
      <Stack direction={"row"} spacing={matches ? 45 : 2}>
        <Stack>
          <Typography noWrap variant={topbarTextSize} className=" ">
            Buy the best medical supplies here!
          </Typography>
        </Stack>

        <Stack direction={"row"} alignItems={"center"}>
          <Icon sx={{ fontSize: 17 }} component={SupportAgentOutlinedIcon} />{" "}
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer sm:block hidden"
          >
            medialSupplies@gmail.com &nbsp;&nbsp;
          </Typography>
          <Icon sx={{ fontSize: 17 }} component={HelpOutlineOutlinedIcon} />{" "}
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer sm:block hidden"
          >
            Contact us on Whatsapp &nbsp;&nbsp;
          </Typography>
          <Icon sx={{ fontSize: 17 }} component={SmsOutlinedIcon} />{" "}
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer sm:block hidden"
          >
            0300-2122100 &nbsp;&nbsp;
          </Typography>
          <Icon sx={{ fontSize: 17 }} component={CallOutlinedIcon} />{" "}
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer sm:block hidden"
          >
            0300-2122100
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default TopBar;
