const topics = [
  "Data Representation",
  "Data Transmission",
  "Hardware",
  "Software",
  "The Internet and its Uses",
  "Automated & Emerging Technologies",
  "Algorithm Design & Problem-Solving",
  "Programming",
  "Databases",
  "Boolean Logic",
];

export function SyllabusTicker() {
  return (
    <div className="marquee-mask overflow-hidden border-y border-white/10 bg-ink py-4">
      <div className="flex w-max animate-marquee gap-8">
        {[...topics, ...topics].map((topic, index) => (
          <span
            key={`${topic}-${index}`}
            className="flex items-center gap-8 font-mono text-sm text-white/50"
          >
            <span className="text-accent-2">0478</span>
            {topic}
            <span className="text-white/20">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
