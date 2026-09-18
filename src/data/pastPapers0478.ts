export type Session = "Feb/Mar" | "May/Jun" | "Oct/Nov";
export type PaperNumber = 1 | 2;
// Cambridge splits each paper into administrative zones so no two candidates
// sitting the same session see the same paper. Zone 1 = Americas,
// Zone 2 = Europe & Africa, Zone 3 = Asia & Oceania. The printed "variant"
// (e.g. 0478/12) is just paper * 10 + zone.
export type Zone = 1 | 2 | 3;
export type DocType = "Question Paper" | "Mark Scheme";

export type PastPaper = {
  year: number;
  session: Session;
  paper: PaperNumber;
  zone: Zone;
  type: DocType;
  variant: number;
  code: string;
  fileUrl: string;
};

// Ordering helpers — sidebar checkboxes and result lists sort against these, not object/string order.
export const SESSION_ORDER: Session[] = ["Feb/Mar", "May/Jun", "Oct/Nov"];
export const TYPE_ORDER: DocType[] = ["Question Paper", "Mark Scheme"];
export const ZONE_ORDER: Zone[] = [1, 2, 3];

export const ZONE_LABEL: Record<Zone, string> = {
  1: "Zone 1 · Americas",
  2: "Zone 2 · Europe & Africa",
  3: "Zone 3 · Asia & Oceania",
};

const SESSION_SLUG: Record<Session, string> = {
  "Feb/Mar": "feb-mar",
  "May/Jun": "may-jun",
  "Oct/Nov": "oct-nov",
};

// Cambridge's own session code, used in real past-paper filenames (e.g. 0478_s24_qp_12).
const SESSION_CODE: Record<Session, string> = {
  "Feb/Mar": "m",
  "May/Jun": "s",
  "Oct/Nov": "w",
};

const TYPE_SLUG: Record<DocType, string> = {
  "Question Paper": "question-paper",
  "Mark Scheme": "mark-scheme",
};

const TYPE_CODE: Record<DocType, string> = {
  "Question Paper": "qp",
  "Mark Scheme": "ms",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function buildEntry(year: number, session: Session, paper: PaperNumber, zone: Zone, type: DocType): PastPaper {
  const variant = paper * 10 + zone;
  const yy = String(year).slice(-2);
  const code = `0478_${SESSION_CODE[session]}${yy}_${TYPE_CODE[type]}_${variant}`;
  const fileUrl = `${BASE_PATH}/past-papers/0478/${year}/${SESSION_SLUG[session]}/paper-${paper}-variant-${variant}-${TYPE_SLUG[type]}.pdf`;
  return { year, session, paper, zone, type, variant, code, fileUrl };
}

const YEARS = [2024, 2023];

// Feb/Mar is a small, India-only administrative window — Cambridge only ever
// releases one zone for it (Zone 2). May/Jun and Oct/Nov get all three zones.
function zonesFor(session: Session): Zone[] {
  return session === "Feb/Mar" ? [2] : ZONE_ORDER;
}

// Placeholder set — swap each PDF under public/past-papers/0478/ for the real file,
// following the same year/session/paper/variant naming convention, no code changes needed.
export const pastPapers0478: PastPaper[] = YEARS.flatMap((year) =>
  SESSION_ORDER.flatMap((session) =>
    ([1, 2] as PaperNumber[]).flatMap((paper) =>
      zonesFor(session).flatMap((zone) =>
        TYPE_ORDER.map((type) => buildEntry(year, session, paper, zone, type)),
      ),
    ),
  ),
);
