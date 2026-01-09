
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  Settings,
  MoreVertical,
  Edit3,
  Clock,
  Timer,
  AlertCircle,
  Trophy,
  XCircle,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

const CourseLearning = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeItem, setActiveItem] = useState({ module: 0, index: 2 });
  const [notes, setNotes] = useState('');
  const [examState, setExamState] = useState<'idle' | 'taking' | 'finished' | 'reviewing'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [finalScore, setFinalScore] = useState(0);
  const navigate = useNavigate();

  const modules = [
    { 
      title: 'Foundations of UI', 
      duration: '45m', 
      items: [
        { type: 'video', title: 'What is UX?', completed: true },
        { type: 'video', title: 'Understanding User Needs', completed: true },
        { type: 'video', title: 'Hierarchy & Spacing', completed: false },
        { type: 'exam', title: 'Mid-term Exam: UI Basics', duration: '30m' }
      ] 
    },
    { 
      title: 'Color Theory', 
      duration: '1h 12m', 
      items: [
        { type: 'video', title: 'The Color Wheel', completed: false },
        { type: 'video', title: 'Contrast & Accessibility', completed: false },
        { type: 'video', title: 'Brand Systems', completed: false }
      ] 
    },
    { 
      title: 'Final Certification', 
      duration: '1h', 
      items: [
        { type: 'exam', title: 'Final Comprehensive Exam', duration: '60m' }
      ] 
    },
  ];

  const questions = [
    {
      q: "Which property is used in CSS to control the space between elements?",
      options: ["Padding", "Margin", "Border", "Gutter"],
      correct: 1
    },
    {
      q: "What is the primary purpose of Visual Hierarchy?",
      options: ["To make it look pretty", "To guide the user's eye to the most important info", "To use as many colors as possible", "To satisfy the developer"],
      correct: 1
    },
    {
      q: "The 8pt grid system is primarily used for what?",
      options: ["Consistent spacing and sizing", "Choosing font weights", "Calculating color contrast", "Database indexing"],
      correct: 0
    }
  ];

  useEffect(() => {
    let timer: number;
    if (examState === 'taking' && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && examState === 'taking') {
      handleFinishExam();
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamState('taking');
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeLeft(activeItem.module === 2 ? 3600 : 1800);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleFinishExam = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / questions.length) * 100);
    setFinalScore(score);
    setExamState('finished');
  };

  const renderExam = () => {
    if (examState === 'idle') {
      return (
        <div className="bg-slate-900 aspect-video w-full flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{modules[activeItem.module].items[activeItem.index].title}</h2>
          <p className="text-slate-400 max-w-md mb-8">This assessment covers all core concepts. You must score 80% or higher to pass.</p>
          <div className="flex gap-8 mb-10">
            <div className="text-center">
              <div className="text-blue-400 font-bold text-xl">{questions.length}</div>
              <div className="text-slate-500 text-xs uppercase">Questions</div>
            </div>
            <div className="text-center border-l border-r border-slate-800 px-8">
              <div className="text-blue-400 font-bold text-xl">{activeItem.module === 2 ? '60' : '30'}m</div>
              <div className="text-slate-500 text-xs uppercase">Time Limit</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-xl">80%</div>
              <div className="text-slate-500 text-xs uppercase">Pass Score</div>
            </div>
          </div>
          <button 
            onClick={handleStartExam}
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
          >
            Start Assessment
          </button>
        </div>
      );
    }

    if (examState === 'taking') {
      return (
        <div className="bg-white aspect-video w-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-4">
              <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded">QUESTION {currentQuestion + 1}/{questions.length}</span>
              <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
              <Timer className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="flex-1 p-12 overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">{questions[currentQuestion].q}</h3>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex justify-between items-center ${
                    userAnswers[currentQuestion] === i 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                  }`}
                >
                  <span className={`font-medium ${userAnswers[currentQuestion] === i ? 'text-blue-700' : 'text-slate-700'}`}>{opt}</span>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    userAnswers[currentQuestion] === i ? 'border-blue-600 bg-blue-600' : 'border-slate-200'
                  }`}>
                    {userAnswers[currentQuestion] === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50">
            <button 
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button 
                onClick={handleFinishExam}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
              >
                Submit Exam
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
              >
                Save & Next <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      );
    }

    if (examState === 'finished') {
      const isPassed = finalScore >= 80;
      return (
        <div className="bg-white aspect-video w-full flex flex-col items-center justify-center p-12 animate-in zoom-in-95 duration-500">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
            {isPassed ? <Trophy className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{isPassed ? 'Pass!' : 'Try Again'}</h2>
          <p className="text-slate-500 mb-8">{isPassed ? 'Great job! You have mastered these concepts.' : 'You were close! Review the content and try again.'}</p>
          
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mb-10">
            <div className="bg-slate-50 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-1">Score</div>
              <div className="text-3xl font-black text-slate-900">{finalScore}%</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-1">Status</div>
              <div className={`text-2xl font-black ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {isPassed ? 'CERTIFIED' : 'RETAKE'}
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-1">Items</div>
              <div className="text-3xl font-black text-slate-900">{questions.length}</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => {
                setExamState('reviewing');
                setCurrentQuestion(0);
              }}
              className="px-8 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              Review Answers
            </button>
            {!isPassed ? (
              <button 
                onClick={handleStartExam}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Exam
              </button>
            ) : (
              <button 
                onClick={() => {
                  setExamState('idle');
                  setActiveItem({ module: 1, index: 0 });
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Continue to Next Module
              </button>
            )}
          </div>
        </div>
      );
    }

    if (examState === 'reviewing') {
      const q = questions[currentQuestion];
      const userAns = userAnswers[currentQuestion];
      const isCorrect = userAns === q.correct;

      return (
        <div className="bg-white aspect-video w-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              Review: Question {currentQuestion + 1} 
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
            </h3>
            <button 
              onClick={() => setExamState('finished')}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Back to Results
            </button>
          </div>
          <div className="flex-1 p-12 overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">{q.q}</h3>
            <div className="grid gap-4">
              {q.options.map((opt, i) => {
                let statusClass = "border-slate-100 text-slate-500";
                if (i === q.correct) statusClass = "border-green-500 bg-green-50 text-green-700 font-bold";
                else if (i === userAns && !isCorrect) statusClass = "border-red-500 bg-red-50 text-red-700";

                return (
                  <div 
                    key={i} 
                    className={`p-6 rounded-2xl border-2 flex justify-between items-center ${statusClass}`}
                  >
                    <span>{opt}</span>
                    <div className="flex items-center gap-2">
                      {i === q.correct && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {i === userAns && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
            {!isCorrect && (
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> This concept was covered in Module {activeModule + 1}, Lesson 2. 
                  Remember that {q.options[q.correct]} is the correct approach for this scenario.
                </p>
              </div>
            )}
          </div>
          <div className="p-6 border-t border-slate-100 flex justify-between items-center">
            <button 
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <div className="flex gap-2">
              {currentQuestion === questions.length - 1 ? (
                <button 
                  onClick={() => setExamState('finished')}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Close Review
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  Next Question <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  const currentItem = modules[activeItem.module].items[activeItem.index];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4">
           <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Dashboard
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-sm font-medium text-slate-500 truncate">{currentItem.title}</span>
        </div>
        
        {currentItem.type === 'video' ? (
          <div className="bg-black aspect-video w-full flex items-center justify-center relative group">
            <img src={`https://picsum.photos/seed/video${activeItem.index}/1920/1080`} className="w-full h-full object-cover opacity-60" alt="Video Placeholder" />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <Play className="w-10 h-10 text-white fill-current ml-1" />
              </div>
            </button>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-5 h-5 cursor-pointer" />
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-1/3"></div>
              </div>
              <span className="text-xs font-mono">12:34 / 45:00</span>
              <Settings className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        ) : (
          renderExam()
        )}

        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentItem.title}</h1>
              <p className="text-slate-500">Module {activeItem.module + 1} • {modules[activeItem.module].title}</p>
            </div>
            {(examState === 'idle' || examState === 'finished') && (
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-bold hover:bg-white transition-all">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4">{currentItem.type === 'video' ? 'About this lesson' : 'Exam Guidelines'}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {currentItem.type === 'video' 
                    ? "In this lesson, we cover essential industry concepts. Use the notes panel to track key takeaways." 
                    : "This exam is focused on practical application. Ensure you read each question carefully. You can review your answers at the end."}
                </p>
                <div className="mt-6 flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold hover:bg-slate-200">
                    <FileText className="w-4 h-4" /> Resources.pdf
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold hover:bg-slate-200">
                    <MessageSquare className="w-4 h-4" /> Join Discussion
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2"><Edit3 className="w-4 h-4" /> Quick Notes</h3>
                  <button className="text-xs text-blue-600 font-bold">Autosaved</button>
                </div>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes as you watch..."
                  className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-screen overflow-y-auto sticky top-16">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-black text-xl">Course Content</h2>
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </div>
        
        <div className="flex-1">
          {modules.map((mod, mIdx) => (
            <div key={mIdx} className="border-b border-slate-100">
              <button 
                onClick={() => setActiveModule(mIdx)}
                className={`w-full p-6 text-left hover:bg-slate-50 transition-all ${activeModule === mIdx ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Module {mIdx + 1}</span>
                  <span className="text-xs text-slate-400">{mod.duration}</span>
                </div>
                <h4 className="font-bold text-slate-900">{mod.title}</h4>
              </button>
              
              {activeModule === mIdx && (
                <div className="bg-slate-50/50 pb-4">
                  {mod.items.map((item, iIdx) => (
                    <div 
                      key={iIdx} 
                      onClick={() => {
                        if (examState !== 'taking') {
                          setActiveItem({ module: mIdx, index: iIdx });
                          setExamState('idle');
                        }
                      }}
                      className={`flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-white group transition-colors ${activeItem.module === mIdx && activeItem.index === iIdx ? 'bg-white' : ''}`}
                    >
                      {item.type === 'exam' ? (
                        <HelpCircle className={`w-5 h-5 ${activeItem.module === mIdx && activeItem.index === iIdx ? 'text-blue-600' : 'text-slate-400'}`} />
                      ) : (
                        item.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-300" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm ${activeItem.module === mIdx && activeItem.index === iIdx ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            {item.type === 'exam' ? <Timer className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            {item.type === 'exam' ? item.duration : '12:00'}
                          </span>
                        </div>
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

export default CourseLearning;
