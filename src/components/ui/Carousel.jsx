import { useState, useEffect, useRef, useCallback } from "react";

const STYLES = `
  @keyframes c-ripple {
    0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.7; }
    100% { transform: translate(-50%,-50%) scale(5); opacity: 0; }
  }
  @keyframes c-border-glow {
    0%,100% { box-shadow: 0 0 10x rgba(139,92,246,0.25), 0 0 20px rgba(59,130,246,0.12); }
    50%      { box-shadow: 0 0 18px rgba(139,92,246,0.35),  0 0 35px rgba(59,130,246,0.18); }
}
      .c-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid rgba(139,92,246,0.45);
    background: rgba(10,14,30,0.72);
    backdrop-filter: blur(14px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), border-color 0.25s, box-shadow 0.25s, background 0.25s;
    box-shadow: 0 0 12px rgba(139,92,246,0.2), 0 2px 8px rgba(0,0,0,0.4);
    z-index: 10;
  }
  .c-nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .c-nav-btn:not(:disabled):hover {
    transform: translateY(-50%) scale(1.12);
    border-color: rgba(139,92,246,0.85);
    background: rgba(20,26,55,0.88);
    box-shadow: 0 0 20px rgba(139,92,246,0.55), 0 0 50px rgba(59,130,246,0.2), 0 4px 16px rgba(0,0,0,0.5);
  }
  .c-nav-btn:not(:disabled):active { transform: translateY(-50%) scale(0.96); }
  .c-nav-btn:not(:disabled):hover .c-arrow-left  { transform: translateX(-3px); }
  .c-nav-btn:not(:disabled):hover .c-arrow-right { transform: translateX(3px);  }
  .c-arrow-left, .c-arrow-right { transition: transform 0.22s ease; display: flex; }

  .c-dot {
    height: 8px; border-radius: 4px; border: none; cursor: pointer; padding: 0;
    transition: width 0.4s cubic-bezier(.34,1.56,.64,1), background 0.3s, box-shadow 0.3s, transform 0.2s;
    background: rgba(255,255,255,0.18);
    width: 8px;
  }
  .c-dot.active {
    width: 26px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    box-shadow: 0 0 10px rgba(139,92,246,0.7);
  }
  .c-dot:not(.active):hover {
    background: rgba(255,255,255,0.38);
    transform: scale(1.2);
  }
`;

function CircularNavBtn({ direction, onClick, disabled }) {
  const isPrev = direction === "prev";
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), 700);
    onClick();
  };

  return (
    <button
      className="c-nav-btn"
      style={{ [isPrev ? "left" : "right"]: "6px" }}
      onClick={handleClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous" : "Next"}
    >
      {ripples.map((rp) => (
        <span
          key={rp.id}
          style={{
            position: "absolute", left: rp.x, top: rp.y,
            width: "60px", height: "60px", borderRadius: "50%",
            background: "rgba(139,92,246,0.3)", pointerEvents: "none",
            animation: "c-ripple 0.7s ease-out forwards",
          }}
        />
      ))}

      <span className={isPrev ? "c-arrow-left" : "c-arrow-right"}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id={isPrev ? "arrowGL" : "arrowGR"} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
          {isPrev
            ? <polyline points="15,5 8,12 15,19" stroke={`url(#arrowGL)`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            : <polyline points="9,5 16,12 9,19"  stroke={`url(#arrowGR)`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          }
        </svg>
      </span>
    </button>
  );
}

export function ImageGallery({ images }) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef(null);

  useEffect(() => {
    const load = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        s2.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(s2);
      };
      document.body.appendChild(s1);
    };
    load();
  }, []);

  const onClick = (i) => { if (!disabled) setOpened(i); };
  const onInPlace = (i) => setInPlace(i);

  const next = useCallback(() => {
    setOpened((c) => (c + 1 >= images.length ? 0 : c + 1));
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((c) => (c - 1 < 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  useEffect(() => setDisabled(true),  [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (!gsapReady) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current); };
  }, [opened, gsapReady, next]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%" }}>
      <style>{STYLES}</style>

      {/* Gallery row: circular side buttons + frame */}
      <div style={{ position: "relative", width: "100%", maxWidth: "960px", padding: "0 58px", boxSizing: "border-box" }}>
        {/* Glowing border frame */}
        <div
          style={{
            position: "relative",
            padding: "2px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(139,92,246,0.45) 0%, rgba(59,130,246,0.35) 50%, rgba(139,92,246,0.45) 100%)",
            animation: "c-border-glow 3s ease-in-out infinite",
            boxShadow: `0 18px 40px rgba(0,0,0,0.35),0 0 25px rgba(139,92,246,0.25),0 0 45px rgba(59,130,246,0.15)`,
            filter: "drop-shadow(0 0 35px rgba(139,92,246,0.35))",
          }}
        >
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "18px",width: "100%", aspectRatio: "16/9" , boxShadow: "0 12px 30px rgba(0,0,0,0.35), 0 0 18px rgba(139,92,246,0.18), inset 0 0 12px rgba(255,255,255,0.04)"}}>
            {gsapReady &&
              images.map((image, i) => (
                <div
                  key={`img-${i}`}
                  style={{
                    position: "absolute", inset: 0,
                    zIndex: inPlace === i ? i : images.length + 1,
                  }}
                >
                  <GalleryImage
                    total={images.length} id={i}
                    url={image.url} title={image.title}
                    open={opened === i} inPlace={inPlace === i}
                    onInPlace={onInPlace}
                  />
                </div>
              ))}

            {/* Dot tabs (SVG overlay inside image) */}
            <div style={{ position: "absolute", inset: 0, zIndex: 100, pointerEvents: "none",  background:
      "linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)" }}>
              <Tabs images={images} onSelect={onClick} opened={opened} />
            </div>

            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "64px", zIndex: 99, pointerEvents: "none",
              background: "linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 100%)",
            }} />
          </div>
        </div>

        {/* Circular side buttons — positioned absolute on outer padding area */}
        <CircularNavBtn direction="prev" onClick={prev} disabled={disabled} />
        <CircularNavBtn direction="next" onClick={next} disabled={disabled} />
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            className={`c-dot${opened === i ? " active" : ""}`}
            onClick={() => onClick(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── GalleryImage (GSAP circle-reveal animation, unchanged) ── */
function GalleryImage({ url, open, inPlace, id, onInPlace, total }) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef(null);

  const gap = 10, cr = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const W = 400, H = 225;
  const bigSize = cr * 700;

  const small      = () => ({ cx: W/2 - (total*(cr*2+gap)-gap)/2 + id*(cr*2+gap), cy: H - 20, r: cr });
  const smallAbove = () => ({ cx: W/2 - (total*(cr*2+gap)-gap)/2 + id*(cr*2+gap), cy: H/2,    r: cr*2 });
  const center     = () => ({ cx: W/2, cy: H/2, r: cr*7 });
  const end        = () => ({ cx: W/2 - bigSize, cy: H/2, r: bigSize });
  const start      = () => ({ cx: W/2 + bigSize, cy: H/2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !clip.current) return;
    setLoaded(false);

    const fd = firstLoad ? 0 : duration;
    const ud = firstLoad ? 0 : 0.2;
    const bd = firstLoad ? 0.01 : 1;
    const dl = firstLoad ? 0 : fd + ud;

    if (open) {
      gsap.timeline()
        .set(clip.current, { ...defaults, ...small() })
        .to(clip.current,  { ...defaults, ...center(), duration: ud, ease: "power3.inOut" })
        .to(clip.current,  { ...defaults, ...end(),    duration: fd, ease: "power4.in", onComplete: () => onInPlace(id) });
    } else {
      gsap.timeline({ overwrite: true })
        .set(clip.current, { ...defaults, ...start() })
        .to(clip.current,  { ...defaults, ...center(),   delay: dl, duration: fd, ease: "power4.out" })
        .to(clip.current,  { ...defaults, motionPath: { path: [smallAbove(), small()], curviness: 1 }, duration: bd, ease: "bounce.out" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <clipPath id={`${id}_circ`}><circle cx="0" cy="0" r={cr} ref={clip} /></clipPath>
        <clipPath id={`${id}_rect`}><rect width={W} height={H} /></clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? "_rect" : "_circ"})`}>
        <image 
          width={W} 
          height={H}
          href={url}
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: "none" }} />
      </g>
    </svg>
  );
}

/* ── Tabs (dot indicator SVG inside image) ── */
function Tabs({ images, onSelect, opened }) {
  const gap = 10, cr = 7, W = 400, H = 225;
  const px = (i) => W/2 - (images.length*(cr*2+gap)-gap)/2 + i*(cr*2+gap);
  const py = H - 20;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%" }}
    >
      {images.map((image, i) => (
        <g key={`t-${i}`} style={{ pointerEvents: "auto" }}>
          <defs>
            <clipPath id={`tc_${i}`}><circle cx={px(i)} cy={py} r={cr} /></clipPath>
          </defs>
          <image
            x={px(i)-cr} y={py-cr} width={cr*2} height={cr*2}
            href={image.url} clipPath={`url(#tc_${i})`}
            style={{ pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            cx={px(i)} cy={py} r={cr+2}
            style={{
              cursor: "pointer",
              fill: "rgba(255,255,255,0)",
              stroke: opened === i ? "rgba(167,139,250,1)" : "rgba(255,255,255,0.6)",
              strokeWidth: opened === i ? 2.5 : 1.5,
              filter: opened === i ? "drop-shadow(0 0 4px rgba(139,92,246,0.8))" : "none",
              transition: "all 0.3s",
            }}
          />
        </g>
      ))}
    </svg>
  );
}

export default ImageGallery;
