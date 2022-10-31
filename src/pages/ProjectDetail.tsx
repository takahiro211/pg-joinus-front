import { Box } from "@mui/material";
import * as React from "react";
import { PostsEntity } from "../api/entities/PostsEntity";
import { UsersEntity } from "../api/entities/UsersEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { Labels } from "../utils/Consts";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import Typography from "./modules/components/Typography";
import ProjectCard from "./modules/components/ProjectCard";
import ProjectDetailCard from "./modules/components/ProjectDetailContent";
import { useParams } from "react-router-dom";
import { LegendToggle } from "@mui/icons-material";

function ProjectDetail() {
  const [posts, setPosts] = React.useState<PostsEntity[]>([]);
  const { postId } = useParams();

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("projects");
  const userResponse = async () => {
    try {
      console.log("postId", postId);
      const { data } = await userRepository.postDetail(postId);
      console.log("プロジェクト詳細", data);
      setPosts(data);
    } catch (e) {
      console.log("プロジェクト詳細が取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      {posts.map((post) => (
        <Box sx={{ mt: 7, mb: 0 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {post.title}
          </Typography>
        </Box>
      ))}
      {posts.length > 0 ? <ProjectDetailCard post={posts} /> : <></>}
    </React.Fragment>
  );
}

export default withRoot(ProjectDetail);
