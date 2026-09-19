import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'New Skill Gap Detected',
      message: 'AI identified a 35% gap in SQL & Debugging compared to Senior Backend standards.',
      time: '10m ago',
      read: false,
      type: 'gap'
    },
    {
      id: 'n-2',
      title: 'Your SQL Learning Path is Ready',
      message: '7-Day Personalized Roadmap generated based on Arun Kumar\'s incident playbooks.',
      time: '1h ago',
      read: false,
      type: 'path'
    },
    {
      id: 'n-3',
      title: 'Arun Kumar Shared a New Debugging Experience',
      message: '"Leave Approval Database Issue" added to organizational knowledge graph.',
      time: '3h ago',
      read: true,
      type: 'experience'
    },
    {
      id: 'n-4',
      title: 'Knowledge Asset Requires Review',
      message: 'Payment API Integration Guide (v1) flagged for potential decay.',
      time: '1d ago',
      read: true,
      type: 'decay'
    }
  ]);

  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'info', duration = 4000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      unreadCount,
      addToast,
      removeToast,
      markAsRead,
      markAllAsRead
    }}>
      {children}
      
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100'
                : toast.type === 'xp'
                ? 'bg-indigo-950/90 border-brand-500/50 text-indigo-100 ring-2 ring-brand-500/30'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-100'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-100'
                : 'bg-slate-900/90 border-slate-700 text-slate-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-1.5">
                  {toast.type === 'xp' && '⚡ +XP GAINED! '}
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-300/90 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
