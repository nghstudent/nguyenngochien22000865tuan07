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
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Hàng 1: Sidebar + Nội dung */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 border-r">
          <SideBar />
        </div>

        {/* Nội dung */}
        <div className="w-3/4 overflow-y-auto">
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

      {/* Hàng 2: Footer */}
      <Footer />
    </div>
  );
}

export default App;
