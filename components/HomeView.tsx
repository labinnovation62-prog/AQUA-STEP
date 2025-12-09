import React from 'react';

interface HomeViewProps {
  onStart: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full w-64 h-64 mx-auto"></div>
        <img 
            src="https://picsum.photos/id/48/400/400" 
            className="relative w-48 h-48 object-cover rounded-3xl shadow-2xl mx-auto border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500"
            alt="AquaStep Logo Placeholder"
        />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
        Aqua<span className="text-blue-600">Step</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-500 font-light mb-10 max-w-xl">
        Turning every drop into power. The smart recycling system for the schools of tomorrow.
      </p>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
      >
        Open Dashboard
        <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="mt-16 grid grid-cols-3 gap-8 text-slate-400 text-sm font-semibold uppercase tracking-wider">
        <div>
          <span className="block text-3xl font-bold text-slate-800 mb-1">98%</span>
          Purity
        </div>
        <div>
          <span className="block text-3xl font-bold text-slate-800 mb-1">5V</span>
          Generated
        </div>
        <div>
          <span className="block text-3xl font-bold text-slate-800 mb-1">24/7</span>
          Monitoring
        </div>
      </div>
    </div>
  );
};

export default HomeView;
