export type Session = "Feb/Mar" | "May/Jun" | "Oct/Nov";
export type PaperNumber = 1 | 2;

export type PastPaper = {
  year: number;
  session: Session;
  paper: PaperNumber;
  // The printed variant (e.g. 0478/12) — Cambridge prints multiple variants
  // of the same paper per session so no two candidates see an identical
  // paper. All variants cover the same syllabus at the same difficulty, so
  // students should practice every variant available, not just one.
  variant: number;
  marks: number;
  code: string;
  paperUrl: string;
  // Undefined until a real mark scheme PDF exists for this variant — never
  // point this at a file that doesn't exist yet.
  markSchemeUrl?: string;
};

// Ordering helper — sidebar checkboxes and result lists sort against this, not object/string order.
export const SESSION_ORDER: Session[] = ["Feb/Mar", "May/Jun", "Oct/Nov"];

export const SUBJECT_CODE = "0478";
export const SUBJECT_NAME = "Computer Science";
export const SUBJECT_LEVEL = "IGCSE";

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

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function fileUrl(
  year: number,
  session: Session,
  paper: PaperNumber,
  variant: number,
  slug: "question-paper" | "mark-scheme",
): string {
  return `${BASE_PATH}/past-papers/0478/${year}/${SESSION_SLUG[session]}/paper-${paper}-variant-${variant}-${slug}.pdf`;
}

function buildEntry(
  year: number,
  session: Session,
  paper: PaperNumber,
  variantDigit: 1 | 2 | 3,
  marks: number,
  hasMarkScheme: boolean,
): PastPaper {
  const variant = paper * 10 + variantDigit;
  const yy = String(year).slice(-2);
  const code = `${SUBJECT_CODE}_${SESSION_CODE[session]}${yy}_${variant}`;
  return {
    year,
    session,
    paper,
    variant,
    marks,
    code,
    paperUrl: fileUrl(year, session, paper, variant, "question-paper"),
    markSchemeUrl: hasMarkScheme
      ? fileUrl(year, session, paper, variant, "mark-scheme")
      : undefined,
  };
}

// Real papers only — each entry here has a genuine question-paper file under
// public/past-papers/0478/ (and a mark-scheme file too, once hasMarkScheme is
// true). Add more with buildEntry(...) as real PDFs become available; never
// seed placeholder/dummy files.
export const pastPapers0478: PastPaper[] = [
  ...([1, 2, 3] as const).map((variantDigit) =>
    buildEntry(2025, "Oct/Nov", 1, variantDigit, 75, false),
  ),
  ...([1, 2, 3] as const).map((variantDigit) =>
    buildEntry(2025, "Oct/Nov", 2, variantDigit, 75, false),
  ),
];
