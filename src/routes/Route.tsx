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

function AllRoute() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      // --- BOTH ---
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
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
        path="users"
        element={
          <CheckAuth>
            <Users />
          </CheckAuth>
        }
      />
      <Route
        path="projects"
        element={
          <CheckAuth>
            <Projects />
          </CheckAuth>
        }
      />
      <Route
        path="projects/:postId"
        element={
          <CheckAuth>
            <ProjectDetail />
          </CheckAuth>
        }
      />
    </Routes>
  );
}

export default AllRoute;
