import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import { Labels } from "../utils/Consts";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import { Grid, Paper, Skeleton, styled, Typography } from "@mui/material";
import { PostsEntity } from "../api/entities/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import { Link } from "react-router-dom";
import Advertisement from "./modules/components/Advertisement";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { UsersEntity } from "../api/entities/UsersEntity";

function MyPage() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [ads, setAds] = React.useState<PostsEntity[]>([]);
  const [userInfo, setUser] = React.useState<UsersEntity>();

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const postsRepository = RepositoryFactory.get("guestPosts");
  const adsRepository = RepositoryFactory.get("ads");
  const userRepository = RepositoryFactory.get("user");
  const userResponse = async () => {
    try {
      const { data: pjData } = await postsRepository.index();
      setPosts(pjData);
      const { data: adsData } = await adsRepository.index();
      setAds(adsData);
      const { data: userData } = await userRepository.index();
      setUser(userData);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
        <Container
          sx={{
            mb: 2,
          }}
        >
          {userInfo == null || userInfo == undefined ? (
            <Box sx={{ mt: 12 }} />
          ) : (
            <>{userInfo.name}さん、こんにちは。</>
          )}
        </Container>
        <Container>
          <Grid container>
            <Grid xs={12} md={3}>
              <Box
                component={Paper}
                elevation={0}
                sx={{
                  p: 1,
                  m: 1,
                  backgroundColor: "#FCFCFC",
                }}
              >
                <Typography sx={{ ml: 1, mt: 1 }}>おしらせ</Typography>
                {ads.length > 0 ? (
                  ""
                ) : (
                  <>
                    <MyPageSkeleton />
                  </>
                )}
                {ads.map((ad) => (
                  <>
                    <Advertisement ad={ad} />
                  </>
                ))}
              </Box>
            </Grid>
            <Grid xs={12} md={9}>
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
                  おすすめのプロジェクト
                </Typography>
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
                  <Link to="/projects">もっとみる</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ProductCategories />
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(MyPage);
