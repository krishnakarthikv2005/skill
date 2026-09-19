import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  UserCheck, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const KnowledgeSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [skillFilter, setSkillFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  useEffect(() => {
    handleSearch();
  }, [skillFilter, deptFilter, difficultyFilter]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await api.getExperiences({
        search: query,
        skill: skillFilter !== 'ALL' ? skillFilter : undefined,
        department: deptFilter !== 'ALL' ? deptFilter : undefined,
      });

      let list = res.experiences || [];
      if (difficultyFilter !== 'ALL') {
        list = list.filter(item => item.difficulty === difficultyFilter);
      }
      setExperiences(list);
    } catch (err) {
      console.warn('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const sampleKeywords = ['database error', 'payment retry', 'jwt 403', 'sql deadlock', 'spring security'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>Semantic Knowledge Search</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Organizational Knowledge Search</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search documented production incidents, postmortems, and engineering playbooks across all company repositories.
        </p>
      </div>

      {/* Main Search Input & Filters Box */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords, bug symptoms, error codes (e.g. database error, Stripe webhook)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-brand-500/20"
          >
            Search
          </button>
        </form>

        {/* Quick Keyword Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-semibold">Try searching:</span>
          {sampleKeywords.map((kw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setQuery(kw); handleSearch(); }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-[11px]"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Multi-faceted Filters */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-400 mb-1">Filter by Skill:</label>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">All Skills</option>
              <option value="SQL">SQL</option>
              <option value="Database">Database</option>
              <option value="Debugging">Debugging</option>
              <option value="Payment Integration">Payment Integration</option>
              <option value="Authentication">Authentication</option>
              <option value="REST API">REST API</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-400 mb-1">Filter by Department:</label>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">All Departments</option>
              <option value="HR Tech">HR Tech</option>
              <option value="Fintech">Fintech</option>
              <option value="Cloud & Security">Cloud & Security</option>
              <option value="Data Infrastructure">Data Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-400 mb-1">Difficulty:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Found {experiences.length} Documented Organizational Incidents</span>
          <span>Ranked by semantic match score</span>
        </div>

        {experiences.map((exp, idx) => (
          <div
            key={exp._id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition group space-y-3.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-300 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold font-display text-white group-hover:text-brand-300 transition">
                  {exp.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {exp.department} • {exp.project}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {exp.difficulty}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-rose-400">Problem:</strong> {exp.problem}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Solution:</strong> {exp.solution}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-500 font-semibold text-[11px]">Skills:</span>
                {exp.skills?.map((s, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/25">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">Author: <strong className="text-white">{exp.authorName}</strong></span>
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 bg-brand-500/10 px-3 py-1 rounded-xl border border-brand-500/30 transition"
                >
                  <span>View Incident Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {selectedExp && (
        <Modal
          isOpen={!!selectedExp}
          onClose={() => setSelectedExp(null)}
          title={`Incident Playbook: ${selectedExp.title}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm">Author: {selectedExp.authorName}</p>
                <p className="text-slate-400">{selectedExp.department} • {selectedExp.project}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-brand-500/20 text-brand-300">
                Difficulty: {selectedExp.difficulty}
              </span>
            </div>

            <div>
              <h5 className="font-bold text-amber-400 uppercase tracking-wider mb-1">Investigation Details:</h5>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                {selectedExp.investigation}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-emerald-400 uppercase tracking-wider mb-1">Applied Solution:</h5>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                {selectedExp.solution}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-brand-300 uppercase tracking-wider mb-1">Organizational Lessons:</h5>
              <p className="p-3 rounded-xl bg-brand-950/30 border border-brand-500/30 text-brand-100 leading-relaxed">
                {selectedExp.lessons}
              </p>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
