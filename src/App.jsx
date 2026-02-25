import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SmartScan from './components/SmartScan';
import VisitorLogs from './components/VisitorLogs';
import { LayoutDashboard, ScanFace, ListFilter, ShieldCheck, Settings } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [visitorHistory, setVisitorHistory] = useState([
    { id: 1, name: 'Aniketh Kumar', purpose: 'Maintenance', time: '10:30 AM', status: 'Checked In', sensorData: '98.6°F', idToken: 'V-A9X2K7', sentiment: 'Professional' },
    { id: 2, name: 'Priya Sharma', purpose: 'Interview', time: '11:15 AM', status: 'In Progress', sensorData: '98.5°F', idToken: 'V-B2M5N1', sentiment: 'Confident' },
    { id: 3, name: 'Rahul Varma', purpose: 'Delivery', time: '09:45 AM', status: 'Checked Out', sensorData: '98.4°F', idToken: 'V-C8L3J0', sentiment: 'neutral' },
  ]);

  const addVisitor = (newVisitor) => {
    setVisitorHistory([
      { ...newVisitor, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...visitorHistory
    ]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard history={visitorHistory} />;
      case 'scan':
        return <SmartScan onCheckIn={addVisitor} setActiveTab={setActiveTab} />;
      case 'logs':
        return <VisitorLogs history={visitorHistory} />;
      default:
        return <Dashboard history={visitorHistory} />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-dark text-white cyber-grid">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-brand-primary w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">SECURE<span className="text-brand-primary">ACCESS</span> AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/50">System Status</span>
              <span className="text-xs text-brand-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                ONLINE
              </span>
            </div>
          </div>
        </header>
        <div className="h-[calc(100vh-64px)] overflow-y-auto p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
