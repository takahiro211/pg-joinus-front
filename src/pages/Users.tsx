import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "./modules/components/Typography";
import withRoot from "../withRoot";
import { useNavigate, useParams } from "react-router-dom";
import { UsersEntity } from "../api/entities/response/UsersEntity";
import { Hidden, Tab, Tabs, tabsClasses } from "@mui/material";
import { ProjectsListScreenType } from "../utils/Consts";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import Following from "./modules/components/users/Following";
import Follower from "./modules/components/users/Follower";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Users() {
  const [value, setValue] = React.useState(0);
  const { screenType } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (screenType == ProjectsListScreenType.FOLLOWING) {
      setValue(0);
    } else if (screenType == ProjectsListScreenType.FOLLOWER) {
      setValue(1);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue == 0) {
      navigate("/users/" + ProjectsListScreenType.FOLLOWING);
    } else if (newValue == 1) {
      navigate("/users/" + ProjectsListScreenType.FOLLOWER);
    }
  };

  return (
    <React.Fragment>
      <Hidden mdDown>
        <Box sx={{ mt: 7 }} />
      </Hidden>
      <Box sx={{ mb: 12 }}>
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChange}
              aria-label="project tabs"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              <Tab label="フォロー中" {...a11yProps(0)} />
              <Tab label="フォロワー" {...a11yProps(1)} />
              <Tab disabled label="人気のユーザー" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Following />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Follower />
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Container>
      </Box>
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Users);
