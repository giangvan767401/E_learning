
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ChevronRight,
  Flame
} from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">JS</span>
            </div>
            <h3 className="text-center font-bold text-lg">John Student</h3>
            <p className="text-center text-sm text-slate-500 mb-4">Web Developer Path</p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="font-bold">12</div>
                <div className="text-[10px] text-slate-400 uppercase">Courses</div>
              </div>
              <div className="text-center border-l border-r border-slate-100 px-4">
                <div className="font-bold">4</div>
                <div className="text-[10px] text-slate-400 uppercase">Certs</div>
              </div>
              <div className="text-center">
                <div className="font-bold">45</div>
                <div className="text-[10px] text-slate-400 uppercase">Hours</div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium">
              <BookOpen className="w-5 h-5" /> My Courses
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium">
              <Award className="w-5 h-5" /> Certificates
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
              <p className="opacity-90 max-w-md">You've completed 75% of your daily goal. Keep it up and maintain your 5-day streak!</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  <Flame className="w-4 h-4 text-orange-400" /> 5 Day Streak
                </div>
                <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-50 transition-all">Resume Learning</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 h-full flex items-center opacity-20">
              <TrendingUp className="w-48 h-48" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Study Hours</div>
                <div className="text-xl font-bold">12.5 hrs</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Modules Completed</div>
                <div className="text-xl font-bold">24 / 32</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Points Earned</div>
                <div className="text-xl font-bold">1,450 XP</div>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <section>
            <h3 className="text-xl font-bold mb-4">Continue Learning</h3>
            <div className="space-y-4">
              {[
                { title: 'Advanced React Patterns', instructor: 'Kent Dodds', progress: 65, color: 'bg-blue-600' },
                { title: 'Machine Learning Basics', instructor: 'Andrew Ng', progress: 12, color: 'bg-indigo-600' }
              ].map(course => (
                <div key={course.title} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center gap-6 group">
                  <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                    <img src="https://picsum.photos/200/200" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                    <p className="text-sm text-slate-500 italic mb-2">{course.instructor}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600">{course.progress}%</span>
                    </div>
                  </div>
                  <Link to="/learn/1" className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                    Continue <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// Helper for consistency
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
  </svg>
);

export default StudentDashboard;
