
import React, { useState } from 'react';
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
  Edit3
} from 'lucide-react';

const CourseLearning = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [notes, setNotes] = useState('');

  const modules = [
    { title: 'Foundations of UI', duration: '45m', items: ['What is UX?', 'Understanding User Needs', 'Hierarchy & Spacing'] },
    { title: 'Color Theory', duration: '1h 12m', items: ['The Color Wheel', 'Contrast & Accessibility', 'Brand Systems'] },
    { title: 'Final Project', duration: 'Quiz', items: ['Knowledge Check', 'Submission Guidelines'] },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row">
      {/* Content Player Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-black aspect-video w-full flex items-center justify-center relative group">
          <img src="https://picsum.photos/seed/video/1920/1080" className="w-full h-full object-cover opacity-60" alt="Video Placeholder" />
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <Play className="w-10 h-10 text-white fill-current ml-1" />
            </div>
          </button>
          
          {/* Custom Controls Simulation */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 cursor-pointer" />
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/3"></div>
            </div>
            <span className="text-xs font-mono">12:34 / 45:00</span>
            <Settings className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Lesson 3: Understanding Hierachy & Spacing</h1>
              <p className="text-slate-500">Module 1 • Foundations of UI</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-bold hover:bg-white transition-all">
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold mb-4">About this lesson</h3>
                <p className="text-slate-600 leading-relaxed">
                  In this lesson, we cover the essentials of visual hierarchy. You'll learn how to use size, color, 
                  and positioning to guide your users through a layout. We'll also touch upon the 8pt grid system 
                  which is a standard in modern interface design.
                </p>
                <div className="mt-6 flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold hover:bg-slate-200">
                    <FileText className="w-4 h-4" /> Lesson Slides.pdf
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

      {/* Sidebar Outline */}
      <aside className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-screen overflow-y-auto sticky top-16">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-black text-xl">Course Content</h2>
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </div>
        
        <div className="flex-1">
          {modules.map((mod, idx) => (
            <div key={idx} className="border-b border-slate-100">
              <button 
                onClick={() => setActiveModule(idx)}
                className={`w-full p-6 text-left hover:bg-slate-50 transition-all ${activeModule === idx ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Module {idx + 1}</span>
                  <span className="text-xs text-slate-400">{mod.duration}</span>
                </div>
                <h4 className="font-bold text-slate-900">{mod.title}</h4>
              </button>
              
              {activeModule === idx && (
                <div className="bg-slate-50/50 pb-4 animate-in slide-in-from-top-2">
                  {mod.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-white group">
                      {i === 0 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : i === 2 ? (
                        <Play className="w-5 h-5 text-blue-500 fill-current" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm ${i === 2 ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{item}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            {item.includes('Check') ? <HelpCircle className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            {item.includes('Check') ? '10 questions' : '12:00'}
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
