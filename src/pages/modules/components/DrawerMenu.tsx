import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { appBarMenuBtn, menuItemLink } from '../../../utils/Styles';
import { Labels } from '../../../utils/Consts';
import { Login } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function DrawerMenu() {
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
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const getListItem = (item: string) => (
    <Box>
        {(item === Labels.SIGN_IN) && 
            <Link to="sign-in" 
                style={menuItemLink}
            >
                <ListItem key={item} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
            </Link>
        }
        {(item === Labels.SIGN_UP) && 
            <Link to="sign-up"
                style={menuItemLink}
            >
                <ListItem key={item} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
            </Link>
        }
        {(item === Labels.CLOSE_MENU) &&
            <ListItem key={item} disablePadding>
            <ListItemButton 
            onClick={toggleDrawer('right', false)}>
                <ListItemIcon>
                <CloseIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
            </ListItem>
        }
    </Box>
  );

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[Labels.SIGN_IN, Labels.SIGN_UP].map((text) => (
            getListItem(text)
        ))}
      </List>
      <Divider />
      <List>
        {[Labels.CLOSE_MENU].map((text) => (
            getListItem(text)
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
          onClick={toggleDrawer(anchor, true)}
          style={appBarMenuBtn}
          >
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
