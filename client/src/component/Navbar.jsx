import React from 'react';
import { Link, useLocation } from 'react-router-dom';
 
function Navbar() {
  const location = useLocation();
  return (
    <div>
      <header className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 border-b border-white/[0.03]">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            nexus<span className="text-white/50 font-normal">+</span>
          </Link>
        </div>
 
        <div className="flex items-center gap-6 text-sm text-white/60">
          {/* <span className="hidden sm:inline font-mono text-xs tracking-wider uppercase text-white/40">{timeString}</span> */}
          <Link to="/" className="hover:text-white transition-colors">
            Discover Events
          </Link>
          {!localStorage.getItem('token') ? (
            <Link
              to={location.pathname === '/signup' ? '/login' : '/signup'}
              className="bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.08] rounded-full px-4 py-1.5 font-medium transition-all text-xs"
            >
              {location.pathname === '/signup' ? 'Sign In' : 'Sign Up'}
            </Link>
          ) : null}
 
          {localStorage.getItem('role') === 'organizer' &&
            localStorage.getItem('token') && (
              <Link
                to="/createEvent"
                className="bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.08] rounded-full px-4 py-1.5 font-medium transition-all text-xs"
              >
                Create Event
              </Link>
            )}
        </div>
      </header>
    </div>
  );
}
 
export default Navbar;
 
 