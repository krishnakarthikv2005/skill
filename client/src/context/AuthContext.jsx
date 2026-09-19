import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken, getCurrentStoredUser, setCurrentStoredUser } from '../services/api';

const AuthContext = createContext();

const DEMO_ACCOUNTS = {
  admin: {
    email: 'admin@company.com',
    role: 'admin',
    name: 'Sophia Vance (VP of Engineering)'
  },
  senior: {
    email: 'arun@company.com',
    role: 'senior',
    name: 'Arun Kumar (Senior Backend Engineer)'
  },
  junior: {
    email: 'kumar@company.com',
    role: 'junior',
    name: 'Kumar (Software Engineer Trainee)'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentStoredUser() || {
    id: 'user-junior-kumar',
    name: 'Kumar',
    email: 'kumar@company.com',
    role: 'junior',
    department: 'Core Backend',
    experienceYears: 1,
    targetRole: 'Backend Developer',
    skills: [
      { name: 'Java', level: 75, category: 'Backend' },
      { name: 'SQL', level: 45, category: 'Database' },
      { name: 'Debugging', level: 40, category: 'Core' },
      { name: 'REST API', level: 60, category: 'API' },
      { name: 'Payment Integration', level: 20, category: 'Architecture' }
    ],
    xp: 480,
    level: 'Explorer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  });

  const [token, setToken] = useState(() => getAuthToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentStoredUser(user);
    }
  }, [user]);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password, role });
      setToken(res.token);
      setAuthToken(res.token);
      setUser(res.user);
      return res;
    } catch (err) {
      console.warn('API login error, using local fallback:', err);
      // Fallback demo user
      const demoRole = role || (email.includes('admin') ? 'admin' : email.includes('arun') ? 'senior' : 'junior');
      const fallbackUser = demoRole === 'admin' 
        ? {
            id: 'user-admin-sophia',
            name: 'Sophia Vance',
            email: 'admin@company.com',
            role: 'admin',
            department: 'Engineering Leadership',
            experienceYears: 14,
            targetRole: 'VP of Engineering',
            xp: 7200,
            level: 'Master',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          }
        : demoRole === 'senior'
        ? {
            id: 'user-senior-arun',
            name: 'Arun Kumar',
            email: 'arun@company.com',
            role: 'senior',
            department: 'Core Backend',
            experienceYears: 8,
            targetRole: 'Principal Backend Architect',
            xp: 3450,
            level: 'Expert',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          }
        : {
            id: 'user-junior-kumar',
            name: 'Kumar',
            email: 'kumar@company.com',
            role: 'junior',
            department: 'Core Backend',
            experienceYears: 1,
            targetRole: 'Backend Developer',
            xp: 480,
            level: 'Explorer',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
          };
      
      setUser(fallbackUser);
      return { user: fallbackUser };
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = async (role) => {
    const acc = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.junior;
    return await login(acc.email, 'password123', role);
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      setToken(res.token);
      setAuthToken(res.token);
      setUser(res.user);
      return res;
    } catch (err) {
      console.warn('API register error, falling back:', err);
      const fallback = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'junior',
        department: userData.department || 'Engineering',
        experienceYears: Number(userData.experienceYears) || 1,
        targetRole: userData.targetRole || 'Backend Developer',
        xp: 150,
        level: 'Beginner',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
      };
      setUser(fallback);
      return { user: fallback };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeAuthToken();
    localStorage.removeItem('skill_ai_user');
  };

  const updateUserXP = (gainedXp) => {
    setUser(prev => {
      if (!prev) return prev;
      const newXp = (prev.xp || 0) + gainedXp;
      let newLevel = prev.level;
      if (newXp >= 1000) newLevel = 'Problem Solver';
      else if (newXp >= 600) newLevel = 'Practitioner';
      else if (newXp >= 300) newLevel = 'Explorer';

      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      quickDemoLogin,
      register,
      logout,
      updateUserXP,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
