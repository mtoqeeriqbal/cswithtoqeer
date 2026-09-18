export type Session = "Feb/Mar" | "May/Jun" | "Oct/Nov";
export type PaperNumber = 1 | 2;
export type DocType = "Question Paper" | "Mark Scheme";

export type PastPaper = {
  year: number;
  session: Session;
  paper: PaperNumber;
  // The printed variant (e.g. 0478/12) — Cambridge prints multiple variants
  // of the same paper per session so no two candidates see an identical
  // paper. All variants cover the same syllabus at the same difficulty, so
  // students should practice every variant available, not just one.
  variant: number;
  type: DocType;
  code: string;
  fileUrl: string;
};

// Ordering helpers — sidebar checkboxes and result lists sort against these, not object/string order.
export const SESSION_ORDER: Session[] = ["Feb/Mar", "May/Jun", "Oct/Nov"];
export const TYPE_ORDER: DocType[] = ["Question Paper", "Mark Scheme"];

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

function buildEntry(
  year: number,
  session: Session,
  paper: PaperNumber,
  variantDigit: 1 | 2 | 3,
  type: DocType,
): PastPaper {
  const variant = paper * 10 + variantDigit;
  const yy = String(year).slice(-2);
  const code = `0478_${SESSION_CODE[session]}${yy}_${TYPE_CODE[type]}_${variant}`;
  const fileUrl = `${BASE_PATH}/past-papers/0478/${year}/${SESSION_SLUG[session]}/paper-${paper}-variant-${variant}-${TYPE_SLUG[type]}.pdf`;
  return { year, session, paper, variant, type, code, fileUrl };
}

// Real papers only — each entry here has a genuine file under
// public/past-papers/0478/. Add more with buildEntry(...) as real PDFs
// become available; never seed placeholder/dummy files.
export const pastPapers0478: PastPaper[] = [
  ...([1, 2, 3] as const).map((variantDigit) =>
    buildEntry(2025, "Oct/Nov", 1, variantDigit, "Question Paper"),
  ),
  ...([1, 2, 3] as const).map((variantDigit) =>
    buildEntry(2025, "Oct/Nov", 2, variantDigit, "Question Paper"),
  ),
];
