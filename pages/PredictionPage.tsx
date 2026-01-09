
import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Info,
  Loader2,
  TrendingUp,
  User
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const PredictionPage = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<{ risk: number; message: string; factors: string[] } | null>(null);

  const handlePredict = async () => {
    setIsPredicting(true);
    // Simulating API call to backend (where .h5 model would be)
    // For visual demo, we simulate a delay then generate a report using Gemini
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <BrainCircuit className="w-10 h-10 text-blue-600" />
            AI Performance Predictor
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Leverage our TensorFlow model to analyze student engagement logs and predict success probability.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 font-medium">
            This module integrates with the <code className="bg-blue-100 px-1 rounded">student_behavior_v2.h5</code> model on the backend.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Input Form Simulation */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Select Student
            </h3>
            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500">
              <option>John Student (ID: 9942)</option>
              <option>Sarah Parker (ID: 9945)</option>
              <option>Mike Ross (ID: 9982)</option>
            </select>
            
            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-500 mb-2">Engagement Snapshot</div>
              <div className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                <span>Time Spent</span>
                <span className="font-bold">420 min</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                <span>Video %</span>
                <span className="font-bold">88%</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                <span>Notes Taken</span>
                <span className="font-bold">12</span>
              </div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={isPredicting}
              className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
            >
              {isPredicting ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
              Generate Prediction
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="md:col-span-2">
          {prediction ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className={`p-8 rounded-3xl border-2 ${prediction.risk < 0.3 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Success Probability</h2>
                    <p className="text-slate-600 text-sm">Based on current neural network analysis</p>
                  </div>
                  <div className={`text-4xl font-black ${prediction.risk < 0.3 ? 'text-green-600' : 'text-red-600'}`}>
                    {((1 - prediction.risk) * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl mb-8">
                  {prediction.risk < 0.3 ? <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" /> : <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />}
                  <p className="font-medium text-slate-800 leading-relaxed">{prediction.message}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Key Decision Factors</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prediction.factors.map(f => (
                      <div key={f} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Instructor Recommendation</h3>
                  <p className="opacity-80 text-sm mb-6 leading-relaxed">
                    Student is exhibiting optimal learning patterns. Continue current curriculum. 
                    Recommended next module: <span className="text-blue-400 font-bold underline">Advanced Redux Persistence</span>
                  </p>
                  <button className="flex items-center gap-2 text-blue-400 font-bold hover:gap-3 transition-all">
                    Send Encouragement Email <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <Activity className="absolute bottom-[-20%] right-[-5%] w-64 h-64 opacity-5 text-white" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
              <BrainCircuit className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">Select a student and run prediction to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
