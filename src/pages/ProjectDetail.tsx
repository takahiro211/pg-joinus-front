import * as React from "react";
import { PostsEntity } from "../api/entities/response/PostsEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import withRoot from "../withRoot";
import ProjectDetailContent from "./modules/components/ProjectDetailContent";
import { useParams } from "react-router-dom";

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
