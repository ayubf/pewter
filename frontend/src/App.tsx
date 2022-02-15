import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';


function App() {
  return (
    <div className="App">
      Pewter
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Map users and posts routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
