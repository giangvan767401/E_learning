
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  Edit3,
  Timer,
  AlertCircle,
  Trophy,
  XCircle,
  RotateCcw,
  ArrowLeft,
  ShieldCheck,
  Award,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../store';
import { MLPredictionParams } from '../types';

const CourseLearning = () => {
  const { id: courseId } = useParams();
  const { user } = useAuthStore();
  const [activeModule, setActiveModule] = useState(0);
  const [activeItem, setActiveItem] = useState({ module: 0, index: 0 });
  const [notes, setNotes] = useState('');
  
  // Exam State
  const [examStatus, setExamStatus] = useState<'idle' | 'taking' | 'grading' | 'reviewed'>('idle');
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<{ score: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  // Tracking State for ML Logs
  const logBuffer = useRef<MLPredictionParams[]>([]);
  const startTime = useRef<number>(Date.now());
  const clickCount = useRef<number>(0);
  const sessionId = useRef<string>(Math.random().toString(36).substring(7));

  const navigate = useNavigate();

  // Timer for exams
  useEffect(() => {
    let timer: number;
    if (examStatus === 'taking' && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleExamSubmit();
    }
    return () => clearInterval(timer);
  }, [examStatus, timeLeft]);

  // Buffer collection logic
  useEffect(() => {
    const trackClick = () => { clickCount.current++; };
    window.addEventListener('click', trackClick);

    const interval = setInterval(() => {
      if (!user) return;
      
      const logEntry: MLPredictionParams = {
        student_id: user.id,
        session_id: sessionId.current,
        timestamp: Date.now(),
        module_id: `MOD-${activeModule}`,
        time_spent_minutes: (Date.now() - startTime.current) / 60000,
        pages_visited: 1,
        video_watched_percent: 45,
        click_events: clickCount.current,
        notes_taken: notes.length > 0 ? 1 : 0,
        forum_posts: 0,
        revisit_flag: false,
        quiz_score: examResult?.score || 0,
        attempts_taken: examStatus === 'reviewed' ? 1 : 0,
        assignment_score: 0,
        feedback_rating: 5,
        days_since_last_activity: 0,
        cumulative_quiz_score: 85,
        learning_trend: 'stable',
        attention_score: 0.95,
        feedback_type: 'none'
      };

      logBuffer.current.push(logEntry);
      if (logBuffer.current.length >= 5) {
        logBuffer.current = [];
      }
    }, 30000);

    return () => {
      window.removeEventListener('click', trackClick);
      clearInterval(interval);
    };
  }, [user, activeModule, notes, examResult]);

  const modules = [
    { 
      title: 'Foundations of FE Architecture', 
      duration: '45m', 
      items: [
        { type: 'video', title: 'Why Next.js 15?', completed: true },
        { type: 'video', title: 'Folder Structure Best Practices', completed: true },
        { type: 'exam', title: 'Mid-term: Architecture Assessment', duration: '15m', questions: 5 }
      ] 
    },
    { 
      title: 'State & Data Management', 
      duration: '1h 12m', 
      items: [
        { type: 'video', title: 'Zustand vs Redux in 2024', completed: false },
        { type: 'video', title: 'Optimistic Updates', completed: false },
        { type: 'exam', title: 'Final: Engineering Mastery', duration: '30m', questions: 10 }
      ] 
    }
  ];

  const currentItem = modules[activeItem.module].items[activeItem.index];

  const handleExamSubmit = () => {
    setExamStatus('grading');
    setTimeout(() => {
      const correctCount = Object.keys(examAnswers).length; // Mock logic: any answer is "right" for demo
      setExamResult({ score: correctCount * 20, total: 100 });
      setExamStatus('reviewed');
    }, 1500);
  };

  const renderExamPortal = () => {
    if (examStatus === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-indigo-100 rounded-[32px] flex items-center justify-center text-indigo-600 shadow-inner">
            <HelpCircle className="w-12 h-12" />
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{currentItem.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">This assessment measures your understanding of the module. Results will be fed into the predictive model for failure-risk analysis.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <Timer className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</div>
              <div className="font-bold text-slate-900">{currentItem.duration}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rules</div>
              <div className="font-bold text-slate-900">Proctored</div>
            </div>
          </div>
          <button 
            onClick={() => setExamStatus('taking')}
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
          >
            Initiate Assessment <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (examStatus === 'taking') {
      return (
        <div className="p-10 max-w-3xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-[24px] shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Time Remaining</div>
                <div className="font-mono text-xl font-black">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Progress</div>
              <div className="font-bold">Question {Object.keys(examAnswers).length + 1} / 5</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Which Next.js 15 feature primarily focuses on improving the build-time static generation performance?</h3>
              <div className="space-y-4">
                {['Turbopack Integration', 'Partial Prerendering', 'Server Actions', 'Metadata API'].map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => setExamAnswers(prev => ({ ...prev, 0: i }))}
                    className={`w-full p-5 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between group ${examAnswers[0] === i ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-300'}`}
                  >
                    {opt}
                    <Circle className={`w-4 h-4 ${examAnswers[0] === i ? 'fill-current' : 'opacity-20 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleExamSubmit}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
            >
              Submit Final Answers
            </button>
          </div>
        </div>
      );
    }

    if (examStatus === 'grading') {
      return (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <LoaderCircle className="w-16 h-16 text-indigo-600 animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Evaluating Submission Logs...</p>
        </div>
      );
    }

    return (
      <div className="p-10 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
        <div className="relative p-12 bg-white rounded-[48px] border-2 border-slate-100 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Trophy className="w-64 h-64 text-indigo-600" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Successful Completion</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900">Assessment Result</h2>
              <p className="text-slate-500 font-medium max-w-sm">Great work! You have successfully passed the mid-term evaluation. This score has been added to your academic record.</p>
            </div>
            
            <div className="shrink-0 text-center space-y-2">
              <div className="text-8xl font-black text-indigo-600 tracking-tighter">{examResult?.score}%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Final Grade</div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
              <Award className="w-6 h-6 text-orange-500 mx-auto mb-3" />
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank</div>
              <div className="font-bold text-slate-900">Distinction</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
              <BarChart3 className="w-6 h-6 text-blue-500 mx-auto mb-3" />
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Percentile</div>
              <div className="font-bold text-slate-900">Top 15%</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
              <RotateCcw className="w-6 h-6 text-green-500 mx-auto mb-3" />
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
              <div className="font-bold text-slate-900">Closed</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm px-4">Detailed Answer Review</h3>
          <div className="space-y-4">
            {[1].map(q => (
              <div key={q} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-6">
                <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Q: Next.js 15 feature for build-time performance?</h4>
                  <p className="text-xs text-slate-500 italic">Your answer: Partial Prerendering</p>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-4">Instructor Insight:</p>
                  <p className="text-xs text-slate-600 mt-1">Correct. PPR is the key architectural shift in Next.js 15 that combines static and dynamic content efficiently.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              setExamStatus('idle');
              setActiveItem(prev => ({ ...prev, index: prev.index + 1 }));
            }}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Advance to Next Lesson <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
           <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> System Workspace
          </button>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-green-50 border border-green-100 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Logging Active</span>
             </div>
          </div>
        </div>
        
        {currentItem.type === 'video' ? (
          <>
            <div className="bg-black aspect-video w-full flex items-center justify-center relative group overflow-hidden">
              <img src={`https://picsum.photos/seed/video${activeItem.index}/1280/720`} className="w-full h-full object-cover opacity-50" alt="Video" />
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </div>
              </button>
            </div>

            <div className="p-10 space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 mb-2">{currentItem.title}</h1>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Module {activeItem.module + 1}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{modules[activeItem.module].title}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">Lesson Overview</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      This session explores the core requirements for the E-learning spec. We focus on how log data is collected and formatted for the inference.py script.
                    </p>
                    <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                        <FileText className="w-4 h-4" /> Curriculum.pdf
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Lab Notes
                    </h3>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Record insights for the prediction model..."
                      className="w-full h-40 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : renderExamPortal()}
      </div>

      <aside className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-screen overflow-y-auto sticky top-0">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-black text-xl text-slate-900 tracking-tight">Syllabus</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">E-learning System v0.1.0</p>
        </div>
        
        <div className="flex-1">
          {modules.map((mod, mIdx) => (
            <div key={mIdx} className="border-b border-slate-100">
              <button 
                onClick={() => setActiveModule(mIdx)}
                className={`w-full p-8 text-left hover:bg-slate-50 transition-all ${activeModule === mIdx ? 'bg-white' : ''}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Module {mIdx + 1}</span>
                  <span className="text-[10px] font-bold text-slate-400">{mod.duration}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{mod.title}</h4>
              </button>
              
              {activeModule === mIdx && (
                <div className="bg-slate-50/50 py-2">
                  {mod.items.map((item, iIdx) => (
                    <div 
                      key={iIdx} 
                      onClick={() => {
                        setActiveItem({ module: mIdx, index: iIdx });
                        if (item.type === 'exam') setExamStatus('idle');
                      }}
                      className={`flex items-center gap-4 px-8 py-4 cursor-pointer hover:bg-white transition-all ${activeItem.module === mIdx && activeItem.index === iIdx ? 'bg-white border-r-4 border-r-indigo-600' : ''}`}
                    >
                      {item.type === 'exam' ? (
                        <HelpCircle className={`w-5 h-5 ${activeItem.module === mIdx && activeItem.index === iIdx ? 'text-indigo-600' : 'text-slate-300'}`} />
                      ) : (
                        item.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-200" />
                      )}
                      <div className="flex-1">
                        <p className={`text-xs ${activeItem.module === mIdx && activeItem.index === iIdx ? 'font-black text-slate-900' : 'text-slate-500 font-medium'}`}>{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

const LoaderCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default CourseLearning;
