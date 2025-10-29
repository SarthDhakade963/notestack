"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  FileText,
  BookOpen,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
    isSignup: boolean
  ) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(isSignup ? "Account created successfully!" : "Login successful!");
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300 rounded-full opacity-25 blur-2xl animate-pulse delay-2000"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse top-10 left-10"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse top-20 left-1/4 delay-500"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse top-32 left-1/3 delay-1000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse top-48 right-1/4 delay-1500"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse top-64 right-1/3 delay-2000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse bottom-32 left-1/4 delay-2500"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse bottom-48 right-1/4 delay-3000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse bottom-64 left-1/3 delay-3500"></div>
        </div>

        <div className="relative z-10 text-center max-w-xl">
          <div className="flex items-center justify-center mb-8 group">
            <div className="bg-white p-5 rounded-3xl shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <GraduationCap className="w-14 h-14 text-blue-600" />
            </div>
          </div>

          <h1 className="text-7xl font-black mb-6 text-white tracking-tight">
            NodeStack
          </h1>

          <p className="text-2xl text-blue-50 mb-12 leading-relaxed font-light">
            Organize your thoughts with elegance and ease.
          </p>

          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-white opacity-80" />
              </div>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/30 transform transition-all duration-300 hover:scale-105 hover:bg-white/30 cursor-pointer">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Manage Notes</span>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/30 transform transition-all duration-300 hover:scale-105 hover:bg-white/30 cursor-pointer">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Update Notes</span>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/30 transform transition-all duration-300 hover:scale-105 hover:bg-white/30 cursor-pointer">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Delete Notes</span>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure & Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-10">
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold ml-4 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NodeStack
            </h1>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100 relative overflow-hidden">
            {/* Decorative linear */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </h2>
                <p className="text-gray-600 text-lg">
                  {isLogin
                    ? "Sign in to continue your journey"
                    : "Create your account to begin"}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {!isLogin && (
                  <div className="transform transition-all duration-300">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="placeholder:text-gray-400 w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="placeholder:text-gray-400 w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="placeholder:text-gray-400 w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-200 p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => handleSubmit(e, !isLogin)}
                  className="w-full py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 mt-8 text-lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </div>

              {/* Toggle Mode */}
              <div className="mt-10 text-center">
                <p className="text-gray-600 text-[15px]">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={toggleMode}
                    className="text-blue-600 font-bold hover:text-indigo-600 transition-colors duration-200 underline decoration-2 underline-offset-2"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="font-semibold text-gray-700">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-gray-700">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
