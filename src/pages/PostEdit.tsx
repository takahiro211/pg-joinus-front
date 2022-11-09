import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import withRoot from "../withRoot";
import { ErrorMessages } from "../utils/Consts";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import {
  Chip,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  Theme,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Typography,
  Hidden,
  Stack,
} from "@mui/material";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ComponentsTypography from "./modules/components/Typography";
import { Field, Form, FormSpy } from "react-final-form";
import FormButton from "./modules/form/FormButton";
import RFTextField from "./modules/form/RFTextField";
import theme from "../theme";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { TagMasterEntity } from "../api/entities/response/TagMasterEntity";
import { CreatePostEntity } from "../api/entities/request/CreatePostEntity";
import FormFeedback from "./modules/form/FormFeedback";
import { isDirty } from "./modules/form/validation";
import { PostDialog, PostDialogProps } from "./modules/components/PostDialog";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import Button from "./modules/components/Button";

interface State {
  post: PostsEntity;
}

function PostEdit() {
  const [tags, setTags] = React.useState<TagMasterEntity[]>([]);
  const [sent, setSent] = React.useState(false);
  const [isAbleSend, setIsAbleSend] = React.useState(false);
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<
    PostDialogProps | undefined
  >();
  const { postId } = useParams();

  // 受け取り
  const location = useLocation();
  let post: PostsEntity = {
    title: "",
    id: 0,
    description: "",
    detail: "",
    url: "",
    author: 0,
    skill: "",
    free_tag: "",
    created_at: new Date(),
    updated_at: new Date(),
    name: "",
  };
  if (location.state == null) {
    navigate("/project/detail/" + postId);
  } else {
    const { post: argPost } = location.state as State;
    post = argPost;
  }

  const validSkills = post.skill
    .replaceAll('"', "")
    .replaceAll(" ", "")
    .replace("[", "")
    .replace("]", "")
    .split(",");
  const skills = validSkills[0] == "未選択" ? [] : validSkills;

  const validfreeTags = post.free_tag
    .replaceAll('", "', ",")
    .replace('["', "")
    .replace('"]', "");
  const freeTags = validfreeTags == "未選択" ? "" : validfreeTags;

  React.useEffect(() => {
    tagMasterResponse();
  }, []);

  // API
  // タグ取得
  const tagMasterRepository = RepositoryFactory.get("tagMaster");
  const tagMasterResponse = async () => {
    try {
      const { data: tagMaster } = await tagMasterRepository.index();
      setTags(tagMaster);
    } catch (e) {
      console.log("タグを取得できませんでした。");
    }
  };

  // validation
  const validate = (values: {
    title: string | undefined;
    description: string | undefined;
    skill: string | undefined;
    freeTag: string | undefined;
    detail: string | undefined;
    url: string | undefined;
    "": string;
  }) => {
    let errors: Record<string, Set<string>> = {};
    if (values.title == undefined || !isDirty(values.title)) {
      errors["title"] = new Set<string>().add(
        ErrorMessages.VALIDATION_ERROR_REQUIRED_ITEM
      );
    }
    if (values.description == undefined || !isDirty(values.description)) {
      errors["description"] = new Set<string>().add(
        ErrorMessages.VALIDATION_ERROR_REQUIRED_ITEM
      );
    }
    if (values.detail == undefined || !isDirty(values.detail)) {
      errors["detail"] = new Set<string>().add(
        ErrorMessages.VALIDATION_ERROR_REQUIRED_ITEM
      );
    }
    if (values.url == undefined || !isDirty(values.url)) {
      errors["url"] = new Set<string>().add(
        ErrorMessages.VALIDATION_ERROR_REQUIRED_ITEM
      );
    }
    if (Object.keys(errors).length > 0) {
      setIsAbleSend(false);
    } else {
      setIsAbleSend(true);
    }
    return errors;
  };

  // 投稿処理
  const handleSave = async (values: {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    skill: string | undefined;
    freeTag: string | undefined;
    detail: string | undefined;
    url: string | undefined;
    "": string;
  }) => {
    // Validation未通過の場合は終了
    if (!isAbleSend) return;

    // ダイアログ
    const ret = await new Promise<string>((resolve) => {
      setModalConfig({
        onClose: resolve,
        title: "内容を更新します",
        message: "よろしいですか？",
        mode: "更新",
      });
    });
    setModalConfig(undefined);

    // 投稿処理
    if (ret === "ok") {
      setSent(true);
      const value = Object.entries(values).map((x) => x);
      console.log(value);
      let requestEntity: CreatePostEntity = new CreatePostEntity();
      // id
      requestEntity.id = post.id;
      // タイトル
      requestEntity.title = values.title;
      // 概要
      requestEntity.description = values.description;
      // スキル
      requestEntity.skill = tagName.toString();
      // フリータグ
      requestEntity.free_tag = values.freeTag;
      // 詳細
      requestEntity.detail = values.detail;
      // リンク
      requestEntity.url = values.url;

      // 登録処理API
      const postId = postResponse(requestEntity);
      console.log(postId);
    }
  };
  const postRepository = RepositoryFactory.get("edit");
  console.log(postRepository);
  const postResponse = async (requestEntity: CreatePostEntity) => {
    try {
      const { data } = await postRepository.postProject(requestEntity);
      console.log(data);
      // プロジェクト詳細画面へリダイレクト
      navigate("/my-posts");
    } catch (e) {
      console.log("プロジェクトの更新に失敗しました。");
    }
  };

  function getStyles(name: string, tagName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        tagName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [tagName, setTagName] = React.useState<string[]>(skills);

  const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
    const {
      target: { value },
    } = event;
    setTagName(
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

  // API 投稿削除処理
  const deleteRepository = RepositoryFactory.get("delete");
  const deleteResponse = async (requestEntity: CreatePostEntity) => {
    try {
      const favoriteResponse = await deleteRepository.postProject(
        requestEntity
      );
      // プロジェクト詳細画面へリダイレクト
      navigate("/my-posts");
    } catch (e) {}
  };

  // 削除処理
  const handleDelete = async () => {
    console.log("delete button");
    // ダイアログ
    const ret = await new Promise<string>((resolve) => {
      setModalConfig({
        onClose: resolve,
        title: "投稿を削除します",
        message: "この操作は元に戻せません。よろしいですか？",
        mode: "削除",
      });
    });
    setModalConfig(undefined);

    // 投稿処理
    if (ret === "ok") {
      setSent(true);
      let requestEntity: CreatePostEntity = new CreatePostEntity();
      // id
      requestEntity.id = post.id;

      // 削除処理API
      const postId = deleteResponse(requestEntity);
      console.log(postId);
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
        プロジェクト編集
      </ComponentsTypography>
      <Box sx={{ mt: 4, mb: 12 }}>
        <Container>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{ mr: 3, mb: 1 }}
              onClick={handleDelete}
            >
              投稿を削除する
            </Button>
          </Stack>
          <Box
            component={Paper}
            elevation={0}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: "#FCFCFC",
            }}
          >
            <Container>
              <Form
                onSubmit={handleSave}
                subscription={{ submitting: true }}
                validate={validate}
              >
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
                      defaultValue={post.title}
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
                      defaultValue={post.description}
                    />
                    <Typography sx={{ ml: 1, mt: 2 }}>スキル</Typography>
                    <Box>
                      <Select
                        fullWidth
                        color="secondary"
                        labelId="skill"
                        id="skill"
                        multiple
                        disabled={submitting || sent}
                        value={tagName}
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
                        defaultValue={skills}
                      >
                        {tags.map((tag) => (
                          <MenuItem
                            key={tag.tag_name}
                            value={tag.tag_name}
                            style={getStyles(
                              tag.tag_name,
                              tagName,
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
                      <CustomWidthTooltip
                        title="※カンマ「,」で区切って入力してください"
                        placement="top-start"
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </CustomWidthTooltip>
                    </Typography>
                    <Field
                      component={RFTextField}
                      fullWidth
                      margin="normal"
                      name="freeTag"
                      required
                      size="medium"
                      sx={{ mt: -0.2, mb: 1 }}
                      disabled={submitting || sent}
                      placeholder="急募,未経験者歓迎,レビューします"
                      defaultValue={freeTags}
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
                      defaultValue={post.detail}
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
                      defaultValue={post.url}
                    />
                    <Box textAlign="center">
                      <FormSpy subscription={{ submitError: true }}>
                        {({ submitError }) =>
                          submitError ? (
                            <FormFeedback error sx={{ mt: 2 }}>
                              {submitError}
                            </FormFeedback>
                          ) : null
                        }
                      </FormSpy>
                      <FormButton
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                        color="secondary"
                        variant="contained"
                        disabled={submitting || sent || !isAbleSend}
                      >
                        更新する
                      </FormButton>
                    </Box>
                  </Box>
                )}
              </Form>
            </Container>
          </Box>
        </Container>
      </Box>
      <ProductSmokingHero />
      {modalConfig && <PostDialog {...modalConfig} />}
    </React.Fragment>
  );
}

// Tooltipの幅指定
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 168,
  },
});

export default withRoot(PostEdit);
