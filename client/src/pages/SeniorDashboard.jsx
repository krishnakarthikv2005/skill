import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { StatCard } from '../components/common/StatCard';
import { 
  PenTool, 
  UploadCloud, 
  PlusCircle, 
  BookOpen, 
  Sparkles, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ThumbsUp, 
  Eye, 
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export const SeniorDashboard = () => {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const res = await api.getExperiences();
      setExperiences(res.experiences || []);
    } catch (err) {
      console.warn('Error loading experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await api.likeExperience(id);
      setExperiences(prev => prev.map(e => e._id === id ? { ...e, likes: (e.likes || 0) + 1 } : e));
    } catch (err) {}
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Mentor Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Senior Engineering Guild Lead</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Welcome, {user?.name?.split(' ')[0] || 'Arun'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Your tacit troubleshooting experience is directly training the AI Knowledge Engine and empowering junior engineers across the organization.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/senior/capture"
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20"
            >
              <PenTool className="w-4 h-4" />
              <span>+ Share Experience</span>
            </Link>

            <Link
              to="/senior/upload"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700"
            >
              <UploadCloud className="w-4 h-4 text-sky-400" />
              <span>+ Upload Document</span>
            </Link>

            <Link
              to="/senior/capture"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold transition border border-amber-500/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Problem & Solution</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Senior Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Knowledge Shared"
          value={experiences.length || 4}
          subtitle="Documented incidents"
          icon={BookOpen}
          color="brand"
          trend={{ positive: true, text: '+2 this month' }}
        />
        <StatCard
          title="Skills Contributed"
          value="8 Skills"
          subtitle="SQL, Debugging, Redis, etc."
          icon={BrainCircuit}
          color="emerald"
          badge={{ text: '96% AI Confidence', label: 'Taxonomy Quality' }}
        />
        <StatCard
          title="Problems Documented"
          value="14 Incidents"
          subtitle="With verified solutions"
          icon={FileText}
          color="amber"
          badge={{ text: '0 Unresolved', label: 'Status' }}
        />
        <StatCard
          title="Learners Helped"
          value="24 Juniors"
          subtitle="Inherited your playbooks"
          icon={Users}
          color="purple"
          trend={{ positive: true, text: '+18% velocity' }}
        />
      </div>

      {/* Recent Contributions Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-bold font-display text-white">Your Recent Tacit Knowledge Contributions</h3>
          </div>
          <Link to="/knowledge-engine" className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
            <span>View in Knowledge Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-brand-500/40 transition group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition">
                      {exp.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {exp.project}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    <strong>Problem:</strong> {exp.problem}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI Confidence {exp.confidence || 95}%
                  </span>
                </div>
              </div>

              {/* Skills badges */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold">Skills:</span>
                  {exp.skills?.map((sk, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {exp.views || 45} views
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Users className="w-3.5 h-3.5" /> {exp.transferredCount || 14} transferred
                  </span>
                  <button
                    onClick={() => handleLike(exp._id)}
                    className="flex items-center gap-1 hover:text-white transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-brand-400" /> {exp.likes || 0}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
