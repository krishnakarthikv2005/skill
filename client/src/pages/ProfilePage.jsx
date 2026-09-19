import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { 
  User, 
  Award, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Flame, 
  Zap, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  History,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { streak, getLevelInfo } = useGamification();

  const levelInfo = getLevelInfo(user?.xp || 480);

  const radarData = user?.role === 'senior' ? [
    { skill: 'Java', value: 95, fullMark: 100 },
    { skill: 'SQL', value: 94, fullMark: 100 },
    { skill: 'Debugging', value: 96, fullMark: 100 },
    { skill: 'REST API', value: 90, fullMark: 100 },
    { skill: 'Architecture', value: 92, fullMark: 100 },
    { skill: 'Mentorship', value: 95, fullMark: 100 }
  ] : [
    { skill: 'Java', value: 80, fullMark: 100 },
    { skill: 'SQL', value: 45, fullMark: 100 },
    { skill: 'Debugging', value: 40, fullMark: 100 },
    { skill: 'REST API', value: 65, fullMark: 100 },
    { skill: 'Architecture', value: 35, fullMark: 100 },
    { skill: 'Problem Solving', value: 60, fullMark: 100 }
  ];

  const achievements = [
    { title: 'First Incident Triage', desc: 'Diagnosed Leave Approval SQL bug', icon: CheckCircle2, date: 'Unlocked Today', xp: '+50 XP' },
    { title: 'Knowledge Inheritor', desc: 'Transferred 2 tacit playbooks from Arun Kumar', icon: Sparkles, date: 'Unlocked Yesterday', xp: '+80 XP' },
    { title: '4-Day Streak', desc: 'Consistent engineering problem practice', icon: Flame, date: 'Active Streak', xp: '+100 XP' },
    { title: 'Tacit Contributor', desc: 'Reviewed internal technical runbook', icon: BookOpen, date: 'Unlocked', xp: '+40 XP' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Profile Header Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-brand-500/30 shadow-2xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">{user?.name || 'Kumar'}</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 capitalize border border-brand-500/30">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{user?.targetRole || 'Backend Developer'} • {user?.department || 'Core Engineering'}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user?.experienceYears || 1} Year Experience • {user?.email}</p>
            </div>
          </div>

          {/* Gamification Level Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Current Tier</span>
            <p className="text-xl font-bold font-display text-amber-400">{levelInfo.level}</p>
            <div className="mt-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-xs font-bold text-white">{user?.xp || 480} XP Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart & Core Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">Skill Radar Proficiency</h3>
              <p className="text-xs text-slate-400">Holistic capability mapping across organizational domains</p>
            </div>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#cbd5e1" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" />
                <Radar name="Proficiency" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Knowledge & Mentorship History */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold font-display text-white">Tacit Skill Achievements</h3>
            <span className="text-xs font-bold text-emerald-400">4 Badges Earned</span>
          </div>

          <div className="space-y-3">
            {achievements.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{ach.title}</h4>
                      <p className="text-[11px] text-slate-400">{ach.desc}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-amber-400 font-bold block">{ach.xp}</span>
                    <span className="text-[10px] text-slate-500">{ach.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
