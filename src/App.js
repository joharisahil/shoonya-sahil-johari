import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import RetreatPage from "./pages/RetreatPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/retreats/:id" element={<RetreatPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
