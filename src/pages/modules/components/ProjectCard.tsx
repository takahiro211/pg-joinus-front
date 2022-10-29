import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DateFormat } from "../../../utils/Util";

function ProjectCard(props: any) {
  return (
    <Card
      sx={{ minWidth: 10, mt: 2, mb: 2 }}
      style={{ marginRight: 12, marginLeft: 12 }}
    >
      <CardActionArea component={Link} to={"/projects/" + props.post.id}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {DateFormat(props.post.created_at)}
          </Typography>
          <Typography variant="h5" component="div">
            {props.post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.post.description}
          </Typography>
          <Typography variant="body2">
            {JSON.parse(props.post.skill).map((skill: any) => (
              <Chip
                variant="outlined"
                color="success"
                size="small"
                label={skill}
                sx={{ mt: 0.5, mr: 0.4 }}
              />
            ))}
            {JSON.parse(props.post.free_tag).map((tag: any) => (
              <Chip
                variant="outlined"
                size="small"
                label={tag}
                sx={{ mt: 0.5, mr: 0.4 }}
              />
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
