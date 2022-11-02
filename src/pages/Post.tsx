import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import { Labels } from "../utils/Consts";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

function Post() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [ads, setAds] = React.useState<PostsEntity[]>([]);

  React.useEffect(() => {
    userResponse();
  }, []);

  // ダイアログ
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleConfirmOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

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
      <ComponentsTypography
        variant="h3"
        gutterBottom
        marked="center"
        align="center"
        sx={{ mt: 7 }}
      >
        プロジェクトを投稿する
      </ComponentsTypography>
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
            <Typography sx={{ ml: 1, mt: 1 }}>タイトル</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>概要</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>スキル</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>フリータグ</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>詳細</Typography>
            <Box></Box>
            <Typography sx={{ ml: 1, mt: 1 }}>リンク</Typography>
            <Box></Box>
          </Box>
          <Box textAlign="center">
            <Link to="/post" style={hideUnderline}>
              <Button
                sx={{ mt: 3, mb: 2 }}
                size="large"
                color="secondary"
                variant="contained"
                onClick={handleConfirmOpen}
              >
                <PostAddIcon sx={{ mr: 2 }} />
                投稿する
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <ProductSmokingHero />
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ p: 4 }}>
          <DialogTitle id="alert-dialog-title">投稿します</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              よろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              size="small"
              color="primary"
              variant="contained"
            >
              キャンセル
            </Button>
            <Button
              onClick={handleClose}
              size="small"
              color="secondary"
              variant="contained"
              autoFocus
            >
              投稿する
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default withRoot(Post);
