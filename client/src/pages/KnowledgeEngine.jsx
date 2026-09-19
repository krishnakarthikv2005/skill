import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  BrainCircuit, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  UserCheck, 
  Search, 
  Filter, 
  ShieldCheck,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const KnowledgeEngine = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [activeExpModal, setActiveExpModal] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.getExperiences();
      setExperiences(res.experiences || []);
    } catch (err) {
      console.warn('Failed to load experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = experiences.filter(exp => {
    const matchesSearch = !searchQuery || 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.solution.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill === 'ALL' || exp.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const allSkills = Array.from(new Set(experiences.flatMap(e => e.skills || [])));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Structured Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">AI Knowledge Engine</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Machine-extracted tacit engineering patterns, root cause diagnoses, and verified solutions.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search knowledge units..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Skills</option>
            {allSkills.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Structured Knowledge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((exp) => (
          <div
            key={exp._id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5 text-xs">
              
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">SKILL</span>
                    <div className="flex flex-wrap gap-1">
                      {exp.skills?.slice(0, 3).map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-bold text-[10px] border border-brand-500/30">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-brand-300 transition">
                    {exp.title}
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    AI Confidence: {exp.confidence || 94}%
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">{exp.project}</span>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  EXPERIENCE & CONTEXT
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Documented by <strong className="text-white">{exp.authorName}</strong> ({exp.authorRole || 'Senior Engineer'}) in project <em>{exp.project}</em>.
                </p>
              </div>

              {/* PROBLEM */}
              <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  PROBLEM
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {exp.problem}
                </p>
              </div>

              {/* SOLUTION */}
              <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  SOLUTION
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {exp.solution}
                </p>
              </div>

              {/* LESSON */}
              <div className="p-3 rounded-2xl bg-brand-950/30 border border-brand-500/30">
                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider block mb-1">
                  ORGANIZATIONAL LESSON
                </span>
                <p className="text-brand-100/90 leading-relaxed font-medium">
                  "{exp.lessons}"
                </p>
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Transferred to <strong className="text-emerald-400">{exp.transferredCount || 14} engineers</strong>
              </span>

              <button
                onClick={() => setActiveExpModal(exp)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
              >
                <span>View Source Experience</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Source Experience Inspection Modal */}
      {activeExpModal && (
        <Modal
          isOpen={!!activeExpModal}
          onClose={() => setActiveExpModal(null)}
          title={`Source Incident: ${activeExpModal.title}`}
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <p className="font-bold text-white text-sm">Author: {activeExpModal.authorName}</p>
                <p className="text-slate-400">{activeExpModal.department} • {activeExpModal.project}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-brand-500/20 text-brand-300">
                Difficulty: {activeExpModal.difficulty}
              </span>
            </div>

            <div>
              <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Investigation Trace:</h5>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                {activeExpModal.investigation}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Applied Code Patch / Configuration:</h5>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                {activeExpModal.solution}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Extracted Knowledge Taxonomy:</h5>
              <div className="flex flex-wrap gap-1.5">
                {activeExpModal.skills?.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-brand-500/20 text-brand-300 font-bold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
