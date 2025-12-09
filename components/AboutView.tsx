import React from 'react';
import { Droplets, Lightbulb, Leaf } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">How AquaStep Works</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          An innovative solution converting wasted water energy into electricity while ensuring safe reuse.
        </p>
      </div>

      {/* Feature 1: Filtration */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <img 
            src="https://picsum.photos/id/16/800/600" 
            alt="Water Filtration Process" 
            className="rounded-2xl shadow-lg w-full h-64 object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Advanced Filtration</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            School hand-wash water passes through a multi-stage filtration system including a mesh screen for debris, activated carbon for chemicals, and a fine membrane for particulates, ensuring the water is clean enough for non-potable uses like gardening.
          </p>
        </div>
      </div>

      {/* Feature 2: Energy Generation */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        <div className="flex-1">
          <img 
            src="https://picsum.photos/id/77/800/600" 
            alt="Turbine Generator" 
            className="rounded-2xl shadow-lg w-full h-64 object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Micro-Hydro Generation</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            As water flows down through the pipes, gravity drives a micro-turbine. This rotation generates 0.5V to 5V of electricity, which is stored in a battery to power the onboard IoT sensors and display system.
          </p>
        </div>
      </div>

      {/* Feature 3: Impact */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="inline-block p-4 bg-white/10 rounded-full">
            <Leaf className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold">Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mt-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-green-300 mb-2">Water Saving</h4>
              <p className="text-slate-300 text-sm">Recycles up to 500 liters of water per school per week.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-yellow-300 mb-2">Self-Sustaining</h4>
              <p className="text-slate-300 text-sm">Generates its own power for monitoring, reducing grid dependency.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Educational</h4>
              <p className="text-slate-300 text-sm">Teaches students about renewable energy and resource conservation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
