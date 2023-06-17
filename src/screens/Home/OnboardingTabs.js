import { Box, Tab, Tabs, createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
});
const OnboardingTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box className="pr-32   justify-end flex" sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          // sx={{
          //   "& .MuiTabs-flexContainer": {
          //     "& .MuiTab-textColorInherit": {
          //       color: "black",
          //       opacity: 1,
          //     },
          //   },
          // }}
        >
          <Tab label="Doctor" className="text-white" />
          <Tab label="Admin" />
          <Tab label="Login" />
          <Tab label="Product" />
          <Tab label="Pricing" />
        </Tabs>
      </Box>
      <div className={value !== 0 ? "hidden" : ""}>Home</div>

      <div className={value !== 1 ? "hidden" : ""}>Admin</div>
    </ThemeProvider>
  );
};

export default OnboardingTabs;
