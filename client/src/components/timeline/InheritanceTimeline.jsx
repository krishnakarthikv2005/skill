import React from 'react';
import { 
  History, 
  Sparkles, 
  UserCheck, 
  BrainCircuit, 
  GraduationCap, 
  CheckCircle2, 
  ArrowDown, 
  Award,
  Layers,
  FileCode2
} from 'lucide-react';

const TIMELINE_STEPS = [
  {
    year: '2022',
    stage: 'Senior Mastery',
    title: 'Senior Engineer Learned SQL Debugging & High Concurrency',
    actor: 'Arun Kumar (Senior Backend Engineer)',
    desc: 'Mastered PostgreSQL transaction isolations, deadlocks, and connection pooling under heavy production load.',
    icon: UserCheck,
    color: 'amber',
    badge: 'Experience Acquired'
  },
  {
    year: '2023',
    stage: 'Incident Resolution',
    title: 'Solved 12 Critical Production Incidents',
    actor: 'Arun Kumar & Engineering Guild',
    desc: 'Diagnosed silent leave approval failures, payment webhook idempotency race conditions, and Spring Security token bugs.',
    icon: Award,
    color: 'rose',
    badge: 'Problems Solved'
  },
  {
    year: '2024',
    stage: 'Tacit Knowledge Capture',
    title: 'Documented Root Cause & Playbooks in Org Portal',
    actor: 'Internal Runbook System',
    desc: 'Recorded step-by-step investigations, affectedRows SQL checks, and distributed Redis locking patterns.',
    icon: FileCode2,
    color: 'sky',
    badge: 'Documented'
  },
  {
    year: '2025',
    stage: 'AI Knowledge Extraction',
    title: 'AI Extracted Taxonomy, Problem Graph & Simulations',
    actor: 'Skill Inheritance AI Engine',
    desc: 'Automatically parsed experiences into interactive Skill Graph nodes, gap analysis vectors, and workplace simulation challenges with 96% confidence.',
    icon: BrainCircuit,
    color: 'purple',
    badge: 'AI Extracted'
  },
  {
    year: '2026',
    stage: 'Skill Inheritance',
    title: 'Junior Developer Inherited Real-World Capability',
    actor: 'Kumar (Junior Trainee)',
    desc: 'Practiced the realistic leave approval simulation, consulted InheritAI for Arun\'s solution, and boosted SQL & Debugging skill from 45% to 75% without trial-and-error in production.',
    icon: GraduationCap,
    color: 'emerald',
    badge: 'Skill Inherited'
  }
];

export const InheritanceTimeline = () => {
  const getColorStyles = (color) => {
    switch (color) {
      case 'amber': return { dot: 'bg-amber-500 ring-amber-500/30', border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300' };
      case 'rose': return { dot: 'bg-rose-500 ring-rose-500/30', border: 'border-rose-500/40', badge: 'bg-rose-500/20 text-rose-300' };
      case 'sky': return { dot: 'bg-sky-500 ring-sky-500/30', border: 'border-sky-500/40', badge: 'bg-sky-500/20 text-sky-300' };
      case 'purple': return { dot: 'bg-purple-500 ring-purple-500/30', border: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-300' };
      case 'emerald': return { dot: 'bg-emerald-500 ring-emerald-500/30', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300' };
      default: return { dot: 'bg-brand-500 ring-brand-500/30', border: 'border-brand-500/40', badge: 'bg-brand-500/20 text-brand-300' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
          <History className="w-3.5 h-3.5" />
          <span>Tacit Knowledge Lineage</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Skill Inheritance Timeline
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Tracing how real-world experience travels from a Senior Engineer into documentation, AI extraction, and active Junior mastery.
        </p>
      </div>

      {/* Visual Pipeline Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-300">
        <div className="flex items-center gap-2 text-amber-300">
          <UserCheck className="w-4 h-4" />
          <span>Senior Experience</span>
        </div>
        <ArrowDown className="w-4 h-4 text-slate-500 rotate-[-90deg] hidden md:block" />
        <div className="flex items-center gap-2 text-sky-300">
          <FileCode2 className="w-4 h-4" />
          <span>Documentation</span>
        </div>
        <ArrowDown className="w-4 h-4 text-slate-500 rotate-[-90deg] hidden md:block" />
        <div className="flex items-center gap-2 text-purple-300">
          <BrainCircuit className="w-4 h-4" />
          <span>AI Engine</span>
        </div>
        <ArrowDown className="w-4 h-4 text-slate-500 rotate-[-90deg] hidden md:block" />
        <div className="flex items-center gap-2 text-emerald-300">
          <GraduationCap className="w-4 h-4" />
          <span>Junior Growth</span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-purple-500 before:to-emerald-500">
        {TIMELINE_STEPS.map((step, idx) => {
          const styles = getColorStyles(step.color);
          const Icon = step.icon;

          return (
            <div key={idx} className="relative group">
              {/* Timeline node circle */}
              <div className={`absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full ${styles.dot} ring-4 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-125`}>
                <span className="text-[10px] font-black">{idx + 1}</span>
              </div>

              {/* Timeline Card */}
              <div className={`glass-card p-5 rounded-2xl border ${styles.border} transition duration-200`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display font-black text-lg text-white">{step.year}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">• {step.stage}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${styles.badge} self-start sm:self-auto`}>
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2.5">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
                  <Icon className="w-3.5 h-3.5 text-slate-300" />
                  <span>Key Stakeholder: <strong className="text-slate-200">{step.actor}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
