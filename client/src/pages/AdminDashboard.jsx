import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatCard } from '../components/common/StatCard';
import { 
  ShieldAlert, 
  Users, 
  BrainCircuit, 
  BookOpen, 
  Layers, 
  Route, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await api.getAdminAnalytics();
      setAnalytics(res);
    } catch (err) {
      console.warn('Admin analytics load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = analytics?.stats || {
    totalEmployees: 42,
    totalExperts: 11,
    totalKnowledgeAssets: 17,
    totalSkillsCaptured: 8,
    activeLearningPaths: 19,
    knowledgeGapsIdentified: 7,
    totalTransferredCount: 98
  };

  const criticalRiskSkills = analytics?.criticalRiskSkills || [
    {
      skill: 'Payment Integration',
      category: 'Fintech',
      expertCount: 1,
      primaryExpert: 'Arun Kumar',
      riskLevel: 'Critical',
      riskReason: 'Only 1 expert currently has deep tacit knowledge in this area. High single-point-of-failure risk.',
      activeLearners: 8,
      transferProgress: 45
    },
    {
      skill: 'Legacy System Debugging',
      category: 'Core Engineering',
      expertCount: 2,
      primaryExpert: 'David Chen, Priya Sharma',
      riskLevel: 'High',
      riskReason: 'Legacy order pipelines known by 2 engineers nearing rotation.',
      activeLearners: 5,
      transferProgress: 60
    },
    {
      skill: 'Query Optimization & Vacuum Locks',
      category: 'Data Infrastructure',
      expertCount: 2,
      primaryExpert: 'David Chen',
      riskLevel: 'Medium',
      riskReason: 'High database load requires specialized vacuum mitigation playbooks.',
      activeLearners: 12,
      transferProgress: 75
    },
    {
      skill: 'SQL & Database Debugging',
      category: 'Backend',
      expertCount: 12,
      primaryExpert: 'Arun Kumar, Guild Leads',
      riskLevel: 'Low',
      riskReason: 'Healthy transfer rate; 14 junior engineers currently enrolled in real-world simulations.',
      activeLearners: 18,
      transferProgress: 88
    }
  ];

  const skillDistribution = analytics?.skillDistribution || [
    { name: 'Backend (Java/Spring)', value: 35, color: '#6366f1' },
    { name: 'Database & SQL', value: 25, color: '#3b82f6' },
    { name: 'Security & Auth', value: 18, color: '#10b981' },
    { name: 'Fintech / Payment', value: 12, color: '#f59e0b' },
    { name: 'DevOps / Cloud', value: 10, color: '#8b5cf6' }
  ];

  const knowledgeContributionByDepartment = analytics?.knowledgeContributionByDepartment || [
    { department: 'HR Tech', contributions: 8, transferred: 45 },
    { department: 'Fintech Gateway', contributions: 12, transferred: 88 },
    { department: 'Cloud & Security', contributions: 7, transferred: 34 },
    { department: 'Data Infrastructure', contributions: 15, transferred: 92 },
    { department: 'Frontend Platform', contributions: 6, transferred: 28 }
  ];

  const learningProgressData = analytics?.learningProgressData || [
    { week: 'Week 1', completedChallenges: 12, xpEarned: 1400, skillsInherited: 4 },
    { week: 'Week 2', completedChallenges: 19, xpEarned: 2200, skillsInherited: 7 },
    { week: 'Week 3', completedChallenges: 28, xpEarned: 3500, skillsInherited: 12 },
    { week: 'Week 4', completedChallenges: 44, xpEarned: 5800, skillsInherited: 21 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Engineering Leadership & Knowledge Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Executive Knowledge Risk Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Monitor organizational tacit knowledge transfer, mitigate single-point-of-failure expertise risks, and track junior learning velocity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/knowledge-graph"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Inspect Skill Graph</span>
            </Link>

            <Link
              to="/knowledge-decay"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold transition border border-slate-700"
            >
              <span>Decay Monitor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metric Cards (6 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Total Experts"
          value={stats.totalExperts}
          icon={BrainCircuit}
          color="emerald"
        />
        <StatCard
          title="Knowledge Assets"
          value={stats.totalKnowledgeAssets}
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Skills Captured"
          value={stats.totalSkillsCaptured}
          icon={Layers}
          color="cyan"
        />
        <StatCard
          title="Active Paths"
          value={stats.activeLearningPaths}
          icon={Route}
          color="amber"
        />
        <StatCard
          title="Knowledge Gaps"
          value={stats.knowledgeGapsIdentified}
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Critical Knowledge Risk Section (Highlighted Focus Area) */}
      <div id="risk-radar" className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/40 bg-gradient-to-r from-slate-900 via-rose-950/10 to-slate-900 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Critical Knowledge Risk Radar</h3>
              <p className="text-xs text-slate-400">Identifies skills that could be permanently lost if senior experts leave or rotate</p>
            </div>
          </div>
          <span className="text-xs text-rose-400 font-bold px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/30 hidden sm:inline">
            1 Critical SPoF Detected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalRiskSkills.map((item, idx) => {
            const isCritical = item.riskLevel === 'Critical';
            const isHigh = item.riskLevel === 'High';

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition ${
                  isCritical 
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-950/30' 
                    : isHigh
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-display">{item.skill}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        isCritical ? 'bg-rose-500 text-white' :
                        isHigh ? 'bg-amber-500 text-slate-950' :
                        'bg-brand-500/20 text-brand-300'
                      }`}>
                        {item.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Domain: {item.category}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">
                      {item.expertCount} Expert{item.expertCount > 1 ? 's' : ''}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[120px] block">
                      {item.primaryExpert}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-rose-300 block mb-0.5">Risk Reason:</span>
                  "{item.riskReason}"
                </div>

                {/* Mitigation Transfer Progress */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Active Learners: <strong className="text-white">{item.activeLearners} enrolled</strong>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {item.transferProgress}% Transferred
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Knowledge Contribution & Transferred Count by Department */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold font-display text-white">Knowledge Contribution vs Transferred by Dept</h3>
              <p className="text-xs text-slate-400">Tacit incidents contributed vs juniors who solved them</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={knowledgeContributionByDepartment} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="contributions" fill="#6366f1" name="Documented Incidents" radius={[4, 4, 0, 0]} />
                <Bar dataKey="transferred" fill="#10b981" name="Learners Mastered" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Learning Progress Trend over time */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold font-display text-white">Organizational Skill Inheritance Velocity</h3>
              <p className="text-xs text-slate-400">Completed workplace challenges & skills inherited per week</p>
            </div>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningProgressData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="completedChallenges" stroke="#38bdf8" fillOpacity={1} fill="url(#colorXp)" name="Challenges Solved" />
                <Area type="monotone" dataKey="skillsInherited" stroke="#10b981" fill="#10b981" name="Skills Inherited" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
