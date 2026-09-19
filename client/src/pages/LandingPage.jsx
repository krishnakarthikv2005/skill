import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Network, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  BrainCircuit, 
  Layers, 
  GraduationCap, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  PlayCircle, 
  Zap, 
  Users, 
  ShieldAlert, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const LandingPage = () => {
  const { quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoLaunch = async (role = 'junior') => {
    await quickDemoLogin(role);
    if (role === 'junior') navigate('/junior/dashboard');
    else if (role === 'senior') navigate('/senior/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060b17] text-slate-100 overflow-x-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glowing backdrop orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Vision Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-6 animate-pulse-slow">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Next-Gen Enterprise Knowledge Transfer Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Turn Experience Into <br className="hidden sm:inline" />
          <span className="text-gradient">Inherited Skills</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Capture expert knowledge, discover skill gaps, and help the next generation learn directly from real-world experience.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleDemoLaunch('junior')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 hover:scale-105 transition-all duration-200"
          >
            <span>Explore Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Animated Visual Pipeline Flow */}
        <div className="mt-16 max-w-5xl mx-auto p-6 sm:p-8 glass-panel rounded-3xl border border-brand-500/30 relative">
          <div className="text-left mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Tacit Knowledge Transfer Pipeline</span>
              <h3 className="text-lg font-bold font-display text-white">How Tacit Experience Becomes Junior Mastery</h3>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live AI Model Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1: Senior Experience */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-left relative group hover:border-amber-400 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase">Stage 01</span>
              <h4 className="font-bold text-sm text-white mt-0.5">Senior Experience</h4>
              <p className="text-xs text-slate-400 mt-1">
                Captures real incident postmortems, root causes & architectural decisions.
              </p>
              <div className="mt-3 text-[11px] text-amber-300 font-medium">e.g. Arun Kumar (8 yrs)</div>
            </div>

            {/* Step 2: AI Knowledge Extraction */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-brand-500/30 text-left relative group hover:border-brand-400 transition">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-3">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-brand-400 uppercase">Stage 02</span>
              <h4 className="font-bold text-sm text-white mt-0.5">AI Knowledge Engine</h4>
              <p className="text-xs text-slate-400 mt-1">
                Extracts skills, problem patterns & solutions with 94%+ confidence.
              </p>
              <div className="mt-3 text-[11px] text-brand-300 font-medium">Auto Taxonomy Ingestion</div>
            </div>

            {/* Step 3: Skill Graph */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 text-left relative group hover:border-sky-400 transition">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-sky-400 uppercase">Stage 03</span>
              <h4 className="font-bold text-sm text-white mt-0.5">Skill Knowledge Graph</h4>
              <p className="text-xs text-slate-400 mt-1">
                Connects skills to experts, risk metrics & real organizational bugs.
              </p>
              <div className="mt-3 text-[11px] text-sky-300 font-medium">Interactive Graph Model</div>
            </div>

            {/* Step 4: Junior Growth */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-left relative group hover:border-emerald-400 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 04</span>
              <h4 className="font-bold text-sm text-white mt-0.5">Junior Growth & Practice</h4>
              <p className="text-xs text-slate-400 mt-1">
                Closes gaps via personalized roadmaps & real workplace simulations.
              </p>
              <div className="mt-3 text-[11px] text-emerald-300 font-medium">Kumar (Junior Trainee)</div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Skill Inheritance? (The Differentiator) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">The Core Problem We Solve</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
            Why Generic LMS Fails Enterprise Engineering
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Online courses teach syntax. Real engineers solve organizational edge cases, silent database bugs, and payment idempotency race conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Critical Knowledge Risk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When senior developers leave or rotate, years of tacit troubleshooting knowledge disappear. We index single-point-of-failure expertise into active graphs.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <PlayCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Real-World Problem Simulators</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instead of generic multiple-choice quizzes, learners troubleshoot realistic production tickets and unlock the exact fix applied by internal mentors.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">InheritAI Knowledge Bot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI assistant that cites verified organizational incident postmortems, providing exact source citations and senior playbooks on demand.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Deep Dive Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Enterprise Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2">
            Built For High-Velocity Engineering Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">AI Skill Gap Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compares junior capabilities against senior benchmarks and explains <em>why</em> specific skills matter based on real organizational incidents.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-sky-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Interactive Skill Graph</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualizes organizational dependencies, single points of failure, verified solutions, and active enrolled trainees in real time.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Knowledge Decay Monitor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitors documentation age and flags outdated libraries (e.g. legacy Stripe SDKs) so organizational knowledge never goes stale.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">AI Mentor Matching</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matches junior developers to senior mentors based on skill gap vectors, resolved incident histories, and team bandwidth.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">XP & Skill Gamification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn XP for sharing tacit knowledge, solving workplace challenges, and mentoring juniors with milestone level badges.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Executive Risk Radar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Admin visibility into critical knowledge vulnerabilities, single experts, and verified skills transferred across departments.
            </p>
          </div>

        </div>
      </section>

      {/* Quick Launch Demo Personas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 text-center">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
          Experience The 5-Minute Hackathon Demo
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-xl mx-auto">
          Choose a role to enter the live interactive environment instantly with realistic pre-seeded data:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <button
            onClick={() => handleDemoLaunch('senior')}
            className="p-5 rounded-2xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/40 text-left transition group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-300">Senior Persona</span>
              <UserCheck className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-bold text-white text-sm">Arun Kumar</h4>
            <p className="text-xs text-slate-400 mt-1">Backend Lead (8 yrs exp) • Share incidents & upload runbooks.</p>
          </button>

          <button
            onClick={() => handleDemoLaunch('junior')}
            className="p-5 rounded-2xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/40 text-left transition group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300">Junior Persona</span>
              <GraduationCap className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-bold text-white text-sm">Kumar</h4>
            <p className="text-xs text-slate-400 mt-1">Trainee (1 yr exp) • Gap analysis, simulation challenges & roadmap.</p>
          </button>

          <button
            onClick={() => handleDemoLaunch('admin')}
            className="p-5 rounded-2xl bg-purple-950/20 hover:bg-purple-950/40 border border-purple-500/40 text-left transition group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-300">Admin Persona</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="font-bold text-white text-sm">Sophia Vance</h4>
            <p className="text-xs text-slate-400 mt-1">VP of Engineering • Critical knowledge risk & transfer analytics.</p>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-brand-400" />
            <span className="font-bold text-slate-300">Skill Inheritance AI</span>
            <span>• Organizational Knowledge Transfer Platform</span>
          </div>
          <p>© 2026 Skill Inheritance AI. Built with React, Node.js & AI Knowledge Engine.</p>
        </div>
      </footer>

    </div>
  );
};
