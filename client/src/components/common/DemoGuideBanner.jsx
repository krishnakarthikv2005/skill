import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  UserCheck, 
  Brain, 
  Compass, 
  Cpu, 
  ShieldCheck, 
  Flame,
  X
} from 'lucide-react';

const DEMO_STEPS = [
  {
    step: 1,
    title: '1. Login as Senior (Arun Kumar)',
    desc: 'Switch to experienced senior engineer persona.',
    role: 'senior',
    route: '/senior/dashboard'
  },
  {
    step: 2,
    title: '2. Share Tacit Experience',
    desc: 'Senior captures "Leave Approval Database Issue". Live AI extracts SQL & Debugging.',
    role: 'senior',
    route: '/senior/capture'
  },
  {
    step: 3,
    title: '3. Ingest Enterprise Document',
    desc: 'Upload technical runbook and observe multi-step AI skill extraction.',
    role: 'senior',
    route: '/senior/upload'
  },
  {
    step: 4,
    title: '4. Login as Junior (Kumar)',
    desc: 'Switch to junior learner persona with SQL at 45% and Debugging at 40%.',
    role: 'junior',
    route: '/junior/dashboard'
  },
  {
    step: 5,
    title: '5. AI Skill Gap Intelligence',
    desc: 'See how AI identifies critical gap with real-world incident reasoning.',
    role: 'junior',
    route: '/junior/skill-gap'
  },
  {
    step: 6,
    title: '6. Personalized 7-Day Roadmap',
    desc: 'Explore generated day-by-day learning milestones with XP.',
    role: 'junior',
    route: '/junior/learning-path'
  },
  {
    step: 7,
    title: '7. Real-World Workplace Simulator',
    desc: 'Attempt the leave approval challenge without standard multiple choice fluff.',
    role: 'junior',
    route: '/junior/simulator'
  },
  {
    step: 8,
    title: '8. Ask InheritAI Knowledge Bot',
    desc: 'Query bot to see it retrieve & cite Arun Kumar\'s documented postmortem.',
    role: 'junior',
    route: '/junior/simulator?chat=open'
  },
  {
    step: 9,
    title: '9. Solve & Inherit Skill (+50 XP)',
    desc: 'Submit correct answer, unlock expert solution, boost SQL score.',
    role: 'junior',
    route: '/junior/simulator'
  },
  {
    step: 10,
    title: '10. Interactive Skill Knowledge Graph',
    desc: 'Inspect connected nodes, experts, and organizational incident dependencies.',
    role: 'junior',
    route: '/knowledge-graph'
  },
  {
    step: 11,
    title: '11. Find a Mentor (AI Matching)',
    desc: 'Match with Arun Kumar based on skill similarity and request 1:1 handover.',
    role: 'junior',
    route: '/mentors'
  },
  {
    step: 12,
    title: '12. Skill Inheritance Timeline',
    desc: 'Visualize knowledge lineage from 2022 Senior learning to 2026 Junior mastery.',
    role: 'junior',
    route: '/timeline'
  },
  {
    step: 13,
    title: '13. Knowledge Decay Monitor',
    desc: 'Detect outdated legacy payment SDKs and trigger expert reviews.',
    role: 'admin',
    route: '/knowledge-decay'
  },
  {
    step: 14,
    title: '14. Admin Critical Knowledge Risk',
    desc: 'Admin views single-point-of-failure skills and verified knowledge transfers.',
    role: 'admin',
    route: '/admin/dashboard'
  }
];

export const DemoGuideBanner = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { user, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  if (isDismissed) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleExecuteStep = async (stepObj, index) => {
    setCurrentStepIndex(index);
    if (user?.role !== stepObj.role) {
      await quickDemoLogin(stepObj.role);
    }
    navigate(stepObj.route);
  };

  const handleNext = () => {
    const nextIdx = (currentStepIndex + 1) % DEMO_STEPS.length;
    handleExecuteStep(DEMO_STEPS[nextIdx], nextIdx);
  };

  return (
    <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border-b border-brand-500/30 text-xs px-4 py-2.5 transition-all shadow-lg z-30 sticky top-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Indicator & Story */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/40">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>5-MIN DEMO TOUR</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200 truncate">
            <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Step {currentStep.step} of 14
            </span>
            <span className="font-medium text-brand-200 hidden sm:inline">{currentStep.title}:</span>
            <span className="text-slate-300 truncate">{currentStep.desc}</span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => handleExecuteStep(currentStep, currentStepIndex)}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg font-medium transition shadow-md hover:shadow-brand-500/20 whitespace-nowrap"
          >
            <span>Jump to Step {currentStep.step}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg transition border border-slate-700 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white px-2 py-1.5 rounded hover:bg-slate-800 transition"
            title="View all 14 steps"
          >
            {isExpanded ? 'Collapse' : 'All Steps (14)'}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-500 hover:text-slate-300 p-1 rounded"
            title="Hide Demo Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Accordion of all 14 Demo Steps */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                handleExecuteStep(s, idx);
                setIsExpanded(false);
              }}
              className={`p-2 rounded-lg text-left transition border ${
                idx === currentStepIndex
                  ? 'bg-brand-500/20 border-brand-500 text-white font-medium'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[11px] text-brand-300">Step {s.step}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${
                  s.role === 'senior' ? 'bg-amber-500/20 text-amber-300' :
                  s.role === 'junior' ? 'bg-emerald-500/20 text-emerald-300' :
                  'bg-purple-500/20 text-purple-300'
                }`}>
                  {s.role}
                </span>
              </div>
              <p className="text-[11px] line-clamp-2 leading-tight">{s.title.replace(/^\d+\.\s*/, '')}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
