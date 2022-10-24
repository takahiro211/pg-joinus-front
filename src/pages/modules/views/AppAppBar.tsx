import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Container, Hidden } from "@mui/material";
import { Link } from "react-router-dom";
import { AppStrings, Labels } from "../../../utils/Consts";
import {
  appBarLinkSignIn,
  appBarLinkSignUp,
  appBarTitle,
} from "../../../utils/Styles";
import DrawerMenu from "../components/DrawerMenu";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function AppAppBar() {
  const [loginState, setLoginState] = useState("false");
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  useEffect(() => {
    setLoginState(cookies["XSRF-TOKEN"]);
  }, []);

  return loginState ? (
    // ログイン済みの場合
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
                <Link color="inherit" to="/sign-in" style={appBarLinkSignIn}>
                  {Labels.SIGN_IN} 済みですよ
                </Link>
                <Link color="inherit" to="sign-up" style={appBarLinkSignUp}>
                  {Labels.SIGN_UP}
                </Link>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  ) : (
    // 未ログイン時
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
                <Link color="inherit" to="/sign-in" style={appBarLinkSignIn}>
                  {Labels.SIGN_IN}
                </Link>
                <Link color="inherit" to="sign-up" style={appBarLinkSignUp}>
                  {Labels.SIGN_UP}
                </Link>
              </Hidden>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
