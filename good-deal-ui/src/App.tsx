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
import GameView from "./components/GameView/GameView";
import Dashboard from "./components/Dashboard/dashboard";
import Layout from "./components/layout";
import { ThemeProvider } from "next-themes";
import AppRoutes from "./Routes";

import NotFound from "./components/Misc/NotFound";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
