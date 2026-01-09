
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, Star, Search, SlidersHorizontal, ChevronDown, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store';

const CourseCatalog = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const mockCourses = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    id: i.toString(),
    title: i % 2 === 0 ? 'Advanced React Architecture with Next.js' : 'The UI/UX Design Fundamentals for 2024',
    instructor: 'John Doe, Senior Lead',
    price: 14.99,
    rating: 4.8,
    reviews: '2.1k',
    thumbnail: `https://picsum.photos/seed/learn${i}/600/400`,
    level: 'Intermediate'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

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
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Price</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
              <option>Any Price</option>
              <option>Free</option>
              <option>Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
              <option>4.5 & up</option>
              <option>4.0 & up</option>
              <option>3.5 & up</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sort By</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
              <option>Newest</option>
              <option>Most Popular</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockCourses.map(course => (
          <div key={course.id} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all hover:border-blue-300">
            <Link to={`/course/${course.id}`} className="aspect-video bg-slate-100 rounded-t-2xl overflow-hidden relative">
              <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Filter className="w-4 h-4 text-blue-600" />
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mb-2">
                <Star className="w-3 h-3 fill-current" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal ml-1">({course.reviews})</span>
              </div>
              <Link to={`/course/${course.id}`}>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {course.title}
                </h3>
              </Link>
              <p className="text-xs text-slate-500 mb-4">{course.instructor}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900">${course.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">{course.level}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addItem(course);
                  }}
                  className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all group/btn"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
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
