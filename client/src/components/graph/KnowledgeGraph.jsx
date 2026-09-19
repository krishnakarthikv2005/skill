import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  UserCheck, 
  AlertTriangle, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_GRAPH_NODES = [
  { id: 'Java', label: 'Java', category: 'Backend', x: 180, y: 120, level: 95, experts: ['Arun Kumar'], learners: 14, risk: 'Low', problems: ['JVM Thread Starvation', 'Memory Leak in Stream Filter'], solutions: ['Configured Virtual Threads', 'Used try-with-resources'] },
  { id: 'Spring Boot', label: 'Spring Boot', category: 'Backend', x: 340, y: 120, level: 92, experts: ['Arun Kumar', 'Priya Sharma'], learners: 11, risk: 'Low', problems: ['Circular Bean Dependency', 'Actuator Metrics Leak'], solutions: ['Refactored to Lazy Injection', 'Restricted security endpoints'] },
  { id: 'REST API', label: 'REST API', category: 'API', x: 500, y: 140, level: 90, experts: ['Arun Kumar', 'Priya Sharma'], learners: 15, risk: 'Low', problems: ['Gateway 504 Timeout', 'Payload Size Mismatch'], solutions: ['Added Redis Response Caching', 'Configured gzip compression'] },
  { id: 'Authentication', label: 'Authentication', category: 'Security', x: 660, y: 120, level: 94, experts: ['Priya Sharma'], learners: 9, risk: 'Medium', problems: ['Expired JWT 403 instead of 401', 'CORS preflight filter dropped'], solutions: ['Custom AuthenticationEntryPoint', 'CorsFilter priority beans'] },
  { id: 'Payment Integration', label: 'Payment Integration', category: 'Architecture', x: 680, y: 260, level: 88, experts: ['Arun Kumar (Single Expert)'], learners: 8, risk: 'Critical', problems: ['Duplicate charges on webhook retry', 'Stripe raw body signature failure'], solutions: ['Redis distributed locks & idempotency keys', 'Raw body interceptor'] },
  { id: 'Debugging', label: 'Debugging', category: 'Core', x: 500, y: 300, level: 96, experts: ['Arun Kumar', 'David Chen', 'Priya Sharma'], learners: 22, risk: 'Medium', problems: ['Silent 0-row database update', 'Deadlock in transaction block'], solutions: ['Validated SQL WHERE clauses', 'Acquired row locks in primary key order'] },
  { id: 'SQL', label: 'SQL', category: 'Database', x: 180, y: 340, level: 94, experts: ['Arun Kumar', 'David Chen'], learners: 18, risk: 'Low', problems: ['Stale approval status WHERE clause', 'Missing index on composite foreign keys'], solutions: ['Corrected status transition logic', 'Added B-Tree index on (org_id, status)'] },
  { id: 'Database', label: 'Database', category: 'Database', x: 340, y: 340, level: 90, experts: ['Arun Kumar', 'David Chen'], learners: 16, risk: 'Low', problems: ['Connection pool starvation in peak hours', 'Replication lag in follower instances'], solutions: ['Tuned HikariCP maximumPoolSize to 30', 'Routed read-only reporting queries to replicas'] },
  { id: 'Query Optimization', label: 'Query Optimization', category: 'Database', x: 340, y: 460, level: 95, experts: ['David Chen'], learners: 12, risk: 'High', problems: ['Sequential scan on 40M row audit logs', 'Autovacuum lock contention'], solutions: ['Partitioned tables by month', 'Tuned vacuum cost limit parameter'] },
  { id: 'PostgreSQL', label: 'PostgreSQL', category: 'Database', x: 180, y: 460, level: 98, experts: ['David Chen'], learners: 10, risk: 'Medium', problems: ['Deadlock detected ERROR 40P01', 'Shared buffer churn'], solutions: ['Deterministic ORDER BY item_id ASC lock acquisition', 'Optimized work_mem'] },
  { id: 'Redis', label: 'Redis', category: 'Database', x: 820, y: 260, level: 92, experts: ['David Chen'], learners: 7, risk: 'Medium', problems: ['Cache avalanche on midnight TTL expiration', 'Keyspace notification dropped'], solutions: ['Added random jitter to TTL duration', 'Configured persistent pubsub buffer'] },
  { id: 'Security', label: 'Security', category: 'Security', x: 820, y: 120, level: 96, experts: ['Priya Sharma'], learners: 6, risk: 'Low', problems: ['SSO Session Desynchronization', 'Privilege Escalation in Role Masking'], solutions: ['Stateless JWT verification', 'Strict RBAC security expression evaluators'] }
];

const DEFAULT_GRAPH_EDGES = [
  { source: 'Java', target: 'Spring Boot', label: 'Framework' },
  { source: 'Spring Boot', target: 'REST API', label: 'Exposes' },
  { source: 'REST API', target: 'Authentication', label: 'Protected By' },
  { source: 'Authentication', target: 'Security', label: 'Sub-Domain' },
  { source: 'REST API', target: 'Debugging', label: 'Diagnosed Via' },
  { source: 'REST API', target: 'Payment Integration', label: 'Gateway Endpoint' },
  { source: 'Payment Integration', target: 'Redis', label: 'Distributed Locking' },
  { source: 'Payment Integration', target: 'SQL', label: 'Idempotency Keys' },
  { source: 'SQL', target: 'Database', label: 'Core Engine' },
  { source: 'SQL', target: 'PostgreSQL', label: 'Implementation' },
  { source: 'PostgreSQL', target: 'Query Optimization', label: 'Performance' },
  { source: 'Database', target: 'Query Optimization', label: 'Tuning' },
  { source: 'Query Optimization', target: 'Debugging', label: 'Deadlock Fix' },
  { source: 'SQL', target: 'Debugging', label: 'Where Clause Bug' }
];

export const KnowledgeGraph = ({ interactive = true, height = 'h-[620px]' }) => {
  const [nodes, setNodes] = useState(DEFAULT_GRAPH_NODES);
  const [edges, setEdges] = useState(DEFAULT_GRAPH_EDGES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally fetch live updated graph from API
    api.getKnowledgeGraph()
      .then(res => {
        if (res.nodes && res.edges) {
          // Merge coordinates
          const mergedNodes = res.nodes.map(n => {
            const fallback = DEFAULT_GRAPH_NODES.find(d => d.id === n.id);
            return {
              ...fallback,
              ...n,
              x: fallback?.x || Math.random() * 600 + 100,
              y: fallback?.y || Math.random() * 400 + 80
            };
          });
          setNodes(mergedNodes);
          setEdges(res.edges);
        }
      })
      .catch(() => {});
  }, []);

  const filteredNodes = nodes.filter(n => {
    const matchesCategory = filterCategory === 'ALL' || n.category.toUpperCase() === filterCategory.toUpperCase();
    const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.2)', text: 'text-rose-400', badge: 'bg-rose-500/20 border-rose-500/40 text-rose-300' };
      case 'High': return { stroke: '#f97316', fill: 'rgba(249, 115, 22, 0.2)', text: 'text-orange-400', badge: 'bg-orange-500/20 border-orange-500/40 text-orange-300' };
      case 'Medium': return { stroke: '#eab308', fill: 'rgba(234, 179, 8, 0.2)', text: 'text-amber-400', badge: 'bg-amber-500/20 border-amber-500/40 text-amber-300' };
      default: return { stroke: '#6366f1', fill: 'rgba(99, 102, 241, 0.2)', text: 'text-brand-400', badge: 'bg-brand-500/20 border-brand-500/40 text-brand-300' };
    }
  };

  return (
    <div className={`relative w-full ${height} glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col`}>
      
      {/* Top Controls Bar */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-display text-white">Interactive Skill Knowledge Graph</h3>
            <p className="text-[11px] text-slate-400">Click any skill node to inspect experts, incidents, and learning assets</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search node (e.g. SQL, Payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Categories</option>
            <option value="BACKEND">Backend</option>
            <option value="DATABASE">Database</option>
            <option value="API">API</option>
            <option value="SECURITY">Security</option>
            <option value="ARCHITECTURE">Architecture</option>
            <option value="CORE">Core</option>
          </select>

          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.7))}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Graph Area */}
      <div className="flex-1 relative overflow-hidden bg-[#060b17] select-none cursor-crosshair">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px]" />

        <svg
          viewBox="0 0 1000 580"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Edges */}
          {edges.map((edge, idx) => {
            const src = nodes.find(n => n.id === edge.source);
            const tgt = nodes.find(n => n.id === edge.target);
            if (!src || !tgt) return null;

            const isHighlighted = selectedNode && (selectedNode.id === src.id || selectedNode.id === tgt.id);

            return (
              <g key={idx}>
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isHighlighted ? '#818cf8' : '#334155'}
                  strokeWidth={isHighlighted ? '2.5' : '1.5'}
                  strokeDasharray={isHighlighted ? 'none' : '4 2'}
                  markerEnd="url(#arrow)"
                  className="transition-all duration-300"
                />
                {edge.label && (
                  <text
                    x={(src.x + tgt.x) / 2}
                    y={(src.y + tgt.y) / 2 - 6}
                    fill="#64748b"
                    fontSize="9"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {filteredNodes.map((node) => {
            const riskConfig = getRiskColor(node.risk);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Node Outer Halo */}
                <circle
                  r={isSelected ? 38 : 30}
                  fill={riskConfig.fill}
                  stroke={riskConfig.stroke}
                  strokeWidth={isSelected ? 3 : 1.5}
                  filter={isSelected ? "url(#glow)" : undefined}
                  className="transition-all duration-300 group-hover:scale-110"
                />

                {/* Center Core */}
                <circle
                  r={8}
                  fill={riskConfig.stroke}
                  className="animate-pulse"
                />

                {/* Node Label */}
                <text
                  y={46}
                  fill="#f8fafc"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-display drop-shadow-md"
                >
                  {node.label}
                </text>

                {/* Category Subtitle */}
                <text
                  y={58}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {node.category} • {node.level}%
                </text>

                {/* Critical Risk Warning Beacon */}
                {node.risk === 'Critical' && (
                  <g transform="translate(18, -18)">
                    <circle r="8" fill="#ef4444" />
                    <text y="3.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">!</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-[11px] space-y-1.5 pointer-events-none">
          <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Knowledge Risk Legend</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-300">Critical (1 Expert / SPoF)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-300">Medium (2-3 Experts)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <span className="text-slate-300">Low (Distributed Mastery)</span>
          </div>
        </div>

      </div>

      {/* Node Detail Inspection Drawer */}
      {selectedNode && (
        <div className="absolute right-0 top-16 bottom-0 w-80 sm:w-96 glass-panel border-l border-slate-700/80 p-5 overflow-y-auto z-20 shadow-2xl animate-fade-in flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold font-display text-white">{selectedNode.label}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRiskColor(selectedNode.risk).badge}`}>
                    {selectedNode.risk} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedNode.category} Domain • {selectedNode.level}% Org Proficiency</p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Experts with this skill */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <UserCheck className="w-3.5 h-3.5 text-brand-400" />
                Organizational Experts
              </h5>
              <div className="space-y-1.5">
                {selectedNode.experts.map((exp, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{exp}</span>
                    <button
                      onClick={() => navigate('/mentors')}
                      className="text-[10px] font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30"
                    >
                      Request 1:1
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Documented Problems */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Documented Production Problems
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedNode.problems?.map((p, i) => (
                  <li key={i} className="p-2 rounded-xl bg-amber-950/20 border border-amber-500/30">
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documented Solutions */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Inherited Solutions & Playbooks
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedNode.solutions?.map((s, i) => (
                  <li key={i} className="p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Active Learners */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span className="text-slate-300">Active Learners Enrolled:</span>
              </div>
              <span className="font-bold text-white">{selectedNode.learners} engineers</span>
            </div>
          </div>

          {/* Action footer */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => navigate('/junior/simulator')}
              className="w-full py-2.5 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-brand-500/20 transition"
            >
              <span>Practice Real-World Challenge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
