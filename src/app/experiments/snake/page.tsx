"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const W = CELL * COLS;
const H = CELL * ROWS;
const TICK = 120;

type Dir = { x: number; y: number };
type Cell = { x: number; y: number };

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function spawnFood(snake: Cell[]): Cell {
  let food: Cell;
  do {
    food = { x: rand(COLS), y: rand(ROWS) };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }] as Cell[],
    dir: { x: 1, y: 0 } as Dir,
    nextDir: { x: 1, y: 0 } as Dir,
    food: { x: 15, y: 10 } as Cell,
    score: 0,
    alive: true,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  const reset = useCallback(() => {
    const s = [{ x: 10, y: 10 }];
    stateRef.current = {
      snake: s,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: spawnFood(s),
      score: 0,
      alive: true,
      started: false,
    };
    setScore(0);
    setDead(false);
    setStarted(false);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { snake, food } = stateRef.current;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    ctx.fillStyle = dark ? "#111" : "#f9fafb";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = dark ? "#1f2937" : "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke();
    }
    for (let j = 0; j <= ROWS; j++) {
      ctx.beginPath(); ctx.moveTo(0, j * CELL); ctx.lineTo(W, j * CELL); ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    snake.forEach((seg, i) => {
      const t = i / snake.length;
      ctx.fillStyle = i === 0 ? "#22c55e" : `hsl(${130 + t * 20}, 60%, ${45 + t * 10}%)`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
    });
  }, []);

  const tick = useCallback((ts: number) => {
    const state = stateRef.current;
    if (!state.alive || !state.started) {
      draw();
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    if (ts - lastTickRef.current >= TICK) {
      lastTickRef.current = ts;
      state.dir = state.nextDir;
      const head = state.snake[0];
      const next = {
        x: (head.x + state.dir.x + COLS) % COLS,
        y: (head.y + state.dir.y + ROWS) % ROWS,
      };

      if (state.snake.some((s) => s.x === next.x && s.y === next.y)) {
        state.alive = false;
        setDead(true);
        draw();
        return;
      }

      state.snake.unshift(next);

      if (next.x === state.food.x && next.y === state.food.y) {
        state.score += 1;
        setScore(state.score);
        state.food = spawnFood(state.snake);
      } else {
        state.snake.pop();
      }
    }

    draw();
    rafRef.current = requestAnimationFrame(tick);
  }, [draw]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const state = stateRef.current;
      if (!state.started && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(e.key)) {
        state.started = true;
        setStarted(true);
      }
      const map: Record<string, Dir> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const d = map[e.key];
      if (!d) return;
      if (d.x === -state.dir.x && d.y === -state.dir.y) return;
      state.nextDir = d;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen relative pt-20 pb-24 flex flex-col items-center">
      <div className="w-full max-w-lg px-4">
        <div className="mb-6">
          <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Experiments
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Snake</h1>
          <span className="text-2xl font-mono font-bold text-gray-700 dark:text-gray-300">{score}</span>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          />
          {!started && !dead && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm">
              <p className="text-white text-lg font-medium">Press any arrow key to start</p>
            </div>
          )}
          {dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm gap-4">
              <p className="text-white text-2xl font-bold">Game over — {score} pts</p>
              <button
                onClick={reset}
                className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Play again
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">Arrow keys or WASD · Wraps around edges</p>
      </div>
    </main>
  );
}
