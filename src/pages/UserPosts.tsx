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
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { hideUnderline } from "../utils/Styles";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Stack from "@mui/material/Stack";

function UserPosts() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [searchParams] = useSearchParams();
  const paramPageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 0;
  const navigate = useNavigate();
  const { userId } = useParams();
  const [stateIsFavorite, setIsFavorite] = React.useState(true);

  React.useEffect(() => {
    postsResponse(paramPageNum);
  }, []);

  // API
  const postsRepository = RepositoryFactory.get("userPosts");
  const postsResponse = async (argPageNum: number) => {
    try {
      const { data: pjData } = await postsRepository.userPosts(
        userId,
        argPageNum
      );
      // 状態保持の設計が良く無い。ログインユーザーのIDはグローバル保持が妥当
      if (pjData.myPosts) {
        navigate("/my-posts");
      } else {
        setPosts(pjData[0].data);
        setTotalPageCount(pjData.last_page);
        setPage(pjData.current_page);
        setIsFavorite(pjData[1].is_following);
      }
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  const handlePageCange = (page: number) => {
    navigate("/user-posts/" + userId + "?page=" + page);
    postsResponse(page);
    window.scrollTo(0, 0);
  };

  const handleFavorite = () => {
    favoriteResponse();
  };

  const handleFavoriteRemove = () => {
    favoriteRemoveResponse();
  };

  // API フォロー登録処理
  const favoriteRepository = RepositoryFactory.get("follow");
  const favoriteResponse = async () => {
    try {
      const favoriteResponse = await favoriteRepository.follow(userId);
      setIsFavorite(true);
    } catch (e) {}
  };

  // API フォロー解除処理
  const favoriteRemoveRepository = RepositoryFactory.get("remove");
  const favoriteRemoveResponse = async () => {
    try {
      const favoriteResponse = await favoriteRemoveRepository.follow(userId);
      setIsFavorite(false);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
        <Container>
          {posts.length > 0 ? (
            <Box textAlign="center">
              {stateIsFavorite ? (
                <Button
                  sx={{ mb: 2 }}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleFavoriteRemove}
                >
                  フォローを解除
                </Button>
              ) : (
                <Button
                  sx={{ mt: 3, mb: 2 }}
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={handleFavorite}
                >
                  <AddReactionIcon sx={{ mr: 2 }} />
                  {posts[0].name} さんをフォロー
                </Button>
              )}
            </Box>
          ) : (
            ""
          )}
          <Box
            component={Paper}
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: "#FCFCFC",
            }}
          >
            {posts.length > 0 ? (
              <Typography sx={{ ml: 1, mt: 1 }}>
                {posts[0].name} さんの投稿一覧
              </Typography>
            ) : (
              ""
            )}
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

export default withRoot(UserPosts);
