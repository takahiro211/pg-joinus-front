import * as React from 'react';
import { Link } from 'react-router-dom';
import { Labels } from '../../../utils/Consts';
import { hideUnderline } from '../../../utils/Styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://source.unsplash.com/dWYU3i-mqEo';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt={Labels.CATCH}
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {Labels.CATCH}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: 4 }}
      >
        {Labels.SUBJECT}
      </Typography>
      <Link
        to="/sign-up/"
        style={hideUnderline}
        >
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ minWidth: 200 }}
        >
          {Labels.SIGN_UP}
        </Button>
      </Link>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        {Labels.SIGN_UP_DESCRIPTION}
      </Typography>
    </ProductHeroLayout>
  );
}
