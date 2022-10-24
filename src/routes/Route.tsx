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

function AllRoute() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      // --- Guest ---
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="mypage" element={<MyPage />} />
      // --- Private ---
      <Route
        path="terms"
        element={
          <CheckAuth>
            <Terms />
          </CheckAuth>
        }
      />
    </Routes>
  );
}

export default AllRoute;
