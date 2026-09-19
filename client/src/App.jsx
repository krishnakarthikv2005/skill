import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { GamificationProvider } from './context/GamificationContext';

import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DemoGuideBanner } from './components/common/DemoGuideBanner';
import { InheritAIChat } from './components/chat/InheritAIChat';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SeniorDashboard } from './pages/SeniorDashboard';
import { JuniorDashboard } from './pages/JuniorDashboard';
import { ExperienceCapture } from './pages/ExperienceCapture';
import { KnowledgeUpload } from './pages/KnowledgeUpload';
import { KnowledgeEngine } from './pages/KnowledgeEngine';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { MentorMatchingPage } from './pages/MentorMatchingPage';
import { KnowledgeSearchPage } from './pages/KnowledgeSearchPage';
import { KnowledgeDecayPage } from './pages/KnowledgeDecayPage';
import { TimelinePage } from './pages/TimelinePage';
import { ProfilePage } from './pages/ProfilePage';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#060b17] flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 5-Minute Hackathon Demo Bar */}
      <DemoGuideBanner />

      {/* Main Navbar */}
      <Navbar />

      {/* Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-16">
          {children}
        </main>
      </div>

      {/* Floating InheritAI Chatbot Widget */}
      <InheritAIChat />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <GamificationProvider>
          <Router>
            <AppLayout>
              <Routes>
                {/* Public & Landing */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Senior / Mentor Routes */}
                <Route path="/senior/dashboard" element={<SeniorDashboard />} />
                <Route path="/senior/capture" element={<ExperienceCapture />} />
                <Route path="/senior/upload" element={<KnowledgeUpload />} />

                {/* Junior / Learner Routes */}
                <Route path="/junior/dashboard" element={<JuniorDashboard />} />
                <Route path="/junior/skill-gap" element={<SkillGapPage />} />
                <Route path="/junior/learning-path" element={<LearningPathPage />} />
                <Route path="/junior/simulator" element={<SimulatorPage />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Universal Organizational Intelligence Routes */}
                <Route path="/knowledge-engine" element={<KnowledgeEngine />} />
                <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
                <Route path="/mentors" element={<MentorMatchingPage />} />
                <Route path="/search" element={<KnowledgeSearchPage />} />
                <Route path="/knowledge-decay" element={<KnowledgeDecayPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </Router>
        </GamificationProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
