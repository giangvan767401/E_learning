
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ChevronRight,
  Flame,
  Download,
  Share2,
  Filter,
  Search,
  ExternalLink,
  Medal
} from 'lucide-react';

type DashboardTab = 'overview' | 'courses' | 'certificates';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [courseFilter, setCourseFilter] = useState<'all' | 'active' | 'completed'>('all');

  const myCourses = [
    { id: '1', title: 'Advanced React Patterns', instructor: 'Kent Dodds', progress: 65, color: 'bg-blue-600', lastAccessed: '2 hours ago', status: 'active' },
    { id: '2', title: 'Machine Learning Basics', instructor: 'Andrew Ng', progress: 12, color: 'bg-indigo-600', lastAccessed: 'Yesterday', status: 'active' },
    { id: '3', title: 'UI/UX Fundamentals', instructor: 'Gary Simon', progress: 100, color: 'bg-green-600', lastAccessed: '3 days ago', status: 'completed' },
    { id: '4', title: 'Next.js 14 Deep Dive', instructor: 'Lee Robinson', progress: 100, color: 'bg-slate-900', lastAccessed: '1 week ago', status: 'completed' },
  ];

  const certificates = [
    { id: 'CERT-1029', title: 'UI/UX Fundamentals', date: 'Oct 12, 2023', image: 'https://picsum.photos/seed/cert1/400/300' },
    { id: 'CERT-3341', title: 'Next.js 14 Deep Dive', date: 'Jan 05, 2024', image: 'https://picsum.photos/seed/cert2/400/300' },
  ];

  const filteredCourses = myCourses.filter(c => courseFilter === 'all' || c.status === courseFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-inner">
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
                <div className="font-bold">{certificates.length}</div>
                <div className="text-[10px] text-slate-400 uppercase">Certs</div>
              </div>
              <div className="text-center">
                <div className="font-bold">45</div>
                <div className="text-[10px] text-slate-400 uppercase">Hours</div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <BookOpen className="w-5 h-5" /> My Courses
            </button>
            <button 
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'certificates' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Award className="w-5 h-5" /> Certificates
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 min-w-0">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
                  <p className="opacity-90 max-w-md">You've completed 75% of your daily goal. Keep it up and maintain your 5-day streak!</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      <Flame className="w-4 h-4 text-orange-400" /> 5 Day Streak
                    </div>
                    <Link to="/learn/1" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-50 transition-all">Resume Learning</Link>
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

              {/* Continue Learning Snapshot */}
              <section>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xl font-bold">Continue Learning</h3>
                  <button onClick={() => setActiveTab('courses')} className="text-sm text-blue-600 font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {myCourses.filter(c => c.status === 'active').map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center gap-6 group shadow-sm">
                      <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/seed/${course.id}/200/200`} className="w-full h-full object-cover" alt="" />
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
                      <Link to={`/learn/${course.id}`} className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                        Continue <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                  {(['all', 'active', 'completed'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setCourseFilter(f)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${courseFilter === f ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map(course => (
                  <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                    <div className="aspect-video bg-slate-100 relative">
                      <img src={`https://picsum.photos/seed/${course.id}/600/400`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white ${course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                      
                      <div className="mt-auto space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-400 uppercase">Progress</span>
                            <span className="text-slate-900">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Accessed {course.lastAccessed}
                          </span>
                          <Link to={`/learn/${course.id}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
                            {course.status === 'completed' ? 'Review' : 'Resume'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No courses found matching this status.</p>
                  <button onClick={() => setCourseFilter('all')} className="mt-4 text-blue-600 font-bold hover:underline">Show All Courses</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">My Certificates</h2>
                  <p className="text-sm text-slate-500">Showcase your achievements to the world</p>
                </div>
                <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl border border-yellow-100 flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  <span className="text-sm font-bold">{certificates.length} Total Earned</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-[4/3] bg-slate-100 border-b border-slate-100 p-6 flex flex-col items-center justify-center text-center relative group">
                      <img src={cert.image} className="w-full h-full object-cover rounded shadow-lg" alt="" />
                      <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button className="p-3 bg-white rounded-full text-blue-600 hover:scale-110 transition-transform shadow-lg">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white rounded-full text-blue-600 hover:scale-110 transition-transform shadow-lg">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                          <p className="text-xs text-slate-400">Issued on {cert.date}</p>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">ID: {cert.id}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
                          <ExternalLink className="w-4 h-4" /> Public Profile
                        </button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <Download className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Milestone Suggestion Card */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Next Milestone: Expert Dev</h4>
                  <p className="text-xs text-slate-500 max-w-[200px] mb-6">Complete the 'Advanced React Patterns' course to earn your next professional badge.</p>
                  <button onClick={() => setActiveTab('courses')} className="text-sm text-blue-600 font-black hover:underline">CONTINUE COURSE</button>
                </div>
              </div>
            </div>
          )}
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
