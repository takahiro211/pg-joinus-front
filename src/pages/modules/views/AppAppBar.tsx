import Box from '@mui/material/Box';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const appBarLinkText = {
  textDecoration: "none",
  fontSize: 24,
  color: 'inherit',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} />
            <h6>
              <Link
                color="inherit"
                to="/"
                style={appBarLinkText}
              >
                {'PGJoinUs'}
              </Link>
            </h6>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <h6>
                <Link
                  color="inherit"
                  to="sign-in"
                  style={appBarLinkText}
                >
                  <MenuIcon />
                </Link>
                
              </h6>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
