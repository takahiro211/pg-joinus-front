import * as React from 'react';
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
        alt="Feel free to join projects"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Feel free to join projects
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: 4 }}
      >
        スキルに応じたGitHubリポジトリをご紹介
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 200 }}
      >
        新規会員登録
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        無料の会員登録はこちらから
      </Typography>
    </ProductHeroLayout>
  );
}
