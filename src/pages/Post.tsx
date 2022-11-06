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
} from "@mui/material";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { useNavigate } from "react-router-dom";
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

function Post() {
  const [tags, setTags] = React.useState<TagMasterEntity[]>([]);
  const [sent, setSent] = React.useState(false);
  const [isAbleSend, setIsAbleSend] = React.useState(false);
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<
    PostDialogProps | undefined
  >();

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
      console.log("プロジェクトの一覧を取得できませんでした。");
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
        title: "投稿します",
        message: "よろしいですか？",
      });
    });
    setModalConfig(undefined);

    // 投稿処理
    if (ret === "ok") {
      setSent(true);
      const value = Object.entries(values).map((x) => x);
      console.log(value);
      let requestEntity: CreatePostEntity = new CreatePostEntity();
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
  const postRepository = RepositoryFactory.get("post");
  console.log(postRepository);
  const postResponse = async (requestEntity: CreatePostEntity) => {
    try {
      const { data } = await postRepository.postProject(requestEntity);
      console.log(data);
      // プロジェクト詳細画面へリダイレクト
      navigate("/my-posts");
    } catch (e) {
      console.log("プロジェクトの投稿に失敗しました。");
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
  const [tagName, setTagName] = React.useState<string[]>([]);

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

  return (
    <React.Fragment>
      <ComponentsTypography
        variant="h3"
        gutterBottom
        marked="center"
        align="center"
        sx={{ mt: 7 }}
      >
        プロジェクトを投稿
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
                        // onClick={handleConfirmOpen}
                      >
                        <PostAddIcon sx={{ mr: 2 }} />
                        投稿する
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

export default withRoot(Post);
