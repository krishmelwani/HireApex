export type JobType = "full-time" | "internship" | "contract";
export type WorkMode = "remote" | "onsite" | "hybrid" | "anywhere" | "field";
export type StipendType = "fixed" | "range" | "fixed-variable" | "unpaid";
export type DurationUnit = "months" | "weeks";
export type Currency = "INR" | "USD" | "EUR" | "GBP";
export type LocationType = "city" | "anywhere";

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const CURRENCY_LABEL: Record<Currency, string> = {
  INR: "₹ INR",
  USD: "$ USD",
  EUR: "€ EUR",
  GBP: "£ GBP",
};

export const JOB_CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Data / AI / ML",
  "Cybersecurity",
  "Business Development",
  "Sales",
  "HR / Talent Acquisition",
  "Marketing",
  "SEO / Content Writing",
  "Finance / Accounts",
  "Operations",
  "Product Management",
  "Design / UX",
  "Administration",
  "Other",
];

export const STIPEND_TYPE_LABEL: Record<StipendType, string> = {
  fixed: "Fixed",
  range: "Range",
  "fixed-variable": "Fixed + Variable",
  unpaid: "Unpaid",
};

export const BENEFITS_OPTIONS = [
  "Certificate",
  "LOR",
  "Health Insurance",
  "Cab/Shuttle",
  "Flexible Hours",
  "Remote Work",
  "Free Meals",
  "Informal Dress Code",
  "Mentorship",
];

export const WORK_MODE_LABEL: Record<WorkMode, string> = {
  remote: "Remote",
  onsite: "In Office",
  hybrid: "Hybrid",
  anywhere: "Work from Anywhere",
  field: "Field Work",
};

export const TYPE_LABEL: Record<JobType, string> = {
  "full-time": "Full-time",
  internship: "Internship",
  contract: "Contract",
};

export interface ScreeningQuestion {
  id: string;
  text: string;
  type: "yes-no" | "text";
}

export interface Job {
  id: string;
  title: string;
  type: JobType;
  workMode: WorkMode;
  location: string;
  locationType?: LocationType;
  category: string;
  description: string;
  requirements: string;
  salary?: string;
  currency?: Currency;
  experience?: string;
  fresherAllowed?: boolean;
  duration?: string;
  durationUnit?: DurationUnit;
  startDate?: string;
  stipendType?: StipendType;
  stipendAmount?: string;
  stipendMin?: string;
  stipendMax?: string;
  stipendVariable?: string;
  ppo?: boolean;
  benefits?: string[];
  customBenefits?: string[];
  deadline?: string;
  // Eligibility
  collegeStudents?: boolean;
  courseRequirements?: string;
  specificOrganizations?: string;
  experiencedRequired?: boolean;
  experiencedDetail?: string;
  graduationYears?: string[];
  // Legacy
  screeningQuestions?: ScreeningQuestion[];
  applicationCount: number;
  enabled: boolean;
  featured: boolean;
  createdAt: number;
}

/* ── Salary / stipend display helper (always shows ₹ or chosen currency) ── */
export function formatPay(job: Job): string {
  const sym = CURRENCY_SYMBOL[job.currency ?? "INR"];
  if (job.type === "internship") {
    if (job.stipendType === "unpaid") return "Unpaid";
    if (job.stipendType === "range" && (job.stipendMin || job.stipendMax))
      return `${sym} ${job.stipendMin || "0"} – ${sym} ${job.stipendMax || "0"}`;
    if (job.stipendType === "fixed-variable" && job.stipendAmount)
      return `${sym} ${job.stipendAmount}${job.stipendVariable ? ` + ${job.stipendVariable}` : ""}`;
    if (job.stipendAmount) return `${sym} ${job.stipendAmount}`;
    return "";
  }
  if (job.salary) {
    const trimmed = job.salary.trim();
    return trimmed.startsWith(sym) || trimmed.startsWith("₹") || trimmed.startsWith("$")
      ? trimmed
      : `${sym} ${trimmed}`;
  }
  return "";
}

const API_BASE = "/api";

function normalise(j: Job): Job {
  return {
    benefits: [],
    screeningQuestions: [],
    ...j,
    applicationCount: j.applicationCount ?? 0,
    category: j.category ?? "Other",
  };
}

/* ── Public (career page) ── */
export async function getPublicJobsAsync(): Promise<Job[]> {
  const res = await fetch(`${API_BASE}/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json() as Job[];
  return data.map(normalise);
}

/* ── Admin ── */
export async function getJobsAsync(): Promise<Job[]> {
  const res = await fetch(`${API_BASE}/admin/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json() as Job[];
  return data.map(normalise);
}

export async function createJobAsync(
  data: Omit<Job, "id" | "createdAt" | "enabled" | "featured" | "applicationCount">
): Promise<Job> {
  const job: Job = {
    ...data,
    id: crypto.randomUUID(),
    enabled: true,
    featured: false,
    applicationCount: 0,
    createdAt: Date.now(),
  };
  const res = await fetch(`${API_BASE}/admin/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return job;
}

export async function updateJobAsync(id: string, updates: Partial<Job>): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update job");
}

export async function deleteJobAsync(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/jobs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
}

export async function incrementApplicationCount(id: string): Promise<void> {
  await fetch(`${API_BASE}/jobs/${id}/increment`, { method: "POST" });
}

export async function getPublicJobs(): Promise<Job[]> {
  return getPublicJobsAsync();
}

/* ── Auth (still localStorage — admin-only browser state) ── */
const AUTH_KEY = "hireapex_admin_auth";
export function setAuth(): void { localStorage.setItem(AUTH_KEY, "true"); }
export function clearAuth(): void { localStorage.removeItem(AUTH_KEY); }
export function isAuthenticated(): boolean { return localStorage.getItem(AUTH_KEY) === "true"; }

export function isDeadlinePassed(deadline?: string): boolean {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}
