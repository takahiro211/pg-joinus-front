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
import ComponentsTypography from "./modules/components/Typography";
import GradeIcon from "@mui/icons-material/Grade";
import { UsersEntity } from "../api/entities/UsersEntity";
import { useParams } from "react-router-dom";

function UserInformation() {
  const [userInfo, setUser] = React.useState<UsersEntity>();
  const { userId } = useParams();

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("user");
  const userResponse = async () => {
    try {
      const { data: userData } = await userRepository.index();
      setUser(userData);
    } catch (e) {
      console.log("ユーザー情報を取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      <ComponentsTypography
        variant="h3"
        gutterBottom
        marked="center"
        align="center"
        sx={{ mt: 7 }}
      >
        ユーザー情報
      </ComponentsTypography>
      <Box textAlign="center">
        <Link to="/post" style={hideUnderline}>
          <Button
            sx={{ mt: 3, mb: 2 }}
            size="large"
            color="secondary"
            variant="contained"
          >
            <GradeIcon sx={{ mr: 2 }} />
            フォローする
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 4, mb: 12 }}>
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
            <Typography sx={{ ml: 1, mt: 1 }}>ユーザーID</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>ユーザー名</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>登録日</Typography>
            <Box></Box>
          </Box>
          <Box
            component={Paper}
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              mt: 2,
              backgroundColor: "#FCFCFC",
            }}
          >
            <Typography sx={{ ml: 1, mt: 1 }}>
              userInfo.nameさんの投稿一覧
            </Typography>
            {/* {posts.length > 0 ? (
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
            ))} */}
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

export default withRoot(UserInformation);
