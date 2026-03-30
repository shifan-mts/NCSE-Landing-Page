import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_STYLES = `
  @keyframes nb-sweep {
    0%   { left: -80%; }
    100% { left: 160%; }
  }
  @keyframes nb-glow-pulse {
    0%,100% { box-shadow: 0 0 10px rgba(139,92,246,0.35), 0 0 24px rgba(59,130,246,0.15); }
    50%      { box-shadow: 0 0 18px rgba(139,92,246,0.6),  0 0 40px rgba(59,130,246,0.28); }
  }
  .nb-join-btn { animation: nb-glow-pulse 2.8s ease-in-out infinite; }
  .nb-join-btn:hover .nb-sweep { animation: nb-sweep 0.85s linear infinite; }
  .nb-join-btn:hover { transform: scale(1.04); }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home',    path: '/' },
        { name: 'Events',  path: '/events' },
        { name: 'About',   path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
            }`}>
            <style>{NAV_STYLES}</style>

            <div className="container flex items-center justify-between">
                <NavLink to="/" className="text-2xl font-bold gradient-text no-underline">
                    NCSE
                </NavLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {/* Premium "Join Us" button */}
                    <NavLink to="/contact" style={{ textDecoration: 'none' }}>
                        {/* Outer gradient border */}
                        <div style={{
                            padding: '1.5px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6)',
                        }}>
                            <button
                                className="nb-join-btn"
                                style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                    padding: '8px 22px',
                                    borderRadius: '9px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, rgba(15,20,50,0.95) 0%, rgba(30,30,70,0.95) 100%)',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    letterSpacing: '0.04em',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    transition: 'transform 0.22s cubic-bezier(.34,1.56,.64,1)',
                                }}
                            >
                                {/* Sweep light */}
                                <div className="nb-sweep" style={{
                                    position: 'absolute', top: 0, left: '-80%',
                                    width: '55%', height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                    pointerEvents: 'none', zIndex: 1,
                                }} />

                                {/* Spark icon */}
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 2 }}>
                                    <defs>
                                        <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#93c5fd" />
                                            <stop offset="100%" stopColor="#c4b5fd" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#sparkGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>

                                <span style={{
                                    position: 'relative', zIndex: 2,
                                    background: 'linear-gradient(90deg, #93c5fd, #c4b5fd)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    Plug In 
                                </span>
                            </button>
                        </div>
                    </NavLink>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white bg-transparent border-none cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-4 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <NavLink to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
                                                <div style={{
      padding: '1.5px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6)',
  }}>
    <button
      className="nb-join-btn w-full"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 22px',
        borderRadius: '9px',
        border: 'none',
        background: 'linear-gradient(135deg, rgba(15,20,50,0.95) 0%, rgba(30,30,70,0.95) 100%)',
        color: 'white',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 0.22s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      {/* Sweep light */}
      <div className="nb-sweep" style={{
          position: 'absolute', top: 0, left: '-80%',
          width: '55%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Spark icon with unique gradient ID for mobile */}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 2 }}>
          <defs>
              <linearGradient id="sparkGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
          </defs>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#sparkGradMobile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>

      <span style={{
          position: 'relative', zIndex: 2,
          background: 'linear-gradient(90deg, #93c5fd, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
          Plug In
      </span>
    </button>
  </div>
</NavLink>
</div>
</motion.div>
                )}
                </AnimatePresence>
                </nav>
    );
};

export default Navbar;