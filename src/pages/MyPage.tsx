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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MyPage() {
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
        {/* <Typography variant="h3" gutterBottom marked="center" align="center">
            {Labels.MY_PAGE}
          </Typography>
          こんにちは。logged in. */}
        <Container
          sx={{
            mb: 2,
          }}
        >
          {Labels.MY_PAGE}さん、こんにちは。
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
