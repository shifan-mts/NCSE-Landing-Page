import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';

const HERO_BTN_STYLES = `
  @keyframes hero-spin-border {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hero-shimmer {
    0% { left: -80%; }
    100% { left: 160%; }
  }
  @keyframes hero-scan {
    0% { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes hero-pulse-ring {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
  }
  @keyframes hero-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  .hero-primary-btn:hover .hero-shimmer { animation: hero-shimmer 0.9s linear infinite; }
  .hero-secondary-btn:hover .hero-scan { animation: hero-scan 1.2s linear infinite; }
`;

const Hero = () => {
    return (
        <Section className="min-h-screen flex items-center" overlay>
            <style>{HERO_BTN_STYLES}</style>

            {/* Subtle radial bg accents */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.07) 0, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.07) 0, transparent 55%)',
            }} />

            <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-semibold text-sm mb-6"
                    >
                        Welcome to NCSE
                    </motion.span>

                    <h1 className="mb-6">
                        <GradientText tag="span">NCSE</GradientText><br />
                        <span className="text-[0.8em] text-slate-100">College Name</span>
                    </h1>

                    <p className="max-w-2xl mx-auto mb-12 text-xl md:text-2xl text-slate-400">
                        "Innovating for a tech-driven tomorrow, one student at a time."
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center items-center">

                        {/* ── PRIMARY: Explore Events ── spinning border + shimmer */}
                        <Link to="/events" style={{ textDecoration: 'none' }}>
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ position: 'relative', display: 'inline-block', animation: 'hero-float 3s ease-in-out infinite' }}
                            >
                                {/* Spinning conic-gradient border */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '-3px',
                                    borderRadius: '9999px',
                                    overflow: 'hidden',
                                    zIndex: 0,
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: '-100%',
                                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #f59e0b, #3b82f6)',
                                        animation: 'hero-spin-border 2.5s linear infinite',
                                    }} />
                                </div>

                                {/* Pulse rings */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%', left: '50%',
                                    width: '100%', height: '100%',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(59,130,246,0.4)',
                                    animation: 'hero-pulse-ring 2s ease-out infinite',
                                    pointerEvents: 'none',
                                }} />

                                <motion.button
                                    className="hero-primary-btn"
                                    whileTap={{ scale: 0.96 }}
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '15px 40px',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)',
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '16px',
                                        letterSpacing: '0.04em',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 32px rgba(59,130,246,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset',
                                    }}
                                >
                                    {/* Shimmer sweep */}
                                    <div
                                        className="hero-shimmer"
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: '-80%',
                                            width: '60%', height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
                                            pointerEvents: 'none',
                                            zIndex: 2,
                                            animation: 'hero-shimmer 2.2s linear infinite',
                                        }}
                                    />
                                    {/* Rocket icon */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 3 }}>
                                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="white" opacity="0.8" />
                                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="white" />
                                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" fill="white" opacity="0.6" />
                                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill="white" opacity="0.6" />
                                    </svg>
                                    <span style={{ position: 'relative', zIndex: 3 }}>Explore Events</span>
                                </motion.button>
                            </motion.div>
                        </Link>

                        {/* ── SECONDARY: Learn More ── holographic glass + scan */}
                        <Link to="/about" style={{ textDecoration: 'none' }}>
                            <motion.button
                                className="hero-secondary-btn"
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '15px 40px',
                                    borderRadius: '9999px',
                                    border: '1.5px solid rgba(139,92,246,0.5)',
                                    background: 'rgba(15,23,42,0.55)',
                                    backdropFilter: 'blur(20px)',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    letterSpacing: '0.04em',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.18), inset 0 0 20px rgba(139,92,246,0.05)',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                }}
                                whileHover={{
                                    borderColor: 'rgba(139,92,246,0.9)',
                                    boxShadow: '0 0 35px rgba(139,92,246,0.45), inset 0 0 25px rgba(139,92,246,0.1)',
                                }}
                            >
                                {/* Scan line */}
                                <div
                                    className="hero-scan"
                                    style={{
                                        position: 'absolute',
                                        top: 0, left: '-100%',
                                        width: '45%', height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), rgba(59,130,246,0.15), transparent)',
                                        pointerEvents: 'none',
                                        zIndex: 1,
                                        animation: 'hero-scan 2.8s linear infinite',
                                    }}
                                />
                                {/* Info icon */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 2 }}>
                                    <defs>
                                        <linearGradient id="infoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#60a5fa" />
                                            <stop offset="100%" stopColor="#a78bfa" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="12" cy="12" r="10" stroke="url(#infoGrad)" strokeWidth="2" fill="none" />
                                    <line x1="12" y1="8" x2="12" y2="8" stroke="url(#infoGrad)" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="12" y1="12" x2="12" y2="16" stroke="url(#infoGrad)" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #e2e8f0, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Learn More
                                </span>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
};

export default Hero;
