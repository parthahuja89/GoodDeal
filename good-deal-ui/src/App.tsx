import "./App.css";
import Landing from "./Components/LandingPage/Landing";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Components/Login/login";
import LoginCallback from "./Components/Login/LoginCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<LoginCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
