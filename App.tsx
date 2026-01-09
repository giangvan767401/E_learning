
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User as UserIcon, 
  BookOpen, 
  LayoutDashboard, 
  LogOut, 
  TrendingUp,
  BrainCircuit,
  Award
} from 'lucide-react';
import { useAuthStore } from './store';
import { UserRole } from './types';

// Page Components (Mocked for structure)
import LandingPage from './pages/LandingPage';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PredictionPage from './pages/PredictionPage';
import CourseLearning from './pages/CourseLearning';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lumina
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-600 hover:text-blue-600 font-medium">Explore</Link>
              {isAuthenticated && user?.role === UserRole.STUDENT && (
                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium">My Learning</Link>
              )}
              {isAuthenticated && user?.role === UserRole.ADMIN && (
                <Link to="/admin" className="text-slate-600 hover:text-blue-600 font-medium">Instructor</Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-slate-600 font-medium">Log in</Link>
                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Join Free</Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4">
          <Link to="/courses" className="block text-slate-600 font-medium">Explore Courses</Link>
          <hr />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block text-slate-600 font-medium">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg">Log in</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/learn/:id" element={<CourseLearning />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/predict" element={<PredictionPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-slate-300 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Lumina</h3>
              <p className="text-sm">Empowering learners worldwide with cutting-edge technology and world-class content.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Admin</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/admin">Instructor Portal</Link></li>
                <li><Link to="/admin/predict">AI Predictions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-sm">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © 2024 Lumina Learning Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
