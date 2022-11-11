import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import {
  Alert,
  Chip,
  Grid,
  Hidden,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import { Link } from "react-router-dom";
import Advertisement from "./modules/components/Advertisement";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { UsersEntity } from "../api/entities/response/UsersEntity";
import Button from "./modules/components/Button";
import { Field, Form } from "react-final-form";
import FormButton from "./modules/form/FormButton";
import RFTextField from "./modules/form/RFTextField";

function MyPage() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const [ads, setAds] = React.useState<PostsEntity[]>([]);
  const [userInfo, setUser] = React.useState<UsersEntity>();
  const [editMode, setEditMode] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    userResponse();
  }, []);

  // ユーザー名変更
  const nameEditRepository = RepositoryFactory.get("nameEdit");
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleSave = (values: { "": string }) => {
    const value = Object.entries(values).map((x) => x);
    const inputValue = value[0][1];
    let defaultValue = "";
    if (userInfo != null || userInfo != undefined) {
      defaultValue = userName == "" ? userInfo.name : userName;
    }
    // 値が変更されていない場合は更新処理をしない
    if (inputValue != defaultValue) {
      nameEdit(inputValue);
    }
  };
  const handleCancel = () => {
    setEditMode(false);
  };
  const nameEdit = async (name: string) => {
    setSent(true);
    try {
      await nameEditRepository.update(name);
      setUserName(name);
      setEditMode(false);
      setSnackBarOpen(true);
      setSent(false);
    } catch (e) {
      console.log("更新に失敗しました。");
      setSent(false);
    }
  };

  // スナックバーを閉じる
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  // API
  const postsRepository = RepositoryFactory.get("rank");
  const adsRepository = RepositoryFactory.get("ads");
  const userRepository = RepositoryFactory.get("user");
  const userResponse = async () => {
    try {
      const { data: pjData } = await postsRepository.index();
      setPosts(pjData.data);
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
      <Hidden mdDown>
        <Box sx={{ mt: 7 }} />
      </Hidden>
      <Hidden mdUp>
        <Box sx={{ mt: 2 }} />
      </Hidden>
      <Box sx={{ mb: 12 }}>
        <Container>
          <Grid container>
            <Grid xs={12} md={3}>
              <Box
                component={Paper}
                elevation={0}
                sx={{
                  p: 1,
                  m: 1,
                  pl: 2,
                  pt: 2,
                  mb: 2,
                  backgroundColor: "#FCFCFC",
                }}
              >
                {userInfo == null || userInfo == undefined ? (
                  <>
                    <MyPageSkeleton />
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ログイン中
                    </Typography>
                    <Box sx={{ p: 1 }}>
                      <Chip
                        label={"ID " + userInfo.id}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      {editMode ? (
                        <Form
                          onSubmit={handleSave}
                          subscription={{ submitting: true }}
                        >
                          {({ handleSubmit: handleSubmit2, submitting }) => (
                            <Box
                              component="form"
                              onSubmit={handleSubmit2}
                              noValidate
                            >
                              <Field
                                component={RFTextField}
                                fullWidth
                                margin="normal"
                                name="name"
                                required
                                size="small"
                                defaultValue={
                                  userName == "" ? userInfo.name : userName
                                }
                                sx={{ mt: 1, mb: 1 }}
                                disabled={submitting || sent}
                              />
                              <Stack direction="row" justifyContent="flex-end">
                                <Button
                                  onClick={handleCancel}
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                  sx={{ mr: 1 }}
                                  disabled={submitting || sent}
                                >
                                  キャンセル
                                </Button>
                                <FormButton
                                  size="small"
                                  color="secondary"
                                  variant="contained"
                                  disabled={submitting || sent}
                                >
                                  保存
                                </FormButton>
                              </Stack>
                            </Box>
                          )}
                        </Form>
                      ) : (
                        <>
                          <Typography color="primary.light">
                            {userName == "" ? userInfo.name : userName}
                          </Typography>
                          <Stack direction="row" justifyContent="flex-end">
                            <Button
                              onClick={handleEdit}
                              size="small"
                              color="secondary"
                              variant="contained"
                            >
                              編集
                            </Button>
                          </Stack>
                        </>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <Hidden mdDown>
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
              </Hidden>
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
                  <Link to="/projects/popular">もっとみる</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ProductCategories />
      <ProductSmokingHero />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          名前を変更しました
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default withRoot(MyPage);
