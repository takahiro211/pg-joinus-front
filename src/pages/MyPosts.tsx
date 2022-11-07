import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import { Pagination, Paper, Typography } from "@mui/material";
import Button from "./modules/components/Button";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { hideUnderline } from "../utils/Styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Stack from "@mui/material/Stack";

function MyPosts() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [searchParams] = useSearchParams();
  const paramPageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    postsResponse(paramPageNum);
  }, []);

  // API
  const postsRepository = RepositoryFactory.get("myPosts");
  const postsResponse = async (argPageNum: number) => {
    try {
      const { data: pjData } = await postsRepository.paginationProjects(
        argPageNum
      );
      setPosts(pjData.data);
      setTotalPageCount(pjData.last_page);
      setPage(pjData.current_page);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  const handlePageCange = (page: number) => {
    navigate("/my-posts?page=" + page);
    postsResponse(page);
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
        <Container>
          <Box textAlign="center">
            <Link to="/post" style={hideUnderline}>
              <Button
                sx={{ mt: 3, mb: 2 }}
                size="large"
                color="secondary"
                variant="contained"
              >
                <PostAddIcon sx={{ mr: 2 }} />
                投稿する
              </Button>
            </Link>
          </Box>
          <Box
            component={Paper}
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: "#FCFCFC",
            }}
          >
            <Typography sx={{ ml: 1, mt: 1 }}>あなたの投稿一覧</Typography>
            {posts.length > 0 ? (
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
            {posts.map((post) => (
              <>
                <ProjectCard post={post} />
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
        </Container>
      </Box>
      <ProductCategories />
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(MyPosts);
