import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { api } from '../services/api';
import { StatCard } from '../components/common/StatCard';
import { 
  GraduationCap, 
  Target, 
  Crosshair, 
  Route, 
  PlayCircle, 
  Flame, 
  Zap, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Bot,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const JuniorDashboard = () => {
  const { user } = useAuth();
  const { streak, getLevelInfo } = useGamification();
  const navigate = useNavigate();

  const [skillChartData, setSkillChartData] = useState([
    { name: 'Java', current: 80, required: 85, color: '#6366f1' },
    { name: 'SQL', current: 45, required: 80, color: '#f59e0b' },
    { name: 'Debugging', current: 40, required: 80, color: '#ef4444' },
    { name: 'REST API', current: 65, required: 75, color: '#38bdf8' }
  ]);

  const levelInfo = getLevelInfo(user?.xp || 480);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Junior Welcome Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Junior Engineering Growth Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Welcome, {user?.name?.split(' ')[0] || 'Kumar'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Target Role: <strong className="text-white">{user?.targetRole || 'Backend Developer'}</strong>. Learn directly from senior engineer incident postmortems instead of generic course theory.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/junior/skill-gap"
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-rose-600/20"
            >
              <Crosshair className="w-4 h-4" />
              <span>AI Skill Gap (2 Critical)</span>
            </Link>

            <Link
              to="/junior/simulator"
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Solve Workplace Bug</span>
            </Link>

            <Link
              to="/junior/learning-path"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700"
            >
              <Route className="w-4 h-4 text-sky-400" />
              <span>Personalized Roadmap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overall Score & Core Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Overall Skill Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-900/10 glass-card border border-emerald-500/30 relative">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Skill Score</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <h3 className="text-3xl font-bold font-display text-white">68%</h3>
            <span className="text-xs text-emerald-400 font-bold">+12% this month</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: '68%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Target benchmark: 85% for Senior Promotion</p>
        </div>

        <StatCard
          title="Skills Strong"
          value="Java (80%)"
          subtitle="Meets enterprise baseline"
          icon={CheckCircle2}
          color="brand"
          badge={{ text: 'Solid Proficiency', label: 'Status' }}
        />

        <StatCard
          title="Critical Skill Gaps"
          value="SQL & Debugging"
          subtitle="45% & 40% proficiency"
          icon={AlertCircle}
          color="rose"
          badge={{ text: 'High Org Priority', label: 'Action Needed' }}
        />

        <StatCard
          title="Learning Streak"
          value={`${streak} Days`}
          subtitle="4 workplace problems solved"
          icon={Flame}
          color="amber"
          badge={{ text: `${levelInfo.level} Tier`, label: 'Gamification' }}
        />

      </div>

      {/* Skill Gap Comparison Chart vs Required Role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">Current Proficiency vs Backend Developer Requirement</h3>
              <p className="text-xs text-slate-400">Comparing your skill vectors against real production requirements</p>
            </div>
            <Link to="/junior/skill-gap" className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              <span>Deep Gap Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="name" type="category" stroke="#f8fafc" width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name) => [`${val}%`, name === 'current' ? 'Your Level' : 'Required Level']}
                />
                <Bar dataKey="current" radius={[0, 8, 8, 0]} name="Your Level">
                  {skillChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="required" fill="#334155" radius={[0, 8, 8, 0]} name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick explanation pill */}
          <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between text-xs">
            <span className="text-amber-200">
              💡 <strong>AI Recommendation:</strong> Focus on <strong>SQL & Debugging</strong> to unlock Day 4 Simulation Challenge.
            </span>
            <Link to="/junior/simulator" className="text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap">
              Launch Sim →
            </Link>
          </div>
        </div>

        {/* Right Col: Active Roadmap & Tacit Knowledge Feed */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-brand-400" />
                <h4 className="text-sm font-bold text-white">7-Day Learning Path</h4>
              </div>
              <span className="text-xs font-bold text-brand-300">28% Done</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Day 1: SQL Fundamentals</p>
                  <p className="text-[11px] text-slate-400">State machines in HR Tech</p>
                </div>
                <span className="text-emerald-400 font-bold text-xs">✓ Done</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Day 2: SQL Debugging</p>
                  <p className="text-[11px] text-slate-400">Arun Kumar's 0-row update fix</p>
                </div>
                <span className="text-emerald-400 font-bold text-xs">✓ Done</span>
              </div>

              <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-brand-200">Day 3: REST API Error Handling</p>
                  <p className="text-[11px] text-slate-300">Priya's 401 vs 403 token filter</p>
                </div>
                <span className="text-brand-300 font-bold text-xs animate-pulse">In Progress</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between opacity-80">
                <div>
                  <p className="font-semibold text-slate-300">Day 4: Workplace Challenge</p>
                  <p className="text-[11px] text-slate-500">Simulate leave approval bug</p>
                </div>
                <span className="text-amber-400 font-bold text-xs">+50 XP</span>
              </div>
            </div>
          </div>

          <Link
            to="/junior/learning-path"
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <span>View Full 7-Day Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
