import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Labels } from "../../../utils/Consts";
import { DateFormat } from "../../../utils/Util";
import TerminalIcon from "@mui/icons-material/Terminal";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import ComponentTypography from "./Typography";
import ProjectDetailSkeleton from "../skeleton/ProjectDetailSkeleton";

function ProjectDetailCard(props: any) {
  const isNoData = props.post <= 0;
  const post = isNoData ? "" : props.post[0];
  const skills = post.skill;
  const free_tags = post.free_tag;

  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      <Box sx={{ mt: 7, mb: 0 }}>
        <ComponentTypography
          variant="h3"
          gutterBottom
          marked="center"
          align="center"
        >
          {isNoData ? <ProjectDetailSkeleton /> : post.title}
        </ComponentTypography>
      </Box>
      <Typography
        sx={{ fontSize: 16, mt: 6, mb: 1, textAlign: "right" }}
        color="text.secondary"
        gutterBottom
      >
        {isNoData ? "" : DateFormat(post.created_at)}
      </Typography>
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
            {free_tags
              ? JSON.parse(free_tags).map((tag: any) => (
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

export default ProjectDetailCard;
