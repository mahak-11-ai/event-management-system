import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Eye, EyeOff, Key, Phone, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Clock effect matching Luma's header timestamp
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeFormatted = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
      
      // Get timezone abbreviation (e.g. IST, PST, etc.)
      const tz = now.toString().match(/\(([A-Za-z\s]+)\)$/)?.[1] || 
                 now.toTimeString().split(' ')[2] || '';
      
      setTimeString(`${timeFormatted} ${tz}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error on edit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        formData
      );

      if (response.data.success && response.data.token) {
        setIsSuccess(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Short delay for success animation before navigating
        setTimeout(() => {
          if (response.data.user.role === "organizer") {
            navigate("/create-event");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setError(response.data.message || 'Login failed.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#1f2124_0%,_#131517_100%)] text-white font-sans flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 border-b border-white/[0.03]">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity">
            nexus<span className="text-white/50 font-normal">+</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-white/60">
          <span className="hidden sm:inline font-mono text-xs tracking-wider uppercase text-white/40">{timeString}</span>
          <Link to="/" className="hover:text-white transition-colors">Discover Events</Link>
          <Link to="/signup" className="bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.08] rounded-full px-4 py-1.5 font-medium transition-all text-xs">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 my-8">
        {/* Glassmorphic Card */}
        <div className="w-full max-w-[440px] bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_48px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
          {/* Top glowing ambient effect inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 bg-white/10 rounded-full border border-white/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
              <p className="text-sm text-white/50 mb-6">
                Login successful. Redirecting to home...
              </p>
              <Loader2 className="w-6 h-6 animate-spin text-white/70" />
            </div>
          ) : (
            <div>
              {/* Icon */}
              <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center mb-6 shadow-sm">
                <LogIn className="w-5 h-5 text-white/80" />
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                Welcome Back
              </h1>
              <p className="text-sm text-white/50 mb-8">
                Please sign in to access your account.
              </p>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 flex items-start gap-2.5 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Email
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Mobile login is coming soon!")}
                      className="text-[11px] font-medium text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      Use Mobile Number
                    </button>
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                {/* Password field */}
                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-medium text-white/40 hover:text-white/60 transition-colors flex items-center gap-1 outline-none"
                    >
                      {showPassword ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          Show
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black font-semibold text-sm py-3 px-4 rounded-xl hover:bg-white/95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_4px_12px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-white/[0.06]"></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30 px-3">or</span>
                <div className="flex-1 h-[1px] bg-white/[0.06]"></div>
              </div>

              {/* Social logins */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => alert("Google login is currently unavailable.")}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  Sign in with Google
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-xs text-white/40">
                Don't have an account?{' '}
                <Link to="/signup" className="text-white hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-white/20 border-t border-white/[0.03]">
        © {new Date().getFullYear()} Nexus. All rights reserved.
      </footer>
    </div>
  );
}

export default LoginPage;