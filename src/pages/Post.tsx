import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import { Labels } from "../utils/Consts";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Hidden,
  IconButton,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  styled,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "./modules/components/Button";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import ProjectCard from "./modules/components/ProjectCard";
import { Link, useNavigate } from "react-router-dom";
import Advertisement from "./modules/components/Advertisement";
import MyPageSkeleton from "./modules/skeleton/MyPageSkeleton";
import { hideUnderline } from "../utils/Styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Stack from "@mui/material/Stack";
import ComponentsTypography from "./modules/components/Typography";
import { Field, Form } from "react-final-form";
import FormButton from "./modules/form/FormButton";
import RFTextField from "./modules/form/RFTextField";
import theme from "../theme";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { TagMasterEntity } from "../api/entities/response/TagMasterEntity";
import { CreatePostEntity } from "../api/entities/request/CreatePostEntity";

function Post() {
  const [tags, setTags] = React.useState<TagMasterEntity[]>([]);
  const [ads, setAds] = React.useState<PostsEntity[]>([]);
  const [sent, setSent] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    tagMasterResponse();
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
  // タグ取得
  const tagMasterRepository = RepositoryFactory.get("tagMaster");
  const tagMasterResponse = async () => {
    try {
      const { data: tagMaster } = await tagMasterRepository.index();
      setTags(tagMaster);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  // 投稿処理
  const handleSave = (values: {
    title: string | undefined;
    description: string | undefined;
    skill: string | undefined;
    freeTag: string | undefined;
    detail: string | undefined;
    url: string | undefined;
    "": string;
  }) => {
    const value = Object.entries(values).map((x) => x);
    console.log(value);
    let requestEntity: CreatePostEntity = new CreatePostEntity();
    // タイトル
    requestEntity.title = values.title;
    // 概要
    requestEntity.description = values.description;
    // スキル
    requestEntity.skill = personName.toString();
    // フリータグ
    requestEntity.free_tag = values.freeTag;
    // 詳細
    requestEntity.detail = values.detail;
    // リンク
    requestEntity.url = values.url;

    // 登録処理API
    const postId = postResponse(requestEntity);
    console.log(postId);

    // プロジェクト詳細画面へリダイレクト
    navigate("/my-posts");

    // ダイアログを閉じる
    setDialogOpen(false);
  };
  const postRepository = RepositoryFactory.get("post");
  console.log(postRepository);
  const postResponse = async (requestEntity: CreatePostEntity) => {
    try {
      const { data } = await postRepository.postProject(requestEntity);
      console.log(data);
    } catch (e) {
      console.log("プロジェクトの投稿に失敗しました。");
    }
  };

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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
            <Form onSubmit={handleSave} subscription={{ submitting: true }}>
              {({ handleSubmit: handleSubmit2, submitting }) => (
                <Box component="form" onSubmit={handleSubmit2} noValidate>
                  <Typography sx={{ ml: 1, mt: 2 }}>タイトル</Typography>
                  <Field
                    component={RFTextField}
                    fullWidth
                    margin="normal"
                    name="title"
                    required
                    size="medium"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={submitting || sent}
                  />
                  <Typography sx={{ ml: 1, mt: 2 }}>概要</Typography>
                  <Field
                    component={RFTextField}
                    fullWidth
                    margin="normal"
                    name="description"
                    required
                    size="medium"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={submitting || sent}
                  />
                  <Typography sx={{ ml: 1, mt: 2 }}>スキル</Typography>
                  <Box>
                    <Select
                      fullWidth
                      color="secondary"
                      labelId="skill"
                      id="skill"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput id="skill" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {tags.map((tag) => (
                        <MenuItem
                          key={tag.tag_name}
                          value={tag.tag_name}
                          style={getStyles(
                            tag.tag_name,
                            personName,
                            theme as Theme
                          )}
                        >
                          {tag.tag_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Typography sx={{ ml: 1, mt: 2 }}>
                    フリータグ
                    <Tooltip
                      title="※カンマ「,」で区切って入力してください"
                      placement="right"
                    >
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Field
                    component={RFTextField}
                    fullWidth
                    margin="normal"
                    name="freeTag"
                    required
                    size="medium"
                    sx={{ mt: -0.5, mb: 1 }}
                    disabled={submitting || sent}
                    placeholder="急募,未経験者歓迎,レビューします"
                  />
                  <Typography sx={{ ml: 1, mt: 2 }}>詳細</Typography>
                  <Field
                    component={RFTextField}
                    multiline
                    rows={8}
                    fullWidth
                    margin="normal"
                    name="detail"
                    required
                    size="medium"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={submitting || sent}
                  />
                  <Typography sx={{ ml: 1, mt: 2 }}>リンク</Typography>
                  <Field
                    component={RFTextField}
                    fullWidth
                    margin="normal"
                    name="url"
                    required
                    size="medium"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={submitting || sent}
                  />
                  <Box textAlign="center">
                    <FormButton
                      sx={{ mt: 3, mb: 2 }}
                      size="large"
                      color="secondary"
                      variant="contained"
                      // onClick={handleConfirmOpen}
                    >
                      <PostAddIcon sx={{ mr: 2 }} />
                      投稿する
                    </FormButton>
                  </Box>
                  <Dialog
                    open={dialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Box sx={{ p: 4 }}>
                      <DialogTitle id="alert-dialog-title">
                        投稿します
                      </DialogTitle>
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
                        <FormButton
                          size="small"
                          color="secondary"
                          variant="contained"
                        >
                          投稿する
                        </FormButton>
                      </DialogActions>
                    </Box>
                  </Dialog>
                </Box>
              )}
            </Form>
          </Box>
        </Container>
      </Box>
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Post);
