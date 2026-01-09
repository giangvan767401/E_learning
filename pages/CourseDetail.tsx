
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  FileText, 
  Clock, 
  Globe, 
  Calendar, 
  Star, 
  Check, 
  ChevronDown,
  Lock,
  Award
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('syllabus');

  return (
    <div className="bg-white min-h-screen">
      {/* Course Hero */}
      <section className="bg-slate-900 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">Bestseller</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">Intermediate</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Mastering Advanced React with TypeScript & Next.js</h1>
            <p className="text-xl text-slate-300">Build high-performance, enterprise-grade web applications with modern patterns and best practices.</p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star className="w-5 h-5 fill-current" /> 4.9 (1,240 Ratings)
              </div>
              <div className="text-slate-400">Created by <span className="text-blue-400 font-bold underline cursor-pointer">Prof. Sarah Drasner</span></div>
              <div className="flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4" /> English, Spanish, Vietnamese
              </div>
            </div>
          </div>

          {/* Purchase Card (Floating) */}
          <div className="w-full md:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900 sticky top-24">
              <div className="aspect-video bg-slate-100 rounded-xl mb-6 relative group overflow-hidden cursor-pointer">
                <img src="https://picsum.photos/seed/react/600/400" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold">Preview this course</div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-black">$19.99</span>
                <span className="text-lg text-slate-400 line-through">$89.99</span>
                <span className="text-orange-600 font-bold text-sm">78% Off</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <Link to="/learn/1" className="block w-full text-center py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Enroll Now</Link>
                <button className="w-full py-4 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">Add to Cart</button>
              </div>

              <div className="text-xs text-center text-slate-500 mb-6">30-Day Money-Back Guarantee</div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-sm">This course includes:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600"><Play className="w-4 h-4 text-blue-600" /> 18.5 hours on-demand video</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><FileText className="w-4 h-4 text-blue-600" /> 12 coding exercises</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><Award className="w-4 h-4 text-blue-600" /> Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {['About', 'Syllabus', 'Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-8 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-all ${activeTab === tab.toLowerCase() ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  In this comprehensive course, we'll dive deep into the ecosystem of React 18, TypeScript, and Next.js 14+. 
                  You'll learn how to build scalable, production-ready applications from scratch, focusing on performance, 
                  accessibility, and modern state management patterns.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl">
                <h4 className="font-bold mb-4">What you'll learn</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Master React Server Components',
                    'Advanced TypeScript utility types',
                    'State management with Zustand',
                    'Robust Form handling with Zod',
                    'Optimizing for Core Web Vitals',
                    'Deploying to Vercel/AWS'
                  ].map(item => (
                    <div key={item} className="flex gap-3 text-slate-700">
                      <Check className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Course Content</h3>
              {[1, 2, 3].map(module => (
                <div key={module} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                      <span className="font-bold">Module {module}: Deep Dive into State</span>
                    </div>
                    <span className="text-sm text-slate-500">6 lessons • 45m</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map(lesson => (
                      <div key={lesson} className="flex items-center justify-between px-2 py-2 hover:bg-slate-50 rounded-lg group">
                        <div className="flex items-center gap-4">
                          <Play className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                          <span className="text-sm text-slate-600">Lesson {lesson}: Context API vs Zustand</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-400 font-mono">08:24</span>
                          {lesson > 1 && <Lock className="w-4 h-4 text-slate-300" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
