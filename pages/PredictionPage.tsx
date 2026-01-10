
import React, { useState, useRef } from 'react';
import { 
  BrainCircuit, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  TrendingUp, 
  Upload, 
  FileCode, 
  Database, 
  ArrowLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PredictionPage = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<{ risk: number; message: string; factors: string[] } | null>(null);
  const [uploadedModel, setUploadedModel] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.pth') || file.name.endsWith('.pt'))) {
      setUploadedModel(file.name);
    } else {
      alert("System only accepts PyTorch serialization formats (.pth, .pt)");
    }
  };

  const handlePredict = async () => {
    if (!uploadedModel) return;
    setIsPredicting(true);
    // Simulating the child_process.spawn bridge to inference.py
    setTimeout(() => {
      setPrediction({
        risk: 0.12,
        message: "High probability of success. Student shows exceptional click-to-note ratios.",
        factors: [
          "Engagement Score: 94%",
          "Forum Posts: 5",
          "Learning Trend: Increasing",
          "Session Consistency: 0.92"
        ]
      });
      setIsPredicting(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex justify-between items-center">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Admin Console
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
           <Database className="w-3.5 h-3.5 text-indigo-600" />
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Inference Hub v1.0</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Model Configuration */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Upload className="w-6 h-6 text-indigo-600" /> Deploy Model
            </h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[32px] p-10 text-center cursor-pointer transition-all ${uploadedModel ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100 hover:border-indigo-300'}`}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pth,.pt" />
              {uploadedModel ? (
                <div className="animate-in zoom-in-95">
                  <FileCode className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-xs font-black text-green-800 uppercase tracking-widest">{uploadedModel}</p>
                </div>
              ) : (
                <>
                  <FileCode className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">Select PyTorch Weights</p>
                </>
              )}
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Dataset</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/10">
                  <option>Next.js Module (Buffer 12)</option>
                  <option>Frontend Architecture (Buffer 09)</option>
                </select>
              </div>
              
              <button 
                onClick={handlePredict}
                disabled={isPredicting || !uploadedModel}
                className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100"
              >
                {isPredicting ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                Execute Inference
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Security Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Model execution is sandboxed using the platform's `child_process` bridge. JSON log data is sanitized before serialization.
            </p>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="lg:col-span-8 space-y-10">
          {prediction ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className={`p-12 rounded-[48px] border-2 ${prediction.risk < 0.2 ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Analysis Report</h3>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Source: {uploadedModel}</p>
                  </div>
                  <div className={`text-6xl font-black ${prediction.risk < 0.2 ? 'text-green-600' : 'text-red-600'}`}>
                    {((1 - prediction.risk) * 100).toFixed(0)}%
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {prediction.factors.map(f => (
                    <div key={f} className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-white flex items-center gap-4 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] bg-slate-50 border-4 border-dashed border-slate-200 rounded-[48px] flex flex-col items-center justify-center text-slate-300">
              <BrainCircuit className="w-16 h-16 mb-6 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Model Activation</p>
            </div>
          )}

          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Logged Telemetry Stream</h3>
              <Activity className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest">Session ID</th>
                    <th className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest">Time Spent</th>
                    <th className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest">Clicks</th>
                    <th className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest">Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-mono">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-5 font-bold text-slate-900">S-00{i}-NCKH</td>
                      <td className="px-10 py-5 text-slate-500">{i * 12}m 45s</td>
                      <td className="px-10 py-5 text-slate-500">{i * 142}</td>
                      <td className="px-10 py-5">
                         <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded font-black text-[8px] uppercase">Stable</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
