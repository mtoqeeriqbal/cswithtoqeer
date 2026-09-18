export type Session = "Feb/Mar" | "May/Jun" | "Oct/Nov";
export type PaperNumber = 1 | 2;
export type DocType = "Question Paper" | "Mark Scheme";

export type PastPaper = {
  year: number;
  session: Session;
  paper: PaperNumber;
  type: DocType;
  fileUrl: string;
};

// Ordering helpers — Selects and result lists sort against these, not string order.
export const SESSION_ORDER: Session[] = ["Feb/Mar", "May/Jun", "Oct/Nov"];
export const TYPE_ORDER: DocType[] = ["Question Paper", "Mark Scheme"];

const SESSION_SLUG: Record<Session, string> = {
  "Feb/Mar": "feb-mar",
  "May/Jun": "may-jun",
  "Oct/Nov": "oct-nov",
};

const TYPE_SLUG: Record<DocType, string> = {
  "Question Paper": "question-paper",
  "Mark Scheme": "mark-scheme",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function fileUrl(year: number, session: Session, paper: PaperNumber, type: DocType) {
  return `${BASE_PATH}/past-papers/0478/${year}/${SESSION_SLUG[session]}/paper-${paper}-${TYPE_SLUG[type]}.pdf`;
}

const YEARS = [2024, 2023];

// Placeholder set — swap each PDF under public/past-papers/0478/ for the real file,
// following the same year/session/paper/type naming convention, no code changes needed.
export const pastPapers0478: PastPaper[] = YEARS.flatMap((year) =>
  SESSION_ORDER.flatMap((session) =>
    ([1, 2] as PaperNumber[]).flatMap((paper) =>
      TYPE_ORDER.map((type) => ({
        year,
        session,
        paper,
        type,
        fileUrl: fileUrl(year, session, paper, type),
      })),
    ),
  ),
);
