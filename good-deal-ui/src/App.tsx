import "./App.css";
import Landing from "./components/LandingPage/Landing";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/Login/Login";
import LoginCallback from "./components/Login/LoginCallback";
import { AppSidebar } from "./components/app-sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Layout from "./components/layout";
import { ThemeProvider } from 'next-themes'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<LoginCallback />} />

        {/* Protected Routes + Sidebar */}
        
        <Route
          path="/dashboard/*"
          element={
            <Layout>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Routes>
                <Route path="home" element={<Dashboard />} />
              </Routes>
              </ThemeProvider>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
