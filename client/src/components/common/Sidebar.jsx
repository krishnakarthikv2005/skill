import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Sparkles, 
  UploadCloud, 
  PenTool, 
  Layers, 
  Compass, 
  Crosshair, 
  Route, 
  PlayCircle, 
  Users, 
  ShieldAlert, 
  History, 
  Clock, 
  Search, 
  User, 
  BrainCircuit,
  MessageSquareCode
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'junior';

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
      isActive
        ? 'bg-brand-600/20 text-brand-300 border border-brand-500/40 shadow-sm font-semibold'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
    }`;

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block bg-dark-950/60 border-r border-slate-800/80 p-4 space-y-6">
      
      {/* Role-Specific Portal Section */}
      <div>
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {role === 'senior' ? 'Senior / Mentor Portal' : role === 'admin' ? 'Admin Governance' : 'Junior / Learner Portal'}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
            role === 'senior' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
            role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}>
            {role}
          </span>
        </div>

        <nav className="space-y-1">
          {/* Senior Links */}
          {role === 'senior' && (
            <>
              <NavLink to="/senior/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>Mentor Dashboard</span>
              </NavLink>
              <NavLink to="/senior/capture" className={linkClass}>
                <PenTool className="w-4 h-4 text-brand-400" />
                <span>Share Experience</span>
              </NavLink>
              <NavLink to="/senior/upload" className={linkClass}>
                <UploadCloud className="w-4 h-4 text-sky-400" />
                <span>Upload Document</span>
              </NavLink>
              <NavLink to="/knowledge-engine" className={linkClass}>
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>AI Knowledge Engine</span>
              </NavLink>
              <NavLink to="/mentors" className={linkClass}>
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Mentorship Requests</span>
              </NavLink>
            </>
          )}

          {/* Junior Links */}
          {role === 'junior' && (
            <>
              <NavLink to="/junior/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Learner Dashboard</span>
              </NavLink>
              <NavLink to="/junior/skill-gap" className={linkClass}>
                <Crosshair className="w-4 h-4 text-rose-400" />
                <span>AI Skill Gap Analysis</span>
              </NavLink>
              <NavLink to="/junior/learning-path" className={linkClass}>
                <Route className="w-4 h-4 text-brand-400" />
                <span>Personalized Roadmap</span>
              </NavLink>
              <NavLink to="/junior/simulator" className={linkClass}>
                <PlayCircle className="w-4 h-4 text-amber-400" />
                <span>Workplace Simulator</span>
              </NavLink>
              <NavLink to="/mentors" className={linkClass}>
                <Users className="w-4 h-4 text-sky-400" />
                <span>Find a Mentor</span>
              </NavLink>
            </>
          )}

          {/* Admin Links */}
          {role === 'admin' && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span>Admin Executive Dashboard</span>
              </NavLink>
              <NavLink to="/admin/dashboard#risk-radar" className={linkClass}>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Critical Knowledge Risk</span>
              </NavLink>
              <NavLink to="/knowledge-decay" className={linkClass}>
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Knowledge Decay Monitor</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Core Intelligence Platform Navigation */}
      <div>
        <div className="px-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Organizational Intelligence
          </span>
        </div>
        <nav className="space-y-1">
          <NavLink to="/knowledge-graph" className={linkClass}>
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Interactive Skill Graph</span>
          </NavLink>
          <NavLink to="/knowledge-engine" className={linkClass}>
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>AI Knowledge Engine</span>
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Knowledge Search</span>
          </NavLink>
          <NavLink to="/knowledge-decay" className={linkClass}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Knowledge Freshness</span>
          </NavLink>
          <NavLink to="/timeline" className={linkClass}>
            <History className="w-4 h-4 text-purple-400" />
            <span>Skill Inheritance Lineage</span>
          </NavLink>
        </nav>
      </div>

      {/* User Account */}
      <div>
        <div className="px-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Account & Skills
          </span>
        </div>
        <nav className="space-y-1">
          <NavLink to="/profile" className={linkClass}>
            <User className="w-4 h-4 text-slate-400" />
            <span>Profile & Skill Radar</span>
          </NavLink>
        </nav>
      </div>

      {/* Tacit Knowledge Transfer Pipeline Visual Widget */}
      <div className="p-3 rounded-2xl bg-gradient-to-b from-brand-950/40 to-slate-900/60 border border-brand-500/20 text-xs">
        <p className="font-semibold text-brand-200 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Transfer Pipeline Active
        </p>
        <div className="space-y-1 text-[11px] text-slate-400">
          <div className="flex items-center justify-between">
            <span>Captured Incidents:</span>
            <span className="font-bold text-white">4</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Knowledge Assets:</span>
            <span className="font-bold text-white">3</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Transfers Completed:</span>
            <span className="font-bold text-emerald-400">84+</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
