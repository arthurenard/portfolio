"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

const W = 700;
const H = 220;
const GROUND = 160;
const GRAVITY = 0.6;
const JUMP_V = -13;
const DINO_W = 40;
const DINO_H = 48;
const DINO_X = 80;

type Cactus = { x: number; w: number; h: number };

function makeCactus(x: number): Cactus {
  const variant = Math.floor(Math.random() * 3);
  const widths = [20, 36, 52];
  const heights = [48, 60, 44];
  return { x, w: widths[variant], h: heights[variant] };
}

function drawDino(ctx: CanvasRenderingContext2D, y: number, dark: boolean, dead: boolean) {
  const color = dead ? "#ef4444" : (dark ? "#e2e8f0" : "#1e293b");
  ctx.fillStyle = color;

  // Body
  ctx.beginPath();
  ctx.roundRect(DINO_X, y, DINO_W, DINO_H - 10, 6);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.roundRect(DINO_X + 14, y - 20, 26, 22, 5);
  ctx.fill();

  // Eye
  ctx.fillStyle = dead ? "#fca5a5" : (dark ? "#0f172a" : "#f1f5f9");
  ctx.beginPath();
  ctx.arc(DINO_X + 34, y - 12, 3, 0, Math.PI * 2);
  ctx.fill();

  // Legs (animated by y-position oscillation)
  ctx.fillStyle = color;
  const legOffset = Math.sin(Date.now() / 80) * 5;
  ctx.beginPath();
  ctx.roundRect(DINO_X + 4, y + DINO_H - 12 + legOffset, 10, 14, 3);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(DINO_X + 20, y + DINO_H - 12 - legOffset, 10, 14, 3);
  ctx.fill();
}

function drawCactus(ctx: CanvasRenderingContext2D, c: Cactus, dark: boolean) {
  ctx.fillStyle = dark ? "#4ade80" : "#166534";
  // Main stem
  ctx.beginPath();
  ctx.roundRect(c.x + c.w / 2 - 7, GROUND - c.h, 14, c.h, 3);
  ctx.fill();
  // Arms
  if (c.w >= 36) {
    ctx.beginPath();
    ctx.roundRect(c.x, GROUND - c.h * 0.65, c.w / 2 - 5, 10, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(c.x, GROUND - c.h * 0.65 - 18, 10, 20, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(c.x + c.w / 2 + 5, GROUND - c.h * 0.6, c.w / 2 - 5, 10, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(c.x + c.w - 10, GROUND - c.h * 0.6 - 18, 10, 20, 3);
    ctx.fill();
  }
}

export default function DinoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    dinoY: GROUND - DINO_H,
    dinoVY: 0,
    onGround: true,
    cactuses: [] as Cactus[],
    score: 0,
    speed: 5,
    started: false,
    dead: false,
    nextCactus: 100,
    hiScore: 0,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);
  const [hiScore, setHiScore] = useState(0);
  const rafRef = useRef<number>(0);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s.started) { s.started = true; setStarted(true); }
    if (s.onGround && !s.dead) {
      s.dinoVY = JUMP_V;
      s.onGround = false;
    }
    if (s.dead) {
      s.hiScore = Math.max(s.hiScore, s.score);
      setHiScore(s.hiScore);
      s.dinoY = GROUND - DINO_H;
      s.dinoVY = 0;
      s.onGround = true;
      s.cactuses = [];
      s.score = 0;
      s.speed = 5;
      s.nextCactus = 100;
      s.started = false;
      s.dead = false;
      setScore(0);
      setDead(false);
      setStarted(false);
    }
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Background
    ctx.fillStyle = dark ? "#0f172a" : "#f8fafc";
    ctx.fillRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = dark ? "#334155" : "#cbd5e1";
    ctx.fillRect(0, GROUND, W, 3);

    // Clouds (decorative)
    ctx.fillStyle = dark ? "#1e293b" : "#e2e8f0";
    [100, 280, 500].forEach((cx, i) => {
      const cloudX = (cx - (s.score * 0.5) % W + W) % W;
      ctx.beginPath();
      ctx.ellipse(cloudX, 40 + i * 12, 30, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    if (s.started && !s.dead) {
      // Physics
      s.dinoVY += GRAVITY;
      s.dinoY += s.dinoVY;
      if (s.dinoY >= GROUND - DINO_H) {
        s.dinoY = GROUND - DINO_H;
        s.dinoVY = 0;
        s.onGround = true;
      }

      // Score & speed
      s.score++;
      if (s.score % 2 === 0) setScore(Math.floor(s.score / 10));
      s.speed = 5 + s.score / 400;

      // Spawn cactus
      s.nextCactus--;
      if (s.nextCactus <= 0) {
        s.cactuses.push(makeCactus(W + 20));
        s.nextCactus = 60 + Math.random() * 80;
      }

      // Move & cull cactuses
      s.cactuses = s.cactuses
        .map((c) => ({ ...c, x: c.x - s.speed }))
        .filter((c) => c.x + c.w > -10);

      // Collision
      const dHitbox = { x: DINO_X + 6, y: s.dinoY + 4, w: DINO_W - 10, h: DINO_H - 8 };
      for (const c of s.cactuses) {
        const cHitbox = { x: c.x + 4, y: GROUND - c.h + 4, w: c.w - 8, h: c.h };
        if (
          dHitbox.x < cHitbox.x + cHitbox.w &&
          dHitbox.x + dHitbox.w > cHitbox.x &&
          dHitbox.y < cHitbox.y + cHitbox.h &&
          dHitbox.y + dHitbox.h > cHitbox.y
        ) {
          s.dead = true;
          setDead(true);
        }
      }
    }

    // Draw cactuses
    s.cactuses.forEach((c) => drawCactus(ctx, c, dark));

    // Draw dino
    drawDino(ctx, s.dinoY, dark, s.dead);

    // Score HUD
    ctx.fillStyle = dark ? "#64748b" : "#94a3b8";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "right";
    if (s.hiScore > 0) ctx.fillText(`HI ${Math.floor(s.hiScore / 10).toString().padStart(5, "0")}`, W - 100, 28);
    ctx.fillStyle = dark ? "#e2e8f0" : "#1e293b";
    ctx.fillText(Math.floor(s.score / 10).toString().padStart(5, "0"), W - 20, 28);

    if (!s.started) {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(s.dead ? "Press space or click to restart" : "Press space or click to start", W / 2, H / 2 + 6);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") { e.preventDefault(); jump(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <main className="min-h-screen relative pt-20 pb-24 flex flex-col items-center">
      <div className="w-full max-w-3xl px-4">
        <div className="mb-6">
          <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Experiments
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dinosaur</h1>
          {hiScore > 0 && <span className="text-sm text-gray-400 font-mono">HI {hiScore}</span>}
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onClick={jump}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          Space or click to jump · Speed increases over time
        </p>
      </div>
    </main>
  );
}
