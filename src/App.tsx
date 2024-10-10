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
import ZestSupplyTable from "./components/ZestSupplyTable";
import PricingTable from "./components/PricingTable";
import DapssTvlTable from "./components/DappsTvlTable";
import StellarTransactionsTable from "./components/StellarTransactionsTable";

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
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
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
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
            aria-label="Dashboard Tabs"
            variant={isSmallScreen ? "scrollable" : "standard"}
            scrollButtons={isSmallScreen ? "auto" : false}
            allowScrollButtonsMobile
            centered={!isSmallScreen}
          >
            <Tab label="Stellar" {...a11yProps(0)} />
            <Tab label="Stacks" {...a11yProps(1)} />
            <Tab label="Movement" {...a11yProps(2)} />
            <Tab label="Bitcoin" {...a11yProps(3)} />
            <Tab label="Pricing" {...a11yProps(4)} />
            <Tab label="DApps" {...a11yProps(5)} />
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
          <StellarTransactionsTable/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Stacks Content */}
          <Typography variant="h5" gutterBottom>
            Stacks Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Stacks section. Here you can add components related to Stacks.
          </Typography>
          <ZestSupplyTable/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Movement Content */}
          <Typography variant="h5" gutterBottom>
            Movement Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Movement section. Here you can add components related to Movement.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {/* Bitcoin Content */}
          <Typography variant="h5" gutterBottom>
            Bitcoin Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Bitcoin section. Here you can add components related to Bitcoin.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* Pricing Content */}
          <Typography variant="h5" gutterBottom>
            Pricing Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Pricing section. Here you can add components related to Pricing.
          </Typography>
          <PricingTable/>
        </TabPanel>
        <TabPanel value={value} index={5}>
          {/* DApps Content */}
          <Typography variant="h5" gutterBottom>
            DApps Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the DApps section. Here you can add components related to DApps.
          </Typography>
          <DapssTvlTable/>
        </TabPanel>
      </Box>
    </CubeProvider>
  );
}

export default App;
