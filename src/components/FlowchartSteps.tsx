"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const steps = [
  { key: "p0" as const, title: "Pick a Topic", body: "Start anywhere in your Cambridge syllabus." },
  { key: "p1" as const, title: "Learn It Properly", body: "Build the concept from the ground up." },
  { key: "p2" as const, title: "Practice It", body: "Reinforce it with real questions." },
];

type NodeKey = "start" | "p0" | "p1" | "p2" | "diamond" | "exam";
type EdgeKey = "e0" | "e1" | "e2" | "e3" | "eYes" | "eNo";
type Frame = { node?: NodeKey; edge?: EdgeKey };

const EDGE_PATHS: Record<EdgeKey, string> = {
  e0: "M128,65 L172,65",
  e1: "M278,65 L322,65",
  e2: "M428,65 L472,65",
  e3: "M580,65 L613,65",
  eYes: "M738,65 L772,65",
  eNo: "M675,129 L675,170 L525,170 L525,100",
};

const EDGE_AFTER_STEP: Record<number, EdgeKey> = { 0: "e1", 1: "e2", 2: "e3" };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function buildFrames(isYesBranch: boolean): Frame[] {
  const branch: Frame[] = isYesBranch
    ? [{ edge: "eYes" }, { node: "exam" }]
    : [{ edge: "eNo" }, { node: "p2" }];
  return [
    { node: "start" },
    { edge: "e0" },
    { node: "p0" },
    { edge: "e1" },
    { node: "p1" },
    { edge: "e2" },
    { node: "p2" },
    { edge: "e3" },
    { node: "diamond" },
    ...branch,
  ];
}

// Both branches produce the same number of frames, so a single monotonic
// tick can be split into (loopCount, frameIndex) via pure arithmetic —
// no state setter needs to reach into another one's updater.
const CYCLE_LENGTH = buildFrames(true).length;

function useFlowAnimation() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 650);
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  const loopCount = Math.floor(tick / CYCLE_LENGTH);
  const frameIndex = tick % CYCLE_LENGTH;
  const frames = buildFrames(loopCount % 2 === 0);
  const current = frames[frameIndex] ?? {};

  return {
    activeNode: reducedMotion ? null : (current.node ?? null),
    activeEdge: reducedMotion ? null : (current.edge ?? null),
    frameKey: `${loopCount}-${frameIndex}`,
    setPaused,
  };
}

function Oval({
  children,
  filled = false,
  active = false,
  onHover,
}: {
  children: string;
  filled?: boolean;
  active?: boolean;
  onHover?: (hovering: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`mx-auto flex h-16 w-28 cursor-default items-center justify-center rounded-full px-2 text-center font-mono text-[11px] font-semibold transition-all duration-300 ${
        filled
          ? active
            ? "scale-105 bg-accent text-white shadow-lg shadow-accent/30"
            : "bg-ink text-white"
          : active
            ? "scale-105 border-2 border-accent bg-accent-soft text-accent shadow-lg shadow-accent/20"
            : "border-2 border-border-strong bg-bg text-text-primary"
      }`}
    >
      {children}
    </div>
  );
}

function Rect({
  title,
  body,
  active = false,
  onHover,
}: {
  title: string;
  body: string;
  active?: boolean;
  onHover?: (hovering: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`mx-auto flex h-24 w-[108px] cursor-default flex-col items-center justify-center gap-1 rounded-lg border-2 px-2 text-center shadow-sm transition-all duration-300 ${
        active
          ? "scale-105 border-accent bg-accent-soft shadow-md shadow-accent/20"
          : "border-border-strong bg-bg"
      }`}
    >
      <span
        className={`font-display text-xs leading-tight font-semibold ${active ? "text-accent" : "text-text-primary"}`}
      >
        {title}
      </span>
      <span className="text-[10px] leading-tight text-text-tertiary">{body}</span>
    </div>
  );
}

function Diamond({
  size = 92,
  active = false,
  onHover,
}: {
  size?: number;
  active?: boolean;
  onHover?: (hovering: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="relative mx-auto flex cursor-default items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className={`diamond absolute inset-0 border-2 border-accent transition-colors duration-300 ${
          active ? "bg-accent/25" : "bg-accent-soft"
        }`}
      />
      <div className="relative z-10 px-3 text-center font-display text-[10px] font-semibold text-accent">
        Exam
        <br />
        ready?
      </div>
    </div>
  );
}

export function FlowchartSteps() {
  const { activeNode, activeEdge, frameKey, setPaused } = useFlowAnimation();
  const [hoverKey, setHoverKey] = useState<NodeKey | null>(null);

  const displayNode = hoverKey ?? activeNode;
  const isActive = (key: NodeKey) => displayNode === key;
  const hoverHandler = (key: NodeKey) => (hovering: boolean) => setHoverKey(hovering ? key : null);

  return (
    <>
      {/* Desktop / large screens: an actual flowchart with a decision + loop-back */}
      <div
        className="relative mx-auto hidden h-[210px] w-[900px] lg:block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoverKey(null);
        }}
      >
        <div className="grid h-[130px] grid-cols-6 items-center">
          <Oval filled active={isActive("start")} onHover={hoverHandler("start")}>
            START
          </Oval>
          <Rect
            title={steps[0].title}
            body={steps[0].body}
            active={isActive("p0")}
            onHover={hoverHandler("p0")}
          />
          <Rect
            title={steps[1].title}
            body={steps[1].body}
            active={isActive("p1")}
            onHover={hoverHandler("p1")}
          />
          <Rect
            title={steps[2].title}
            body={steps[2].body}
            active={isActive("p2")}
            onHover={hoverHandler("p2")}
          />
          <Diamond active={isActive("diamond")} onHover={hoverHandler("diamond")} />
          <Oval active={isActive("exam")} onHover={hoverHandler("exam")}>
            {"EXAM READY"}
          </Oval>
        </div>

        <svg
          className="pointer-events-none absolute inset-0"
          width={900}
          height={210}
          viewBox="0 0 900 210"
          fill="none"
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-border-strong" />
            </marker>
            <marker id="arrow-muted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-text-tertiary" />
            </marker>
            <marker id="arrow-live" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-accent-2" />
            </marker>
          </defs>

          <line x1="128" y1="65" x2="172" y2="65" className="stroke-border-strong" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="278" y1="65" x2="322" y2="65" className="stroke-border-strong" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="428" y1="65" x2="472" y2="65" className="stroke-border-strong" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="580" y1="65" x2="613" y2="65" className="stroke-border-strong" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="738" y1="65" x2="772" y2="65" className="stroke-border-strong" strokeWidth="2" markerEnd="url(#arrow)" />
          <text
            x="755"
            y="50"
            textAnchor="middle"
            className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${
              activeEdge === "eYes" ? "fill-accent" : "fill-text-tertiary"
            }`}
          >
            yes
          </text>

          <polyline
            points="675,129 675,170 525,170 525,100"
            className="stroke-text-tertiary"
            strokeWidth="2"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-muted)"
          />
          <text
            x="600"
            y="184"
            textAnchor="middle"
            className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${
              activeEdge === "eNo" ? "fill-accent" : "fill-text-tertiary"
            }`}
          >
            no — keep practicing
          </text>

          {/* live signal overlay: the currently traveling connection, redrawn brighter with a moving pulse */}
          {activeEdge && (
            <>
              <path
                d={EDGE_PATHS[activeEdge]}
                className="stroke-accent-2"
                strokeWidth="3"
                strokeLinecap="round"
                markerEnd="url(#arrow-live)"
              />
              <circle r="5" className="fill-accent-2" key={frameKey}>
                <animateMotion path={EDGE_PATHS[activeEdge]} dur="0.55s" fill="freeze" />
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Small / medium screens: a simplified vertical version of the same flow */}
      <div
        className="mx-auto flex max-w-xs flex-col items-center gap-3 lg:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoverKey(null);
        }}
      >
        <Oval filled active={isActive("start")} onHover={hoverHandler("start")}>
          START
        </Oval>
        <span
          className={`transition-colors duration-300 ${activeEdge === "e0" ? "text-accent-2" : "text-border-strong"}`}
          aria-hidden
        >
          ↓
        </span>
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center gap-3">
            <Rect
              title={step.title}
              body={step.body}
              active={isActive(step.key)}
              onHover={hoverHandler(step.key)}
            />
            <span
              className={`transition-colors duration-300 ${
                activeEdge === EDGE_AFTER_STEP[index] ? "text-accent-2" : "text-border-strong"
              }`}
              aria-hidden
            >
              ↓
            </span>
            {index === steps.length - 1 && (
              <>
                <Diamond size={88} active={isActive("diamond")} onHover={hoverHandler("diamond")} />
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors duration-300 ${
                    activeEdge === "eNo"
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border-strong bg-bg-subtle text-text-tertiary"
                  }`}
                >
                  no → back to &ldquo;Practice It&rdquo;
                </span>
                <span
                  className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${
                    activeEdge === "eYes" ? "text-accent" : "text-text-tertiary"
                  }`}
                >
                  yes ↓
                </span>
              </>
            )}
          </div>
        ))}
        <Oval active={isActive("exam")} onHover={hoverHandler("exam")}>
          EXAM READY
        </Oval>
      </div>
    </>
  );
}
