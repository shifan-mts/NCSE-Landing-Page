import { useState, useEffect, useRef, useCallback } from "react";

const ANIM_STYLES = `
  @keyframes carousel-spin-border {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes carousel-scan {
    0% { left: -60%; }
    100% { left: 130%; }
  }
  @keyframes carousel-pulse-glow {
    0%, 100% { box-shadow: 0 0 12px rgba(139,92,246,0.5), 0 0 30px rgba(59,130,246,0.2); }
    50% { box-shadow: 0 0 24px rgba(139,92,246,0.9), 0 0 60px rgba(59,130,246,0.5); }
  }
  @keyframes carousel-ripple {
    0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
  }
  @keyframes carousel-arrow-slide-left {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-4px); }
  }
  @keyframes carousel-arrow-slide-right {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }
  .carousel-btn-prev:hover .carousel-arrow { animation: carousel-arrow-slide-left 0.6s ease infinite; }
  .carousel-btn-next:hover .carousel-arrow { animation: carousel-arrow-slide-right 0.6s ease infinite; }
  .carousel-btn-prev:hover .carousel-scan-line,
  .carousel-btn-next:hover .carousel-scan-line { animation: carousel-scan 0.8s linear infinite; }
`;

function NavButton({ direction, onClick, disabled }) {
  const isPrev = direction === "prev";
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
    onClick();
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "2.5px",
        borderRadius: "14px",
        background: `conic-gradient(from 0deg at 50% 50%, #3b82f6, #8b5cf6, #06b6d4, #a78bfa, #3b82f6)`,
        animation: "carousel-spin-border 3s linear infinite",
        boxShadow: disabled
          ? "none"
          : "0 0 20px rgba(139,92,246,0.35), 0 0 50px rgba(59,130,246,0.15)",
        opacity: disabled ? 0.35 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <button
        className={isPrev ? "carousel-btn-prev" : "carousel-btn-next"}
        onClick={handleClick}
        disabled={disabled}
        aria-label={isPrev ? "Previous" : "Next"}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "13px 28px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, rgba(10,14,30,0.98) 0%, rgba(18,24,50,0.98) 100%)",
          color: "white",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          overflow: "hidden",
          userSelect: "none",
          animation: "carousel-pulse-glow 2.5s ease-in-out infinite",
          minWidth: "140px",
          justifyContent: "center",
        }}
      >
        {/* Scan line */}
        <div
          className="carousel-scan-line"
          style={{
            position: "absolute",
            top: 0,
            left: "-60%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), rgba(59,130,246,0.2), transparent)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Ripples */}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            style={{
              position: "absolute",
              left: rp.x,
              top: rp.y,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(139,92,246,0.35)",
              pointerEvents: "none",
              zIndex: 2,
              animation: "carousel-ripple 0.7s ease-out forwards",
            }}
          />
        ))}

        {/* Content */}
        {isPrev && (
          <>
            <span
              className="carousel-arrow"
              style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 3 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="arrowGradL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <polyline
                  points="15,5 8,12 15,19"
                  stroke="url(#arrowGradL)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
            <span style={{ position: "relative", zIndex: 3, background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PREV
            </span>
          </>
        )}
        {!isPrev && (
          <>
            <span style={{ position: "relative", zIndex: 3, background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              NEXT
            </span>
            <span
              className="carousel-arrow"
              style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 3 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="arrowGradR" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
                <polyline
                  points="9,5 16,12 9,19"
                  stroke="url(#arrowGradR)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export function ImageGallery({ images }) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef(null);

  useEffect(() => {
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.onload = () => {
        const mpScript = document.createElement("script");
        mpScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        mpScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(mpScript);
      };
      document.body.appendChild(gsapScript);
    };
    loadScripts();
  }, []);

  const onClick = (index) => { if (!disabled) setOpened(index); };
  const onInPlace = (index) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((cur) => (cur + 1 >= images.length ? 0 : cur + 1));
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((cur) => (cur - 1 < 0 ? images.length - 1 : cur - 1));
  }, [images.length]);

  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (!gsapReady) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current); };
  }, [opened, gsapReady, next]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
      <style>{ANIM_STYLES}</style>

      {/* Glowing border frame around gallery */}
      <div
        style={{
          position: "relative",
          padding: "3px",
          borderRadius: "23px",
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(59,130,246,0.7) 50%, rgba(139,92,246,0.9) 100%)",
          boxShadow:
            "0 0 50px rgba(139,92,246,0.5), 0 0 100px rgba(59,130,246,0.25)",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            width: "100%",
            aspectRatio: "16/9",
          }}
        >
          {gsapReady &&
            images.map((image, i) => (
              <div
                key={`gallery-img-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "100%",
                  zIndex: inPlace === i ? i : images.length + 1,
                }}
              >
                <GalleryImage
                  total={images.length}
                  id={i}
                  url={image.url}
                  title={image.title}
                  open={opened === i}
                  inPlace={inPlace === i}
                  onInPlace={onInPlace}
                />
              </div>
            ))}

          {/* Dot tabs overlay */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 100,
              height: "100%",
              width: "100%",
              pointerEvents: "none",
            }}
          >
            <Tabs images={images} onSelect={onClick} opened={opened} />
          </div>

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 99,
              pointerEvents: "none",
              height: "70px",
              background: "linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Nav buttons row below */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <NavButton direction="prev" onClick={prev} disabled={disabled} />

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => onClick(i)}
              style={{
                width: opened === i ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background:
                  opened === i
                    ? "linear-gradient(90deg, #3b82f6, #8b5cf6)"
                    : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: opened === i ? "0 0 10px rgba(139,92,246,0.6)" : "none",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <NavButton direction="next" onClick={next} disabled={disabled} />
      </div>
    </div>
  );
}

function GalleryImage({ url, title, open, inPlace, id, onInPlace, total }) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef(null);

  const gap = 10;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const width = 400;
  const height = 225;
  const scale = 700;
  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - 20,
    r: circleRadius,
  });
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  });
  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 });
  const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize });
  const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    setLoaded(false);
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration;
      const upDuration = firstLoad ? 0 : 0.2;
      const bounceDuration = firstLoad ? 0.01 : 1;
      const delay = firstLoad ? 0 : flipDuration + upDuration;

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, { ...defaults, ...getPosCenter(), duration: upDuration, ease: "power3.inOut" })
          .to(clip.current, { ...defaults, ...getPosEnd(), duration: flipDuration, ease: "power4.in", onComplete: () => onInPlace(id) });
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, { ...defaults, ...getPosCenter(), delay, duration: flipDuration, ease: "power4.out" })
          .to(clip.current, {
            ...defaults,
            motionPath: { path: [getPosSmallAbove(), getPosSmall()], curviness: 1 },
            duration: bounceDuration,
            ease: "bounce.out",
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ height: "100%", width: "100%" }}
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip} />
        </clipPath>
        <clipPath id={`${id}_squareClip`}>
          <rect className="clip" width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image width={width} height={height} href={url} style={{ pointerEvents: "none" }} />
      </g>
    </svg>
  );
}

function Tabs({ images, onSelect, opened }) {
  const gap = 10;
  const circleRadius = 7;
  const width = 400;
  const height = 225;

  const getPosX = (i) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap);
  const getPosY = () => height - 20;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ height: "100%", width: "100%" }}
    >
      {images.map((image, i) => (
        <g key={`tab-${i}`} style={{ pointerEvents: "auto" }}>
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - circleRadius}
            y={getPosY() - circleRadius}
            width={circleRadius * 2}
            height={circleRadius * 2}
            href={image.url}
            clipPath={`url(#tab_${i}_clip)`}
            style={{ pointerEvents: "none" }}
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            style={{
              cursor: "pointer",
              fill: "rgba(255,255,255,0)",
              stroke: opened === i ? "rgba(139,92,246,1)" : "rgba(255,255,255,0.7)",
              strokeWidth: opened === i ? 2.5 : 1.5,
              transition: "all 0.3s",
            }}
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </svg>
  );
}

export default ImageGallery;
