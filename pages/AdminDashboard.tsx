
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  Plus, 
  MoreVertical, 
  Activity,
  Edit,
  Database,
  BrainCircuit,
  Upload,
  CheckCircle,
  FileCode,
  Loader2
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('1'); // Mock ID
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Mock API Call: FormData append 'model', 'courseId'
    // await api.post('/models/upload', formData, ...)
    setTimeout(() => {
      setUploading(false);
      alert(`Model ${file.name} uploaded successfully for system processing.`);
    }, 2000);
  };

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

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Model Deployment Section */}
          <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Database className="w-6 h-6 text-indigo-600" /> ML Weights Registry
              </h3>
              <div className="flex items-center gap-3">
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase outline-none"
                >
                  <option value="1">Next.js 15 Foundations</option>
                  <option value="2">Advanced Tailwind Systems</option>
                </select>
                <button 
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
                >
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                  Upload .pth
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept=".pth" onChange={handleUpload} />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { id: 'm1', name: 'v2-final-optimized.pth', date: '2024-11-20', active: true },
                { id: 'm2', name: 'baseline-test.pth', date: '2024-11-15', active: false },
              ].map(model => (
                <div key={model.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${model.active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{model.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uploaded {model.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {model.active ? (
                      <span className="flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle className="w-3 h-3" /> Live
                      </span>
                    ) : (
                      <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                        Activate
                      </button>
                    )}
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Course Inventory */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Course Inventory</h3>
            </div>
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
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">System Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black">1,248</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Learners</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black">$24.8k</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue Flow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
