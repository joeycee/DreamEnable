"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Ship = {
  x: number;
  y: number;
  dir: 1 | -1;
  scale: number;
  type: number;
  mastH: number;
  sailW: number;
  hullW: number;
  hullY: number;
  hullD: number;
  speed: number;
  alpha: number;
  bob: {
    amp: number;
    freq: number;
    phase: number;
  };
};

export function DreamEnableHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let last: number | null = null;
    const ships: Ship[] = [];

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };

    const width = () => canvas.width;
    const height = () => canvas.height;

    const drawBoat = (
      drawingContext: CanvasRenderingContext2D,
      ship: Ship,
      alpha: number,
      direction: 1 | -1,
    ) => {
      drawingContext.save();
      drawingContext.globalAlpha = alpha;

      const sailColor = "#1a3d5a";
      const waterColor = "#2e7fb0";

      drawingContext.strokeStyle = sailColor;
      drawingContext.fillStyle = sailColor;
      drawingContext.lineCap = "round";
      drawingContext.lineJoin = "round";

      if (direction < 0) drawingContext.scale(-1, 1);

      if (ship.type === 0) {
        drawingContext.lineWidth = 1.1 * ship.scale;
        drawingContext.beginPath();
        drawingContext.moveTo(0, -ship.mastH);
        drawingContext.lineTo(0, 2 * ship.scale);
        drawingContext.stroke();

        drawingContext.beginPath();
        drawingContext.moveTo(0, -ship.mastH);
        drawingContext.lineTo(-ship.sailW, 2 * ship.scale);
        drawingContext.lineTo(0, 2 * ship.scale);
        drawingContext.closePath();
        drawingContext.fill();

        drawingContext.globalAlpha = alpha * 0.5;
        drawingContext.beginPath();
        drawingContext.moveTo(0, -ship.mastH * 0.55);
        drawingContext.lineTo(ship.sailW * 0.55, 0);
        drawingContext.lineTo(0, 0);
        drawingContext.closePath();
        drawingContext.fill();
        drawingContext.globalAlpha = alpha;
      } else if (ship.type === 1) {
        drawingContext.lineWidth = 1.2 * ship.scale;
        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.15, -ship.mastH);
        drawingContext.lineTo(-ship.sailW * 0.15, 2 * ship.scale);
        drawingContext.stroke();

        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.15, -ship.mastH);
        drawingContext.quadraticCurveTo(
          ship.sailW * 0.9,
          -ship.mastH * 0.4,
          -ship.sailW * 0.15,
          2 * ship.scale,
        );
        drawingContext.closePath();
        drawingContext.fill();

        drawingContext.globalAlpha = alpha * 0.45;
        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.15, -ship.mastH * 0.6);
        drawingContext.lineTo(-ship.sailW * 0.75, 0);
        drawingContext.lineTo(-ship.sailW * 0.15, 0);
        drawingContext.closePath();
        drawingContext.fill();
        drawingContext.globalAlpha = alpha;
      } else {
        drawingContext.lineWidth = 1.1 * ship.scale;
        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.25, -ship.mastH);
        drawingContext.lineTo(-ship.sailW * 0.25, 3 * ship.scale);
        drawingContext.stroke();

        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.25, -ship.mastH);
        drawingContext.lineTo(-ship.sailW, 3 * ship.scale);
        drawingContext.lineTo(-ship.sailW * 0.25, 3 * ship.scale);
        drawingContext.closePath();
        drawingContext.fill();

        drawingContext.beginPath();
        drawingContext.moveTo(-ship.sailW * 0.25, -ship.mastH * 0.65);
        drawingContext.lineTo(ship.sailW * 0.65, 3 * ship.scale);
        drawingContext.lineTo(-ship.sailW * 0.25, 3 * ship.scale);
        drawingContext.closePath();
        drawingContext.fill();
      }

      drawingContext.globalAlpha = alpha;
      drawingContext.strokeStyle = waterColor;
      drawingContext.lineWidth = 1.6 * ship.scale;
      drawingContext.beginPath();
      drawingContext.moveTo(-ship.hullW, ship.hullY);
      drawingContext.quadraticCurveTo(0, ship.hullY + ship.hullD, ship.hullW, ship.hullY);
      drawingContext.stroke();

      drawingContext.restore();
    };

    const makeShip = (startOffscreen: boolean): Ship => {
      const direction: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const scale = 0.5 + Math.random() * 1.1;
      const type = Math.floor(Math.random() * 3);
      const mastH = (18 + Math.random() * 14) * scale;
      const sailW = (10 + Math.random() * 10) * scale;
      const hullW = sailW * 1.35;
      const hullY = (3 + Math.random() * 2) * scale;
      const hullD = (4 + Math.random() * 3) * scale;
      const speed = (0.12 + Math.random() * 0.18) * scale;
      const alpha = 0.06 + Math.random() * 0.11;
      const y = height() * (0.1 + Math.random() * 0.85);
      const x = startOffscreen
        ? direction > 0
          ? -(hullW + 20)
          : width() + hullW + 20
        : Math.random() * width();

      return {
        x,
        y,
        dir: direction,
        scale,
        type,
        mastH,
        sailW,
        hullW,
        hullY,
        hullD,
        speed,
        alpha,
        bob: {
          amp: 0.4 + Math.random() * 0.8,
          freq: 0.0008 + Math.random() * 0.0012,
          phase: Math.random() * Math.PI * 2,
        },
      };
    };

    const tick = (now: number) => {
      if (!last) last = now;
      const delta = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, width(), height());

      ships.forEach((ship) => {
        ship.x += ship.dir * ship.speed * delta * 0.12;
        const bobY = ship.bob.amp * Math.sin(now * ship.bob.freq + ship.bob.phase);

        ctx.save();
        ctx.translate(ship.x, ship.y + bobY);
        drawBoat(ctx, ship, ship.alpha, ship.dir);
        ctx.restore();

        if (ship.x > width() + ship.hullW + 40 || ship.x < -(ship.hullW + 40)) {
          Object.assign(ship, makeShip(true));
        }
      });

      if (ships.length < 14 && Math.random() < 0.003) ships.push(makeShip(true));
      animationFrameId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 12; i += 1) ships.push(makeShip(false));
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={wrapRef} className="de-hero-wrap">
      <div className="de-mist" aria-hidden>
        <div className="de-mist-band" />
        <div className="de-mist-band" />
        <div className="de-mist-band" />
      </div>

      <canvas ref={canvasRef} className="de-fleet-canvas" aria-hidden />

      <div className="de-eyebrow">
        <div className="de-eyebrow-line" />
        <span className="de-eyebrow-text">Digital Studio · NZ &amp; AU</span>
        <div className="de-eyebrow-line de-right" />
      </div>

      <div className="de-headline-wrap">
        <span className="de-dream-word">Dream</span>
        <span className="de-enable-word">Enable</span>
      </div>

      <div className="de-divider" />

      <p className="de-tagline">
        We build digital products that unlock what&apos;s next&nbsp;&mdash;
        <br />
        turning your vision into something the world can experience.
      </p>

      <div className="de-cta-row">
        <Link href="/contact" className="de-hero-btn de-hero-btn-primary">
          Start your project
        </Link>

        <Link href="/offerings" className="de-hero-btn de-hero-btn-secondary">
          Explore services
        </Link>
      </div>

      <style jsx>{`
        .de-hero-wrap {
          min-height: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 60px 24px 80px;
          background: radial-gradient(
            ellipse 120% 80% at 50% 10%,
            #d6ecf8 0%,
            #eef6fb 40%,
            #f7fafb 100%
          );
        }

        .de-fleet-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .de-mist {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .de-mist-band {
          position: absolute;
          left: -20%;
          right: -20%;
          height: 120px;
          border-radius: 50%;
          opacity: 0;
          animation: deMistDrift 14s ease-in-out infinite;
        }

        .de-mist-band:nth-child(1) {
          top: 30%;
          background: radial-gradient(
            ellipse 80% 50% at 50% 50%,
            rgba(200, 228, 245, 0.45) 0%,
            transparent 70%
          );
          animation-duration: 18s;
        }

        .de-mist-band:nth-child(2) {
          top: 55%;
          background: radial-gradient(
            ellipse 90% 50% at 50% 50%,
            rgba(220, 238, 250, 0.35) 0%,
            transparent 70%
          );
          animation-delay: 4s;
          animation-duration: 22s;
        }

        .de-mist-band:nth-child(3) {
          top: 70%;
          background: radial-gradient(
            ellipse 70% 40% at 50% 50%,
            rgba(178, 213, 232, 0.28) 0%,
            transparent 70%
          );
          animation-delay: 8s;
          animation-duration: 16s;
        }

        .de-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          animation: deFadeUp 1s ease forwards;
          animation-delay: 3.8s;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .de-eyebrow-line {
          width: 36px;
          height: 1px;
          background: #2e7fb0;
          transform: scaleX(0);
          transform-origin: left;
          animation: deLineGrow 0.8s ease forwards;
          animation-delay: 4.2s;
        }

        .de-eyebrow-line.de-right {
          transform-origin: right;
          animation-delay: 4.4s;
        }

        .de-eyebrow-text {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #2e7fb0;
          text-transform: uppercase;
          opacity: 0;
          animation: deFadeIn 0.8s ease forwards;
          animation-delay: 4.6s;
        }

        .de-headline-wrap {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .de-dream-word {
          display: block;
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(52px, 9vw, 88px);
          font-weight: 300;
          font-style: italic;
          color: #1a2e3b;
          letter-spacing: -0.02em;
          line-height: 1.05;
          opacity: 0;
          filter: blur(18px);
          transform: translateY(24px) scale(0.96);
          animation: deDreamReveal 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.4s;
        }

        .de-enable-word {
          display: block;
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(16px, 2.8vw, 28px);
          font-weight: 400;
          color: #2e7fb0;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px) scaleX(0.85);
          animation: deEnableReveal 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.8s;
          margin-top: 6px;
        }

        .de-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #b2d5e8, transparent);
          margin: 22px auto 0;
          opacity: 0;
          animation: deFadeIn 1s ease forwards;
          animation-delay: 2.8s;
          position: relative;
          z-index: 2;
        }

        .de-tagline {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(17px, 2.4vw, 22px);
          font-weight: 300;
          color: #4a6070;
          max-width: 560px;
          line-height: 1.75;
          text-align: center;
          margin: 28px auto 0;
          opacity: 0;
          animation: deFadeUp 1s ease forwards;
          animation-delay: 3.2s;
          position: relative;
          z-index: 2;
        }

        .de-cta-row {
          display: flex;
          gap: 14px;
          margin-top: 40px;
          opacity: 0;
          animation: deFadeUp 1s ease forwards;
          animation-delay: 4s;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        @keyframes deMistDrift {
          0% {
            opacity: 0;
            transform: translateX(-6%) scaleY(1);
          }
          20% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
            transform: translateX(6%) scaleY(1.15);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-6%) scaleY(1);
          }
        }

        @keyframes deLineGrow {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes deFadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes deFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes deDreamReveal {
          0% {
            opacity: 0;
            filter: blur(18px);
            transform: translateY(24px) scale(0.96);
          }
          40% {
            opacity: 0.7;
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }

        @keyframes deEnableReveal {
          0% {
            opacity: 0;
            transform: translateY(10px) scaleX(0.85);
            letter-spacing: 0.2em;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleX(1);
            letter-spacing: 0.5em;
          }
        }

        @media (max-width: 640px) {
          .de-hero-wrap {
            min-height: 560px;
            padding: 72px 20px 84px;
          }

          .de-tagline br {
            display: none;
          }

          .de-hero-btn {
            width: 100%;
            max-width: 280px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .de-mist-band,
          .de-eyebrow,
          .de-eyebrow-line,
          .de-eyebrow-text,
          .de-dream-word,
          .de-enable-word,
          .de-divider,
          .de-tagline,
          .de-cta-row {
            animation: none;
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
