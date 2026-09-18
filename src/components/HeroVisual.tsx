import { CodeCard } from "@/components/CodeCard";

const rows: [string, string, string][] = [
  ["0", "0", "0"],
  ["0", "1", "0"],
  ["1", "0", "0"],
  ["1", "1", "1"],
];

function TruthTableCard() {
  return (
    <div className="absolute -top-9 -right-6 w-40 rotate-6 rounded-xl border border-border bg-bg/95 p-3 shadow-xl backdrop-blur transition-transform duration-500 hover:rotate-0 sm:-right-10 sm:w-44">
      <p className="font-mono text-[10px] text-text-tertiary">topic: AND_gate.logic</p>
      <table className="mt-2 w-full border-collapse text-center font-mono text-[11px]">
        <thead>
          <tr className="text-text-tertiary">
            <th className="font-normal">A</th>
            <th className="font-normal">B</th>
            <th className="font-normal">Q</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, q], i) => {
            const isTrue = i === rows.length - 1;
            return (
              <tr
                key={`${a}${b}${q}`}
                className={isTrue ? "font-bold text-accent" : "text-text-secondary"}
              >
                <td>{a}</td>
                <td>{b}</td>
                <td>{q}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TraceTableChip() {
  const rows: [string, string, string][] = [
    ["0", "9", "4"],
    ["5", "9", "7"],
    ["5", "6", "5"],
  ];

  return (
    <div
      className="animate-float-slow absolute -bottom-12 -right-4 z-20 w-36 rotate-6 rounded-xl border border-border bg-bg/95 p-3 shadow-xl backdrop-blur transition-transform duration-500 hover:rotate-0 sm:-right-10 sm:w-40"
      style={{ animationDelay: "-4s" }}
    >
      <p className="font-mono text-[10px] text-text-tertiary">trace: Search()</p>
      <table className="mt-2 w-full border-collapse text-center font-mono text-[11px]">
        <thead>
          <tr className="text-text-tertiary">
            <th className="font-normal">low</th>
            <th className="font-normal">high</th>
            <th className="font-normal">mid</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([low, high, mid], i) => {
            const isLast = i === rows.length - 1;
            return (
              <tr
                key={`${low}${high}${mid}`}
                className={isLast ? "font-bold text-accent" : "text-text-secondary"}
              >
                <td>{low}</td>
                <td>{high}</td>
                <td>{mid}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BinaryChip() {
  return (
    <div
      className="animate-float-slow absolute -bottom-12 -left-6 z-20 rounded-xl border border-border bg-bg px-4 py-3 shadow-xl sm:-left-12"
      style={{ animationDelay: "-2s" }}
    >
      <p className="font-mono text-[10px] text-text-tertiary">topic: data_representation</p>
      <p className="mt-1 font-mono text-sm font-semibold">
        <span className="text-accent-2">1011</span>
        <span className="text-text-tertiary"> = </span>
        <span className="text-accent">11</span>
      </p>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <TruthTableCard />
      <TraceTableChip />
      <div className="relative z-10">
        <CodeCard />
      </div>
      <BinaryChip />
    </div>
  );
}
