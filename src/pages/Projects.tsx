import {
  Box,
  Container,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsListScreenType } from "../utils/Consts";
import withRoot from "../withRoot";
import LatestProjects from "./modules/components/projects/LatestProjects";
import PopularProjects from "./modules/components/projects/PopularProjects";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";

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

function Projects() {
  const [value, setValue] = React.useState(0);
  const { screenType } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (screenType == ProjectsListScreenType.POPULAR) {
      setValue(0);
    } else if (screenType == ProjectsListScreenType.LATEST) {
      setValue(1);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue == 0) {
      navigate("/projects/" + ProjectsListScreenType.POPULAR);
    } else if (newValue == 1) {
      navigate("/projects/" + ProjectsListScreenType.LATEST);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
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
              <Tab label="人気のプロジェクト" {...a11yProps(0)} />
              <Tab label="新着プロジェクト" {...a11yProps(1)} />
              <Tab disabled label="タグ・キーワードで探す" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PopularProjects />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LatestProjects />
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Container>
      </Box>
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Projects);
