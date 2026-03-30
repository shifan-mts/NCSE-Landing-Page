import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';

const HERO_STYLES = `
  @keyframes h-shimmer {
    0%   { left: -80%; }
    100% { left: 160%; }
  }
  @keyframes h-scan {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes h-float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-5px); }
  }
  @keyframes h-pulse-ring {
    0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.55; }
    100% { transform: translate(-50%,-50%) scale(1.85); opacity: 0; }
  }

  .h-primary-wrap { animation: h-float 3.2s ease-in-out infinite; display: inline-block; }
  .h-primary-btn .h-shimmer { animation: h-shimmer 2.4s linear infinite; }
  .h-secondary-btn .h-scan   { animation: h-scan   3s   linear infinite; }

  /* arrow slide on hover */
  .h-primary-btn:hover  .h-arrow { transform: translateX(4px); }
  .h-secondary-btn:hover .h-arrow { transform: translateX(4px); }
  .h-arrow { transition: transform 0.22s ease; display: inline-flex; align-items: center; }
`;

export default function Hero() {
  return (
    <Section className="min-h-screen flex items-center" overlay>
      <style>{HERO_STYLES}</style>

      {/* Subtle radial bg tints */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse at 8%  10%,  rgba(59,130,246,0.08) 0, transparent 50%)',
          'radial-gradient(ellipse at 92% 90%,  rgba(139,92,246,0.08) 0, transparent 50%)',
        ].join(','),
      }} />

      <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.45 }}
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

            {/* ── PRIMARY: Explore Events ── */}
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <div className="h-primary-wrap" style={{ position: 'relative' }}>

                {/* Pulsing ring behind button */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: '100%', height: '100%',
                  borderRadius: '14px',
                  border: '1px solid rgba(59,130,246,0.35)',
                  animation: 'h-pulse-ring 2.2s ease-out infinite',
                  pointerEvents: 'none',
                }} />

                {/* Outer glowing border layer */}
                <div style={{
                  padding: '1.5px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                  boxShadow: '0 0 24px rgba(59,130,246,0.35), 0 0 50px rgba(139,92,246,0.18)',
                }}>
                  <motion.button
                    className="h-primary-btn"
                    whileHover={{ boxShadow: '0 8px 40px rgba(59,130,246,0.5), 0 0 60px rgba(139,92,246,0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      position: 'relative',
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      padding: '13px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)',
                      color: 'white',
                      fontWeight: 700, fontSize: '15px', letterSpacing: '0.03em',
                      cursor: 'pointer', overflow: 'hidden',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Inner shimmer */}
                    <div className="h-shimmer" style={{
                      position: 'absolute', top: 0, left: '-80%',
                      width: '55%', height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                      pointerEvents: 'none', zIndex: 1,
                    }} />
                    {/* Rocket icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 2 }}>
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="white" opacity="0.75" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="white" />
                    </svg>
                    <span style={{ position: 'relative', zIndex: 2 }}>Ignite Events 🔥</span>
                    {/* Sliding arrow */}
                    <span className="h-arrow" style={{ position: 'relative', zIndex: 2 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <polyline points="9,5 16,12 9,19" stroke="rgba(255,255,255,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.button>
                </div>
              </div>
            </Link>

            {/* ── SECONDARY: Learn More ── */}
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <motion.button
                className="h-secondary-btn"
                whileHover={{
                  borderColor: 'rgba(139,92,246,0.9)',
                  boxShadow: '0 0 28px rgba(139,92,246,0.4), 0 0 60px rgba(59,130,246,0.15), inset 0 0 20px rgba(139,92,246,0.08)',
                }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '13px 32px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(139,92,246,0.38)',
                  background: 'rgba(15,23,42,0.5)',
                  backdropFilter: 'blur(18px)',
                  color: 'white',
                  fontWeight: 700, fontSize: '15px', letterSpacing: '0.03em',
                  cursor: 'pointer', overflow: 'hidden',
                  boxShadow: '0 0 14px rgba(139,92,246,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                {/* Scan line */}
                <div className="h-scan" style={{
                  position: 'absolute', top: 0, left: '-100%',
                  width: '40%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)',
                  pointerEvents: 'none', zIndex: 1,
                }} />

                {/* Magnifying glass icon — slides slightly on hover via h-arrow class */}
                <span className="h-arrow" style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="mgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                    <circle cx="11" cy="11" r="7" stroke="url(#mgGrad)" strokeWidth="2" fill="none" />
                    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="url(#mgGrad)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>

                <span style={{
                  position: 'relative', zIndex: 2,
                  background: 'linear-gradient(90deg, #e2e8f0, #c4b5fd)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Uncover
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
