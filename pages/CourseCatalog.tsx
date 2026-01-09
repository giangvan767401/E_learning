
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const CourseCatalog = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Explore Courses</h1>
          <p className="text-slate-500">Discover your next career-defining skill</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <SlidersHorizontal className="w-5 h-5 text-slate-600" />
            <span className="hidden md:inline font-bold">Filters</span>
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in slide-in-from-top-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Level</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Price</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
              <option>Any Price</option>
              <option>Free</option>
              <option>Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
              <option>4.5 & up</option>
              <option>4.0 & up</option>
              <option>3.5 & up</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sort By</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
              <option>Newest</option>
              <option>Most Popular</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <Link to={`/course/${i}`} key={i} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all hover:border-blue-300">
            <div className="aspect-video bg-slate-100 rounded-t-2xl overflow-hidden relative">
              <img src={`https://picsum.photos/seed/learn${i}/600/400`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Filter className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mb-2">
                <Star className="w-3 h-3 fill-current" />
                <span>4.8</span>
                <span className="text-slate-400 font-normal ml-1">(2.1k)</span>
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {i % 2 === 0 ? 'Advanced React Architecture with Next.js' : 'The UI/UX Design Fundamentals for 2024'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">John Doe, Senior Lead</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black">$14.99</span>
                  <span className="text-xs text-slate-400 line-through">$49.99</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-tighter px-2 py-1 bg-slate-100 rounded text-slate-600">Intermediate</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          Load More Courses
        </button>
      </div>
    </div>
  );
};

export default CourseCatalog;
