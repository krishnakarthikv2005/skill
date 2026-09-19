import React from 'react';
import { KnowledgeGraph } from '../components/graph/KnowledgeGraph';
import { Layers, Sparkles, UserCheck, ShieldAlert, Cpu } from 'lucide-react';

export const KnowledgeGraphPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Skill Topology</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Skill Knowledge Graph</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Explore interconnected technical skills, single points of failure, documented production incidents, and expert mentors across engineering.
        </p>
      </div>

      {/* Graph Component */}
      <KnowledgeGraph interactive={true} height="h-[660px]" />

    </div>
  );
};
