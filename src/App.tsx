import "./App.css";
import { AnimatePresence } from "framer-motion";
import AppFooter from "./pages/modules/views/AppFooter";
import AppAppBar from "./pages/modules/views/AppAppBar";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Route from "./routes/Route";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  // Component
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
          <AppAppBar />
          <AnimatePresence exitBeforeEnter>
            <Route />
          </AnimatePresence>
          <AppFooter />
        </AuthProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
