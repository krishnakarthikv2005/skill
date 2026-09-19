import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useGamification } from '../context/GamificationContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Route, 
  Sparkles, 
  CheckCircle2, 
  PlayCircle, 
  Clock, 
  Zap, 
  Bot, 
  ArrowRight, 
  Award, 
  BookOpen, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';
import { InheritAIChat } from '../components/chat/InheritAIChat';

export const LearningPathPage = () => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChatPrompt, setActiveChatPrompt] = useState(null);
  const { awardXP } = useGamification();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    loadPath();
  }, []);

  const loadPath = async () => {
    try {
      const res = await api.getLearningPath();
      setLearningPath(res.learningPath);
    } catch (err) {
      console.warn('Learning path load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTaskStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await api.updateTaskStatus(task.id, newStatus);
      if (newStatus === 'completed') {
        awardXP(task.xp || 25, `Completed: ${task.title}`);
        addToast('Task Finished!', `+${task.xp} XP added to your engineering profile`, 'success');
      }

      setLearningPath(prev => {
        if (!prev) return prev;
        const updatedTasks = prev.tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t);
        const completed = updatedTasks.filter(t => t.status === 'completed').length;
        return {
          ...prev,
          tasks: updatedTasks,
          progress: Math.round((completed / updatedTasks.length) * 100)
        };
      });
    } catch (err) {
      // Offline toggle
      if (newStatus === 'completed') {
        awardXP(task.xp || 25, `Completed: ${task.title}`);
      }
      setLearningPath(prev => {
        if (!prev) return prev;
        const updatedTasks = prev.tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t);
        const completed = updatedTasks.filter(t => t.status === 'completed').length;
        return {
          ...prev,
          tasks: updatedTasks,
          progress: Math.round((completed / updatedTasks.length) * 100)
        };
      });
    }
  };

  const path = learningPath || {
    targetRole: 'Backend Developer',
    progress: 28,
    tasks: [
      { id: 'task-d1', day: 1, title: 'SQL Fundamentals & Relational State Machines', skill: 'SQL', description: 'Review table schemas, status constraints, and transaction lifecycles in the HR Tech service.', difficulty: 'Beginner', estimatedTime: '45 mins', xp: 20, status: 'completed', sourceExperienceTitle: 'HR Core Portal' },
      { id: 'task-d2', day: 2, title: 'SQL Debugging & Stale WHERE Conditions', skill: 'Debugging', description: 'Learn how to detect 0-row updates and trace PostgreSQL query logs from Arun Kumar\'s leave approval incident.', difficulty: 'Intermediate', estimatedTime: '60 mins', xp: 30, status: 'completed', sourceExperienceTitle: 'Leave Approval Database Issue' },
      { id: 'task-d3', day: 3, title: 'REST API Error Handling & Status Codes', skill: 'REST API', description: 'Understand 401 Unauthorized vs 403 Forbidden and implement RFC7807 problem details.', difficulty: 'Intermediate', estimatedTime: '50 mins', xp: 25, status: 'in_progress', sourceExperienceTitle: 'Employee Authentication Token Expiry Bug' },
      { id: 'task-d4', day: 4, title: 'Workplace Challenge: Database State Mismatch', skill: 'SQL Debugging', description: 'Simulate a bug where leave approval status fails to update despite frontend 200 response.', difficulty: 'Intermediate', estimatedTime: '40 mins', xp: 50, status: 'pending', challengeId: 'chal-1', sourceExperienceTitle: 'Leave Approval Database Issue' },
      { id: 'task-d5', day: 5, title: 'Real-world Simulation: Payment Gateway Idempotency', skill: 'Payment Integration', description: 'Diagnose duplicate webhook race conditions using Redis distributed locks.', difficulty: 'Advanced', estimatedTime: '75 mins', xp: 60, status: 'pending', challengeId: 'chal-2', sourceExperienceTitle: 'Payment Webhook Duplicate Processing' },
      { id: 'task-d6', day: 6, title: 'Senior Mentor Review with Arun Kumar', skill: 'Architecture Review', description: 'Pair with Arun Kumar to review your transactional SQL update patterns and error handling.', difficulty: 'Intermediate', estimatedTime: '45 mins', xp: 40, status: 'pending', sourceExperienceTitle: 'Mentor 1:1 Handover' },
      { id: 'task-d7', day: 7, title: 'Comprehensive Backend Skill Assessment', skill: 'Full Backend Mastery', description: 'Final evaluation covering SQL query safety, token pipelines, and payment idempotency.', difficulty: 'Advanced', estimatedTime: '60 mins', xp: 75, status: 'pending', sourceExperienceTitle: 'Organizational Skill Mastery' }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Roadmap Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
              <Route className="w-3.5 h-3.5" />
              <span>Personalized Learning Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Goal: Become {path.targetRole}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              A 7-day targeted sprint generated by AI to eliminate your SQL, Debugging, and Payment Integration knowledge gaps.
            </p>
          </div>

          {/* Progress Circle & Counter */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Roadmap Progress</span>
              <p className="text-2xl font-bold font-display text-emerald-400">{path.progress}% Complete</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-white">
              {path.tasks.filter(t => t.status === 'completed').length}/7
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Interactive Task Milestones */}
      <div className="space-y-4">
        {path.tasks.map((task) => {
          const isDone = task.status === 'completed';
          const isInProgress = task.status === 'in_progress';

          return (
            <div
              key={task.id || task.day}
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 glass-card ${
                isDone 
                  ? 'bg-slate-900/60 border-emerald-500/30 opacity-90'
                  : isInProgress
                  ? 'bg-brand-950/20 border-brand-500/60 shadow-lg shadow-brand-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Day Badge & Content */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-display font-black text-sm flex-shrink-0 ${
                    isDone 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isInProgress
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    <span className="text-[9px] uppercase tracking-wider font-bold">DAY</span>
                    <span>0{task.day}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-base font-bold font-display ${isDone ? 'text-slate-300 line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {task.skill}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        +{task.xp} XP
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {task.estimatedTime}
                      </span>
                      <span>Difficulty: <strong className="text-slate-300">{task.difficulty}</strong></span>
                      {task.sourceExperienceTitle && (
                        <span className="text-amber-400/90 font-medium">
                          📚 Source: {task.sourceExperienceTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                  
                  {/* Ask AI Mentor Button */}
                  <button
                    onClick={() => setActiveChatPrompt(`Can you explain the key concepts for Day ${task.day}: ${task.title} based on our organization's documented playbooks?`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
                    title="Ask InheritAI for mentorship"
                  >
                    <Bot className="w-3.5 h-3.5 text-brand-400" />
                    <span>Ask AI Mentor</span>
                  </button>

                  {/* If Challenge link */}
                  {task.challengeId ? (
                    <button
                      onClick={() => navigate('/junior/simulator')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Start Simulation</span>
                    </button>
                  ) : null}

                  {/* Complete Toggle */}
                  <button
                    onClick={() => handleToggleTaskStatus(task)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                      isDone
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-950/60'
                        : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Completed ✓' : 'Mark Complete'}</span>
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Floating or Pop-up InheritAI for Learning Roadmap */}
      {activeChatPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl">
            <InheritAIChat
              embedded={true}
              initialQuery={activeChatPrompt}
            />
            <div className="text-center mt-3">
              <button
                onClick={() => setActiveChatPrompt(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close AI Mentor Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
