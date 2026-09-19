import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useGamification } from '../../context/GamificationContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  PlayCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Award, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  HelpCircle, 
  RefreshCw,
  ExternalLink,
  Bot
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const ChallengeSimulator = ({ onOpenChat }) => {
  const [challenges, setChallenges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const { awardXP } = useGamification();
  const { addToast } = useNotification();

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    setLoading(true);
    try {
      const res = await api.getChallenges();
      if (res.challenges && res.challenges.length > 0) {
        setChallenges(res.challenges);
      }
    } catch (err) {
      console.warn('Failed to load challenges from API, using default:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentChallenge = challenges[currentIndex] || {
    _id: 'chal-1',
    title: 'Silent Database Update Failure in Approval Workflow',
    scenario: 'In the HR Portal, an employee submits an approval request. The web UI displays "Status Updated: Approved" and a 200 OK HTTP status. However, when the manager checks the database record later, the status column remains "PENDING".',
    question: 'As a Junior Developer assigned to triage this incident, what is the most effective first step to diagnose the issue?',
    options: [
      { id: 'A', text: 'Rebuild the React frontend UI bundle and clear browser cache.', isCorrect: false, explanation: 'The frontend already received 200 OK; the bug is downstream in backend logic.' },
      { id: 'B', text: 'Inspect backend query logs and verify the WHERE condition of the SQL UPDATE statement.', isCorrect: true, explanation: 'Correct! As documented in Arun Kumar\'s Leave Approval incident, SQL UPDATE queries with mismatched WHERE clauses (e.g. status = "DRAFT" vs "SUBMITTED") succeed without error but affect 0 rows.' },
      { id: 'C', text: 'Restart the PostgreSQL server cluster immediately.', isCorrect: false, explanation: 'Restarting the database disrupts active users without addressing the underlying query logic bug.' },
      { id: 'D', text: 'Delete and recreate the employees table schema.', isCorrect: false, explanation: 'Destructive schema modifications cause data loss and are unrelated to query parameter matching.' }
    ],
    skill: 'SQL Debugging',
    difficulty: 'Intermediate',
    xp: 50,
    sourceExperienceId: 'exp-1',
    sourceExperienceTitle: 'Leave Approval Database Issue',
    sourceExpertName: 'Arun Kumar'
  };

  const handleOptionSelect = (optId) => {
    if (submitted) return;
    setSelectedOption(optId);
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;

    try {
      const res = await api.submitChallenge(currentChallenge._id, selectedOption);
      setResult(res);
      setSubmitted(true);

      if (res.isCorrect) {
        awardXP(res.xpGained || 50, `Solved Challenge: ${currentChallenge.title}`);
        addToast('Tacit Skill Inherited!', `Transferred from ${res.sourceExperience?.author || 'Arun Kumar'}`, 'success');
      }
    } catch (err) {
      // Offline simulation fallback
      const chosenOpt = currentChallenge.options.find(o => o.id === selectedOption);
      const isCorrect = chosenOpt?.isCorrect;
      const mockResult = {
        isCorrect,
        selectedOption: chosenOpt,
        explanation: chosenOpt?.explanation,
        xpGained: isCorrect ? 50 : 0,
        sourceExperience: {
          id: currentChallenge.sourceExperienceId || 'exp-1',
          title: currentChallenge.sourceExperienceTitle || 'Leave Approval Database Issue',
          author: currentChallenge.sourceExpertName || 'Arun Kumar',
          solution: 'Corrected SQL update condition to match state machine transitions and added transactional assertion checking affectedRows > 0.',
          lessons: 'Always verify database update WHERE conditions during multi-state approval workflows, and assert affectedRows === 1 in critical transactions.'
        }
      };
      setResult(mockResult);
      setSubmitted(true);
      if (isCorrect) {
        awardXP(50, `Solved Challenge: ${currentChallenge.title}`);
      }
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setResult(null);
    setCurrentIndex((currentIndex + 1) % challenges.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Simulator Header Card */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-white">{currentChallenge.title}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {currentChallenge.skill}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Challenge {currentIndex + 1} of {challenges.length || 3} • Difficulty: {currentChallenge.difficulty} • Reward: +{currentChallenge.xp} XP
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenChat && onOpenChat('How did previous developers solve database update problems?')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <Bot className="w-4 h-4 text-brand-400" />
            <span>Ask InheritAI for Clue</span>
          </button>
        </div>

        {/* Real-World Scenario Box */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Enterprise Production Incident:
          </span>
          <p className="text-slate-200 leading-relaxed text-sm">
            "{currentChallenge.scenario}"
          </p>
        </div>

        {/* Question Prompt */}
        <div className="mt-5">
          <h4 className="text-sm font-bold text-white mb-3">
            {currentChallenge.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {currentChallenge.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let optStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';

              if (isSelected) {
                optStyle = 'bg-brand-600/20 border-brand-500 text-white font-medium ring-1 ring-brand-500';
              }

              if (submitted) {
                if (opt.isCorrect) {
                  optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 font-medium';
                } else if (isSelected && !opt.isCorrect) {
                  optStyle = 'bg-rose-950/40 border-rose-500 text-rose-100';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  disabled={submitted}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 ${optStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isSelected ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="flex-1 mt-0.5">{opt.text}</span>
                  {submitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {submitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20"
            >
              Submit Investigation Choice
            </button>
          ) : (
            <button
              onClick={handleNextChallenge}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700"
            >
              <span>Next Incident Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <span className="text-xs text-slate-400">
            {submitted && (result?.isCorrect ? '✅ Investigation Verified (+50 XP)' : '❌ Incorrect choice. Review expert solution below.')}
          </span>
        </div>

        {/* Post-Submission Result & Expert Link */}
        {submitted && result && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-brand-500/40 animate-fade-in space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Investigation Explanation</h4>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${result.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {result.isCorrect ? 'Correct Decision' : 'Incorrect Step'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {result.explanation}
            </p>

            {/* Tacit Knowledge Inheritance Bridge */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300">
                  Similar problem was previously solved by <strong className="text-white">{result.sourceExperience?.author || 'Arun Kumar'}</strong>
                </span>
              </div>

              <button
                onClick={() => setShowExpertModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 transition shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learn From Expert Solution</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expert Solution Modal */}
      <Modal
        isOpen={showExpertModal}
        onClose={() => setShowExpertModal(false)}
        title="Inherited Senior Engineer Playbook"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">{result?.sourceExperience?.title || 'Leave Approval Database Issue'}</p>
              <p className="text-slate-400">Documented by: {result?.sourceExperience?.author || 'Arun Kumar'}</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              Verified Fix
            </span>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 uppercase tracking-wider mb-1">Expert Solution Applied:</h5>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
              {result?.sourceExperience?.solution || 'Found incorrect SQL update condition (WHERE status = "DRAFT" instead of "SUBMITTED") and fixed it to match state transitions.'}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 uppercase tracking-wider mb-1">Organizational Lesson:</h5>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
              {result?.sourceExperience?.lessons || 'Always verify database update conditions during approval workflows and assert affectedRows === 1.'}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setShowExpertModal(false)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs"
            >
              I Understand & Inherited
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
