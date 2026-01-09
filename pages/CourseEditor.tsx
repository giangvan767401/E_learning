
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Layout, 
  Video, 
  HelpCircle, 
  GripVertical,
  ChevronDown,
  Image as ImageIcon,
  CheckCircle,
  Eye
} from 'lucide-react';

const CourseEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [courseData, setCourseData] = useState({
    title: isEditing ? 'Advanced React Architecture' : '',
    category: 'Web Development',
    level: 'Intermediate',
    price: 19.99,
    description: '',
    thumbnail: null as File | null
  });

  const [curriculum, setCurriculum] = useState([
    { 
      id: 'm1', 
      title: 'Introduction to Patterns', 
      lessons: [
        { id: 'l1', title: 'Welcome to the Course', type: 'video' },
        { id: 'l2', title: 'Initial Assessment', type: 'exam' }
      ] 
    }
  ]);

  const addModule = () => {
    setCurriculum([...curriculum, { 
      id: Math.random().toString(36).substr(2, 9), 
      title: 'New Module', 
      lessons: [] 
    }]);
  };

  const addLesson = (moduleId: string) => {
    setCurriculum(curriculum.map(m => m.id === moduleId ? {
      ...m,
      lessons: [...m.lessons, { id: Math.random().toString(36).substr(2, 9), title: 'New Lesson', type: 'video' }]
    } : m));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCurriculum(curriculum.map(m => m.id === moduleId ? {
      ...m,
      lessons: m.lessons.filter(l => l.id !== lessonId)
    } : m));
  };

  const handleSave = () => {
    alert("Course saved successfully!");
    navigate('/admin');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-500" />
          </button>
          <div>
            <h1 className="text-3xl font-black">{isEditing ? 'Edit Course' : 'Create New Course'}</h1>
            <p className="text-slate-500 text-sm">Configure your course details and curriculum structure</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Course
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Course Info Form */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" /> Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                <input 
                  type="text" 
                  value={courseData.title}
                  onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                  placeholder="e.g. Master Next.js 15"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option>Web Dev</option>
                    <option>Design</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Level</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                <input 
                  type="number" 
                  value={courseData.price}
                  onChange={(e) => setCourseData({...courseData, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Thumbnail</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Upload 16:9 cover image</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Curriculum Builder */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" /> Curriculum Builder
              </h3>
              <button 
                onClick={addModule}
                className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Module
              </button>
            </div>

            <div className="space-y-6">
              {curriculum.map((module, mIdx) => (
                <div key={module.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50/80 px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-slate-300 cursor-move" />
                      <input 
                        type="text" 
                        value={module.title}
                        onChange={(e) => {
                          const newCur = [...curriculum];
                          newCur[mIdx].title = e.target.value;
                          setCurriculum(newCur);
                        }}
                        className="bg-transparent font-bold text-slate-800 border-none outline-none focus:ring-1 focus:ring-blue-200 rounded px-2"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => addLesson(module.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-white border border-slate-50 rounded-xl group hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-4">
                          {lesson.type === 'video' ? <Video className="w-4 h-4 text-slate-400" /> : <HelpCircle className="w-4 h-4 text-indigo-400" />}
                          <input 
                            type="text" 
                            defaultValue={lesson.title}
                            className="text-sm text-slate-700 outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-mono text-slate-400">ID: {lesson.id}</span>
                          <button 
                            onClick={() => removeLesson(module.id, lesson.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {module.lessons.length === 0 && (
                      <div className="text-center py-4 text-xs text-slate-400 italic">No lessons yet. Add some to get started.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-1 flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle className="w-6 h-6" /> Ready to Launch?
                </h4>
                <p className="opacity-80 text-sm">Once published, your course will be available to 15k+ students.</p>
              </div>
              <button 
                onClick={handleSave}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-black hover:bg-slate-50 transition-all shadow-xl"
              >
                PUBLISH COURSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;
