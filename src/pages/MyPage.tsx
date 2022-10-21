import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import withRoot from '../withRoot';

function MyPage() {
  const terms = 'terms'
  return (
    <React.Fragment>
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Logged In
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(MyPage);
