import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./Pages/MainPage";
import Admin from "./Pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/*" element={<MainPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
