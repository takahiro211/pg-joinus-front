import { Box } from "@mui/material";
import * as React from "react";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { UsersEntity } from "../api/entities/response/UsersEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { Labels } from "../utils/Consts";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import Typography from "./modules/components/Typography";
import ProjectCard from "./modules/components/ProjectCard";
import ProjectDetailContent from "./modules/components/ProjectDetailContent";
import { useParams } from "react-router-dom";
import { LegendToggle } from "@mui/icons-material";
import ProjectDetailSkeleton from "./modules/skeleton/ProjectDetailSkeleton";

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
      const { data } = await userRepository.postDetail(postId);
      console.log("プロジェクト詳細", data);
      setPosts(data);
    } catch (e) {
      console.log("プロジェクト詳細が取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      <ProjectDetailContent post={posts} />
    </React.Fragment>
  );
}

export default withRoot(ProjectDetail);
