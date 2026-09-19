import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Crosshair, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BrainCircuit, 
  PlayCircle, 
  Route, 
  ShieldAlert,
  Users,
  Target
} from 'lucide-react';

export const SkillGapPage = () => {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState('Backend Developer');
  const [gapData, setGapData] = useState({
    targetRole: 'Backend Developer',
    overallScore: 68,
    criticalGapsCount: 2,
    gaps: [
      {
        skill: 'Debugging',
        current: 40,
        required: 80,
        gap: 40,
        priority: 'CRITICAL',
        weight: 'Critical',
        explanation: "These skills frequently appear in real-world backend problem solving within your organization's projects (14 documented incidents solved by senior engineers).",
        relatedIncidentsCount: 14
      },
      {
        skill: 'SQL',
        current: 45,
        required: 80,
        gap: 35,
        priority: 'HIGH',
        weight: 'Critical',
        explanation: "Stale WHERE update conditions and missing transaction checks caused major production incidents in the HR Core and Billing platforms.",
        relatedIncidentsCount: 8
      },
      {
        skill: 'Payment Integration',
        current: 20,
        required: 65,
        gap: 45,
        priority: 'HIGH',
        weight: 'Medium',
        explanation: "High organizational risk: only 1 senior expert (Arun Kumar) holds payment knowledge. Transferring this skill ensures team resilience.",
        relatedIncidentsCount: 3
      },
      {
        skill: 'REST API',
        current: 65,
        required: 75,
        gap: 10,
        priority: 'MEDIUM',
        weight: 'High',
        explanation: "Essential competency required for day-to-day feature development in enterprise services.",
        relatedIncidentsCount: 6
      },
      {
        skill: 'Java',
        current: 80,
        required: 85,
        gap: 5,
        priority: 'LOW',
        weight: 'High',
        explanation: "Strong baseline capability; minor refinement needed in virtual threads and streams.",
        relatedIncidentsCount: 12
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = async (roleName) => {
    setTargetRole(roleName);
    setLoading(true);
    try {
      const res = await api.analyzeSkillGap({ targetRole: roleName });
      if (res.gaps) setGapData(res);
    } catch (err) {
      console.warn('Skill gap error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-2">
            <Crosshair className="w-3.5 h-3.5" />
            <span>AI Skill Gap Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Your Skill Gap Analysis</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI compares your current skills against Senior Expert benchmarks & real organizational incident demand.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400 px-2">Target Goal:</span>
          <select
            value={targetRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500 font-semibold"
          >
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
            <option value="Security Engineer">Security Architect</option>
          </select>
        </div>
      </div>

      {/* Target Role & Gap Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 glass-card">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Role</span>
          <h3 className="text-xl font-bold text-white mt-1">{gapData.targetRole}</h3>
          <p className="text-xs text-slate-400 mt-1">Enterprise Core Engineering track</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 glass-card">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Readiness</span>
          <h3 className="text-xl font-bold text-emerald-400 mt-1">{gapData.overallScore}% Ready</h3>
          <p className="text-xs text-slate-400 mt-1">Need 17% more to clear Senior audit</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 glass-card bg-rose-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Critical Skill Gaps</span>
          <h3 className="text-xl font-bold text-white mt-1">{gapData.criticalGapsCount} High Priority</h3>
          <p className="text-xs text-rose-300/80 mt-1">SQL & Debugging require practice</p>
        </div>
      </div>

      {/* Detailed Gap Breakdown Cards with Real-World Justification */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-bold font-display text-white">Skill Matrix & Organizational Incident Reasoning</h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Priority sorted by organizational risk</span>
        </div>

        <div className="space-y-4">
          {gapData.gaps.map((item, idx) => {
            const isCritical = item.priority === 'CRITICAL' || item.priority === 'HIGH';

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition ${
                  isCritical 
                    ? 'bg-gradient-to-r from-rose-950/20 via-slate-900 to-slate-900 border-rose-500/40 hover:border-rose-400' 
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold font-display text-white">{item.skill}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                      item.priority === 'CRITICAL' ? 'bg-rose-500 text-white' :
                      item.priority === 'HIGH' ? 'bg-amber-500 text-slate-950' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      Priority: {item.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-400">Current: <strong className="text-white">{item.current}%</strong></span>
                    <span className="text-slate-400">Required: <strong className="text-brand-300">{item.required}%</strong></span>
                    <span className="text-rose-400 font-bold">Gap: -{item.gap}%</span>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden flex">
                  <div 
                    className={`h-2.5 rounded-l-full ${isCritical ? 'bg-rose-500' : 'bg-brand-500'}`}
                    style={{ width: `${item.current}%` }} 
                  />
                  <div 
                    className="h-2.5 bg-slate-700/60" 
                    style={{ width: `${item.gap}%` }} 
                  />
                </div>

                {/* Explaining WHY (Organizational Impact) */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-300">Why this matters in your organization: </span>
                    <span className="text-slate-300">{item.explanation}</span>
                  </div>
                </div>

                {/* Action shortcut */}
                {isCritical && (
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-400">
                      Transferred from senior playbooks by <strong>Arun Kumar</strong>
                    </span>
                    <Link
                      to="/junior/simulator"
                      className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                    >
                      <span>Practice Challenge for {item.skill}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/junior/learning-path"
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
          >
            <Route className="w-4 h-4" />
            <span>Generate Personalized Learning Path</span>
          </Link>

          <Link
            to="/junior/simulator"
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4 text-amber-400" />
            <span>Start Real-World Challenge Simulator</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
