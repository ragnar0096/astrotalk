import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FriendsComponent from "./FriendsComponents";
import { withStyles } from "@mui/styles";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const styles = (theme) => ({
  indicator: {
    backgroundColor: "orange",
  },
});

function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = () => {
    setValue(0);
  };
  const { classes } = props;

  return (
    <>
      <Tabs
        value={value}
        classes={{ indicator: classes.indicator }}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab
          style={{ color: "orange" }}
          label=" My Profile"
          {...a11yProps(0)}
        />
        <Tab
          style={{ color: "orange" }}
          label="Order History"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel style={{ padding: "11px" }} value={value} index={0}>
        <FriendsComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Order History
      </TabPanel>
    </>
  );
}
export default withStyles(styles)(BasicTabs);
