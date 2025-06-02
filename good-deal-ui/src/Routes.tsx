import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import LoginPage from "./components/Login/Login";
import LoginCallback from "./components/Login/LoginCallback";
import GameView from "./components/GameView/GameView";
import Dashboard from "./components/Dashboard/dashboard";
import Layout from "./components/layout";
import NotFound from "./components/Misc/NotFound";
import { ThemeProvider } from "next-themes";
import SteamDeals from "./components/SteamDeals/SteamDeals";
import { useContext } from "react";
import AuthContext from "./contexts/authContext";
import Settings from "./components/Settings";

//These routes can only be triggered if you're not already logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  console.log("ProtectedRoute rendered");

  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return;
  }
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

export { ProtectedRoute };

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
      <Route path="game/:game_id" element={<GameView />} />
      <Route path="steam-deals" element={<SteamDeals />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    {/* Catch-all for everything else */}
    <Route path="/dashboard/*" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
