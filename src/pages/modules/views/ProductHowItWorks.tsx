import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Link } from 'react-router-dom';
import { hideUnderline } from '../../../utils/Styles';
import { FlowOfJoin, Labels } from '../../../utils/Consts';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/img/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          {Labels.FLOW_OF_JOIN}
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>{FlowOfJoin.LEFT}</Box>
                <Box
                  component="img"
                  src="/img/productHowItWorks1.svg"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {FlowOfJoin.LEFT_DESCRIPTION}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>{FlowOfJoin.CENTER}</Box>
                <Box
                  component="img"
                  src="/img/productHowItWorks2.svg"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {FlowOfJoin.CENTER_DESCRIPTION}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>{FlowOfJoin.RIGHT}</Box>
                <Box
                  component="img"
                  src="/img/productHowItWorks3.svg"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {FlowOfJoin.RIGHT_DESCRIPTION}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Box sx={{ mt: 8 }}>
          <Link to="sign-up"
            style={hideUnderline}>
            <Button
              color="secondary"
              size="large"
              variant="contained"
            >
              {FlowOfJoin.FIND_PROJECT}
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
