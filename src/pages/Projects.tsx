import {
  Box,
  Container,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import withRoot from "../withRoot";
import ProjectCard from "./modules/components/ProjectCard";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";

function Projects() {
  const [projects, setProjects] = React.useState<PostsEntity[]>([]);

  React.useEffect(() => {
    projectsResponse();
  }, []);

  // API
  const projectsRepository = RepositoryFactory.get("latestPosts");
  const projectsResponse = async () => {
    try {
      const { data } = await projectsRepository.index();
      setProjects(data);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
        <Container>
          <Box
            component={Paper}
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: "#FCFCFC",
            }}
          >
            <Typography sx={{ ml: 1, mt: 1 }}>新着プロジェクト一覧</Typography>
            {projects.length > 0 ? (
              ""
            ) : (
              <>
                <MyPageSkeleton />
                <MyPageSkeleton />
                <MyPageSkeleton />
                <MyPageSkeleton />
                <MyPageSkeleton />
              </>
            )}
            {projects.map((pj) => (
              <>
                <ProjectCard post={pj} />
              </>
            ))}
            <Box
              textAlign="center"
              sx={{
                mt: 4,
                mb: 4,
              }}
            >
              <Stack alignItems="center">
                <Pagination
                  count={3}
                  color="secondary"
                  style={{ textAlign: "center" }}
                />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Projects);
