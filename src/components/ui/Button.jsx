"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Original Button — unchanged, works everywhere else on your site
// ─────────────────────────────────────────────────────────────────────────────
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary:   "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300",
    secondary: "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white border border-gray-700 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300",
    ghost:     "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white bg-transparent border border-white/20 hover:bg-white/10 transition-all duration-300",
    rocket:    "inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full text-purple-200 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(192,132,252,0.9)] hover:scale-105 transition-all duration-300 relative overflow-hidden",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

// ─────────────────────────────────────────────────────────────────────────────
// Event Horizon Button
// Usage: <EventHorizonButton label="Event Horizon" onClick={fn} />
// ─────────────────────────────────────────────────────────────────────────────
const EH_CSS = `
  @property --eh-a { syntax:'<angle>'; inherits:false; initial-value:0deg; }
  @keyframes eh-spin    { to { --eh-a: 360deg; } }
  @keyframes eh-flame   { 0%,100%{transform:scaleX(1) scaleY(1)} 50%{transform:scaleX(1.25) scaleY(.8)} }
  @keyframes eh-flicker { 0%,100%{opacity:.9} 50%{opacity:.55} }
  @keyframes eh-smoke   { 0%{transform:translate(0,0) scale(.6);opacity:.7} 100%{transform:translate(var(--sx,0px),var(--sy,18px)) scale(2);opacity:0} }
  @keyframes eh-shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-1.5px)} 75%{transform:translateX(1.5px)} }
  @keyframes eh-trail   { 0%{transform:scaleX(1) translateX(0);opacity:.7} 100%{transform:scaleX(0) translateX(-12px);opacity:0} }
  @keyframes eh-glow    { 0%,100%{box-shadow:0 0 10px 3px rgba(120,0,240,.25),0 0 20px 5px rgba(80,0,200,.15)} 50%{box-shadow:0 0 16px 4px rgba(170,50,255,.35),0 0 32px 8px rgba(120,0,240,.2)} }
  @keyframes eh-txt     { 0%,100%{text-shadow:0 0 10px rgba(190,130,255,.5)} 50%{text-shadow:0 0 22px rgba(225,175,255,.95),0 0 44px rgba(170,80,255,.5)} }

  .eh-wrap {
    position:relative; display:inline-block;
    padding:2.5px; border-radius:100px;
    background:conic-gradient(from var(--eh-a),#0d1a4a,#1e3a8a,#4f46e5,#818cf8,#3b82f6,#1e3a8a,#0d1a4a);
    animation:eh-spin 3.5s linear infinite;
    transition:transform .4s cubic-bezier(.34,1.56,.64,1);
    cursor:pointer;
  }
  .eh-wrap:hover { animation-duration:1s; transform:scale(1.04) translateY(-2px); }
  .eh-wrap::before {
    content:''; position:absolute; inset:-12px; border-radius:100px;
    background:conic-gradient(from var(--eh-a),rgba(100,0,220,.25),rgba(200,100,255,.15),rgba(70,0,180,.22),rgba(100,0,220,.25));
    filter:blur(12px); z-index:-1; animation:eh-spin 3.5s linear infinite;
  }
  .eh-wrap:hover::before { animation-duration:1s; filter:blur(18px); }

  .eh-btn {
    display:flex; align-items:center; gap:16px;
    padding:0 24px 0 16px; height:46px; border-radius:100px;
    background:linear-gradient(160deg,#130030,#09001e,#0d0026);
    border:none; cursor:pointer; position:relative; overflow:hidden;
    animation:eh-glow 3s ease-in-out infinite;
    transition:background .4s;
  }
  .eh-btn:hover { background:linear-gradient(160deg,#1d0048,#110034,#180042); }
  .eh-btn::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(200,150,255,.08),transparent);
    transform:translateX(-100%); transition:transform .6s ease;
  }
  .eh-btn:hover::after { transform:translateX(100%); }

  .eh-rocket { position:relative; width:36px; height:36px; flex-shrink:0; }
  .eh-rocket-svg { display:block; transition:transform .5s cubic-bezier(.34,1.2,.64,1),filter .4s; }
  .eh-btn:hover .eh-rocket-svg { transform:translateY(-6px); filter:drop-shadow(0 0 6px rgba(200,120,255,.6)) drop-shadow(0 0 12px rgba(140,40,255,.4)); }
  .eh-btn:not(:hover) .eh-rocket-svg { animation:eh-shake 2.5s ease-in-out infinite; }

  .eh-flame-outer,.eh-flame-inner,.eh-flame-core {
    position:absolute; left:50%; transform:translateX(-50%);
    border-radius:0 0 40% 40%; transform-origin:top center;
  }
  .eh-flame-outer { bottom:-14px; width:18px; height:22px; background:linear-gradient(180deg,rgba(120,0,240,.35),rgba(60,0,160,.15),transparent); filter:blur(5px); animation:eh-flame .2s ease-in-out infinite,eh-flicker .3s ease-in-out infinite; }
  .eh-flame-inner { bottom:-10px; width:12px; height:18px; background:linear-gradient(180deg,rgba(190,100,255,.75),rgba(120,20,255,.4),transparent); filter:blur(2px); animation:eh-flame .15s ease-in-out infinite .05s; }
  .eh-flame-core  { bottom:-7px;  width:6px;  height:12px; background:linear-gradient(180deg,rgba(240,200,255,.95),rgba(180,80,255,.7),transparent); animation:eh-flame .1s ease-in-out infinite; }

  .eh-btn:hover .eh-flame-outer { height:38px; width:24px; }
  .eh-btn:hover .eh-flame-inner { height:30px; width:16px; }
  .eh-btn:hover .eh-flame-core  { height:20px; width:8px;  }

  .eh-smoke { position:absolute; border-radius:50%; background:rgba(160,80,255,.3); pointer-events:none; animation:eh-smoke .9s ease-out infinite; }
  .eh-s1{--sx:-6px;--sy:20px;width:7px;height:7px;left:11px;top:22px;}
  .eh-s2{--sx:4px;--sy:22px;width:5px;height:5px;left:17px;top:23px;animation-delay:.22s}
  .eh-s3{--sx:-3px;--sy:18px;width:4px;height:4px;left:14px;top:21px;animation-delay:.44s}
  .eh-s4{--sx:6px;--sy:16px;width:3px;height:3px;left:15px;top:22px;animation-delay:.66s}

  .eh-trails { position:absolute; right:-4px; top:50%; transform:translateY(-50%) rotate(180deg); display:flex; flex-direction:column; gap:3px; pointer-events:none; }
  .eh-trail { height:1.5px; border-radius:2px; background:linear-gradient(90deg,transparent,rgba(200,130,255,.7)); transform-origin:right center; animation:eh-trail .45s ease-out infinite; opacity:0; transition:opacity .3s; }
  .eh-btn:hover .eh-trail { opacity:1; }
  .eh-t1{width:24px;} .eh-t2{width:16px;animation-delay:.08s} .eh-t3{width:10px;animation-delay:.16s}

  .eh-label { font-size:11px; font-weight:300; letter-spacing:.24em; text-transform:uppercase; color:#d4a8ff; white-space:nowrap; animation:eh-txt 3s ease-in-out infinite; transition:color .4s,letter-spacing .4s; }
  .eh-btn:hover .eh-label { color:#ecdcff; letter-spacing:.28em; }
`;

export function EventHorizonButton({ onClick, label = "Event Horizon" }) {
  return (
    <>
      <style>{EH_CSS}</style>
      <div className="eh-wrap">
        <button className="eh-btn" onClick={onClick}>
          <div className="eh-rocket">
            <div className="eh-flame-outer" />
            <div className="eh-flame-inner" />
            <div className="eh-flame-core" />
            <div className="eh-smoke eh-s1" />
            <div className="eh-smoke eh-s2" />
            <div className="eh-smoke eh-s3" />
            <div className="eh-smoke eh-s4" />

            <svg className="eh-rocket-svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <defs>
                <linearGradient id="rBody" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#3a0090" />
                  <stop offset="50%"  stopColor="#8030d8" />
                  <stop offset="100%" stopColor="#c060f0" />
                </linearGradient>
                <linearGradient id="rNose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#e0b0ff" />
                  <stop offset="100%" stopColor="#9040e0" />
                </linearGradient>
                <radialGradient id="rWin" cx="50%" cy="40%" r="50%">
                  <stop offset="0%"   stopColor="#c080ff" />
                  <stop offset="100%" stopColor="#300070" />
                </radialGradient>
                <radialGradient id="rNozzleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(200,100,255,.6)" />
                  <stop offset="100%" stopColor="rgba(100,0,200,0)" />
                </radialGradient>
              </defs>
              <circle cx="18" cy="30" r="4" fill="url(#rNozzleGlow)" opacity=".3" />
              <path d="M13 26 L8 32 L13 29 Z"  fill="#4a00a0" stroke="rgba(160,80,255,.4)"  strokeWidth=".6" />
              <path d="M23 26 L28 32 L23 29 Z"  fill="#4a00a0" stroke="rgba(160,80,255,.4)"  strokeWidth=".6" />
              <path d="M15 28 L18 33 L21 28 Z"  fill="#5800b8" stroke="rgba(180,100,255,.4)" strokeWidth=".6" />
              <path d="M14 26 Q18 30 22 26 L21 24 Q18 27 15 24 Z" fill="#200058" stroke="rgba(140,60,220,.5)" strokeWidth=".7" />
              <rect x="13" y="12" width="10" height="17" rx="1.5" fill="url(#rBody)" stroke="rgba(200,150,255,.35)" strokeWidth=".6" />
              <rect x="14" y="13" width="2.5" height="14" rx="1" fill="rgba(220,180,255,.18)" />
              <path d="M13 12 Q18 2 23 12 Z" fill="url(#rNose)" stroke="rgba(230,190,255,.5)" strokeWidth=".7" />
              <ellipse cx="18" cy="5" rx="1.5" ry="2.5" fill="rgba(255,240,255,.45)" />
              <circle cx="18" cy="19" r="4"   fill="#0a0022" stroke="rgba(200,150,255,.7)" strokeWidth="1" />
              <circle cx="18" cy="19" r="2.5" fill="url(#rWin)" />
              <circle cx="16.8" cy="17.8" r=".9" fill="rgba(255,245,255,.75)" />
              <line x1="13" y1="16" x2="23" y2="16" stroke="rgba(180,120,255,.25)" strokeWidth=".5" />
              <line x1="13" y1="23" x2="23" y2="23" stroke="rgba(180,120,255,.2)"  strokeWidth=".5" />
              <rect x="10" y="20" width="3" height="6" rx="1" fill="#380088" stroke="rgba(150,70,220,.4)" strokeWidth=".5" />
              <rect x="23" y="20" width="3" height="6" rx="1" fill="#380088" stroke="rgba(150,70,220,.4)" strokeWidth=".5" />
            </svg>

            <div className="eh-trails">
              <div className="eh-trail eh-t1" />
              <div className="eh-trail eh-t2" />
              <div className="eh-trail eh-t3" />
            </div>
          </div>
          <span className="eh-label">{label}</span>
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reveal More Button
// Usage: <RevealMoreButton label="Reveal More" onClick={fn} />
// ─────────────────────────────────────────────────────────────────────────────
const RM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap');

  @property --rm-a { syntax:'<angle>'; inherits:false; initial-value:0deg; }
  @keyframes rm-flow         { to { --rm-a: 360deg; } }
  @keyframes rm-scan         { 0%{top:-4px;opacity:0} 5%{opacity:1} 50%{top:calc(100% + 4px);opacity:1} 55%,100%{top:-4px;opacity:0} }
  @keyframes rm-blink        { 0%,100%{opacity:1} 48%{opacity:1} 50%{opacity:0} 52%{opacity:1} }
  @keyframes rm-corner-pulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.9;transform:scale(1.2)} }
  @keyframes rm-glow-breathe { 0%,100%{box-shadow:0 0 12px 2px rgba(100,0,200,.25),inset 0 0 20px rgba(80,0,160,.06)} 50%{box-shadow:0 0 24px 6px rgba(140,20,255,.42),inset 0 0 32px rgba(110,20,200,.12)} }

  .rm-outer { position:relative; display:inline-block; }

  .rm-ring {
    position:absolute; inset:-2px; border-radius:6px;
    background:conic-gradient(from var(--rm-a),#0d1a4a,#1e3a8a,#4f46e5,#818cf8,#3b82f6,#1e3a8a,#0d1a4a);
    animation:rm-flow 5s linear infinite;
    z-index:0;
  }
  .rm-ring::after { content:''; position:absolute; inset:2px; background:#060d1f; border-radius:5px; }

  .rm-btn {
    position:relative; z-index:1;
    display:flex; align-items:center; gap:14px;
    padding:0 24px; height:46px; border-radius:6px;
    background:linear-gradient(160deg,#0a1428,#060e1c,#081020);
    border:none; cursor:pointer; overflow:hidden;
    animation:rm-glow-breathe 3s ease-in-out infinite;
    transition:background .4s;
    clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
  }
  .rm-btn:hover { background:linear-gradient(160deg,#1a0048,#10002e,#160040); }

  .rm-scan {
    position:absolute; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(180,90,255,.8),rgba(220,160,255,1),rgba(180,90,255,.8),transparent);
    top:-4px; pointer-events:none;
    animation:rm-scan 3.5s ease-in-out infinite;
    box-shadow:0 0 8px 3px rgba(180,80,255,.4);
  }

  .rm-corner { position:absolute; width:10px; height:10px; animation:rm-corner-pulse 2.2s ease-in-out infinite; }
  .rm-corner.tl { top:-1px; left:-1px;   border-top:1.5px solid rgba(200,120,255,.8); border-left:1.5px solid rgba(200,120,255,.8); }
  .rm-corner.tr { top:-1px; right:-1px;  border-top:1.5px solid rgba(200,120,255,.8); border-right:1.5px solid rgba(200,120,255,.8); animation-delay:.55s; }
  .rm-corner.bl { bottom:-1px; left:-1px;  border-bottom:1.5px solid rgba(200,120,255,.8); border-left:1.5px solid rgba(200,120,255,.8); animation-delay:1.1s; }
  .rm-corner.br { bottom:-1px; right:-1px; border-bottom:1.5px solid rgba(200,120,255,.8); border-right:1.5px solid rgba(200,120,255,.8); animation-delay:1.65s; }

  .rm-eye { flex-shrink:0; transition:filter .4s, transform .4s; }
  .rm-btn:hover .rm-eye { filter:drop-shadow(0 0 7px rgba(200,120,255,1)); transform:scale(1.15); }

  .rm-label {
    font-family:'JetBrains Mono', monospace;
    font-size:11px; font-weight:300; letter-spacing:.2em; text-transform:uppercase;
    color:#c090e8; min-width:106px;
    text-shadow:0 0 10px rgba(180,90,255,.5);
    transition:color .3s, text-shadow .3s;
  }
  .rm-btn:hover .rm-label { color:#e8d4ff; text-shadow:0 0 16px rgba(210,150,255,.9), 0 0 32px rgba(160,60,255,.5); }

  .rm-cursor {
    display:inline-block; width:2px; height:14px;
    background:rgba(200,130,255,.8); margin-left:2px;
    vertical-align:middle; animation:rm-blink 1s step-end infinite;
  }

  .rm-tag {
    position:absolute; bottom:-20px; right:0;
    font-size:9px; letter-spacing:.18em;
    color:rgba(120,50,200,.4); text-transform:uppercase;
    font-family:'JetBrains Mono', monospace;
  }
`;

const RM_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

export function RevealMoreButton({ onClick, label = "Reveal More" }) {
  const [hovered, setHovered] = useState(false);
  const [chars, setChars] = useState(label);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (hovered) {
      frameRef.current = 0;
      intervalRef.current = setInterval(() => {
        frameRef.current++;
        const progress = Math.min(frameRef.current / 18, 1);
        const revealed = Math.floor(progress * label.length);
        setChars(
          label.split("").map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            return RM_ALPHABET[Math.floor(Math.random() * RM_ALPHABET.length)];
          }).join("")
        );
        if (progress >= 1) clearInterval(intervalRef.current);
      }, 40);
    } else {
      clearInterval(intervalRef.current);
      frameRef.current = 0;
      setChars(label);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, label]);

  return (
    <>
      <style>{RM_CSS}</style>
      <div
        className="rm-outer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="rm-ring" />
        <div className="rm-corner tl" />
        <div className="rm-corner tr" />
        <div className="rm-corner bl" />
        <div className="rm-corner br" />

        <button className="rm-btn" onClick={onClick}>
          <div className="rm-scan" />

          <svg className="rm-eye" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 9C2 9 4.8 4 9 4s7 5 7 5-2.8 5-7 5-7-5-7-5z" stroke="#b070f0" strokeWidth="1.3" />
            <circle cx="9" cy="9" r="2.8" fill="#9040d8" stroke="rgba(210,150,255,.6)" strokeWidth=".8" />
            <circle cx="9" cy="9" r="1.3" fill="#e0c0ff" />
            <circle cx="8.1" cy="8.1" r=".6" fill="rgba(255,250,255,.8)" />
          </svg>

          <span className="rm-label">
            {chars}
            <span className="rm-cursor" style={{ display: hovered ? "inline-block" : "none" }} />
          </span>
        </button>

        <span className="rm-tag">// classified</span>
      </div>
    </>
  );
}