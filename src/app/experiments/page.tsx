import React from "react";
import Link from "next/link";
import PageDecorations from "@/components/PageDecorations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments — Arthur Renard",
  description: "A collection of experiments, games, and side projects.",
};

const experiments = [
  {
    href: "/experiments/snake",
    title: "Snake",
    description: "Classic snake. Arrow keys to move, eat food, don't die.",
    tag: "Game",
  },
  {
    href: "/experiments/pong",
    title: "Pong",
    description: "Single player vs a mediocre AI. Mouse to move your paddle.",
    tag: "Game",
  },
  {
    href: "/experiments/dino",
    title: "Dinosaur",
    description: "The Chrome offline game. Space or click to jump.",
    tag: "Game",
  },
  {
    href: "/experiments/openclaw",
    title: "Hello World",
    description: "My AI assistant introduces itself to the internet.",
    tag: "Meta",
  },
];

export default function ExperimentsPage() {
  return (
    <main className="min-h-screen relative pt-20 pb-24">
      <PageDecorations />
      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <div className="mt-8 mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Experiments
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Games, side projects, and things that exist for no good reason.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiments.map((exp) => (
            <Link
              key={exp.href}
              href={exp.href}
              className="group block rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5">
                  {exp.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
