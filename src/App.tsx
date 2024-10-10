// src/App.tsx
import React from "react";
import { CubeProvider } from "./CubeProvider";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Define the props for TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel component to render the content of each tab
function TabPanel(props: TabPanelProps) {
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
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Accessibility props for tabs
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CubeProvider>
      <Box sx={{ width: "100%" }}>
        {/* Tabs Navigation */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Stellar and Stacks Tabs"
            variant={isSmallScreen ? "fullWidth" : "standard"}
            centered={!isSmallScreen}
          >
            <Tab label="Stellar" {...a11yProps(0)} />
            <Tab label="Stacks" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={value} index={0}>
          {/* Stellar Content */}
          <Typography variant="h5" gutterBottom>
            Stellar Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Stellar section. Here you can add components related to Stellar.
          </Typography>
          {/* Example: <StellarComponent /> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Stacks Content */}
          <Typography variant="h5" gutterBottom>
            Stacks Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Stacks section. Here you can add components related to Stacks.
          </Typography>
          {/* Example: <StacksComponent /> */}
        </TabPanel>
      </Box>
    </CubeProvider>
  );
}

export default App;
