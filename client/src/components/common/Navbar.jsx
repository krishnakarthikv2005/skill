import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useGamification } from '../../context/GamificationContext';
import { 
  Network, 
  Sparkles, 
  Bell, 
  Search, 
  Shield, 
  UserCheck, 
  GraduationCap, 
  LogOut, 
  Flame, 
  Zap, 
  ChevronDown,
  BookOpen,
  HelpCircle
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, quickDemoLogin } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotification();
  const { getLevelInfo, streak } = useGamification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const levelInfo = getLevelInfo(user?.xp);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                Skill Inheritance <span className="text-xs px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">Enterprise Knowledge Transfer</p>
            </div>
          </Link>

          {/* Quick 1-Click Role Switcher */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 px-2">Role:</span>
            
            <button
              onClick={() => {
                quickDemoLogin('senior');
                navigate('/senior/dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                user?.role === 'senior' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Switch to Senior Arun Kumar"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Senior (Arun)</span>
            </button>

            <button
              onClick={() => {
                quickDemoLogin('junior');
                navigate('/junior/dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                user?.role === 'junior' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Switch to Junior Kumar"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Junior (Kumar)</span>
            </button>

            <button
              onClick={() => {
                quickDemoLogin('admin');
                navigate('/admin/dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                user?.role === 'admin' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Switch to Admin Sophia"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search experiences, SQL, bugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
          />
        </form>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">

          {/* Gamification Streak & XP Badge */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold" title="4-Day Learning Streak">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{streak}d</span>
              </div>
              <div className="h-3.5 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
                <span className="text-xs font-bold text-brand-200">{user.xp || 480} XP</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-semibold uppercase">
                  {levelInfo.level}
                </span>
              </div>
            </div>
          )}

          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-dark-950 animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl p-4 border border-slate-700/80 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white">Activity & Alerts</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500 text-white font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-slate-800/50 max-h-72 overflow-y-auto mt-2 -mr-1 pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2.5 px-1.5 rounded-lg transition ${
                        n.read ? 'opacity-70 hover:opacity-100' : 'bg-brand-500/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/80 transition"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                />
                <div className="text-left hidden xl:block">
                  <p className="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[120px]">{user.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl p-2 border border-slate-700/80 z-50">
                  <div className="p-2 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold capitalize">
                        {user.role}
                      </span>
                      <span className="text-[10px] text-slate-400">{user.department}</span>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full p-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <span>My Profile & Radar</span>
                  </Link>

                  <Link
                    to="/timeline"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full p-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <span>Skill Lineage Timeline</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/');
                    }}
                    className="flex items-center gap-2 w-full p-2 text-xs font-medium text-rose-400 hover:bg-rose-950/40 rounded-lg transition mt-1 border-t border-slate-800/80"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-md shadow-brand-600/20"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
