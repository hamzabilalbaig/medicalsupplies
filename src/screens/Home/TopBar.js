import { Icon, Stack, Typography } from "@mui/material";
import React from "react";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { topbarTextSize } from "../../configs/constants";
const TopBar = () => {
  return (
    <div className="px-32  bg-[#ececec]">
      <Stack direction={"row"} spacing={45}>
        <Typography noWrap variant={topbarTextSize} className=" ">
          Buy the best medical supplies here!
        </Typography>
        <Stack direction={"row"}>
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer "
          >
            <Icon sx={{ fontSize: 17 }} component={SupportAgentOutlinedIcon} />{" "}
            medialSupplies@gmail.com &nbsp;&nbsp;
          </Typography>
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer"
          >
            <Icon sx={{ fontSize: 17 }} component={HelpOutlineOutlinedIcon} />{" "}
            Contact us on Whatsapp &nbsp;&nbsp;
          </Typography>
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer"
          >
            <Icon sx={{ fontSize: 17 }} component={SmsOutlinedIcon} />{" "}
            0300-2122100 &nbsp;&nbsp;
          </Typography>
          <Typography
            noWrap
            variant={topbarTextSize}
            className=" cursor-pointer"
          >
            <Icon sx={{ fontSize: 17 }} component={CallOutlinedIcon} />{" "}
            0300-2122100
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default TopBar;
