import "./App.css";
import { AnimatePresence } from "framer-motion";
import AppFooter from "./pages/modules/views/AppFooter";
import AppAppBar from "./pages/modules/views/AppAppBar";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Route from "./routes/Route";
import { CookiesProvider } from "react-cookie";

function App() {
  // Component
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppAppBar />
        <AnimatePresence exitBeforeEnter>
          <Route />
        </AnimatePresence>
        <AppFooter />
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
