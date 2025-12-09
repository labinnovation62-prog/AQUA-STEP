import React from 'react';
import { SensorData } from '../types';

interface HistoryViewProps {
  history: SensorData[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  // Take only the last 5 readings
  const recentHistory = history.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Reading History</h2>
        <p className="text-slate-500">Recent sensor measurements logs.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">pH</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">TDS (ppm)</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Voltage (V)</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">RPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentHistory.length === 0 ? (
                <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">No data collected yet. Start the dashboard.</td>
                </tr>
              ) : (
                recentHistory.map((data) => (
                    <tr key={data.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 font-mono">
                        {data.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {data.status}
                        </span>
                    </td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{data.ph}</td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{data.tds}</td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{data.voltage}</td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{data.turbineRpm}</td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
