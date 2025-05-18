import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import LoginPage from "./components/Login/Login";
import LoginCallback from "./components/Login/LoginCallback";
import GameView from "./components/GameView/GameView";
import Dashboard from "./components/Dashboard/dashboard";
import Layout from "./components/layout";
import NotFound from "./components/Misc/NotFound";
import { ThemeProvider } from "next-themes";
import AccountSettings from "./components/Account/AccountSettings";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/callback" element={<LoginCallback />} />

    {/* Protected Dashboard Routes - with sidebar */}
    <Route
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
      
      <Route path="home" element={<Dashboard />} />
      <Route path="game" element={<GameView />} />
      <Route path="settings" element={<AccountSettings />} />
    
    </Route>

    {/* Catch-all for everything else */}
    <Route path="/dashboard/*" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
