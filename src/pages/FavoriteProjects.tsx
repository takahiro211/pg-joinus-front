import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import { Pagination, Paper, Typography } from "@mui/material";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";

function FavoriteProjects() {
  const [favorites, setFavorites] = React.useState<PostsEntity[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [searchParams] = useSearchParams();
  const paramPageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    favoritesResponse(paramPageNum);
  }, []);

  // API
  const favoritesRepository = RepositoryFactory.get("favoriteList");
  const favoritesResponse = async (argPageNum: number) => {
    try {
      const { data: favData } = await favoritesRepository.paginationProjects(
        argPageNum
      );
      setFavorites(favData.data);
      setTotalPageCount(favData.last_page);
      setPage(favData.current_page);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  const handlePageCange = (page: number) => {
    navigate("/favorites?page=" + page);
    favoritesResponse(page);
    window.scrollTo(0, 0);
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
            <Typography sx={{ ml: 1, mt: 1 }}>お気に入りの投稿一覧</Typography>
            {favorites.length > 0 ? (
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
            {favorites.map((fav) => (
              <>
                <ProjectCard post={fav} />
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

export default withRoot(FavoriteProjects);
