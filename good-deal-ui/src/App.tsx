import "./App.css";
import Landing from "./components/LandingPage/Landing";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import LoginCallback from "./components/Login/LoginCallback";
import { AppSidebar } from "./components/app-sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Layout from "./components/layout";
import { ThemeProvider } from "next-themes";
import NotFound from "./components/Misc/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<LoginCallback />} />

        {/* Protected Dashboard Routes - with sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Outlet />
              </ThemeProvider>
            </Layout>
          }
        >
          {/* Only valid dashboard routes here */}
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
        </Route>

        {/* Catch-all for everything else */}
        <Route path="/dashboard/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
