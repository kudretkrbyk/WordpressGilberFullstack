import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./Pages/MainPage";
import Admin from "./Pages/Admin";
import AdminLogIn from "./Pages/AdminLogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/dd" element={<AdminLogIn />}></Route>
        <Route path="/*" element={<MainPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
