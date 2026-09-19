import React, { useState } from 'react';
import { ChallengeSimulator } from '../components/simulator/ChallengeSimulator';
import { InheritAIChat } from '../components/chat/InheritAIChat';
import { 
  PlayCircle, 
  Sparkles, 
  Bot, 
  BookOpen, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const SimulatorPage = () => {
  const [chatPrompt, setChatPrompt] = useState(null);

  const handleOpenChat = (prompt) => {
    setChatPrompt(prompt);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Real-World Problem Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Workplace Incident Challenge</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Triage actual production bugs solved by senior engineers in our company. Learn by investigating, choosing decisions, and unlocking real incident playbooks.
        </p>
      </div>

      {/* Simulator Component */}
      <ChallengeSimulator onOpenChat={handleOpenChat} />

      {/* Embedded/Modal AI Chat trigger if opened */}
      {chatPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl">
            <InheritAIChat
              embedded={true}
              initialQuery={chatPrompt}
            />
            <div className="text-center mt-3">
              <button
                onClick={() => setChatPrompt(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Return to Simulator
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
