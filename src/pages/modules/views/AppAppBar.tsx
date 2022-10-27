import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Alert, Button, Container, Hidden, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppStrings, Labels } from "../../../utils/Consts";
import {
  appBarLinkSignIn,
  appBarLinkSignUp,
  appBarTitle,
} from "../../../utils/Styles";
import DrawerMenu from "../components/DrawerMenu";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../api/RepositoryFactory";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";
import { useAuth } from "../../../utils/AuthContext";

function AppAppBar() {
  const { isAuth, setIsAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const options: CookieSetOptions = {
    domain: process.env.REACT_APP_COOKIE_DOMAIN,
  };
  const [cookies, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);
  useEffect(() => {
    const value = cookies["XSRF-TOKEN"];
    if (value == "false" || value === void 0) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    userResponse();
  };

  // API ログアウト処理
  const userRepository = RepositoryFactory.get("logout");
  const navigate = useNavigate();
  const userResponse = async () => {
    try {
      const logoutResponse = await userRepository.index();
      console.log("logout", logoutResponse.status);
      console.log("options", options);
      removeCookie("XSRF-TOKEN", options);
      setIsAuth(false);
      setOpen(true);
      navigate("/");
    } catch (e) {}
  };

  // ログアウト完了メッセージを閉じる処理
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ flex: 1 }} />
            <h1>
              <Link color="inherit" to="/" style={appBarTitle}>
                {AppStrings.APP_NAME}
              </Link>
            </h1>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Hidden mdUp>
                <DrawerMenu />
              </Hidden>
              <Hidden mdDown>
                {/** ログイン済みの場合 */}
                <div style={{ display: !isAuth ? "none" : "" }}>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    style={appBarLinkSignIn}
                  >
                    {Labels.LOGOUT}
                  </Button>
                  <Button
                    color="inherit"
                    to="users"
                    style={appBarLinkSignIn}
                    component={Link}
                  >
                    {Labels.USERS_LIST}
                  </Button>
                </div>
                {/** 未ログイン時 */}
                <div style={{ display: isAuth ? "none" : "" }}>
                  <Button
                    color="inherit"
                    to="/sign-in"
                    style={appBarLinkSignIn}
                    component={Link}
                  >
                    {Labels.SIGN_IN}
                  </Button>
                  <Button
                    color="inherit"
                    to="sign-up"
                    style={appBarLinkSignUp}
                    component={Link}
                  >
                    {Labels.SIGN_UP}
                  </Button>
                </div>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          ログアウトしました
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AppAppBar;
