import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import withRoot from '../withRoot';
import { RepositoryFactory } from '../api/RepositoryFactory'

function Index() {
  const userRepository = RepositoryFactory.get('auth')

  const userResponse = async () => {  
    const authResponse = await userRepository.index()
    console.log('index', authResponse)
  }

  userResponse()
  
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Index);
