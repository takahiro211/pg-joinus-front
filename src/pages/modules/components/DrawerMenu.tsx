import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  appBarMenuBtn,
  hideUnderline,
  menuItemLink,
} from "../../../utils/Styles";
import { Labels, DrawerMenuLabels } from "../../../utils/Consts";
import { Login } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/AuthContext";
import { RepositoryFactory } from "../../../api/RepositoryFactory";
import { CookieSetOptions } from "universal-cookie";
import { useCookies } from "react-cookie";
import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PolicyIcon from "@mui/icons-material/Policy";
import SupportIcon from "@mui/icons-material/Support";
import GavelIcon from "@mui/icons-material/Gavel";
import SmsIcon from "@mui/icons-material/Sms";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Hidden } from "@mui/material";
import Typography from "./Typography";

type Anchor = "top" | "left" | "bottom" | "right";

export default function DrawerMenu(props: any) {
  const { isAuth, setIsAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleLogout = () => {
    userResponse();
  };

  const options: CookieSetOptions = {
    domain: process.env.REACT_APP_COOKIE_DOMAIN,
  };

  /**
   * API ログアウト処理
   */
  const userRepository = RepositoryFactory.get("logout");
  const navigate = useNavigate();
  const userResponse = async () => {
    try {
      const logoutResponse = await userRepository.index();
      console.log("logout", logoutResponse.status);
      console.log("options", options);
      removeCookie("XSRF-TOKEN", options);
      setIsAuth(false);
      props.setOpen(true);
      navigate("/");
    } catch (e) {}
  };

  /**
   * メニューの並び
   */
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/** ログイン済みの場合 */}
        <div style={{ display: !isAuth ? "none" : "" }}>
          {[
            DrawerMenuLabels.DRAWER_MENU_MYPAGE,
            DrawerMenuLabels.DRAWER_MENU_PROJECTS,
            DrawerMenuLabels.DRAWER_MENU_MANAGE_POSTS,
            DrawerMenuLabels.DRAWER_MENU_FAVORITES,
            DrawerMenuLabels.DRAWER_MENU_FOLLOWER,
            DrawerMenuLabels.DRAWER_MENU_COMMENTS,
          ].map((text) => getListItem(text))}
        </div>
      </List>
      <Divider />
      <List>
        <div style={{ display: !isAuth ? "none" : "" }}>
          {[
            DrawerMenuLabels.DRAWER_MENU_HELP,
            DrawerMenuLabels.DRAWER_MENU_TERMS,
            DrawerMenuLabels.DRAWER_MENU_PRIVACY,
            DrawerMenuLabels.DRAWER_MENU_DEVELOPER,
            DrawerMenuLabels.DRAWER_MENU_LOGOUT,
          ].map((text) => getListItem(text))}
        </div>
      </List>
      <List>
        {/** 未ログイン時 */}
        <div style={{ display: isAuth ? "none" : "" }}>
          {[Labels.SIGN_IN, Labels.SIGN_UP].map((text) => getListItem(text))}
        </div>
      </List>
      <Divider />
      <List>
        {[DrawerMenuLabels.DRAWER_MENU_CLOSE].map((text) => getListItem(text))}
      </List>
    </Box>
  );

  /**
   * 全ての項目を定義
   */
  const getListItem = (item: string) => (
    <Box>
      {item === DrawerMenuLabels.DRAWER_MENU_MYPAGE && (
        <Link to="mypage" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_FOLLOWER && (
        <Link to="users" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_LOGOUT && (
        <ListItem key={item} disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_LOGIN && (
        <Link to="sign-in" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_SIGNUP && (
        <Link to="sign-up" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_CLOSE && (
        <ListItem key={item} disablePadding>
          <ListItemButton onClick={toggleDrawer("right", false)}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_PROJECTS && (
        <Link to="/projects/popular" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_MANAGE_POSTS && (
        <Link to="/my-posts" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_FAVORITES && (
        <Link to="favorites" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_COMMENTS && (
        // <Link to="/projects/popular" style={menuItemLink}>
        <ListItem key={item} disablePadding disabled>
          <ListItemButton disabled>
            <ListItemIcon>
              <SmsIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
        // </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_HELP && (
        <Link to="faq" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_TERMS && (
        <Link to="/terms" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_PRIVACY && (
        <Link to="/privacy" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
      {item === DrawerMenuLabels.DRAWER_MENU_DEVELOPER && (
        <Link to="/developer" style={menuItemLink}>
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Hidden mdDown>
            <Link to="/post" style={appBarMenuBtn}>
              <Button style={appBarMenuBtn} sx={{ mr: 1 }}>
                <PostAddIcon />
                <Typography sx={{ ml: 0.5, fontWeight: "bold", fontSize: 14 }}>
                  投稿する
                </Typography>
              </Button>
            </Link>
          </Hidden>
          <Button onClick={toggleDrawer(anchor, true)} style={appBarMenuBtn}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
