import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, LogOut, ToggleLeft, ToggleRight, Star,
  ChevronDown, ChevronUp, X, CheckCircle2, AlertCircle, Eye, Clock,
  Building2, Briefcase, GraduationCap, Wallet, Gift, FileText, Calendar, MapPin, Search,
} from "lucide-react";
import {
  getJobsAsync, createJobAsync, updateJobAsync, deleteJobAsync,
  clearAuth, isAuthenticated,
  Job, JobType, WorkMode, StipendType, DurationUnit, Currency, LocationType,
  JOB_CATEGORIES, TYPE_LABEL, WORK_MODE_LABEL, BENEFITS_OPTIONS,
  CURRENCY_LABEL, CURRENCY_SYMBOL, formatPay,
} from "@/lib/jobs";
import RichTextEditor from "@/components/RichTextEditor";
import DOMPurify from "dompurify";

type AdminTab = "post" | "manage";

const EMPTY_FORM = {
  title: "",
  type: "full-time" as JobType,
  workMode: "onsite" as WorkMode,
  locationType: "city" as LocationType,
  location: "",
  category: "Frontend Development",
  description: "",
  requirements: "",
  salary: "",
  currency: "INR" as Currency,
  experience: "",
  fresherAllowed: false,
  duration: "",
  durationUnit: "months" as DurationUnit,
  startDate: "",
  stipendType: "fixed" as StipendType,
  stipendAmount: "",
  stipendMin: "",
  stipendMax: "",
  stipendVariable: "",
  ppo: false,
  benefits: [] as string[],
  customBenefits: [] as string[],
  deadline: "",
  collegeStudents: false,
  courseRequirements: "",
  specificOrganizations: "",
  experiencedRequired: false,
  experiencedDetail: "",
  graduationYears: [] as string[],
};

const GRAD_YEARS = ["All", "2022", "2023", "2024", "2025", "2026"];

/* ── Reusable iOS-style toggle ── */
function Toggle({ on, onChange, label, hint }: { on: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <button type="button" onClick={() => onChange(!on)}
      className="flex items-start justify-between w-full gap-4 text-left bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        {hint && <div className="text-[11px] text-gray-500 mt-0.5">{hint}</div>}
      </div>
      <div className={`relative w-11 h-6 rounded-full shrink-0 mt-0.5 transition-colors ${on ? "bg-primary" : "bg-gray-300"}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </div>
    </button>
  );
}

/* ── Button-card selector ── */
function ButtonCard<T extends string>({ value, options, onChange }: {
  value: T;
  options: { value: T; label: string; hint?: string; icon?: React.ReactNode }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`text-left px-3 py-3 rounded-xl border transition-all ${active ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-gray-200 bg-white hover:border-gray-300"}`}>
            <div className="flex items-center gap-2 mb-1">
              {opt.icon && <span className={active ? "text-primary" : "text-gray-400"}>{opt.icon}</span>}
              <span className={`text-sm font-semibold ${active ? "text-primary" : "text-gray-700"}`}>{opt.label}</span>
            </div>
            {opt.hint && <div className="text-[11px] text-gray-500">{opt.hint}</div>}
          </button>
        );
      })}
    </div>
  );
}

/* ── Section card wrapper ── */
function SectionCard({ icon, title, children, action }: { icon: React.ReactNode; title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

const SECTIONS: { label: string; type: JobType; color: string; bg: string; border: string }[] = [
  { label: "Full-time", type: "full-time", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  { label: "Internship", type: "internship", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  { label: "Contract", type: "contract", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<AdminTab>("post");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [extendDeadlineId, setExtendDeadlineId] = useState<string | null>(null);
  const [newDeadline, setNewDeadline] = useState("");
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [customBenefitInput, setCustomBenefitInput] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      const data = await getJobsAsync();
      setJobs(data);
    } catch { /* silent — jobs stay as-is */ }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) { navigate("/login"); return; }
    loadJobs();
  }, [navigate, loadJobs]);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  function setField(field: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleBenefit(b: string) {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(b) ? prev.benefits.filter((x) => x !== b) : [...prev.benefits, b],
    }));
  }

  function toggleCustomBenefit(b: string) {
    setForm((prev) => ({
      ...prev,
      customBenefits: prev.customBenefits.includes(b)
        ? prev.customBenefits.filter((x) => x !== b)
        : [...prev.customBenefits, b],
    }));
  }

  function toggleGradYear(y: string) {
    setForm((prev) => ({
      ...prev,
      graduationYears: prev.graduationYears.includes(y)
        ? prev.graduationYears.filter((x) => x !== y)
        : [...prev.graduationYears, y],
    }));
  }

  function startEdit(job: Job) {
    setForm({
      title: job.title,
      type: job.type,
      workMode: job.workMode,
      locationType: (job.locationType ?? (job.location === "Work From Anywhere" ? "anywhere" : "city")) as LocationType,
      location: job.location,
      category: job.category ?? "Other",
      description: job.description,
      requirements: job.requirements,
      salary: job.salary ?? "",
      currency: (job.currency ?? "INR") as Currency,
      experience: job.experience ?? "",
      fresherAllowed: job.fresherAllowed ?? false,
      duration: job.duration ?? "",
      durationUnit: (job.durationUnit ?? "months") as DurationUnit,
      startDate: job.startDate ?? "",
      stipendType: (job.stipendType ?? "fixed") as StipendType,
      stipendAmount: job.stipendAmount ?? "",
      stipendMin: job.stipendMin ?? "",
      stipendMax: job.stipendMax ?? "",
      stipendVariable: job.stipendVariable ?? "",
      ppo: job.ppo ?? false,
      benefits: job.benefits ?? [],
      customBenefits: job.customBenefits ?? [],
      deadline: job.deadline ?? "",
      collegeStudents: job.collegeStudents ?? false,
      courseRequirements: job.courseRequirements ?? "",
      specificOrganizations: job.specificOrganizations ?? "",
      experiencedRequired: job.experiencedRequired ?? false,
      experiencedDetail: job.experiencedDetail ?? "",
      graduationYears: job.graduationYears ?? [],
    });
    setEditingId(job.id);
    setTab("post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.location || !form.description || !form.requirements) {
      showToast("error", "Please fill in all required fields.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));

    const resolvedLocation = form.locationType === "anywhere" ? "Work From Anywhere" : form.location;

    const payload: Omit<Job, "id" | "createdAt" | "enabled" | "featured" | "applicationCount"> = {
      title: form.title,
      type: form.type,
      workMode: form.workMode,
      locationType: form.locationType,
      location: resolvedLocation,
      category: form.category,
      description: form.description,
      requirements: form.requirements,
      currency: form.currency,
      benefits: form.benefits.length > 0 ? form.benefits : undefined,
      customBenefits: form.customBenefits.length > 0 ? form.customBenefits : undefined,
      deadline: form.deadline || undefined,
      collegeStudents: form.collegeStudents,
      courseRequirements: form.courseRequirements || undefined,
      specificOrganizations: form.specificOrganizations || undefined,
      experiencedRequired: form.experiencedRequired,
      experiencedDetail: form.experiencedDetail || undefined,
      graduationYears: form.graduationYears.length > 0 ? form.graduationYears : undefined,
      ...(form.type === "internship"
        ? {
            duration: form.duration || undefined,
            durationUnit: form.durationUnit,
            startDate: form.startDate || undefined,
            stipendType: form.stipendType,
            stipendAmount: form.stipendAmount || undefined,
            stipendMin: form.stipendMin || undefined,
            stipendMax: form.stipendMax || undefined,
            stipendVariable: form.stipendVariable || undefined,
            ppo: form.ppo,
            fresherAllowed: form.fresherAllowed,
          }
        : {
            salary: form.salary || undefined,
            experience: form.experience || undefined,
            fresherAllowed: form.fresherAllowed,
            duration: form.type === "contract" ? (form.duration || undefined) : undefined,
            durationUnit: form.type === "contract" ? form.durationUnit : undefined,
          }),
    };

    try {
      if (editingId) {
        await updateJobAsync(editingId, payload);
        showToast("success", "Job updated successfully.");
        setEditingId(null);
      } else {
        await createJobAsync(payload);
        showToast("success", "Job posted successfully.");
      }
      setForm(EMPTY_FORM);
      await loadJobs();
      setTab("manage");
    } catch {
      showToast("error", "Failed to save job. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleExtendDeadline(id: string) {
    if (!newDeadline) return;
    try {
      await updateJobAsync(id, { deadline: newDeadline });
      await loadJobs();
      setExtendDeadlineId(null);
      setNewDeadline("");
      showToast("success", "Deadline extended.");
    } catch {
      showToast("error", "Failed to extend deadline.");
    }
  }

  const fc = "w-full h-10 px-3.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";
  const ac = "w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y min-h-[100px]";
  const lc = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";

  const totalApps = jobs.reduce((s, j) => s + (j.applicationCount || 0), 0);
  const previewJob = previewId ? jobs.find((j) => j.id === previewId) : null;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Top bar */}
      <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg tracking-tight">HireApex Admin</div>
          <div className="text-xs text-white/60 mt-0.5">Job Management Panel</div>
        </div>
        <button onClick={() => { clearAuth(); navigate("/login"); }}
          className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
          data-testid="button-admin-logout">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${toast.type === "success" ? "bg-green-600 text-white" : "bg-destructive text-white"}`}>
            {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="font-bold text-primary text-lg mb-2">Delete Job?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 h-10 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-colors">Cancel</button>
                <button onClick={async () => { try { await deleteJobAsync(deleteConfirmId!); await loadJobs(); showToast("success", "Job deleted."); } catch { showToast("error", "Failed to delete."); } finally { setDeleteConfirmId(null); } }}
                  className="flex-1 h-10 rounded-lg bg-destructive text-white text-sm font-medium hover:bg-destructive/90 transition-colors">🗑 Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview modal */}
      <AnimatePresence>
        {previewJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setPreviewId(null)}>
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              <div className="bg-primary p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60 mb-1 uppercase tracking-wider font-semibold">{previewJob.category}</div>
                  <h2 className="text-white font-bold text-xl">{previewJob.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-white/15 text-white rounded-full px-2.5 py-0.5">{TYPE_LABEL[previewJob.type]}</span>
                    <span className="text-xs bg-white/15 text-white rounded-full px-2.5 py-0.5">{WORK_MODE_LABEL[previewJob.workMode]}</span>
                    <span className="text-xs bg-white/15 text-white rounded-full px-2.5 py-0.5">{previewJob.location}</span>
                    {formatPay(previewJob) && <span className="text-xs bg-white/15 text-white rounded-full px-2.5 py-0.5 font-semibold">{formatPay(previewJob)}</span>}
                    {previewJob.ppo && <span className="text-xs bg-accent/80 text-white rounded-full px-2.5 py-0.5">PPO Available</span>}
                  </div>
                </div>
                <button onClick={() => setPreviewId(null)} className="text-white/70 hover:text-white shrink-0"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {previewJob.deadline && (
                  <div className={`text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5 ${new Date(previewJob.deadline) < new Date() ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(previewJob.deadline) < new Date() ? "Applications Closed" : `Deadline: ${new Date(previewJob.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                  </div>
                )}
                {previewJob.benefits && previewJob.benefits.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Benefits</div>
                    <div className="flex flex-wrap gap-1.5">
                      {previewJob.benefits.map((b) => <span key={b} className="text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-0.5 font-medium">✅ {b}</span>)}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Description</div>
                  {/<[a-z][\s\S]*>/i.test(previewJob.description)
                    ? <div className="rte-render text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(previewJob.description, { ALLOWED_TAGS: ["b","strong","i","em","u","br","p","ul","ol","li","div","span"], ALLOWED_ATTR: ["style"] }) }} />
                    : <p className="text-sm whitespace-pre-wrap leading-relaxed">{previewJob.description}</p>}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Requirements</div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{previewJob.requirements}</p>
                </div>
                {previewJob.screeningQuestions && previewJob.screeningQuestions.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Screening Questions ({previewJob.screeningQuestions.length})</div>
                    <ol className="space-y-1">
                      {previewJob.screeningQuestions.map((q, i) => <li key={q.id} className="text-sm text-foreground"><span className="font-semibold text-muted-foreground mr-1">Q{i + 1}.</span>{q.text} <span className="text-[10px] bg-muted rounded px-1 ml-1">{q.type === "yes-no" ? "Yes/No" : "Text"}</span></li>)}
                    </ol>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
                  {previewJob.experience && <span><strong>Experience:</strong> {previewJob.experience}</span>}
                  {previewJob.fresherAllowed && <span className="text-green-700 font-semibold">Freshers Welcome</span>}
                  {previewJob.duration && <span><strong>Duration:</strong> {previewJob.duration}</span>}
                  <span><strong>Applications:</strong> {previewJob.applicationCount || 0}</span>
                  <span><strong>Posted:</strong> {new Date(previewJob.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Jobs", value: jobs.length },
            { label: "Active", value: jobs.filter((j) => j.enabled).length },
            { label: "Featured", value: jobs.filter((j) => j.featured).length },
            { label: "Applications", value: totalApps },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-border rounded-xl p-1 mb-6 w-fit">
          {(["post", "manage"] as const).map((t) => (
            <button key={t}
              onClick={() => { setTab(t); if (t === "post" && editingId) cancelEdit(); }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-primary"}`}
              data-testid={`tab-admin-${t}`}>
              {t === "post" ? (editingId ? "✏️ Edit Job" : "+ Post Job") : `Manage Jobs (${jobs.length})`}
            </button>
          ))}
        </div>

        {/* ─── POST / EDIT FORM ─── */}
        {tab === "post" && (
          <motion.div key="post" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Job" : "Post a New Job"}</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fill in details — all sections expand based on your job type.</p>
              </div>
              {editingId && <button onClick={cancelEdit} className="h-9 px-4 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 flex items-center gap-1.5"><X className="w-4 h-4" /> Cancel edit</button>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ── 1. JOB DETAILS ── */}
              <SectionCard icon={<Briefcase className="w-4 h-4" />} title="Job Details">
                <div className="space-y-5">
                  <div>
                    <label className={lc}>Job Nature *</label>
                    <ButtonCard
                      value={form.type}
                      onChange={(v) => setField("type", v)}
                      options={[
                        { value: "internship", label: "Internship", hint: "Student / training role" },
                        { value: "full-time", label: "Full-time Job", hint: "Permanent role" },
                        { value: "contract", label: "Contract", hint: "Fixed-term project" },
                      ]}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={lc}>{form.type === "internship" ? "Internship Title *" : "Job Title *"}</label>
                      <input required value={form.title} onChange={(e) => setField("title", e.target.value)}
                        placeholder={form.type === "internship" ? "e.g. Marketing Intern" : "e.g. Senior Product Manager"}
                        className={fc} data-testid="input-job-title" />
                    </div>
                    <div>
                      <label className={lc}>Location *</label>
                      <ButtonCard
                        value={form.locationType}
                        onChange={(v) => setField("locationType", v)}
                        options={[
                          { value: "city", label: "Select City", hint: "Specify city" },
                          { value: "anywhere", label: "Work From Anywhere", hint: "Fully remote" },
                        ]}
                      />
                      {form.locationType === "city" && (
                        <input required value={form.location} onChange={(e) => setField("location", e.target.value)}
                          placeholder="e.g. Jaipur, Rajasthan" className={`${fc} mt-2`} />
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className={lc}>Category *</label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select value={form.category} onChange={(e) => setField("category", e.target.value)} className={`${fc} pl-9`}>
                          {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {(form.type === "internship" || form.type === "contract") && (
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={lc}>{form.type === "internship" ? "Internship Duration" : "Contract Duration"}</label>
                        <div className="flex gap-2">
                          <input value={form.duration} onChange={(e) => setField("duration", e.target.value)}
                            placeholder="e.g. 3" className={`${fc} flex-1`} />
                          <div className="flex bg-gray-100 rounded-lg p-1">
                            {(["months", "weeks"] as DurationUnit[]).map((u) => (
                              <button key={u} type="button" onClick={() => setField("durationUnit", u)}
                                className={`px-3 text-xs font-semibold rounded-md transition-all ${form.durationUnit === u ? "bg-white text-primary shadow-sm" : "text-gray-500"}`}>
                                {u === "months" ? "In months" : "In weeks"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {form.type === "internship" && (
                        <div>
                          <label className={lc}>Internship Start Date</label>
                          <input type="date" value={form.startDate} onChange={(e) => setField("startDate", e.target.value)} className={fc} />
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className={lc}>Workplace Type *</label>
                    <ButtonCard
                      value={form.workMode}
                      onChange={(v) => setField("workMode", v)}
                      options={[
                        { value: "onsite", label: "In Office", hint: "Traditional office" },
                        { value: "remote", label: "Remote", hint: "Work from anywhere" },
                        { value: "field", label: "Field Work", hint: "Travel required" },
                        { value: "hybrid", label: "Hybrid", hint: "Mix of office & remote" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className={lc}>Application Deadline</label>
                    <input type="date" value={form.deadline} onChange={(e) => setField("deadline", e.target.value)} className={`${fc} max-w-xs`} />
                    <div className="text-[11px] text-gray-500 mt-1.5">Default: 30 days from start date</div>
                  </div>
                </div>
              </SectionCard>

              {/* ── 2. ELIGIBILITY CRITERIA ── */}
              <SectionCard icon={<GraduationCap className="w-4 h-4" />} title="Eligibility Criteria">
                <div className="grid md:grid-cols-2 gap-3">
                  <Toggle on={form.collegeStudents} onChange={(v) => setField("collegeStudents", v)}
                    label="College Students" hint="Open to current students" />
                  <Toggle on={form.fresherAllowed} onChange={(v) => setField("fresherAllowed", v)}
                    label="Freshers" hint="Open to recent graduates" />
                  <Toggle on={!!form.courseRequirements} onChange={(v) => setField("courseRequirements", v ? " " : "")}
                    label="Course Requirements" hint="Specify a particular course/degree (optional)" />
                  <Toggle on={!!form.specificOrganizations} onChange={(v) => setField("specificOrganizations", v ? " " : "")}
                    label="Specific Organizations" hint="Restrict to certain colleges/companies (optional)" />
                  <Toggle on={form.experiencedRequired} onChange={(v) => setField("experiencedRequired", v)}
                    label="Experienced" hint="Require prior work experience" />
                  {form.type === "internship" && (
                    <Toggle on={form.ppo} onChange={(v) => setField("ppo", v)}
                      label="Pre-Placement Offer (PPO)" hint="PPO available on completion" />
                  )}
                </div>

                {form.courseRequirements && (
                  <div className="mt-4">
                    <label className={lc}>Course Requirements</label>
                    <input value={form.courseRequirements} onChange={(e) => setField("courseRequirements", e.target.value)}
                      placeholder="e.g. B.Tech CSE, MBA Marketing" className={fc} />
                  </div>
                )}
                {form.specificOrganizations && (
                  <div className="mt-4">
                    <label className={lc}>Specific Organizations</label>
                    <input value={form.specificOrganizations} onChange={(e) => setField("specificOrganizations", e.target.value)}
                      placeholder="e.g. IIT, IIM, NIT" className={fc} />
                  </div>
                )}
                {form.fresherAllowed && (
                  <div className="mt-4">
                    <label className={lc}>Graduation Years</label>
                    <div className="flex flex-wrap gap-2">
                      {GRAD_YEARS.map((y) => {
                        const active = form.graduationYears.includes(y);
                        return (
                          <button key={y} type="button" onClick={() => toggleGradYear(y)}
                            className={`px-3.5 h-9 rounded-lg text-sm font-semibold border transition-all ${active ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>
                            {y}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {form.experiencedRequired && (
                  <div className="mt-4">
                    <label className={lc}>Prior Experience Required</label>
                    <input value={form.experiencedDetail || form.experience} onChange={(e) => { setField("experiencedDetail", e.target.value); setField("experience", e.target.value); }}
                      placeholder="e.g. 2+ years in product management" className={fc} />
                  </div>
                )}
              </SectionCard>

              {/* ── 3. STIPEND / COMPENSATION ── */}
              <SectionCard icon={<Wallet className="w-4 h-4" />} title={form.type === "internship" ? "Stipend Details" : "Compensation"}>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className={lc}>{form.type === "internship" ? "Stipend Type" : "Salary Type"}</label>
                    <ButtonCard
                      value={form.stipendType}
                      onChange={(v) => setField("stipendType", v)}
                      options={[
                        { value: "fixed", label: "Fixed" },
                        { value: "range", label: "Range" },
                        { value: "fixed-variable", label: "Fixed + Variable" },
                        { value: "unpaid", label: "Unpaid" },
                      ]}
                    />
                  </div>
                  <div>
                    <label className={lc}>Currency</label>
                    <select value={form.currency} onChange={(e) => setField("currency", e.target.value)} className={fc}>
                      {(Object.entries(CURRENCY_LABEL) as [string, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                </div>

                {form.stipendType === "fixed" && (
                  <div>
                    <label className={lc}>Fixed Amount</label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">{CURRENCY_SYMBOL[form.currency]}</span>
                      <input value={form.type === "internship" ? form.stipendAmount : form.salary}
                        onChange={(e) => setField(form.type === "internship" ? "stipendAmount" : "salary", e.target.value)}
                        placeholder={form.type === "internship" ? "e.g. 10,000/month" : "e.g. 8 LPA"}
                        className={`${fc} pl-8`} />
                    </div>
                  </div>
                )}
                {form.stipendType === "range" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lc}>Minimum Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">{CURRENCY_SYMBOL[form.currency]}</span>
                        <input value={form.stipendMin} onChange={(e) => setField("stipendMin", e.target.value)} placeholder="5,000" className={`${fc} pl-8`} />
                      </div>
                    </div>
                    <div>
                      <label className={lc}>Maximum Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">{CURRENCY_SYMBOL[form.currency]}</span>
                        <input value={form.stipendMax} onChange={(e) => setField("stipendMax", e.target.value)} placeholder="10,000" className={`${fc} pl-8`} />
                      </div>
                    </div>
                  </div>
                )}
                {form.stipendType === "fixed-variable" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lc}>Fixed Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">{CURRENCY_SYMBOL[form.currency]}</span>
                        <input value={form.type === "internship" ? form.stipendAmount : form.salary}
                          onChange={(e) => setField(form.type === "internship" ? "stipendAmount" : "salary", e.target.value)}
                          placeholder="10,000" className={`${fc} pl-8`} />
                      </div>
                    </div>
                    <div>
                      <label className={lc}>Variable Component</label>
                      <input value={form.stipendVariable} onChange={(e) => setField("stipendVariable", e.target.value)}
                        placeholder="e.g. 10% of Fixed Amount" className={fc} />
                    </div>
                  </div>
                )}
                {form.stipendType === "unpaid" && (
                  <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3">This role is unpaid. No amount fields required.</div>
                )}
              </SectionCard>

              {/* ── 4. JOB DESCRIPTION ── */}
              <SectionCard icon={<FileText className="w-4 h-4" />} title="Job Description">
                <div>
                  <label className={lc}>Description *</label>
                  <RichTextEditor
                    value={form.description}
                    onChange={(html) => setField("description", html)}
                    placeholder="Describe the role, responsibilities, and team context. Use the toolbar to apply bold, bullets, numbered lists, and alignment."
                    minHeight={180}
                  />
                  <div className="text-[11px] text-gray-500 mt-1.5">Formatting (bold, bullets, numbered lists, alignment) is preserved on the career page.</div>
                </div>
              </SectionCard>

              {/* ── 5. INTERNSHIP / JOB / CONTRACT REQUIREMENTS (dynamic) ── */}
              <SectionCard icon={<Building2 className="w-4 h-4" />} title={
                form.type === "internship" ? "Internship Requirements"
                  : form.type === "contract" ? "Contract Requirements"
                  : "Job Requirements"
              }>
                <div>
                  <label className={lc}>
                    {form.type === "internship" ? "Responsibilities & Learning Outcomes *"
                      : form.type === "contract" ? "Project Scope, Deliverables & Duration *"
                      : "Job Responsibilities, Skills & Experience *"}
                  </label>
                  <textarea required value={form.requirements} onChange={(e) => setField("requirements", e.target.value)}
                    placeholder={
                      form.type === "internship"
                        ? "• Internship responsibilities\n• Learning outcomes\n• Duration commitments"
                        : form.type === "contract"
                          ? "• Project scope\n• Deliverables\n• Timeline & milestones"
                          : "• Job responsibilities\n• Skills required\n• Experience required"
                    }
                    className={`${ac} min-h-[140px]`} />
                </div>
              </SectionCard>

              {/* ── 6. ADDITIONAL BENEFITS ── */}
              <SectionCard icon={<Gift className="w-4 h-4" />} title="Additional Benefits">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(showAllBenefits ? BENEFITS_OPTIONS : BENEFITS_OPTIONS.slice(0, 6)).map((b) => {
                    const on = form.benefits.includes(b);
                    return (
                      <button key={b} type="button" onClick={() => toggleBenefit(b)}
                        className={`text-xs rounded-full px-3.5 py-1.5 font-semibold border transition-all ${on ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>
                        {on && "✓ "}{b}
                      </button>
                    );
                  })}
                  <button type="button" onClick={() => setShowAllBenefits((v) => !v)}
                    className="text-xs rounded-full px-3.5 py-1.5 font-semibold text-primary hover:bg-primary/5">
                    {showAllBenefits ? "Show Less Benefits" : `Show More Benefits (${BENEFITS_OPTIONS.length - 6})`}
                  </button>
                </div>
                <div>
                  <label className={lc}>Add Custom Benefit</label>
                  <div className="flex gap-2">
                    <input value={customBenefitInput} onChange={(e) => setCustomBenefitInput(e.target.value)}
                      placeholder="e.g. Annual offsite trip"
                      className={`${fc} flex-1`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customBenefitInput.trim()) {
                          e.preventDefault();
                          toggleCustomBenefit(customBenefitInput.trim());
                          setCustomBenefitInput("");
                        }
                      }} />
                    <button type="button"
                      onClick={() => { if (customBenefitInput.trim()) { toggleCustomBenefit(customBenefitInput.trim()); setCustomBenefitInput(""); } }}
                      className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center gap-1.5 shrink-0">
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {form.customBenefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.customBenefits.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full pl-3 pr-1.5 py-1">
                          {b}
                          <button type="button" onClick={() => toggleCustomBenefit(b)} className="w-4 h-4 rounded-full hover:bg-primary/20 flex items-center justify-center">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* ── Submit (sticky) ── */}
              <div className="sticky bottom-4 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-lg p-4 flex items-center justify-between gap-3">
                <div className="text-xs text-gray-500">All required fields marked with *</div>
                <div className="flex gap-3">
                  {editingId && (
                    <button type="button" onClick={cancelEdit}
                      className="h-11 px-5 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
                  )}
                  <button type="submit" disabled={saving}
                    className="h-11 px-7 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 flex items-center gap-2 transition-all shadow-md shadow-primary/20"
                    data-testid="button-post-job">
                    <Plus className="w-4 h-4" />
                    {saving ? "Saving…" : editingId ? "Update Job" : "Post Job"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── MANAGE JOBS ─── */}
        {tab === "manage" && (
          <motion.div key="manage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {jobs.length === 0 && (
              <div className="bg-white rounded-2xl border border-border p-12 text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Plus className="w-7 h-7 text-primary/40" />
                </div>
                <p className="font-semibold text-foreground">No jobs posted yet</p>
                <p className="text-sm mt-1">Go to Post Job to add your first listing.</p>
              </div>
            )}

            {SECTIONS.map(({ label, type, color, bg, border }) => {
              const sectionJobs = jobs.filter((j) => j.type === type);
              if (sectionJobs.length === 0) return null;
              return (
                <div key={type}>
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider mb-4 ${bg} ${border} ${color}`}>
                    {label} <span className="opacity-60">({sectionJobs.length})</span>
                  </div>
                  <div className="space-y-3">
                    {sectionJobs.map((job) => (
                      <AdminJobCard
                        key={job.id}
                        job={job}
                        onEdit={startEdit}
                        onDelete={() => setDeleteConfirmId(job.id)}
                        onToggleEnabled={async () => { await updateJobAsync(job.id, { enabled: !job.enabled }); loadJobs(); }}
                        onToggleFeatured={async () => { await updateJobAsync(job.id, { featured: !job.featured }); loadJobs(); }}
                        onPreview={() => setPreviewId(job.id)}
                        onExtendDeadline={() => { setExtendDeadlineId(job.id); setNewDeadline(job.deadline ?? ""); }}
                        extendDeadlineId={extendDeadlineId}
                        newDeadline={newDeadline}
                        setNewDeadline={setNewDeadline}
                        onSaveDeadline={() => handleExtendDeadline(job.id)}
                        onCancelDeadline={() => { setExtendDeadlineId(null); setNewDeadline(""); }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Admin Job Card ─── */
interface AdminJobCardProps {
  job: Job;
  onEdit: (j: Job) => void;
  onDelete: () => void;
  onToggleEnabled: () => void;
  onToggleFeatured: () => void;
  onPreview: () => void;
  onExtendDeadline: () => void;
  extendDeadlineId: string | null;
  newDeadline: string;
  setNewDeadline: (v: string) => void;
  onSaveDeadline: () => void;
  onCancelDeadline: () => void;
}

function AdminJobCard({ job, onEdit, onDelete, onToggleEnabled, onToggleFeatured, onPreview,
  onExtendDeadline, extendDeadlineId, newDeadline, setNewDeadline, onSaveDeadline, onCancelDeadline }: AdminJobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const deadlinePassed = job.deadline ? new Date(job.deadline) < new Date() : false;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm transition-all">
      <div className="flex items-center gap-3 p-4">
        <button onClick={onToggleFeatured} title="Toggle featured"
          className={`shrink-0 ${job.featured ? "text-accent" : "text-border hover:text-accent"} transition-colors`}>
          <Star className="w-5 h-5" fill={job.featured ? "currentColor" : "none"} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-primary text-sm truncate">{job.title}</span>
            {job.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent">FEATURED</span>}
            {!job.enabled && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">DISABLED</span>}
            {job.ppo && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">PPO</span>}
            {job.fresherAllowed && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Freshers OK</span>}
            {job.deadline && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${deadlinePassed ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>
                ⏳ {deadlinePassed ? "CLOSED" : new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{job.category}</span>
            <span>·</span>
            <span>{WORK_MODE_LABEL[job.workMode]}</span>
            <span>·</span>
            <span>{job.location}</span>
            {formatPay(job) && <><span>·</span><span className="font-semibold text-foreground">{formatPay(job)}</span></>}
            <span>·</span>
            <span className="font-semibold text-primary">{job.applicationCount || 0} applied</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onPreview} title="👁 Preview" className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"><Eye className="w-4 h-4" /></button>
          <button onClick={onExtendDeadline} title="⏳ Extend deadline" className="p-1.5 rounded-lg text-muted-foreground hover:text-amber-600 hover:bg-amber-50 transition-colors"><Clock className="w-4 h-4" /></button>
          <button onClick={onToggleEnabled} title={job.enabled ? "Disable" : "Enable"}
            className={`p-1.5 rounded-lg transition-colors ${job.enabled ? "text-green-500 hover:bg-green-50" : "text-muted-foreground hover:bg-secondary/50"}`}>
            {job.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          </button>
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button onClick={() => onEdit(job)} className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors" data-testid={`button-edit-job-${job.id}`}>
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors" data-testid={`button-delete-job-${job.id}`}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Extend deadline inline */}
      <AnimatePresence>
        {extendDeadlineId === job.id && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
            <div className="px-5 py-3 flex items-center gap-3 bg-amber-50/70">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold text-amber-700">⏳ Extend Deadline:</span>
              <input type="date" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)}
                className="h-8 px-3 rounded-lg border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              <button onClick={onSaveDeadline} className="h-8 px-4 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors">Save</button>
              <button onClick={onCancelDeadline} className="h-8 px-3 rounded-lg border border-border text-xs font-semibold hover:bg-white transition-colors">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
            <div className="p-5 space-y-3">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Description</div>
                <p className="text-sm whitespace-pre-wrap">{job.description}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Requirements</div>
                <p className="text-sm whitespace-pre-wrap">{job.requirements}</p>
              </div>
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Benefits</div>
                  <div className="flex flex-wrap gap-1.5">{job.benefits.map((b) => <span key={b} className="text-xs bg-green-50 text-green-700 rounded-full px-2.5 py-0.5">✅ {b}</span>)}</div>
                </div>
              )}
              {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Screening Questions</div>
                  <ol className="space-y-1">{job.screeningQuestions.map((q, i) => <li key={q.id} className="text-sm"><span className="font-semibold text-muted-foreground mr-1">Q{i + 1}.</span>{q.text} <span className="text-[10px] bg-muted rounded px-1">{q.type === "yes-no" ? "Yes/No" : "Text"}</span></li>)}</ol>
                </div>
              )}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                {job.experience && <span><strong>Experience:</strong> {job.experience}</span>}
                {job.duration && <span><strong>Duration:</strong> {job.duration}</span>}
                {job.salary && <span><strong>Salary:</strong> {job.salary}</span>}
                <span><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
