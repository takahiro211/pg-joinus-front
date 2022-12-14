import Box from "@mui/material/Box";
import AppBar from "./AppBar";
import Toolbar from "./Toolbar";
import { Alert, Button, Container, Hidden, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppStrings, Labels } from "../../../utils/Consts";
import {
  appBarLinkSignIn,
  appBarLinkSignUp,
  appBarTitle,
} from "../../../utils/Styles";
import DrawerMenu from "./DrawerMenu";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../../../api/RepositoryFactory";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";
import { useAuth } from "../../../utils/AuthContext";

function AppMenu() {
  const { isAuth, setIsAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);
  useEffect(() => {
    const value = cookies["XSRF-TOKEN"];
    if (value == "false" || value === void 0) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, []);

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
    <>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        {/** スマホ用 */}
        <Hidden mdUp>
          <DrawerMenu setOpen={setOpen} />
        </Hidden>

        {/** PC用 */}
        <Hidden mdDown>
          {/** ログイン済みの場合 */}
          <div style={{ display: !isAuth ? "none" : "" }}>
            <DrawerMenu setOpen={setOpen} />
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
    </>
  );
}

export default AppMenu;
