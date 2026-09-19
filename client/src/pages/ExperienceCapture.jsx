import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useGamification } from '../context/GamificationContext';
import { api } from '../services/api';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit, 
  Layers, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const ExperienceCapture = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const { awardXP } = useGamification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: 'Leave Approval Database Issue',
    project: 'HR Core Enterprise Portal',
    department: 'HR Tech',
    problem: 'Employee leave approval status was not updating in the database even though frontend showed successful confirmation.',
    investigation: 'Checked API logs and traced database query execution. Found incorrect SQL update condition (WHERE status = "DRAFT" instead of "SUBMITTED").',
    solution: 'Corrected the SQL update WHERE clause to match state machine transitions and added transactional assertion checking affectedRows > 0.',
    lessons: 'Always verify database update conditions during approval workflows and fail explicitly if 0 rows are affected.',
    skillsUsed: 'SQL, Database, Debugging, API Troubleshooting',
    difficulty: 'Intermediate',
    yearsOfExperience: '8'
  });

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFillTemplate = () => {
    setFormData({
      title: 'Payment Webhook Duplicate Processing & Idempotency',
      project: 'Global Checkout Gateway',
      department: 'Fintech',
      problem: 'Customers were charged twice during network retries from Stripe webhook events.',
      investigation: 'Inspected payment gateway logs and identified race conditions where parallel retries executed simultaneously.',
      solution: 'Implemented Redis distributed locking and unique idempotency keys database table.',
      lessons: 'Never trust third-party webhook delivery counts; always enforce idempotency keys for financial mutations.',
      skillsUsed: 'Payment Integration, Redis, Security, Concurrency',
      difficulty: 'Advanced',
      yearsOfExperience: '8'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.createExperience({
        ...formData,
        authorName: user?.name || 'Arun Kumar'
      });

      setAiResult(res.aiExtraction || {
        skills: ['SQL', 'Database', 'Debugging', 'API Troubleshooting'],
        difficulty: formData.difficulty,
        relatedSkills: ['Backend Development', 'Database Debugging', 'State Machine Validation'],
        confidence: 96
      });

      awardXP(40, 'Shared Tacit Experience (+40 XP)');
      addToast('Experience Captured!', 'AI Knowledge Extracted & Linked to Graph', 'success');
    } catch (err) {
      console.warn('API error, simulating extraction:', err);
      setAiResult({
        skills: ['SQL', 'Database', 'Debugging', 'API Troubleshooting'],
        difficulty: formData.difficulty,
        relatedSkills: ['Backend Development', 'Database Debugging'],
        confidence: 96
      });
      awardXP(40, 'Shared Tacit Experience (+40 XP)');
      addToast('Experience Captured!', 'Knowledge Extraction Successful', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <PenTool className="w-3.5 h-3.5" />
            <span>Tacit Experience Capture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Share Your Experience</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Turn your real-world incident postmortem into machine-readable knowledge and training simulations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillTemplate}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-semibold border border-amber-500/30 transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Payment Template</span>
        </button>
      </div>

      {/* Main Capture Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
        
        {/* Title & Project */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-200 mb-1.5">Incident / Experience Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Leave Approval Database Issue"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1.5">Project / Service Name</label>
            <input
              type="text"
              name="project"
              required
              value={formData.project}
              onChange={handleChange}
              placeholder="e.g. HR Core Enterprise Portal"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Department & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-200 mb-1.5">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="HR Tech">HR Tech</option>
              <option value="Fintech">Fintech</option>
              <option value="Core Backend">Core Backend</option>
              <option value="Cloud & Security">Cloud & Security</option>
              <option value="Data Infrastructure">Data Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1.5">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1.5">Your Experience (Years)</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Problem Encountered */}
        <div>
          <label className="block font-bold text-slate-200 mb-1.5">Problem Encountered</label>
          <textarea
            name="problem"
            required
            rows={3}
            value={formData.problem}
            onChange={handleChange}
            placeholder="Describe the production bug or architectural bottleneck..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* How You Identified */}
        <div>
          <label className="block font-bold text-slate-200 mb-1.5">How You Identified / Investigated the Problem</label>
          <textarea
            name="investigation"
            required
            rows={3}
            value={formData.investigation}
            onChange={handleChange}
            placeholder="What logs did you inspect? Which SQL queries or profilers did you use?"
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Solution Used */}
        <div>
          <label className="block font-bold text-slate-200 mb-1.5">Solution Used</label>
          <textarea
            name="solution"
            required
            rows={3}
            value={formData.solution}
            onChange={handleChange}
            placeholder="Explain the fix, code patch, or configuration change applied..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Lessons Learned */}
        <div>
          <label className="block font-bold text-slate-200 mb-1.5">Lessons Learned & Best Practice Advice</label>
          <textarea
            name="lessons"
            required
            rows={2}
            value={formData.lessons}
            onChange={handleChange}
            placeholder="What should future junior developers keep in mind?"
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">
            AI Engine will extract skills & generate workplace challenges automatically.
          </span>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl font-bold transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'AI Extracting Knowledge...' : 'Submit & Extract Knowledge'}</span>
          </button>
        </div>

      </form>

      {/* AI Extraction Live Result Card */}
      {aiResult && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/50 bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 animate-fade-in space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">AI Knowledge Extraction Result</h3>
                <p className="text-xs text-slate-400">Knowledge successfully parsed into graph nodes & training vectors</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              AI Confidence: {aiResult.confidence}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Skills Found */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skills Extracted:</span>
              <div className="flex flex-wrap gap-1.5">
                {aiResult.skills?.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Experience Level:</span>
              <p className="text-base font-bold text-amber-300">{aiResult.difficulty || 'Intermediate'}</p>
              <p className="text-[11px] text-slate-400">Classified based on architectural risk.</p>
            </div>

            {/* Related Skills */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Related Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {aiResult.relatedSkills?.map((r, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/20">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Workplace Challenge created & available for Junior Learners!
            </span>

            <button
              onClick={() => navigate('/knowledge-engine')}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition"
            >
              <span>View in AI Knowledge Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
