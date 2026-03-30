import { useState, useEffect, useRef, useCallback } from "react";

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
      gsapScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script");
        motionPathScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(motionPathScript);
      };
      document.body.appendChild(gsapScript);
    };

    loadScripts();
  }, []);

  const onClick = (index) => {
    if (!disabled) setOpened(index);
  };

  const onInPlace = (index) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1;
      if (prevIndex < 0) prevIndex = images.length - 1;
      return prevIndex;
    });
  }, [images.length]);

  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (!gsapReady) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [opened, gsapReady, next]);

  return (
    <div className="flex items-center justify-center font-sans py-8 relative">
      {/* Outer glow border wrapper */}
      <div
        className="relative"
        style={{
          padding: "3px",
          borderRadius: "23px",
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.6) 50%, rgba(139,92,246,0.8) 100%)",
          boxShadow:
            "0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(59,130,246,0.2), inset 0 0 40px rgba(139,92,246,0.05)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            height: "min(80vmin, 560px)",
            width: "min(80vmin, 560px)",
            borderRadius: "20px",
          }}
        >
          {gsapReady &&
            images.map((image, i) => (
              <div
                key={`gallery-img-${i}`}
                className="absolute left-0 top-0 h-full w-full"
                style={{ zIndex: inPlace === i ? i : images.length + 1 }}
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

          {/* Tab dots overlay */}
          <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
            <Tabs images={images} onSelect={onClick} />
          </div>

          {/* Bottom title gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[99] pointer-events-none"
            style={{
              height: "80px",
              background:
                "linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Prev button */}
      <button
        style={{
          position: "absolute",
          left: "calc(50% - min(40vmin, 280px) - 56px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 101,
          display: "flex",
          width: "52px",
          height: "52px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.5)",
          background:
            "linear-gradient(135deg, rgba(15,20,40,0.95) 0%, rgba(25,30,60,0.95) 100%)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          outline: "none",
          boxShadow:
            "0 0 20px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
          opacity: disabled ? 0.4 : 1,
        }}
        onClick={prev}
        disabled={disabled}
        aria-label="Previous Image"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 30px rgba(139,92,246,0.6), 0 4px 20px rgba(0,0,0,0.5)";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.9)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.4)";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#gradLeft)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        style={{
          position: "absolute",
          right: "calc(50% - min(40vmin, 280px) - 56px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 101,
          display: "flex",
          width: "52px",
          height: "52px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.5)",
          background:
            "linear-gradient(135deg, rgba(15,20,40,0.95) 0%, rgba(25,30,60,0.95) 100%)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          outline: "none",
          boxShadow:
            "0 0 20px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
          opacity: disabled ? 0.4 : 1,
        }}
        onClick={next}
        disabled={disabled}
        aria-label="Next Image"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 30px rgba(139,92,246,0.6), 0 4px 20px rgba(0,0,0,0.5)";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.9)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.4)";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#gradRight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
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
  const height = 400;
  const scale = 700;

  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  });
  const getPosSmallAbove = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
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
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          });
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            delay: delay,
            duration: flipDuration,
            ease: "power4.out",
          })
          .to(clip.current, {
            ...defaults,
            motionPath: {
              path: [getPosSmallAbove(), getPosSmall()],
              curviness: 1,
            },
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
        <image
          width={width}
          height={height}
          href={url}
          style={{ pointerEvents: "none" }}
        />
      </g>
    </svg>
  );
}

function Tabs({ images, onSelect }) {
  const gap = 10;
  const circleRadius = 7;
  const width = 400;
  const height = 400;

  const getPosX = (i) =>
    width / 2 -
    (images.length * (circleRadius * 2 + gap) - gap) / 2 +
    i * (circleRadius * 2 + gap);
  const getPosY = () => height - 30;

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
            style={{ cursor: "pointer", fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.7)", strokeWidth: 2 }}
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
