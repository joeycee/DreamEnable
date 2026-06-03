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
    </section>
  );
}
