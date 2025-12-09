import React, { useState, useEffect } from 'react';
import { SensorData, SystemStatus } from '../types';
import SensorCard from './SensorCard';
import { Activity, Droplets, Zap, Wind, Gauge, RefreshCw, Sparkles } from 'lucide-react';
import { generateSensorData } from '../services/simulationService';
import { REFRESH_RATE_MS } from '../constants';
import { analyzeWaterQuality } from '../services/geminiService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DashboardViewProps {
  history: SensorData[];
  onNewData: (data: SensorData) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ history, onNewData }) => {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Initialize or use latest history
  useEffect(() => {
    if (history.length > 0) {
      setCurrentData(history[0]);
    } else {
      handleRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isAutoRefresh) {
      interval = window.setInterval(() => {
        handleRefresh();
      }, REFRESH_RATE_MS);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    const newData = generateSensorData();
    setCurrentData(newData);
    onNewData(newData);
    // Reset AI insight on new data so user has to click analyze again, or keep previous? 
    // Let's keep previous until requested to save API calls/tokens
  };

  const handleAiAnalysis = async () => {
    if (!currentData) return;
    setIsLoadingAi(true);
    const insight = await analyzeWaterQuality(currentData);
    setAiInsight(insight);
    setIsLoadingAi(false);
  };

  if (!currentData) return <div className="p-10 text-center">Initializing Sensors...</div>;

  // Prepare chart data (reverse history to show chronological order left-to-right)
  const chartData = [...history].reverse().slice(-10);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Dashboard</h2>
          <p className="text-slate-500 text-sm">Real-time monitoring of AquaStep Recycler</p>
        </div>
        <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                currentData.status === SystemStatus.TURBINE_RUNNING ? 'bg-green-100 text-green-700 border-green-200' :
                currentData.status === SystemStatus.TESTING_WATER ? 'bg-blue-100 text-blue-700 border-blue-200' :
                'bg-amber-100 text-amber-700 border-amber-200'
            }`}>
                {currentData.status}
            </span>
          <button 
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isAutoRefresh ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {isAutoRefresh ? 'Auto: ON' : 'Auto: OFF'}
          </button>
          <button 
            onClick={handleRefresh}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            aria-label="Refresh Data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorCard 
          title="Water pH Level"
          value={currentData.ph}
          unit="pH"
          icon={Activity}
          colorClass="bg-rose-500"
          subtext="Target: 6.5 - 8.0"
        />
        <SensorCard 
          title="TDS Level"
          value={currentData.tds}
          unit="ppm"
          icon={Droplets}
          colorClass="bg-cyan-500"
          subtext="Potable range: <300 ppm"
        />
        <SensorCard 
          title="Voltage Generated"
          value={currentData.voltage}
          unit="Volts"
          icon={Zap}
          colorClass="bg-yellow-500"
          subtext="Battery charging active"
        />
        <SensorCard 
          title="Water Flow Rate"
          value={currentData.flowRate}
          unit="L/min"
          icon={Wind}
          colorClass="bg-blue-500"
        />
        <SensorCard 
          title="Turbine Speed"
          value={currentData.turbineRpm}
          unit="RPM"
          icon={Gauge}
          colorClass="bg-indigo-500"
        />
        
        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between">
           <div>
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <h3 className="font-semibold text-sm uppercase tracking-wider opacity-90">Smart Insight</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-90 min-h-[60px]">
                {isLoadingAi ? "Analyzing data..." : (aiInsight || "Click analyze for real-time AI assessment of water quality.")}
            </p>
           </div>
           <button 
            onClick={handleAiAnalysis}
            disabled={isLoadingAi}
            className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors text-center"
           >
             {isLoadingAi ? 'Thinking...' : 'Analyze Status'}
           </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Energy Generation Trend</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="timestamp" tick={false} axisLine={false} />
                        <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                            labelFormatter={() => ''}
                        />
                        <Line type="monotone" dataKey="voltage" stroke="#eab308" strokeWidth={3} dot={{r: 4, fill: '#eab308'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Water Quality (TDS)</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="timestamp" tick={false} axisLine={false} />
                        <YAxis domain={[0, 350]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                            labelFormatter={() => ''}
                        />
                        <Line type="monotone" dataKey="tds" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, fill: '#06b6d4'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;