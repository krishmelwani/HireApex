import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LogOut, Save, RotateCcw, Clock, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useContent, SiteContent, DEFAULT_CONTENT } from "@/contexts/ContentContext";

const CMS_AUTH_KEY = "hireapex_cms_auth";
const ADMIN_EMAIL = "krishmelwani917@gmail.com";
const ADMIN_PASSWORD = "@Krishmelwani";

function isCmsAuthenticated() {
  return localStorage.getItem(CMS_AUTH_KEY) === "true";
}
function setCmsAuth() {
  localStorage.setItem(CMS_AUTH_KEY, "true");
}
function clearCmsAuth() {
  localStorage.removeItem(CMS_AUTH_KEY);
}

type Tab = "global" | "stats" | "home" | "about" | "services" | "leadership" | "careers" | "history";

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: "global", label: "Global Info" },
  { id: "stats", label: "Stats" },
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "leadership", label: "Leadership" },
  { id: "careers", label: "Careers" },
  { id: "history", label: "Version History" },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setCmsAuth();
        onLogin();
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[400px] mx-4">
        <div className="text-center mb-8">
          <div className="text-2xl font-extrabold text-[#1B3A6B] tracking-tight mb-1">HireApex</div>
          <div className="text-sm text-gray-500">Content Management System</div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-[#1B3A6B] mb-6">Sign in to continue</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin email" className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-11 px-3.5 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full h-11 rounded-lg bg-[#1B3A6B] text-white font-semibold text-sm hover:bg-[#1B3A6B]/90 disabled:opacity-60 transition-all mt-2">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
}

function Field({ label, value, onChange, multiline, hint }: FieldProps) {
  const cls = "w-full px-3.5 rounded-lg border border-gray-200 bg-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      {hint && <p className="text-xs text-gray-400 -mt-0.5">{hint}</p>}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} py-2.5 min-h-[90px] resize-y`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} h-10 py-0`} />
      )}
    </div>
  );
}

function SectionCard({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-bold text-[#1B3A6B] text-sm uppercase tracking-widest">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>}
    </div>
  );
}

export default function Edit() {
  const [authed, setAuthed] = useState(isCmsAuthenticated);
  const [tab, setTab] = useState<Tab>("global");
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const { content, versions, updateContent, restoreVersion, resetToDefaults } = useContent();

  useEffect(() => {
    if (authed) setDraft({ ...content });
  }, [authed, content]);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  function setField(key: keyof SiteContent, value: string) {
    setDraft((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  function handleSave() {
    if (!draft) return;
    setSaving(true);
    setTimeout(() => {
      updateContent(draft, `Saved at ${new Date().toLocaleTimeString("en-IN")}`);
      setSaving(false);
      showToast("success", "Changes saved and applied to the website.");
    }, 300);
  }

  function handleReset() {
    if (!confirm("Reset all content to factory defaults? This will save a version backup first.")) return;
    resetToDefaults();
    setDraft({ ...DEFAULT_CONTENT });
    showToast("success", "Content reset to defaults.");
  }

  function handleRestore(id: string) {
    if (!confirm("Restore this version? Current state will be backed up first.")) return;
    restoreVersion(id);
    const version = versions.find((v) => v.id === id);
    if (version) setDraft({ ...version.content });
    showToast("success", "Version restored successfully.");
  }

  const hasDraftChanges = draft && JSON.stringify(draft) !== JSON.stringify(content);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  if (!draft) return null;

  return (
    <div className="min-h-screen bg-[#F0F2F7]">
      {/* Topbar */}
      <div className="bg-[#1B3A6B] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div>
          <div className="font-bold text-lg tracking-tight">HireApex CMS</div>
          <div className="text-xs text-white/50 mt-0.5">Content Management Panel</div>
        </div>
        <div className="flex items-center gap-3">
          {hasDraftChanges && (
            <span className="text-xs bg-yellow-400/20 text-yellow-200 border border-yellow-400/30 rounded-full px-3 py-1 font-semibold">Unsaved changes</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !hasDraftChanges}
            className="flex items-center gap-2 text-sm bg-[#E53935] text-white hover:bg-[#C62828] rounded-lg px-4 py-2 font-bold transition-colors disabled:opacity-40"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button onClick={() => { clearCmsAuth(); setAuthed(false); }} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className={`fixed top-20 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
            {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab nav */}
        <div className="flex flex-wrap gap-1.5 bg-white border border-gray-100 rounded-xl p-1.5 mb-6 shadow-sm">
          {TAB_LABELS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-[#1B3A6B] text-white shadow" : "text-gray-500 hover:text-[#1B3A6B]"}`}>
              {t.id === "history" && <Clock className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
              {t.label}
              {t.id === "history" && versions.length > 0 && (
                <span className="ml-1.5 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{versions.length}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-5">

            {/* ─── GLOBAL INFO ─── */}
            {tab === "global" && (
              <>
                <SectionCard title="Contact Information">
                  <Field label="Phone 1" value={draft.phone1} onChange={(v) => setField("phone1", v)} />
                  <Field label="Phone 2" value={draft.phone2} onChange={(v) => setField("phone2", v)} />
                  <Field label="Business Email" value={draft.emailBusiness} onChange={(v) => setField("emailBusiness", v)} />
                  <Field label="HR / Job Seekers Email" value={draft.emailHR} onChange={(v) => setField("emailHR", v)} />
                  <Field label="Compliance / Fraud Email" value={draft.emailCompliance} onChange={(v) => setField("emailCompliance", v)} />
                  <div className="md:col-span-2">
                    <Field label="Registered Address" value={draft.address} onChange={(v) => setField("address", v)} multiline hint="Shown in footer and contact page" />
                  </div>
                </SectionCard>
                <SectionCard title="Footer">
                  <div className="md:col-span-2">
                    <Field label="Footer Tagline" value={draft.footerTagline} onChange={(v) => setField("footerTagline", v)} multiline hint="Short description shown below the logo in the footer" />
                  </div>
                </SectionCard>
              </>
            )}

            {/* ─── STATS ─── */}
            {tab === "stats" && (
              <SectionCard title="Company Statistics">
                <Field label="Successful Placements" value={draft.statPlacements} onChange={(v) => setField("statPlacements", v)} hint="e.g. 500+" />
                <Field label="Client Companies" value={draft.statCompanies} onChange={(v) => setField("statCompanies", v)} hint="e.g. 30+" />
                <Field label="Industries Covered" value={draft.statIndustries} onChange={(v) => setField("statIndustries", v)} hint="e.g. 8+" />
              </SectionCard>
            )}

            {/* ─── HOME ─── */}
            {tab === "home" && (
              <SectionCard title="Home Page">
                <div className="md:col-span-2">
                  <Field label="Hero Heading" value={draft.homeHeroHeading} onChange={(v) => setField("homeHeroHeading", v)} multiline hint="Main headline. Use a newline to split into two lines." />
                </div>
                <div className="md:col-span-2">
                  <Field label="Hero Subheading" value={draft.homeHeroSubheading} onChange={(v) => setField("homeHeroSubheading", v)} multiline hint="Paragraph below the headline" />
                </div>
                <Field label="Primary Button Text" value={draft.homeCtaPrimary} onChange={(v) => setField("homeCtaPrimary", v)} hint="e.g. Hire Talent" />
                <Field label="Secondary Button Text" value={draft.homeCtaSecondary} onChange={(v) => setField("homeCtaSecondary", v)} hint="e.g. Browse Services" />
              </SectionCard>
            )}

            {/* ─── ABOUT ─── */}
            {tab === "about" && (
              <SectionCard title="About Page">
                <Field label="Hero Heading" value={draft.aboutHeroHeading} onChange={(v) => setField("aboutHeroHeading", v)} />
                <div className="md:col-span-2">
                  <Field label="Hero Subheading" value={draft.aboutHeroSubheading} onChange={(v) => setField("aboutHeroSubheading", v)} multiline />
                </div>
              </SectionCard>
            )}

            {/* ─── SERVICES ─── */}
            {tab === "services" && (
              <SectionCard title="Services Page">
                <Field label="Hero Heading" value={draft.servicesHeroHeading} onChange={(v) => setField("servicesHeroHeading", v)} />
                <div className="md:col-span-2">
                  <Field label="Hero Subheading" value={draft.servicesHeroSubheading} onChange={(v) => setField("servicesHeroSubheading", v)} multiline />
                </div>
              </SectionCard>
            )}

            {/* ─── LEADERSHIP ─── */}
            {tab === "leadership" && (
              <SectionCard title="Leadership Page">
                <Field label="Hero Heading" value={draft.leadershipHeroHeading} onChange={(v) => setField("leadershipHeroHeading", v)} />
                <div className="md:col-span-2">
                  <Field label="Hero Subheading" value={draft.leadershipHeroSubheading} onChange={(v) => setField("leadershipHeroSubheading", v)} multiline />
                </div>
              </SectionCard>
            )}

            {/* ─── CAREERS ─── */}
            {tab === "careers" && (
              <SectionCard title="Careers Page">
                <Field label="Hero Heading" value={draft.careersHeroHeading} onChange={(v) => setField("careersHeroHeading", v)} />
                <div className="md:col-span-2">
                  <Field label="Hero Subheading" value={draft.careersHeroSubheading} onChange={(v) => setField("careersHeroSubheading", v)} multiline />
                </div>
              </SectionCard>
            )}

            {/* ─── VERSION HISTORY ─── */}
            {tab === "history" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-[#1B3A6B] text-lg">Version History</h2>
                    <p className="text-sm text-gray-500 mt-1">Up to 20 versions are stored. Click "Restore" to revert to any previous state.</p>
                  </div>
                  <button onClick={handleReset} className="flex items-center gap-2 text-sm border border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:text-red-600 rounded-lg px-4 py-2 font-semibold transition-colors">
                    <RefreshCw className="w-4 h-4" /> Reset to Defaults
                  </button>
                </div>

                {versions.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                    <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">No version history yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Versions are saved automatically every time you save changes.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {versions.map((v, idx) => {
                      const date = new Date(v.timestamp);
                      const dateStr = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                      const timeStr = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
                      return (
                        <div key={v.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center shrink-0 text-xs font-bold text-[#1B3A6B]">
                              {versions.length - idx}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1B3A6B] text-sm">{v.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{dateStr} at {timeStr}</p>
                            </div>
                          </div>
                          <button onClick={() => handleRestore(v.id)} className="flex items-center gap-1.5 text-xs font-bold bg-[#1B3A6B]/5 hover:bg-[#1B3A6B] text-[#1B3A6B] hover:text-white border border-[#1B3A6B]/20 hover:border-[#1B3A6B] rounded-lg px-3 py-2 transition-all">
                            <RotateCcw className="w-3.5 h-3.5" /> Restore
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Save bar */}
        {tab !== "history" && (
          <div className="mt-8 flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
            <p className="text-sm text-gray-500">
              {hasDraftChanges ? <span className="text-yellow-600 font-semibold">You have unsaved changes.</span> : <span className="text-green-600 font-semibold">All changes saved.</span>}
            </p>
            <div className="flex gap-3">
              <button onClick={() => draft && setDraft({ ...content })} disabled={!hasDraftChanges} className="text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 font-semibold transition-colors px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300">
                Discard
              </button>
              <button onClick={handleSave} disabled={saving || !hasDraftChanges}
                className="flex items-center gap-2 text-sm bg-[#1B3A6B] text-white hover:bg-[#1B3A6B]/90 rounded-lg px-5 py-2 font-bold transition-colors disabled:opacity-40">
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : "Save & Apply"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
