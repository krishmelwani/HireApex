import React, { useState, useEffect, useCallback, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, Star, X, CheckCircle2, AlertCircle, ChevronDown, Clock, Building2, User, Mail, Phone, FileText, Calendar, GraduationCap } from "lucide-react";
import {
  getPublicJobsAsync, Job, JobType, TYPE_LABEL, WORK_MODE_LABEL,
  isDeadlinePassed, incrementApplicationCount, formatPay,
} from "@/lib/jobs";
import DOMPurify from "dompurify";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycby7XhV97nuxKW1DHRGSxV9iQbv2yzD3ivYWPVWNGtmFB7DBK5SKRUjXPThoZGMRvlc2/exec";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const BADGE_COLORS: Record<string, string> = {
  remote: "bg-green-50 text-green-700 border-green-200",
  onsite: "bg-blue-50 text-blue-700 border-blue-200",
  hybrid: "bg-purple-50 text-purple-700 border-purple-200",
  anywhere: "bg-orange-50 text-orange-700 border-orange-200",
  "full-time": "bg-primary/5 text-primary border-primary/10",
  internship: "bg-amber-50 text-amber-700 border-amber-200",
  contract: "bg-purple-50 text-purple-700 border-purple-200",
};

function Badge({ label, colorKey }: { label: string; colorKey: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${BADGE_COLORS[colorKey] ?? "bg-muted text-muted-foreground border-border"}`}>
      {label}
    </span>
  );
}

function nextAppId(): string {
  const key = "hireapex_app_counter";
  const current = parseInt(localStorage.getItem(key) ?? "0", 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `HA-${String(next).padStart(3, "0")}`;
}

interface AppForm {
  name: string; email: string; phone: string; city: string; resume: string; availability: string;
  currentSalary: string; expectedSalary: string; noticePeriod: string;
}

const EMPTY_APP: AppForm = {
  name: "", email: "", phone: "", city: "", resume: "", availability: "",
  currentSalary: "", expectedSalary: "", noticePeriod: "",
};

function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState<AppForm>(EMPTY_APP);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => firstInputRef.current?.focus(), 300);
  }, []);

  const isFormValid = form.name.trim() && form.email.trim() && form.phone.trim() && form.resume.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMsg("Name, Email, Phone, and Resume Link are required.");
      setStatus("error");
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    const appId = nextAppId();
    const dateTime = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const jobTypeLabel = TYPE_LABEL[job.type] ?? job.type;
    const sheetName =
      job.type === "full-time" ? "Full_Time_Data"
      : job.type === "internship" ? "Internship_Data"
      : "Contract_Data";

    const payload: Record<string, string> = {
      sheetName,
      applicationId: appId,
      dateTime,
      name: form.name,
      email: form.email,
      phone: form.phone,
      jobTitle: job.title,
      jobType: jobTypeLabel,
      category: job.category ?? "",
      city: form.city,
      currentSalary: form.currentSalary,
      expectedSalary: form.expectedSalary,
      noticePeriod: form.noticePeriod,
      resume: form.resume,
      availability: form.availability,
      hrNotes: "",
    };

    try {
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      incrementApplicationCount(job.id);
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col">

        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Apply for this role</h2>
            <p className="text-xs text-gray-500 mt-0.5">{job.title} · {TYPE_LABEL[job.type]}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {status === "success" ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-500 mb-6 text-sm">We've received your application for <strong>{job.title}</strong>. Our team will review it and get back to you.</p>
              <button onClick={onClose} className="h-11 px-8 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">Back to Jobs</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1.5">{job.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{job.category}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge label={TYPE_LABEL[job.type]} colorKey={job.type} />
                  <Badge label={WORK_MODE_LABEL[job.workMode]} colorKey={job.workMode} />
                  <span className="inline-flex items-center gap-1 text-[11px] text-gray-500"><MapPin className="w-3 h-3" />{job.location}</span>
                  {formatPay(job) && <span className="text-[11px] text-gray-700 font-semibold">{formatPay(job)}</span>}
                  {job.duration && <span className="text-[11px] text-gray-500">{job.duration}{job.durationUnit ? ` ${job.durationUnit}` : ""}</span>}
                  {job.ppo && <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">PPO Available</span>}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><User className="w-3.5 h-3.5 text-primary" /></div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Your Details</h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input ref={firstInputRef} required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Arjun Mehta" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input required type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Jaipur, Delhi, Mumbai…" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Availability</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input value={form.availability} onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Immediate / 2 weeks / 30 days" />
                    </div>
                  </div>
                </div>
              </div>

              {job.type === "full-time" && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-primary" /></div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Professional Details</h4>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Current Salary</label>
                      <input value={form.currentSalary} onChange={(e) => setForm((p) => ({ ...p, currentSalary: e.target.value }))}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. 8 LPA" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Expected Salary</label>
                      <input value={form.expectedSalary} onChange={(e) => setForm((p) => ({ ...p, expectedSalary: e.target.value }))}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. 12 LPA" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Notice Period</label>
                      <input value={form.noticePeriod} onChange={(e) => setForm((p) => ({ ...p, noticePeriod: e.target.value }))}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. 30 days" />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-primary" /></div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Resume</h4>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Resume / Portfolio Link <span className="text-red-500">*</span></label>
                  <input required value={form.resume} onChange={(e) => setForm((p) => ({ ...p, resume: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="https://drive.google.com/file/d/..." />
                  <p className="text-[11px] text-gray-400 mt-1.5">Google Drive link — set access to "Anyone with the link"</p>
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />{errorMsg}
                </div>
              )}
            </form>
          )}
        </div>

        {status !== "success" && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 rounded-b-2xl">
            <button type="button" onClick={onClose} className="h-12 px-6 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button
              onClick={(e) => { const f = document.querySelector<HTMLFormElement>("form"); if (f) f.requestSubmit(); }}
              disabled={submitting || !isFormValid}
              className="flex-1 h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              data-testid="button-submit-application">
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const DESC_LIMIT = 160;

function isHtml(s: string): boolean {
  return /<[a-z][\s\S]*>/i.test(s);
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function RichContent({ html }: { html: string }) {
  if (isHtml(html)) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "div", "span"],
      ALLOWED_ATTR: ["style"],
    });
    return (
      <div
        className="rte-render text-sm text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }
  return <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{html}</p>;
}

function RichSection({ html, label }: { html: string; label: string }) {
  const [showFull, setShowFull] = useState(false);
  const plain = isHtml(html) ? stripHtml(html) : html;
  const isLong = plain.length > 300;

  return (
    <div>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</div>
      <div className={!showFull && isLong ? "line-clamp-4" : ""}>
        <RichContent html={html} />
      </div>
      {isLong && (
        <button onClick={() => setShowFull(!showFull)} className="text-xs text-primary font-semibold mt-1 hover:underline">
          {showFull ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

function eligibilityLabel(job: Job): string | null {
  if (job.fresherAllowed && job.experiencedRequired) return "Fresher & Experienced both can apply";
  if (job.fresherAllowed) return "Fresher welcome";
  if (job.experiencedRequired) return "Experienced candidates preferred";
  return null;
}

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const deadlinePassed = isDeadlinePassed(job.deadline);
  const isAnywhere = job.locationType === "anywhere" || job.location === "Work From Anywhere";
  const eligLabel = eligibilityLabel(job);
  const descPreview = isHtml(job.description) ? stripHtml(job.description) : job.description;

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col ${job.featured ? "border-red-200 ring-1 ring-red-100" : "border-gray-200"}`}>
      {job.featured && (
        <div className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-red-50 to-transparent border-b border-red-100">
          <Star className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Featured Opportunity</span>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-1">{job.title}</h3>
        <p className="text-[12px] text-gray-500 font-medium mb-3">{job.category}</p>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge label={TYPE_LABEL[job.type] ?? job.type} colorKey={job.type} />
          <Badge label={WORK_MODE_LABEL[job.workMode]} colorKey={job.workMode} />
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
            <MapPin className="w-3 h-3" />{isAnywhere ? "Work From Anywhere" : job.location}
          </span>
          {formatPay(job) && <span className="inline-flex items-center text-[11px] text-gray-900 font-bold">{formatPay(job)}</span>}
        </div>

        {(job.experience || eligLabel || job.duration || job.ppo || job.collegeStudents || job.courseRequirements || (job.graduationYears && job.graduationYears.length > 0)) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px] text-gray-500">
            {eligLabel && <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-2 py-0.5 font-semibold"><GraduationCap className="w-3 h-3" />{eligLabel}</span>}
            {job.collegeStudents && <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md px-2 py-0.5 font-semibold">College Students</span>}
            {job.courseRequirements && job.courseRequirements.trim() && <span className="bg-purple-50 text-purple-700 border border-purple-200 rounded-md px-2 py-0.5 font-semibold">Course: {job.courseRequirements.trim()}</span>}
            {job.graduationYears && job.graduationYears.length > 0 && <span className="bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">Year: {job.graduationYears.join(", ")}</span>}
            {job.experience && <span className="inline-flex items-center gap-1"><Building2 className="w-3 h-3" />Exp: {job.experience}</span>}
            {job.duration && <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{job.duration}{job.durationUnit ? ` ${job.durationUnit}` : ""}</span>}
            {job.ppo && <span className="bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">PPO Available</span>}
          </div>
        )}

        {((job.benefits && job.benefits.length > 0) || (job.customBenefits && job.customBenefits.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[...(job.benefits ?? []), ...(job.customBenefits ?? [])].slice(0, 3).map((b) => (
              <span key={b} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 rounded-md px-2 py-0.5">{b}</span>
            ))}
            {[...(job.benefits ?? []), ...(job.customBenefits ?? [])].length > 3 && (
              <span className="text-[10px] text-gray-400">+{[...(job.benefits ?? []), ...(job.customBenefits ?? [])].length - 3} more</span>
            )}
          </div>
        )}

        {job.deadline && (
          <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-2.5 py-1 mb-3 w-fit ${deadlinePassed ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
            <Clock className="w-3 h-3" />
            {deadlinePassed ? "Applications closed" : `Apply by: ${new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
          </div>
        )}

        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">{descPreview.slice(0, DESC_LIMIT)}{descPreview.length > DESC_LIMIT ? "…" : ""}</p>

        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-primary font-semibold mb-4 hover:underline w-fit">
          {expanded ? "Hide details" : "View details"}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mb-4 space-y-4 border-t border-gray-100 pt-4">
                <RichSection html={job.description} label="Full Description" />
                <RichSection html={job.requirements} label="Requirements" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-1">
          {deadlinePassed ? (
            <div className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-400 cursor-not-allowed">
              Applications closed for this role
            </div>
          ) : (
            <button onClick={onApply} className="w-full h-11 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-[0.98]" data-testid={`button-apply-${job.id}`}>
              Apply Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const FEATURED_PER_PAGE = 3;
const NORMAL_PER_PAGE = 3;

export default function Career() {
  const { content } = useContent();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | JobType>("all");
  const [filterMode, setFilterMode] = useState<"all" | "remote" | "onsite" | "hybrid" | "anywhere">("all");
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadJobs = useCallback(async () => {
    try {
      const data = await getPublicJobsAsync();
      setJobs(data);
    } catch { /* keep existing list on error */ }
  }, []);

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 5000);
    return () => clearInterval(interval);
  }, [loadJobs]);

  const featured = jobs.filter((j) => j.featured);
  const rest = jobs.filter((j) => !j.featured);

  function filterJobs(list: Job[]) {
    return list.filter((j) => {
      const q = search.toLowerCase();
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
        || (j.category ?? "").toLowerCase().includes(q) || j.description.toLowerCase().includes(q);
      const matchType = filterType === "all" || j.type === filterType;
      const matchMode = filterMode === "all" || j.workMode === filterMode;
      return matchSearch && matchType && matchMode;
    });
  }

  const filteredFeatured = filterJobs(featured);
  const filteredAll = filterJobs(rest);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeatured.length / FEATURED_PER_PAGE),
    Math.ceil(filteredAll.length / NORMAL_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pagedFeatured = filteredFeatured.slice((safePage - 1) * FEATURED_PER_PAGE, safePage * FEATURED_PER_PAGE);
  const pagedAll = filteredAll.slice((safePage - 1) * NORMAL_PER_PAGE, safePage * NORMAL_PER_PAGE);
  const totalShown = filteredFeatured.length + filteredAll.length;

  function handleFilterChange(fn: () => void) { fn(); setCurrentPage(1); }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-[#F7F8FA] pb-24">

      <section className="relative bg-primary text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">{content.careersHeroHeading}</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
              {content.careersHeroSubheading}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={(e) => handleFilterChange(() => setSearch(e.target.value))}
                placeholder="Search by title, location, category, or keyword…"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                data-testid="input-job-search" />
            </div>
            <div className="flex gap-2">
              <select value={filterType} onChange={(e) => handleFilterChange(() => setFilterType(e.target.value as typeof filterType))}
                className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                data-testid="select-filter-type">
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
              <select value={filterMode} onChange={(e) => handleFilterChange(() => setFilterMode(e.target.value as typeof filterMode))}
                className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                data-testid="select-filter-mode">
                <option value="all">All Modes</option>
                <option value="remote">Remote</option>
                <option value="onsite">In Office</option>
                <option value="hybrid">Hybrid</option>
                <option value="anywhere">Work from Anywhere</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {jobs.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No openings right now</h3>
            <p className="text-gray-500 text-sm">We're not actively hiring at the moment, but check back soon.</p>
          </div>
        )}

        {jobs.length > 0 && totalShown === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">No results</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {pagedFeatured.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-red-500" fill="currentColor" />
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Featured Positions</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pagedFeatured.map((job) => <JobCard key={job.id} job={job} onApply={() => setApplyJob(job)} />)}
            </div>
          </div>
        )}

        {pagedAll.length > 0 && (
          <div>
            {pagedFeatured.length > 0 && <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">All Positions</h2>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pagedAll.map((job) => <JobCard key={job.id} job={job} onApply={() => setApplyJob(job)} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-xl text-sm font-semibold transition-colors border ${
                      page === safePage
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}>
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {totalShown > 0 && (
          <p className="text-xs text-gray-400 text-center mt-6">
            {totalPages > 1
              ? `Page ${safePage} of ${totalPages} · ${totalShown} open position${totalShown !== 1 ? "s" : ""}`
              : `${totalShown} open position${totalShown !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      <AnimatePresence>
        {applyJob && <ApplicationModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
