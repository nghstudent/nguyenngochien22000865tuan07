import { Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <div className="flex min-h-screen h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64">
        <SideBar />
      </div>
      {/* Main content */}
      <div className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
