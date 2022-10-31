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

function ProjectDetailCard(props: any) {
  const post = props.post[0];
  const skills = post.skill;
  const free_tags = post.free_tag;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        sx={{ fontSize: 16, mt: 2, mb: 1, textAlign: "right" }}
        color="text.secondary"
        gutterBottom
      >
        {DateFormat(post.created_at)}
      </Typography>
      <Divider>概要</Divider>
      <div style={{ textAlign: "left" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1.5, mt: 3 }}
          color="text.secondary"
        >
          {post.description}
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
      <Typography sx={{ mt: 4 }} color="text.secondary">
        {post.detail}
      </Typography>
      <Divider sx={{ mt: 4 }}>リンク</Divider>
      <Typography sx={{ mb: 12, mt: 4 }} color="text.secondary">
        <Link href={post.url} target="_blank">
          {post.url}
        </Link>
      </Typography>
    </Container>
  );
}

export default ProjectDetailCard;
