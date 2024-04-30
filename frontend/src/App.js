import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/user/:userId" element={<UserDetails />} />
          </Routes>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
