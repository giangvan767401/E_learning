
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  Eye, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Activity,
  FileText,
  Star,
  Edit
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black">Instructor Dashboard</h1>
          <p className="text-slate-500">Manage your students and course performance</p>
        </div>
        <button 
          onClick={() => navigate('/admin/course/new')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" /> Create Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-2xl font-black">1,248</div>
          <div className="text-sm text-slate-500">Total Students</div>
          <div className="mt-2 text-xs text-green-600 font-bold">+12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="text-2xl font-black">$24,850</div>
          <div className="text-sm text-slate-500">Total Revenue</div>
          <div className="mt-2 text-xs text-green-600 font-bold">+$3.2k from last month</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <div className="text-2xl font-black">88%</div>
          <div className="text-sm text-slate-500">Completion Rate</div>
          <div className="mt-2 text-xs text-red-600 font-bold">-2% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="text-2xl font-black">412</div>
          <div className="text-sm text-slate-500">Active Discussions</div>
          <div className="mt-2 text-xs text-green-600 font-bold">+45 new today</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Your Courses</h3>
            <button className="text-sm text-blue-600 font-bold hover:underline">View all</button>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Course</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Sales</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Rating</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '1', title: 'Next.js Mastery', sales: 412, rating: 4.9, status: 'Published' },
                  { id: '2', title: 'Advanced Tailwind', sales: 284, rating: 4.8, status: 'Published' },
                  { id: '3', title: 'AI Foundations', sales: 156, rating: 4.7, status: 'Draft' },
                ].map((course, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{course.title}</div>
                      <div className="text-xs text-slate-500">Updated 2 days ago</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{course.sales}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-bold text-yellow-500">
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/course/edit/${course.id}`);
                          }}
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Success Prediction</h3>
              <p className="text-xs opacity-70 mb-6 leading-relaxed">
                Our model predicts that 14 students in your courses are currently at risk of falling behind.
              </p>
              <Link to="/admin/predict" className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-sm">
                Predictive Analytics <Activity className="w-4 h-4" />
              </Link>
            </div>
            <Activity className="absolute bottom-[-10%] right-[-10%] w-32 h-32 opacity-10" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0"></div>
                  <div>
                    <div className="text-xs font-bold mb-1">Student {i}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">"The lesson on SSR was incredibly helpful, although I'd love more examples..."</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
