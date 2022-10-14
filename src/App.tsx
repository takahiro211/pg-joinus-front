import './App.css';
import React from "react";
import Home from './pages/Home';
import { AnimatePresence } from "framer-motion";

function App() {
  return (
      <React.StrictMode>
        <AnimatePresence exitBeforeEnter>
          <Home />
        </AnimatePresence>
      </React.StrictMode>
    );
};

export default App;
