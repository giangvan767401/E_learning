
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Activity,
  Star,
  Edit,
  Database,
  BrainCircuit
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Instructor Console</h1>
          <p className="text-slate-500 mt-2 font-medium">System administrative node for course lifecycle & ML deployments.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            to="/admin/predict"
            className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            <BrainCircuit className="w-4 h-4" /> Inference Engine
          </Link>
          <button 
            onClick={() => navigate('/admin/course/new')}
            className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
          >
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900">1,248</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Students</div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Users className="w-24 h-24" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900">$24.8k</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Platform Revenue</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900">88%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Completion Rate</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900">1.2M</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Logged Events</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Course List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black text-slate-900">Course Inventory</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Report</button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollments</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ML Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: '1', title: 'Next.js 15 Foundations', sales: 412, status: 'Active .pth' },
                  { id: '2', title: 'Advanced Tailwind Systems', sales: 284, status: 'No Model' },
                  { id: '3', title: 'AI Ethics in FE', sales: 156, status: 'Testing' },
                ].map((course, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{course.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Last Update: Nov 12</div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-700">{course.sales}</td>
                    <td className="px-8 py-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${course.status === 'Active .pth' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-100 text-slate-400'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/course/edit/${course.id}`);
                          }}
                          className="p-2.5 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-100 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <MoreVertical className="w-5 h-5 text-slate-300" />
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
          <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                 <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">Failure Risk Alerts</h3>
              <p className="text-xs text-indigo-100 mb-8 leading-relaxed font-medium">
                14 student profiles currently meet the 'High Risk' threshold in the Next.js module.
              </p>
              <Link to="/admin/predict" className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/20">
                Open Analysis Hub <Activity className="w-4 h-4" />
              </Link>
            </div>
            <Activity className="absolute bottom-[-10%] right-[-10%] w-48 h-48 opacity-10" />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Platform Feedback</h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 shrink-0 flex items-center justify-center font-black text-xs text-slate-400">S{i}</div>
                  <div>
                    <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Student Node #0{i}</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">"The real-time log tracking gives me confidence in my learning speed..."</p>
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
