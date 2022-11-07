import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Labels } from "../../../utils/Consts";
import { DateFormat } from "../../../utils/Util";
import TerminalIcon from "@mui/icons-material/Terminal";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import ComponentTypography from "./Typography";
import ProjectDetailSkeleton from "../skeleton/ProjectDetailSkeleton";
import Button from "./Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RepositoryFactory } from "../../../api/RepositoryFactory";
import { useEffect, useState } from "react";

function ProjectDetailContent(props: any) {
  const isNoData = props.post <= 0;
  const post = isNoData ? "" : props.post[0].data[0];
  const skills = post.skill;
  const freeTags = post.free_tag;
  const isAuthor = isNoData ? false : props.post[1].is_author;
  const [stateIsFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    setIsFavorite(isNoData ? false : props.post[2].is_favorite);
    console.log("stateIsFavorite", stateIsFavorite);
  }, [isNoData ? false : props.post[2].is_favorite]);

  const handleFavoriteRemove = () => {
    favoriteRemoveResponse();
  };

  const handleFavorite = () => {
    favoriteResponse();
  };

  // API お気に入り登録処理
  const favoriteRepository = RepositoryFactory.get("favorite");
  const favoriteResponse = async () => {
    try {
      const favoriteResponse = await favoriteRepository.favorite(post.id);
      setIsFavorite(true);
    } catch (e) {}
  };

  // API お気に入り解除処理
  const favoriteRemoveRepository = RepositoryFactory.get("favoriteRemove");
  const favoriteRemoveResponse = async () => {
    try {
      const favoriteResponse = await favoriteRemoveRepository.favorite(post.id);
      setIsFavorite(false);
    } catch (e) {}
  };

  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      <Typography sx={{ mt: 6, mb: 1 }} color="text.secondary" gutterBottom>
        {isNoData ? "" : Labels.CREATED_AT + " " + DateFormat(post.created_at)}
      </Typography>
      <Box sx={{ mt: 0, mb: 1 }}>
        <ComponentTypography variant="h3">
          {isNoData ? <ProjectDetailSkeleton /> : post.title}
        </ComponentTypography>
      </Box>
      {isNoData ? (
        ""
      ) : (
        <Stack direction="row" justifyContent="flex-end">
          <Box sx={{ mt: 0, mb: 2 }}>
            {isAuthor ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{ mr: 2 }}
              >
                編集する
              </Button>
            ) : (
              ""
            )}
            {stateIsFavorite ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleFavoriteRemove}
              >
                お気に入り解除
              </Button>
            ) : (
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleFavorite}
              >
                <FavoriteIcon sx={{ mr: 1 }} />
                お気に入り登録
              </Button>
            )}
          </Box>
        </Stack>
      )}
      <Divider>概要</Divider>
      <div style={{ textAlign: "left" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1.5, mt: 3 }}
          color="text.secondary"
        >
          {isNoData ? <ProjectDetailSkeleton /> : post.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <div>
            {skills
              ? JSON.parse(skills).map((skill: any) => (
                  <Chip
                    variant="outlined"
                    color="success"
                    size="small"
                    label={skill}
                    sx={{ mt: 1, mr: 0.4 }}
                  />
                ))
              : ""}
          </div>
          <div>
            {freeTags
              ? JSON.parse(freeTags).map((tag: any) => (
                  <Chip
                    variant="outlined"
                    size="small"
                    label={tag}
                    sx={{ mt: 1, mr: 0.4 }}
                  />
                ))
              : ""}
          </div>
        </Typography>
      </div>
      <Divider sx={{ mt: 4 }}>詳細</Divider>
      <Typography
        component="p"
        sx={{ mt: 4, whiteSpace: "pre-wrap" }}
        color="text.secondary"
      >
        {isNoData ? <ProjectDetailSkeleton /> : post.detail}
      </Typography>
      <Divider sx={{ mt: 4 }}>リンク</Divider>
      <Typography sx={{ mb: 12, mt: 4 }} color="text.secondary">
        <Link href={post.url} target="_blank">
          {isNoData ? <ProjectDetailSkeleton /> : post.url}
        </Link>
      </Typography>
    </Container>
  );
}

export default ProjectDetailContent;
