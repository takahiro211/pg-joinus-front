import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Labels } from "../../../utils/Consts";
import { PostsEntity } from "../../../api/entities/response/PostsEntity";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../api/RepositoryFactory";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../components/ProjectCard";

export default function ProductCategories() {
  const [posts, setPosts] = useState<PostsEntity[]>([]);

  useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("guestPosts");
  const userResponse = async () => {
    try {
      const { data } = await userRepository.index();
      setPosts(data);
    } catch (e) {
      console.log("プロジェクトの一覧を取得できませんでした。");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 320,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Container component="section" sx={{ mt: 8, mb: 18 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          {Labels.LATEST_PROJECT_LIST}
        </Typography>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Slider {...sliderSettings}>
            {posts.map((post) => (
              <>
                <ProjectCard post={post} />
                <Box sx={{ ml: 12, mr: 12 }}></Box>
              </>
            ))}
          </Slider>
        </Box>
      </Container>
    </Container>
  );
}
