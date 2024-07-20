// src/App.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import MainPage from "./Pages/MainPage";
import Admin from "./Pages/Admin";
import AdminLogIn from "./Pages/AdminLogIn";

function App() {
  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={isAuthenticated ? <Admin /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<AdminLogIn />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
