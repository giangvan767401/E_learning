
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Palette, 
  BarChart, 
  ShieldCheck, 
  Zap, 
  Star,
  Users,
  Award,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Web Dev', icon: <Code />, color: 'bg-blue-100 text-blue-600' },
  { name: 'Design', icon: <Palette />, color: 'bg-pink-100 text-pink-600' },
  { name: 'Business', icon: <BarChart />, color: 'bg-green-100 text-green-600' },
  { name: 'Security', icon: <ShieldCheck />, color: 'bg-purple-100 text-purple-600' },
];

const LandingPage = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>New: Next.js 15 Mastery Course</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Unlock Your Potential with <br />
            <span className="text-blue-600">AI-Powered Learning</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Join 10 million learners. Lumina uses advanced tracking to predict your success and optimize your learning path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Start Learning Now <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
              View Curriculum
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="text-2xl font-bold">Google</div>
            <div className="text-2xl font-bold">Microsoft</div>
            <div className="text-2xl font-bold">Netflix</div>
            <div className="text-2xl font-bold">Meta</div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Categories</h2>
            <p className="text-slate-500">Explore the most in-demand skills of 2024</p>
          </div>
          <Link to="/courses" className="text-blue-600 font-semibold hover:underline">See all</Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="group p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold">{cat.name}</h3>
              <p className="text-sm text-slate-500 mt-1">1,200+ Courses</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Carousel-like Section */}
      <section className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <Link to={`/course/${i}`} key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/course${i}/600/400`} alt="Course" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Bestseller</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9</span>
                    <span className="text-slate-400 font-normal ml-1">(12.4k reviews)</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Complete Web Bootcamp {i}</h3>
                  <p className="text-sm text-slate-500 mb-4 italic">Dr. Angela Smith</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">$19.99</span>
                    <span className="text-sm text-slate-400 line-through">$89.99</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-extrabold text-blue-600 mb-2">15M+</div>
          <div className="text-slate-500 font-medium flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> Students
          </div>
        </div>
        <div>
          <div className="text-4xl font-extrabold text-blue-600 mb-2">20k+</div>
          <div className="text-slate-500 font-medium flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" /> Courses
          </div>
        </div>
        <div>
          <div className="text-4xl font-extrabold text-blue-600 mb-2">120+</div>
          <div className="text-slate-500 font-medium flex items-center justify-center gap-2">
            <Star className="w-4 h-4" /> Expert Mentors
          </div>
        </div>
        <div>
          <div className="text-4xl font-extrabold text-blue-600 mb-2">95%</div>
          <div className="text-slate-500 font-medium flex items-center justify-center gap-2">
            <Award className="w-4 h-4" /> Satisfaction
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
