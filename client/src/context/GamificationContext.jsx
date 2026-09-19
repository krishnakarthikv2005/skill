import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const { user, updateUserXP } = useAuth();
  const { addToast } = useNotification();
  const [streak, setStreak] = useState(4); // 4-day learning streak

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#38bdf8', '#10b981', '#f59e0b', '#ec4899']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const awardXP = (amount, reason = 'Completed Action') => {
    updateUserXP(amount);
    addToast(`+${amount} XP Earned!`, reason, 'xp');
    if (amount >= 50) {
      triggerConfetti();
    }
  };

  const getLevelInfo = (xp = user?.xp || 480) => {
    if (xp >= 3000) return { level: 'Expert', nextLevel: 'Master', minXp: 3000, nextXp: 5000, progress: Math.min(100, ((xp - 3000) / 2000) * 100) };
    if (xp >= 1000) return { level: 'Problem Solver', nextLevel: 'Expert', minXp: 1000, nextXp: 3000, progress: Math.min(100, ((xp - 1000) / 2000) * 100) };
    if (xp >= 600) return { level: 'Practitioner', nextLevel: 'Problem Solver', minXp: 600, nextXp: 1000, progress: Math.min(100, ((xp - 600) / 400) * 100) };
    if (xp >= 300) return { level: 'Explorer', nextLevel: 'Practitioner', minXp: 300, nextXp: 600, progress: Math.min(100, ((xp - 300) / 300) * 100) };
    return { level: 'Beginner', nextLevel: 'Explorer', minXp: 0, nextXp: 300, progress: Math.min(100, (xp / 300) * 100) };
  };

  return (
    <GamificationContext.Provider value={{
      streak,
      awardXP,
      triggerConfetti,
      getLevelInfo
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
