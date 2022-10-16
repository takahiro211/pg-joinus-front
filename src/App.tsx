import './App.css';
import React from "react";
import Home from './pages/Home';
import { AnimatePresence } from "framer-motion";
import AppFooter from './pages/modules/views/AppFooter';
import AppAppBar from './pages/modules/views/AppAppBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ForgotPassword from './pages/ForgotPassword';
import { motion } from 'framer-motion';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppAppBar />
          <AnimatePresence exitBeforeEnter>
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
                  <Route path="/" element={<Home />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </BrowserRouter>
            </motion.div>
          </AnimatePresence>
          <AppFooter />
        </ThemeProvider>
      </React.StrictMode>
    );
};

export default App;
