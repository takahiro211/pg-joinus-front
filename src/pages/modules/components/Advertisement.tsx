import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DateFormat } from "../../../utils/Util";

function Advertisement(props: any) {
  return (
    <Card
      sx={{ minWidth: 10, mt: 2, mb: 2 }}
      style={{ marginRight: 1, marginLeft: 1 }}
      elevation={0}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {DateFormat(props.ad.created_at)}
        </Typography>
        <Typography variant="h5" component="div">
          {props.ad.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.ad.content}
        </Typography>
        <Typography variant="body2">
          {/* {JSON.parse(props.ad.skill).map((skill: any) => (
              <Chip
                variant="outlined"
                color="success"
                size="small"
                label={skill}
                sx={{ mt: 0.5, mr: 0.4 }}
              />
            ))} */}
          {/* {JSON.parse(props.ad.free_tag).map((tag: any) => (
              <Chip
                variant="outlined"
                size="small"
                label={tag}
                sx={{ mt: 0.5, mr: 0.4 }}
              />
            ))} */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Advertisement;
