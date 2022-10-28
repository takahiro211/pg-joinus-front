import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Labels } from "../../../utils/Consts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DateFormat } from "../../../utils/Util";
import { PostsEntity } from "../../../api/entities/PostsEntity";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../api/RepositoryFactory";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400",
    title: "Snorkeling",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400",
    title: "Massage",
    width: "20%",
  },
  {
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400",
    title: "Hiking",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400",
    title: "Tour",
    width: "38%",
  },
  {
    url: "https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400",
    title: "Gastronomy",
    width: "38%",
  },
  {
    url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400",
    title: "Shopping",
    width: "24%",
  },
  {
    url: "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400",
    title: "Walking",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400",
    title: "Fitness",
    width: "20%",
  },
  {
    url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
    title: "Reading",
    width: "40%",
  },
];

export default function ProductCategories() {
  const [posts, setPosts] = useState<PostsEntity[]>([]);

  useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("guestPosts");
  console.log(userRepository);
  const userResponse = async () => {
    try {
      const { data } = await userRepository.index();
      setPosts(data);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        {Labels.LATEST_PROJECT_LIST}
      </Typography>
      <Box sx={{ mt: 7, mb: 12 }}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{Labels.USERS_TABEL_HEAD_POST_TITLE}</TableCell>
                <TableCell>
                  {Labels.USERS_TABEL_HEAD_POST_DESCRIPTION}
                </TableCell>
                <TableCell>{Labels.USERS_TABEL_HEAD_POST_DATE}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {post.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {DateFormat(post.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
