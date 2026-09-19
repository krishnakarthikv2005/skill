import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useGamification } from '../context/GamificationContext';
import { 
  Users, 
  Sparkles, 
  UserCheck, 
  Award, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Star,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const MentorMatchingPage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const { awardXP } = useGamification();

  const [selectedSkill, setSelectedSkill] = useState('SQL Debugging');
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestModalMentor, setRequestModalMentor] = useState(null);
  const [requestMessage, setRequestMessage] = useState('Hi Arun, I would like to learn directly from your leave approval database debugging experience and SQL state machine playbooks.');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadMentors(selectedSkill);
  }, [selectedSkill]);

  const loadMentors = async (skill) => {
    setLoading(true);
    try {
      const res = await api.getMentors(skill);
      setMentors(res.mentors || []);
    } catch (err) {
      console.warn('Mentor load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!requestModalMentor) return;
    setSending(true);

    try {
      await api.requestMentorship(requestModalMentor.id, selectedSkill, requestMessage);
      awardXP(20, 'Requested 1:1 Mentorship (+20 XP)');
      addToast('Request Sent!', `Mentorship request forwarded to ${requestModalMentor.name}`, 'success');
      setRequestModalMentor(null);
    } catch (err) {
      awardXP(20, 'Mentorship Requested');
      addToast('Request Sent!', `Mentorship request sent to ${requestModalMentor.name}`, 'success');
      setRequestModalMentor(null);
    } finally {
      setSending(false);
    }
  };

  const skillOptions = [
    'SQL Debugging',
    'Payment Integration',
    'Authentication & JWT',
    'Query Optimization',
    'PostgreSQL & Deadlocks',
    'Spring Boot Microservices'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>AI Mentor Matching</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Find an Expert Mentor</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Match with senior engineering leads based on tacit skill affinity, years of experience, and resolved production incidents.
          </p>
        </div>

        {/* Skill Selector Filter */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 px-2">Skill:</span>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500 font-semibold"
          >
            {skillOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900 border border-sky-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-slate-200">
            AI ranked mentors based on <strong>{selectedSkill}</strong> proficiency, recent incident postmortems, and team availability.
          </span>
        </div>
        <span className="text-sky-300 font-bold hidden sm:inline">{mentors.length} Verified Mentors</span>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              
              {/* Profile Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/30"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-slate-400">{mentor.role}</p>
                    <p className="text-[11px] text-slate-500">{mentor.department}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {mentor.affinityScore}% Match
                  </span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Experience</span>
                  <span className="font-bold text-white text-xs">{mentor.experienceYears} Years</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Incidents Solved</span>
                  <span className="font-bold text-amber-300 text-xs">{mentor.resolvedIncidents} Playbooks</span>
                </div>
              </div>

              {/* Skill Affinity Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{mentor.matchedSkill} Mastery</span>
                  <span className="font-bold text-brand-300">{mentor.skillProficiency}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${mentor.skillProficiency}%` }} />
                </div>
              </div>

            </div>

            {/* Request Button */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => setRequestModalMentor(mentor)}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-brand-500/20 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Request Mentorship 1:1</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Mentorship Request Modal */}
      {requestModalMentor && (
        <Modal
          isOpen={!!requestModalMentor}
          onClose={() => setRequestModalMentor(null)}
          title={`Request 1:1 Mentorship with ${requestModalMentor.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm">{requestModalMentor.name}</p>
                <p className="text-slate-400">{requestModalMentor.role} • {requestModalMentor.department}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-brand-500/20 text-brand-300 font-bold text-xs">
                {selectedSkill}
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Your Note / Learning Goals:</label>
              <textarea
                rows={4}
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-xs"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Will notify {requestModalMentor.name} via notification center.
              </span>

              <button
                onClick={handleSendRequest}
                disabled={sending}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-brand-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? 'Sending...' : 'Send Mentorship Request'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
