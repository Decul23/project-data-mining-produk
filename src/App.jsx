import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Moon, Sun, Activity, Users, ShoppingCart, RefreshCw, Play, AlertTriangle, 
  CheckCircle2, ArrowRight, Database, LayoutDashboard, UploadCloud, 
  BarChart3, Settings, ShieldAlert, Zap, Search, Filter
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
    { id: 'kmeans', icon: Activity, label: 'K-Means Clustering' },
    { id: 'churn', icon: Users, label: 'Churn Prediction' },
    { id: 'apriori', icon: ShoppingCart, label: 'Market Basket' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-20 shadow-xl`}>
        <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 justify-between">
          <div className={`flex items-center gap-3 overflow-hidden ${!isSidebarOpen && 'justify-center w-full'}`}>
            <div className="min-w-8 min-h-8 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Database size={18} />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 whitespace-nowrap">
                DataPulse Pro
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {isSidebarOpen && <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">Analytics Modules</div>}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={!isSidebarOpen ? item.label : ""}
            >
              <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && <div className="ml-auto w-1.5 h-6 bg-indigo-500 rounded-full" />}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {isSidebarOpen && <span className="font-medium text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
              <LayoutDashboard size={20} />
            </button>
            <h2 className="text-xl font-bold capitalize text-slate-800 dark:text-white">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold border border-green-200 dark:border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Online
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"><Settings size={20}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'dashboard' && <DashboardModule />}
            {activeTab === 'kmeans' && <KMeansModule />}
            {activeTab === 'churn' && <ChurnModule />}
            {activeTab === 'apriori' && <AprioriModule />}
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardModule() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Datasets Processed', value: '1,248', icon: Database, color: 'from-blue-500 to-indigo-600', trend: '+12% this week' },
          { title: 'Active Models', value: '24', icon: Zap, color: 'from-emerald-400 to-emerald-600', trend: 'Optimal performance' },
          { title: 'Predictions Generated', value: '45.2K', icon: BarChart3, color: 'from-purple-500 to-pink-600', trend: '+8.4% accuracy' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform`} />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"><stat.icon size={24}/></div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
            <div className="mt-4 text-xs font-semibold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 inline-block px-2 py-1 rounded-md">{stat.trend}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><UploadCloud size={18}/> Recent Data Uploads</h4>
          <div className="space-y-3">
            {['customer_behavior_Q3.csv', 'transaction_logs_sep.json', 'product_catalog_v2.xlsx'].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg"><Database size={16}/></div>
                  <div><p className="text-sm font-semibold">{file}</p><p className="text-xs text-slate-500">Processed 2 hours ago</p></div>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded-md">Cleaned</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center">
           <ShieldAlert size={48} className="text-amber-500 mb-4" />
           <h4 className="font-bold text-xl mb-2">System Status Optimal</h4>
           <p className="text-slate-500 text-sm max-w-sm mb-6">All machine learning pipelines are running without errors. Data ingestion latency is currently under 45ms.</p>
           <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:opacity-90 transition-opacity">View Full Logs</button>
        </div>
      </div>
    </div>
  );
}

function KMeansModule() {
  const canvasRef = useRef(null);
  const [k, setK] = useState(3);
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState("Ready for initialization");
  const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9'];

  const initData = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    
    let newPoints = [];
    const centers = Array.from({length: k}, () => ({x: 100 + Math.random() * (width - 200), y: 100 + Math.random() * (height - 200)}));
    
    for (let i = 0; i < 250; i++) {
      const c = centers[i % k];
      const r = Math.abs(Math.random() + Math.random() + Math.random() - 1.5) * 80;
      const a = Math.random() * 2 * Math.PI;
      newPoints.push({
        x: Math.max(20, Math.min(width - 20, c.x + r * Math.cos(a))),
        y: Math.max(20, Math.min(height - 20, c.y + r * Math.sin(a)))
      });
    }

    const newCentroids = Array.from({length: k}, () => ({x: Math.random() * width, y: Math.random() * height}));
    setPoints(newPoints); setCentroids(newCentroids); setAssignments(new Array(250).fill(-1)); setIteration(0); setStatus("Dataset generated. Centroids randomized.");
  };

  const stepAlgo = () => {
    if (points.length === 0) return;
    if (assignments.includes(-1) || status.includes("Recalculated")) {
      let changed = false;
      const newAssignments = points.map((p, pIndex) => {
        let minD = Infinity; let best = 0;
        centroids.forEach((c, i) => {
          const d = Math.hypot(p.x - c.x, p.y - c.y);
          if (d < minD) { minD = d; best = i; }
        });
        if (assignments[pIndex] !== best) changed = true;
        return best;
      });
      setAssignments(newAssignments);
      setStatus(changed ? "Points clustered to nearest centroid." : "Converged! No points changed clusters.");
    } else {
      let sums = Array.from({length: k}, () => ({x:0, y:0, c:0}));
      points.forEach((p, i) => { sums[assignments[i]].x += p.x; sums[assignments[i]].y += p.y; sums[assignments[i]].c++; });
      const newCentroids = centroids.map((c, i) => sums[i].c > 0 ? {x: sums[i].x / sums[i].c, y: sums[i].y / sums[i].c} : c);
      setCentroids(newCentroids); setIteration(prev => prev + 1); setStatus("Centroids recalculated to cluster mean.");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges first
    points.forEach((p, i) => {
      if(assignments[i] !== -1) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(centroids[assignments[i]].x, centroids[assignments[i]].y);
        ctx.strokeStyle = `${colors[assignments[i]]}20`; // very transparent
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw points
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = assignments[i] === -1 ? '#94a3b8' : colors[assignments[i]];
      ctx.fill();
    });

    // Draw centroids
    centroids.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = colors[i];
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c.x, c.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i];
      ctx.fill();
    });
  }, [points, centroids, assignments]);

  useEffect(() => { initData(); }, [k]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Settings size={18}/> Model Parameters</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">Clusters (K)</label>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">{k}</span>
              </div>
              <input type="range" min="2" max="6" value={k} onChange={e => setK(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button onClick={initData} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <RefreshCw size={16} /> Reset
              </button>
              <button onClick={stepAlgo} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Play size={16} /> Step
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10"><Activity size={100} className="-mt-4 -mr-4"/></div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Status & Tracking</p>
          <p className="font-medium text-sm mb-4">{status}</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Iteration</p>
              <p className="text-2xl font-bold text-white">{iteration}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Points</p>
              <p className="text-2xl font-bold text-white">{points.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm relative h-[600px] flex items-center justify-center overflow-hidden">
        {points.length === 0 && <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm z-10"><span className="animate-pulse font-semibold">Generating Dataset...</span></div>}
        <canvas ref={canvasRef} width={1000} height={600} className="w-full h-full object-contain cursor-crosshair rounded-xl" />
      </div>
    </div>
  );
}

function ChurnModule() {
  const [formData, setFormData] = useState({ tenure: 12, charges: 65, contract: 'Month-to-month', support: 'No', usage: 50 });
  const [risk, setRisk] = useState({ prob: 0, category: 'Awaiting' });

  // Real-time calculation based on parameters
  useEffect(() => {
    let score = 0;
    score -= (formData.tenure / 72) * 35; // Longer tenure = lower risk
    score += (formData.charges / 150) * 30; // Higher charges = higher risk
    score += formData.contract === 'Month-to-month' ? 40 : formData.contract === 'One year' ? 10 : 0;
    score -= formData.support === 'Yes' ? 15 : 0; // Tech support lowers risk
    score += formData.usage < 30 ? 20 : 0; // Low usage = higher risk

    const finalProb = Math.max(5, Math.min(95, Math.round(score + 10))); // Base 10% risk, clamped 5-95%
    
    setRisk({
      prob: finalProb,
      category: finalProb > 70 ? 'Critical' : finalProb > 40 ? 'Moderate' : 'Safe'
    });
  }, [formData]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const getRiskColor = (prob) => prob > 70 ? 'text-red-500' : prob > 40 ? 'text-amber-500' : 'text-emerald-500';
  const getRiskBg = (prob) => prob > 70 ? 'bg-red-500' : prob > 40 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl"><Users size={24}/></div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Customer Profile Input</h3>
            <p className="text-sm text-slate-500">Adjust parameters to see real-time churn probability.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between"><label className="text-sm font-semibold">Tenure: {formData.tenure} Months</label></div>
              <input type="range" name="tenure" min="1" max="72" value={formData.tenure} onChange={handleChange} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between"><label className="text-sm font-semibold">Monthly Charges: ${formData.charges}</label></div>
              <input type="range" name="charges" min="20" max="150" value={formData.charges} onChange={handleChange} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold block">Contract Type</label>
              <select name="contract" value={formData.contract} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-medium">
                <option>Month-to-month</option><option>One year</option><option>Two year</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold block">Tech Support Enabled</label>
              <select name="support" value={formData.support} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-medium">
                <option>Yes</option><option>No</option>
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between"><label className="text-sm font-semibold">Service Usage Index: {formData.usage}%</label></div>
              <input type="range" name="usage" min="0" max="100" value={formData.usage} onChange={handleChange} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
          </div>
        </form>
      </div>
      
      <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-slate-900 text-white rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
        
        <h3 className="text-lg font-bold text-slate-300 mb-8 tracking-widest uppercase text-center">Prediction Result</h3>
        
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="112" cy="112" r="100" className="stroke-slate-800" strokeWidth="12" fill="none" />
            <circle cx="112" cy="112" r="100" className={`transition-all duration-1000 ease-out ${risk.prob > 70 ? 'stroke-red-500' : risk.prob > 40 ? 'stroke-amber-500' : 'stroke-emerald-500'}`} strokeWidth="12" fill="none" strokeDasharray="628" strokeDashoffset={628 - (628 * risk.prob) / 100} strokeLinecap="round" />
          </svg>
          <div className="text-center z-10 flex flex-col items-center">
            <span className={`text-6xl font-black tracking-tighter ${getRiskColor(risk.prob)}`}>{risk.prob}%</span>
            <span className="text-sm font-medium text-slate-400 mt-1">Churn Probability</span>
          </div>
        </div>

        <div className={`mt-2 px-6 py-2 rounded-full font-bold text-lg border ${risk.prob > 70 ? 'bg-red-500/20 border-red-500/50 text-red-400' : risk.prob > 40 ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'}`}>
          {risk.category} Risk Profile
        </div>
        
        <p className="mt-8 text-center text-sm text-slate-400 max-w-xs">
          {risk.prob > 70 ? "Immediate retention intervention recommended. Offer discounts or support." : risk.prob > 40 ? "Monitor activity closely. Consider sending an engagement email." : "Customer is highly engaged and loyal. Good candidate for upselling."}
        </p>
      </div>
    </div>
  );
}

function AprioriModule() {
  const [minSupport, setMinSupport] = useState(30);
  const [minConf, setMinConf] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');

  const rules = [
    { id: 1, ant: ['Diaper', 'Milk'], cons: ['Beer'], sup: 60, conf: 85, lift: 2.1 },
    { id: 2, ant: ['Bread', 'Butter'], cons: ['Milk'], sup: 45, conf: 66, lift: 1.5 },
    { id: 3, ant: ['Laptop'], cons: ['Mouse'], sup: 25, conf: 90, lift: 3.2 },
    { id: 4, ant: ['Smartphone'], cons: ['Screen Guard', 'Casing'], sup: 55, conf: 80, lift: 2.8 },
    { id: 5, ant: ['Eggs'], cons: ['Bread'], sup: 70, conf: 55, lift: 1.1 },
    { id: 6, ant: ['Coffee'], cons: ['Sugar', 'Milk'], sup: 40, conf: 75, lift: 1.8 },
  ];

  const filteredRules = rules.filter(r => 
    r.sup >= minSupport && 
    r.conf >= minConf &&
    (r.ant.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) || r.cons.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a,b) => b.lift - a.lift);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Filter size={18}/> Rule Constraints</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm font-semibold">Min. Support: {minSupport}%</label></div>
              <input type="range" min="10" max="100" value={minSupport} onChange={e => setMinSupport(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              <p className="text-xs text-slate-500 mt-2">Frequency of itemset in all transactions.</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm font-semibold">Min. Confidence: {minConf}%</label></div>
              <input type="range" min="10" max="100" value={minConf} onChange={e => setMinConf(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              <p className="text-xs text-slate-500 mt-2">Probability of Consequent given Antecedent.</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 p-6 text-emerald-900 dark:text-emerald-300">
          <h4 className="font-bold mb-2">Analysis Insight</h4>
          <p className="text-sm leading-relaxed">
            Found <b>{filteredRules.length}</b> strong association rules based on your criteria. High 'Lift' values (&gt; 1) indicate strong dependency between itemsets, ideal for product bundling strategies.
          </p>
        </div>
      </div>
      
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-bold text-xl flex items-center gap-2"><ShoppingCart size={22} className="text-emerald-500"/> Discovered Rules</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {filteredRules.length > 0 ? filteredRules.map(rule => (
            <div key={rule.id} className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex flex-wrap gap-2">
                  {rule.ant.map((item, i) => <span key={i} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-semibold shadow-sm">{item}</span>)}
                </div>
                <ArrowRight size={18} className="text-emerald-500 mx-1" />
                <div className="flex flex-wrap gap-2">
                  {rule.cons.map((item, i) => <span key={i} className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm font-bold shadow-sm shadow-emerald-500/20">{item}</span>)}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-700 pt-3 mt-1">
                <div><p className="text-xs text-slate-500 mb-0.5">Support</p><p className="font-bold text-slate-800 dark:text-slate-200">{rule.sup}%</p></div>
                <div><p className="text-xs text-slate-500 mb-0.5">Confidence</p><p className="font-bold text-slate-800 dark:text-slate-200">{rule.conf}%</p></div>
                <div><p className="text-xs text-slate-500 mb-0.5">Lift</p><p className="font-bold text-emerald-600 dark:text-emerald-400">{rule.lift}</p></div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-center">
              <Filter size={48} className="mb-4 opacity-20"/>
              <p className="font-medium text-lg">No rules match your criteria</p>
              <p className="text-sm">Try lowering support or confidence thresholds.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}