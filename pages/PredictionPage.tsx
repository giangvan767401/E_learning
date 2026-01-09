
import React, { useState, useRef } from 'react';
import { 
  BrainCircuit, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Info,
  Loader2,
  TrendingUp,
  User,
  Upload,
  FileCode,
  Database,
  ArrowLeft
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
    if (file && file.name.endsWith('.pth')) {
      setUploadedModel(file.name);
    } else {
      alert("Please upload a valid PyTorch (.pth) model file.");
    }
  };

  const handlePredict = async () => {
    if (!uploadedModel) {
      alert("Please upload a .pth model first.");
      return;
    }
    setIsPredicting(true);
    setTimeout(async () => {
      const result = {
        risk: 0.15,
        message: "High probability of success based on active forum participation and consistent quiz scores.",
        factors: [
          "Attendance rate: 98%",
          "Forum interactions: 12 posts/week",
          "Average Quiz Score: 92/100",
          "Learning Trend: Upward"
        ]
      };
      setPrediction(result);
      setIsPredicting(false);
    }, 2000);
  };

  const mockLogData = [
    { id: '9942', session: 'S-102', module: 'MOD-01', time: '45m', watched: '92%', clicks: 124, notes: 3, label: 'Success' },
    { id: '9945', session: 'S-105', module: 'MOD-01', time: '12m', watched: '15%', clicks: 22, notes: 0, label: 'At Risk' },
    { id: '9982', session: 'S-108', module: 'MOD-02', time: '68m', watched: '100%', clicks: 210, notes: 8, label: 'Success' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3 text-slate-900">
            <BrainCircuit className="w-10 h-10 text-indigo-600" />
            Predictive Analytics Engine
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Deploy custom PyTorch models to analyze student behavior logs and identify learning risks in real-time.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl max-w-xs shadow-sm">
          <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Database className="w-4 h-4" /> Required Log Schema
          </h4>
          <p className="text-[11px] text-indigo-700 leading-relaxed font-mono">
            student_id, session_id, timestamp, module_id, time_spent_minutes, page_visited, video_watched_percent, clicks_event, notes_forums, next_module_prediction, success_label
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Model Upload & Control */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" /> Model Deployment
            </h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${uploadedModel ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:border-blue-300'}`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pth"
              />
              {uploadedModel ? (
                <div className="animate-in zoom-in-95">
                  <FileCode className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-green-800">{uploadedModel}</p>
                  <p className="text-[10px] text-green-600 uppercase mt-1">Ready for Inference</p>
                </div>
              ) : (
                <>
                  <FileCode className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Upload PyTorch (.pth) model</p>
                  <p className="text-xs text-slate-400 mt-1">Drag & drop or click to browse</p>
                </>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <div className="text-sm font-bold text-slate-700">Select Target Student</div>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                <option>John Student (ID: 9942)</option>
                <option>Sarah Parker (ID: 9945)</option>
                <option>Mike Ross (ID: 9982)</option>
              </select>
              
              <button 
                onClick={handlePredict}
                disabled={isPredicting || !uploadedModel}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
              >
                {isPredicting ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
                Run Inference
              </button>
            </div>
          </div>
        </div>

        {/* Inference Results & Log Preview */}
        <div className="lg:col-span-2 space-y-8">
          {prediction ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-8 rounded-3xl border-2 mb-8 ${prediction.risk < 0.3 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Model Inference Result</h2>
                    <p className="text-slate-600 text-sm">Deployment: {uploadedModel}</p>
                  </div>
                  <div className={`text-4xl font-black ${prediction.risk < 0.3 ? 'text-green-600' : 'text-red-600'}`}>
                    {((1 - prediction.risk) * 100).toFixed(0)}% <span className="text-lg font-normal">Score</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl mb-8 border border-white/50">
                  {prediction.risk < 0.3 ? <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" /> : <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />}
                  <p className="font-medium text-slate-800 leading-relaxed">{prediction.message}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prediction.factors.map(f => (
                    <div key={f} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
              <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">Upload a model and run inference to see performance reports</p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4" /> Live Tracking Log Preview
              </h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Student ID</th>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Module</th>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Time Spent</th>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Video %</th>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Clicks</th>
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase">Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {mockLogData.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{log.id}</td>
                      <td className="px-6 py-4 text-slate-600">{log.module}</td>
                      <td className="px-6 py-4 text-slate-600">{log.time}</td>
                      <td className="px-6 py-4 text-slate-600">{log.watched}</td>
                      <td className="px-6 py-4 text-slate-600">{log.clicks}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${log.label === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {log.label}
                        </span>
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
