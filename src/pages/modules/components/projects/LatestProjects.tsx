import { Box, Pagination, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { PostsEntity } from "../../../../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../../../../api/RepositoryFactory";
import withRoot from "../../../../withRoot";
import ProjectCard from "../ProjectCard";
import MyPageSkeleton from "../../skeleton/MyPageSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";

function LatestProjects() {
  const [projects, setProjects] = React.useState<PostsEntity[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [searchParams] = useSearchParams();
  const paramPageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    projectsResponse(paramPageNum);
  }, []);

  // API
  const projectsRepository = RepositoryFactory.get("latestPosts");
  const projectsResponse = async (argPageNum: number) => {
    try {
      const { data } = await projectsRepository.paginationProjects(argPageNum);
      setProjects(data.data);
      setTotalPageCount(data.last_page);
      setPage(data.current_page);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  const handlePageCange = (page: number) => {
    navigate("/projects/latest?page=" + page);
    projectsResponse(page);
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          p: 1,
          m: 1,
          backgroundColor: "#FCFCFC",
        }}
      >
        <Typography sx={{ ml: 1, mt: 1 }}>
          PGJoinUsに投稿された新着プロジェクト一覧
        </Typography>
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
              count={totalPageCount}
              color="secondary"
              onChange={(e, page) => handlePageCange(page)}
              page={page}
            />
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default withRoot(LatestProjects);
