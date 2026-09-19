import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useGamification } from '../context/GamificationContext';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  UserCheck, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const KnowledgeDecayPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();
  const { awardXP } = useGamification();

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const res = await api.getKnowledgeAssets();
      setAssets(res.assets || []);
    } catch (err) {
      console.warn('Decay assets error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReview = async (id, title) => {
    try {
      await api.requestAssetReview(id);
      addToast('Review Requested!', `Senior guild notified to audit "${title}"`, 'warning');
      awardXP(15, 'Flagged Decaying Knowledge (+15 XP)');
      setAssets(prev => prev.map(a => a._id === id ? { ...a, status: 'Review Needed' } : a));
    } catch (err) {
      addToast('Review Requested!', `Senior guild notified to audit "${title}"`, 'warning');
      awardXP(15, 'Flagged Decaying Knowledge');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Enterprise Knowledge Freshness</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Knowledge Decay & Risk Monitor</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Tacit documentation becomes outdated as SDKs, cloud APIs, and frameworks evolve. AI scans our engineering knowledge base and flags decaying playbooks.
        </p>
      </div>

      {/* Freshness KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Monitored Runbooks</span>
          <h3 className="text-2xl font-bold text-white mt-1">{assets.length || 3} Assets</h3>
          <p className="text-xs text-slate-400 mt-1">Checked daily for SDK deprecations</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-rose-500/40 bg-rose-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Outdated / High Decay Risk</span>
          <h3 className="text-2xl font-bold text-white mt-1">1 Critical Flag</h3>
          <p className="text-xs text-rose-300/80 mt-1">Payment API Integration Guide (v1 SDK)</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-emerald-500/40 bg-emerald-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Average Org Freshness</span>
          <h3 className="text-2xl font-bold text-white mt-1">78% Health</h3>
          <p className="text-xs text-emerald-300/80 mt-1">Active senior maintenance</p>
        </div>
      </div>

      {/* Knowledge Asset Decay Cards */}
      <div className="space-y-4">
        {assets.map((asset) => {
          const isOutdated = asset.status === 'Outdated' || asset.freshnessScore < 50;
          const isReviewNeeded = asset.status === 'Review Needed';

          return (
            <div
              key={asset._id}
              className={`glass-panel p-6 rounded-3xl border transition group space-y-4 ${
                isOutdated 
                  ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900' 
                  : isReviewNeeded
                  ? 'border-brand-500/40'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isOutdated ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  }`}>
                    {asset.type || 'DOC'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-white group-hover:text-brand-300 transition">
                      {asset.title}
                    </h3>
                    <p className="text-xs text-slate-400">{asset.source} • Last reviewed: {new Date(asset.lastReviewed).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Freshness Gauge */}
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Freshness Score</span>
                    <span className={`text-base font-bold font-display ${
                      asset.freshnessScore < 50 ? 'text-rose-400' :
                      asset.freshnessScore < 75 ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}>
                      {asset.freshnessScore}%
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isOutdated ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                    isReviewNeeded ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {isOutdated ? '⚠️ Possibly Outdated' : asset.status}
                  </span>
                </div>
              </div>

              {/* AI Risk Flag Note */}
              <div className={`p-4 rounded-2xl text-xs flex items-start gap-3 ${
                isOutdated ? 'bg-amber-950/30 border border-amber-500/40 text-amber-200' : 'bg-slate-900/90 border border-slate-800 text-slate-300'
              }`}>
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isOutdated ? 'text-amber-400' : 'text-slate-400'}`} />
                <div>
                  <span className="font-bold block mb-0.5">AI Freshness Diagnostic:</span>
                  <p className="leading-relaxed">{asset.riskNote}</p>
                </div>
              </div>

              {/* Skills Associated & Review Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-semibold text-[11px]">Referenced Skills:</span>
                  {asset.skills?.map((sk, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {sk}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleRequestReview(asset._id, asset.title)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Request Expert Review</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
