
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { UserRole } from '../types';
import { Shield, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful login
    login({
      id: '1',
      name: email.split('@')[0],
      email,
      role
    });
    navigate(role === UserRole.ADMIN ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="opacity-80">Log in to continue your journey</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {/* Role Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole(UserRole.STUDENT)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${role === UserRole.STUDENT ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <User className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole(UserRole.ADMIN)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${role === UserRole.ADMIN ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Shield className="w-4 h-4" /> Instructor
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</button>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Sign In
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500 uppercase">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium transition-all">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium transition-all">
              <img src="https://www.facebook.com/favicon.ico" className="w-4 h-4" alt="Facebook" /> Facebook
            </button>
          </div>
        </form>

        <div className="p-8 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account? <button className="font-bold text-blue-600 hover:underline">Sign up for free</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
