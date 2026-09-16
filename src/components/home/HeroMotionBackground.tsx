"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const HeroMotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 850);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const isMobile = width < 768;
    const nodeCount = isMobile ? 18 : 36;
    const nodes: Node[] = [];

    const colors = [
      "rgba(99, 102, 241, ", // Indigo
      "rgba(139, 92, 246, ", // Violet
      "rgba(6, 182, 212, ",  // Cyan
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) lastTime = performance.now();
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    let lastTime = performance.now();
    let wavePhase = 0;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      wavePhase += dt * 0.4;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Atmospheric Wave Streams
      ctx.save();
      const waveGrad = ctx.createLinearGradient(0, height * 0.3, width, height * 0.7);
      waveGrad.addColorStop(0, "rgba(99, 102, 241, 0.04)");
      waveGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.06)");
      waveGrad.addColorStop(1, "rgba(6, 182, 212, 0.03)");

      ctx.fillStyle = waveGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.5);

      for (let x = 0; x <= width; x += 30) {
        const y =
          height * 0.5 +
          Math.sin(x * 0.003 + wavePhase) * 45 +
          Math.cos(x * 0.002 - wavePhase * 0.8) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Draw Connected Data Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes with delicate lines
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-30"
        style={{ backgroundImage: "url('/animations/hero-network-mesh.svg')" }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
};
