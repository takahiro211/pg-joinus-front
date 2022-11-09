import "../App.css";
import Home from "../pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Privacy from "../pages/Privacy";
import ForgotPassword from "../pages/ForgotPassword";
import MyPage from "../pages/MyPage";
import Terms from "../pages/Terms";
import CheckAuth from "./CheckAuth";
import Users from "../pages/Users";
import CheckGuest from "./CheckGuest";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Faq from "../pages/Faq";
import MyPosts from "../pages/MyPosts";
import Developer from "../pages/Developer";
import Post from "../pages/Post";
import FavoriteProjects from "../pages/FavoriteProjects";
import UserPosts from "../pages/UserPosts";
import PostEdit from "../pages/PostEdit";

function AllRoute() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      // --- BOTH ---
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="developer" element={<Developer />} />
      <Route path="faq" element={<Faq />} />
      // --- Guest ---
      <Route
        path="/"
        element={
          <CheckGuest>
            <Home />
          </CheckGuest>
        }
      />
      <Route
        path="sign-in"
        element={
          <CheckGuest>
            <SignIn />
          </CheckGuest>
        }
      />
      <Route
        path="sign-up"
        element={
          <CheckGuest>
            <SignUp />
          </CheckGuest>
        }
      />
      <Route
        path="forgot-password"
        element={
          <CheckGuest>
            <ForgotPassword />
          </CheckGuest>
        }
      />
      // --- Private ---
      <Route
        path="mypage"
        element={
          <CheckAuth>
            <MyPage />
          </CheckAuth>
        }
      />
      <Route
        path="/users/:screenType"
        element={
          <CheckAuth>
            <Users />
          </CheckAuth>
        }
      />
      <Route
        path="/projects/:screenType"
        element={
          <CheckAuth>
            <Projects />
          </CheckAuth>
        }
      />
      <Route
        path="project/detail/:postId"
        element={
          <CheckAuth>
            <ProjectDetail />
          </CheckAuth>
        }
      />
      <Route
        path="my-posts"
        element={
          <CheckAuth>
            <MyPosts />
          </CheckAuth>
        }
      />
      <Route
        path="user-posts/:userId"
        element={
          <CheckAuth>
            <UserPosts />
          </CheckAuth>
        }
      />
      <Route
        path="favorites"
        element={
          <CheckAuth>
            <FavoriteProjects />
          </CheckAuth>
        }
      />
      <Route
        path="post"
        element={
          <CheckAuth>
            <Post />
          </CheckAuth>
        }
      />
      <Route
        path="/edit/:postId"
        element={
          <CheckAuth>
            <PostEdit />
          </CheckAuth>
        }
      />
    </Routes>
  );
}

export default AllRoute;
