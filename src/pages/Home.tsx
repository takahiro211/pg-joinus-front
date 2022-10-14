import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Terms from './Terms';
import Privacy from './Privacy';
import ForgotPassword from './ForgotPassword';
import { motion } from 'framer-motion';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <motion.div
              initial={{ opacity: 0, y: 0 }} // 初期状態
              animate={{ opacity: 1, y: 0 }} // マウント時
              exit={{ opacity: 0, y: 10 }} // アンマウント時
              transition={{
              duration: 0.8,
              }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <ProductHero />
                <ProductValues />
                <ProductCategories />
                <ProductHowItWorks />
                <ProductCTA />
                <ProductSmokingHero />
              </>
            } />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/private" element={<Privacy />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </motion.div>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
