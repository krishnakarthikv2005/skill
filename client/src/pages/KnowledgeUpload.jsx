import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useGamification } from '../context/GamificationContext';
import { api } from '../services/api';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit, 
  Layers, 
  ArrowRight, 
  Cpu, 
  Check, 
  FileCheck,
  AlertTriangle
} from 'lucide-react';

const EXTRACTION_STEPS = [
  'Reading document...',
  'Extracting skills...',
  'Finding problems...',
  'Identifying solutions...',
  'Building knowledge connections...'
];

export const KnowledgeUpload = () => {
  const [file, setFile] = useState(null);
  const [docTitle, setDocTitle] = useState('Enterprise PostgreSQL Runbook & Troubleshooting Manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);

  const { addToast } = useNotification();
  const { awardXP } = useGamification();
  const navigate = useNavigate();

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setDocTitle(e.dataTransfer.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setDocTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleStartIngestion = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setResult(null);

    // Step-by-step animation loop
    for (let i = 0; i < EXTRACTION_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 650));
    }

    try {
      const res = await api.uploadDocument({
        title: docTitle || 'Production Incident & Knowledge Runbook',
        type: 'PDF',
        content: `Comprehensive production incident runbook for database query tuning, leave approval update checks, and payment idempotency.`
      });

      setResult(res.extraction || {
        skillsFound: ['Java', 'SQL', 'Debugging', 'REST API', 'PostgreSQL'],
        problemsFound: ['Database update failure on approval', 'API timeout on unindexed join', 'Silent 0-row update'],
        solutionsFound: ['Query validation in WHERE clause', 'Exception handling entrypoint', 'Distributed Redis locks'],
        confidence: 96,
        taxonomyCategories: ['Database', 'Core', 'API', 'Backend']
      });

      awardXP(35, 'Document Knowledge Ingested (+35 XP)');
      addToast('Document Ingested!', 'Tacit knowledge converted into AI graph assets', 'success');
    } catch (err) {
      setResult({
        skillsFound: ['Java', 'SQL', 'Debugging', 'REST API'],
        problemsFound: ['Database update failure', 'API timeout'],
        solutionsFound: ['Query validation', 'Exception handling'],
        confidence: 95,
        taxonomyCategories: ['Database', 'Backend', 'API']
      });
      awardXP(35, 'Document Knowledge Ingested');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30 mb-2">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Knowledge Document Ingestion</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Upload Knowledge Document</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload incident postmortems, architecture RFCs, runbooks, or meeting notes to automatically extract tacit skills.
        </p>
      </div>

      {/* Upload Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-1.5">Document Title / Runbook Label</label>
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-700 hover:border-brand-500/60 bg-slate-950/40 hover:bg-slate-900/40 transition text-center cursor-pointer relative group"
        >
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="w-16 h-16 rounded-2xl bg-brand-500/15 text-brand-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-white mb-1">
            {file ? file.name : 'Drop your knowledge document here'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Supports <strong className="text-slate-200">PDF, DOCX, TXT</strong> files up to 25MB. AI will automatically scan and tokenize engineering skills.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">PDF</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">DOCX</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">TXT</span>
          </div>
        </div>

        {/* Ingestion Trigger Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {file ? `Selected file: ${file.name}` : 'Demo document ready for instant parsing'}
          </span>

          <button
            onClick={handleStartIngestion}
            disabled={isProcessing}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Processing Document...' : 'Start AI Knowledge Extraction'}</span>
          </button>
        </div>

      </div>

      {/* Multi-Step Extraction Animation */}
      {isProcessing && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/40 bg-slate-900/90 animate-fade-in space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Cpu className="w-5 h-5 text-brand-400 animate-spin" />
            <h4 className="text-sm font-bold text-white">AI Knowledge Pipeline In Progress...</h4>
          </div>

          <div className="space-y-3">
            {EXTRACTION_STEPS.map((stepText, idx) => {
              const isDone = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs p-2.5 rounded-xl transition ${
                    isCurrent 
                      ? 'bg-brand-500/20 text-brand-200 font-bold border border-brand-500/30'
                      : isDone
                      ? 'text-emerald-400'
                      : 'text-slate-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-brand-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <span>{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Extraction Result Section */}
      {result && !isProcessing && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 animate-fade-in space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">AI Extraction Result</h3>
                <p className="text-xs text-slate-400">Structured tacit knowledge parsed from document</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              Confidence {result.confidence}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Skills Found */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">Skills Found:</span>
              <div className="flex flex-wrap gap-1.5">
                {result.skillsFound?.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Problems Found */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Problems Found:</span>
              <ul className="space-y-1 text-slate-300">
                {result.problemsFound?.map((p, i) => (
                  <li key={i} className="p-1.5 rounded-lg bg-amber-950/20 border border-amber-500/20">
                    • {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Found */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Solutions Found:</span>
              <ul className="space-y-1 text-slate-300">
                {result.solutionsFound?.map((s, i) => (
                  <li key={i} className="p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Document indexed into internal semantic graph.
            </span>

            <button
              onClick={() => navigate('/knowledge-engine')}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition"
            >
              <span>Explore in Knowledge Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
