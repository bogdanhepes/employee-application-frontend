import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
