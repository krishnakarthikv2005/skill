import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'brand', trend, badge }) => {
  const colorMap = {
    brand: 'from-brand-600/20 to-indigo-900/10 border-brand-500/30 text-brand-400',
    emerald: 'from-emerald-600/20 to-teal-900/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-600/20 to-orange-900/10 border-amber-500/30 text-amber-400',
    purple: 'from-purple-600/20 to-fuchsia-900/10 border-purple-500/30 text-purple-400',
    rose: 'from-rose-600/20 to-pink-900/10 border-rose-500/30 text-rose-400',
    cyan: 'from-cyan-600/20 to-sky-900/10 border-cyan-500/30 text-cyan-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.brand} glass-card border relative overflow-hidden group`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1.5 tracking-tight group-hover:scale-105 transition-transform duration-200">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              {trend && (
                <span className={`font-semibold ${trend.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trend.positive ? '↑' : '↓'} {trend.text}
                </span>
              )}
              <span>{subtitle}</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner group-hover:rotate-6 transition">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {badge && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">{badge.label}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge.className || 'bg-brand-500/20 text-brand-300'}`}>
            {badge.text}
          </span>
        </div>
      )}
    </div>
  );
};
