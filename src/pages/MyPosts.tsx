import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import { Labels } from "../utils/Consts";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import {
  Grid,
  Pagination,
  Paper,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import Button from "./modules/components/Button";
import { PostsEntity } from "../api/entities/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import { Link } from "react-router-dom";
import Advertisement from "./modules/components/Advertisement";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { hideUnderline } from "../utils/Styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Stack from "@mui/material/Stack";

function MyPosts() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [ads, setAds] = React.useState<PostsEntity[]>([]);

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("guestPosts");
  const adsRepository = RepositoryFactory.get("ads");
  console.log(userRepository);
  const userResponse = async () => {
    try {
      const { data: pjdata } = await userRepository.index();
      setPosts(pjdata);
      const { data: adsdata } = await adsRepository.index();
      setAds(adsdata);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
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
                  count={3}
                  color="secondary"
                  style={{ textAlign: "center" }}
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
