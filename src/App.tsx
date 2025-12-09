import React, { useState } from 'react';
import { ViewState, SensorData } from './types';
import DashboardView from './components/DashboardView';
import HistoryView from './components/HistoryView';
import AboutView from './components/AboutView';
import HomeView from './components/HomeView';
import { LayoutDashboard, History, Info, Home as HomeIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [history, setHistory] = useState<SensorData[]>([]);

  // Callback to update history when new data is generated in Dashboard
  const handleNewData = (data: SensorData) => {
    setHistory(prev => {
      // Keep only last 50 readings for chart performance
      const newHistory = [data, ...prev];
      return newHistory.slice(0, 50);
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView onStart={() => setCurrentView('DASHBOARD')} />;
      case 'DASHBOARD':
        return <DashboardView history={history} onNewData={handleNewData} />;
      case 'HISTORY':
        return <HistoryView history={history} />;
      case 'ABOUT':
        return <AboutView />;
      default:
        return <HomeView onStart={() => setCurrentView('DASHBOARD')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('HOME')}>
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">AquaStep</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentView('HOME')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'HOME' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </button>
              <button 
                onClick={() => setCurrentView('DASHBOARD')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'DASHBOARD' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('HISTORY')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'HISTORY' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <History className="w-4 h-4" />
                History
              </button>
              <button 
                onClick={() => setCurrentView('ABOUT')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'ABOUT' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Info className="w-4 h-4" />
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Nav (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between z-50 pb-safe">
        <button onClick={() => setCurrentView('HOME')} className={`flex flex-col items-center ${currentView === 'HOME' ? 'text-blue-600' : 'text-slate-400'}`}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </button>
        <button onClick={() => setCurrentView('DASHBOARD')} className={`flex flex-col items-center ${currentView === 'DASHBOARD' ? 'text-blue-600' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Dash</span>
        </button>
        <button onClick={() => setCurrentView('HISTORY')} className={`flex flex-col items-center ${currentView === 'HISTORY' ? 'text-blue-600' : 'text-slate-400'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">History</span>
        </button>
        <button onClick={() => setCurrentView('ABOUT')} className={`flex flex-col items-center ${currentView === 'ABOUT' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Info className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">About</span>
        </button>
      </div>

      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
