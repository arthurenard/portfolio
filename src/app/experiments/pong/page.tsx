"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

const W = 600;
const H = 400;
const PADDLE_W = 12;
const PADDLE_H = 70;
const BALL_SIZE = 10;
const SPEED_INIT = 4;
const WINNING_SCORE = 7;

export default function PongPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    ball: { x: W / 2, y: H / 2, vx: SPEED_INIT, vy: 2.5 },
    playerY: H / 2 - PADDLE_H / 2,
    aiY: H / 2 - PADDLE_H / 2,
    playerScore: 0,
    aiScore: 0,
    started: false,
    over: false,
    winner: "",
    mouseY: H / 2,
  });
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const rafRef = useRef<number>(0);

  const resetBall = (dir: number) => {
    const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
    const speed = SPEED_INIT + stateRef.current.playerScore * 0.1 + stateRef.current.aiScore * 0.1;
    stateRef.current.ball = {
      x: W / 2, y: H / 2,
      vx: Math.cos(angle) * speed * dir,
      vy: Math.sin(angle) * speed,
    };
  };

  const reset = useCallback(() => {
    stateRef.current = {
      ball: { x: W / 2, y: H / 2, vx: SPEED_INIT, vy: 2.5 },
      playerY: H / 2 - PADDLE_H / 2,
      aiY: H / 2 - PADDLE_H / 2,
      playerScore: 0,
      aiScore: 0,
      started: false,
      over: false,
      winner: "",
      mouseY: H / 2,
    };
    setPlayerScore(0);
    setAiScore(0);
    setStarted(false);
    setWinner("");
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { ball, playerY, aiY, playerScore, aiScore } = stateRef.current;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    ctx.fillStyle = dark ? "#0f172a" : "#1e293b";
    ctx.fillRect(0, 0, W, H);

    // Centre line
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = dark ? "#334155" : "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.setLineDash([]);

    // Scores
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "center";
    ctx.fillText(String(playerScore), W / 4, 50);
    ctx.fillText(String(aiScore), (3 * W) / 4, 50);

    // Paddles
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.roundRect(20, playerY, PADDLE_W, PADDLE_H, 4);
    ctx.fill();

    ctx.fillStyle = "#f87171";
    ctx.beginPath();
    ctx.roundRect(W - 20 - PADDLE_W, aiY, PADDLE_W, PADDLE_H, 4);
    ctx.fill();

    // Ball
    ctx.fillStyle = "#f1f5f9";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const update = useCallback(() => {
    const s = stateRef.current;
    if (!s.started || s.over) return;

    // Player paddle follows mouse
    const targetY = s.mouseY - PADDLE_H / 2;
    s.playerY = Math.max(0, Math.min(H - PADDLE_H, targetY));

    // AI paddle (imperfect)
    const aiCenter = s.aiY + PADDLE_H / 2;
    const diff = s.ball.y - aiCenter;
    const aiSpeed = 3.2;
    s.aiY += Math.sign(diff) * Math.min(Math.abs(diff), aiSpeed);
    s.aiY = Math.max(0, Math.min(H - PADDLE_H, s.aiY));

    // Ball movement
    s.ball.x += s.ball.vx;
    s.ball.y += s.ball.vy;

    // Top/bottom bounce
    if (s.ball.y - BALL_SIZE / 2 <= 0) { s.ball.y = BALL_SIZE / 2; s.ball.vy *= -1; }
    if (s.ball.y + BALL_SIZE / 2 >= H) { s.ball.y = H - BALL_SIZE / 2; s.ball.vy *= -1; }

    // Player paddle collision
    if (
      s.ball.x - BALL_SIZE / 2 <= 20 + PADDLE_W &&
      s.ball.x - BALL_SIZE / 2 >= 20 &&
      s.ball.y >= s.playerY &&
      s.ball.y <= s.playerY + PADDLE_H
    ) {
      const relHit = (s.ball.y - (s.playerY + PADDLE_H / 2)) / (PADDLE_H / 2);
      const angle = relHit * (Math.PI / 4);
      const speed = Math.hypot(s.ball.vx, s.ball.vy) * 1.05;
      s.ball.vx = Math.cos(angle) * speed;
      s.ball.vy = Math.sin(angle) * speed;
      s.ball.x = 20 + PADDLE_W + BALL_SIZE / 2;
    }

    // AI paddle collision
    if (
      s.ball.x + BALL_SIZE / 2 >= W - 20 - PADDLE_W &&
      s.ball.x + BALL_SIZE / 2 <= W - 20 &&
      s.ball.y >= s.aiY &&
      s.ball.y <= s.aiY + PADDLE_H
    ) {
      const relHit = (s.ball.y - (s.aiY + PADDLE_H / 2)) / (PADDLE_H / 2);
      const angle = relHit * (Math.PI / 4);
      const speed = Math.hypot(s.ball.vx, s.ball.vy) * 1.05;
      s.ball.vx = -Math.cos(angle) * speed;
      s.ball.vy = Math.sin(angle) * speed;
      s.ball.x = W - 20 - PADDLE_W - BALL_SIZE / 2;
    }

    // Scoring
    if (s.ball.x < 0) {
      s.aiScore++;
      setAiScore(s.aiScore);
      if (s.aiScore >= WINNING_SCORE) { s.over = true; s.winner = "AI wins"; setWinner("AI wins"); return; }
      resetBall(1);
    }
    if (s.ball.x > W) {
      s.playerScore++;
      setPlayerScore(s.playerScore);
      if (s.playerScore >= WINNING_SCORE) { s.over = true; s.winner = "You win"; setWinner("You win"); return; }
      resetBall(-1);
    }
  }, []);

  const loop = useCallback(() => {
    update();
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  useEffect(() => {
    draw();
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleY = H / rect.height;
      stateRef.current.mouseY = (e.clientY - rect.top) * scaleY;
      if (!stateRef.current.started) {
        stateRef.current.started = true;
        setStarted(true);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") stateRef.current.mouseY -= 20;
      if (e.key === "ArrowDown") stateRef.current.mouseY += 20;
      if (!stateRef.current.started) { stateRef.current.started = true; setStarted(true); }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main className="min-h-screen relative pt-20 pb-24 flex flex-col items-center">
      <div className="w-full max-w-2xl px-4">
        <div className="mb-6">
          <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Experiments
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pong</h1>
          <span className="text-sm text-gray-400 dark:text-gray-500">First to {WINNING_SCORE}</span>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full rounded-xl border border-gray-700 shadow-sm cursor-none"
          />
          {!started && !winner && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm">
              <p className="text-white text-lg font-medium">Move your mouse to start</p>
            </div>
          )}
          {winner && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm gap-4">
              <p className="text-white text-3xl font-bold">{winner}</p>
              <button
                onClick={reset}
                className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Play again
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          Move your mouse over the canvas · You are blue · AI is red
        </p>
      </div>
    </main>
  );
}
