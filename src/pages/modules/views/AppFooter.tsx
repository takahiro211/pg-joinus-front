import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import { Link } from 'react-router-dom';
import { AppStrings, Labels } from '../../../utils/Consts';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" to="/">
        {AppStrings.APP_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'light',
    name: 'ライト',
  },
  {
    code: 'night',
    name: 'ナイト',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://ytmemo.com/" sx={iconStyle} target="_blank">
                  <img
                    src="/img/appFooterFacebook.png"
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com/h211yt" sx={iconStyle} target="_blank">
                  <img
                    src="/img/appFooterTwitter.png"
                    alt="Twitter"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              {Labels.ABOUT}
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link to="/terms/">{Labels.TERMS}</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link to="/privacy/">{Labels.PRIVACY}</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              {Labels.CHANGE_THEME}
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'Icons made by '}
              <a href="https://www.freepik.com" rel="noopener" title="Freepik" target="_blank">
                Freepik
              </a>
              {' from '}
              <a href="https://www.flaticon.com" rel="noopener" title="Flaticon" target="_blank">
                www.flaticon.com
              </a>
              {' is licensed by '}
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
