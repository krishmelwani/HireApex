import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, RotateCcw, PhoneOff, Home, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "wouter";

type Role = "bot" | "user";
interface ChatMessage { id: string; role: Role; text: string; time: string; suggestions?: string[]; }
type Tab = "home" | "conversation";

const LS_KEY = "hireapex_chat_v2";

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const KNOWLEDGE: Array<{ keys: string[]; answer: string; suggestions?: string[] }> = [
  {
    keys: ["what is hireapex", "about hireapex", "tell me about", "who are you", "what do you do"],
    answer: "HireApex HR Consultancy is a Jaipur-based recruitment agency founded in 2024 by Krish Melwani (Director & CEO). We specialize in talent acquisition services across India, helping companies find the right candidates through a structured, transparent process. We have placed 500+ candidates across 8+ industries with a 95% placement success rate.",
    suggestions: ["Our Services", "Industries We Serve", "Contact Info"],
  },
  {
    keys: ["service", "what service", "offer", "provide", "staffing", "executive search", "bulk hiring", "campus"],
    answer: "HireApex offers the following recruitment services:\n\n• Permanent Staffing — Full-time role hiring across all levels\n• Executive Search — Senior leadership and C-suite placement\n• Contract & Temporary Staffing — Project-based and short-term engagements\n• Bulk / Volume Hiring — Large-scale hiring for expansion or seasonal needs\n• Campus Recruitment — Entry-level and internship drives\n• HR Consulting & Advisory — Policy, process, and workforce strategy support\n\nEach engagement is customized to the client's sector and requirements.",
    suggestions: ["Our Process", "Industries We Serve", "Talk to a Hiring Expert"],
  },
  {
    keys: ["process", "how do you work", "how it works", "methodology", "approach", "steps"],
    answer: "Our 6-stage hiring process ensures every placement is precise and long-lasting:\n\n01. Role Discovery & Brief — Understanding your position, team, and expectations\n02. Sourcing Strategy — Tailored outreach plan for each role\n03. Candidate Sourcing — Targeted headhunting and referral network activation\n04. Multi-Stage Screening — Technical, cultural, and attitude evaluation\n05. Shortlist Presentation — 3–5 qualified profiles with detailed notes\n06. Closure & Post-Joining Support — Offer management and retention check-ins",
    suggestions: ["Our Services", "Industries We Serve", "Schedule a Consultation"],
  },
  {
    keys: ["industry", "sector", "technology", "healthcare", "finance", "retail", "manufacturing", "bpo", "logistics", "professional services"],
    answer: "HireApex has placed candidates across 8 major industry sectors:\n\n• Technology & IT\n• Healthcare & Pharmaceuticals\n• Finance & Banking\n• Retail & E-commerce\n• Manufacturing & Engineering\n• BPO & Call Centers\n• Logistics & Supply Chain\n• Professional Services\n\nOur recruiters have domain knowledge in each sector, ensuring role-specific candidate evaluation.",
    suggestions: ["Our Services", "Our Process", "Contact Info"],
  },
  {
    keys: ["contact", "reach", "phone", "email", "address", "location", "office", "jaipur"],
    answer: "You can reach us through the following channels:\n\nFor Candidates / Job Seekers:\nPhone: +91 8233897557 / +91 9928610677\nEmail: hr@hireapex.in\n\nFor Businesses / Hiring:\nEmail: business@hireapex.in\n\nOffice Address:\n267 B, Sindhi Colony, Raja Park\nJaipur – 302004, Rajasthan\n\nWorking Hours: Monday–Saturday, 10:00 AM – 6:00 PM IST",
    suggestions: ["Visit Contact Page"],
  },
  {
    keys: ["job", "vacancy", "opening", "apply", "position", "career", "internship", "fresher"],
    answer: "We regularly post active opportunities across technology, finance, healthcare, and other sectors. To explore current openings:\n\n• Visit our Careers page for the complete list of available roles\n• Filter by job type (Full-time, Internship, Contract) and work mode\n• Apply directly through the online application form\n\nFor direct queries, contact:\nPhone: +91 8233897557 / +91 9928610677\nEmail: hr@hireapex.in",
    suggestions: ["View Careers Page"],
  },
  {
    keys: ["partner", "collaboration", "talento", "skillvertex", "imarticus", "scalar", "vakilsearch"],
    answer: "HireApex works with established partners across three categories:\n\nTalent Partners: Talento, Internship Studios\nTraining & Upskilling: SkillVertex, Imarticus, Scalar\nLegal & Compliance: VakilSearch, Simpliance\n\nThese partnerships allow us to offer comprehensive support — from candidate sourcing and skill validation to compliance and onboarding.",
    suggestions: ["Our Services", "Contact Info"],
  },
  {
    keys: ["fee", "charge", "cost", "price", "payment", "money"],
    answer: "HireApex never charges candidates any fees for job placement or interviews. Our services to job seekers are completely free of cost.\n\nIf anyone claims to represent HireApex and asks for payment, it is fraudulent. Please report such incidents immediately to: compliance@hireapex.in",
    suggestions: ["View Careers Page", "Contact Info"],
  },
  {
    keys: ["human rights", "policy", "posh", "sexual harassment", "compliance", "legal"],
    answer: "HireApex maintains formal policies aligned with Indian law and international standards:\n\n• Human Rights Policy — Covering fair employment, anti-discrimination, privacy rights, and ethical conduct\n• Prevention of Sexual Harassment (POSH) Policy — Aligned with the POSH Act, 2013\n\nBoth policies are publicly available on our website.",
    suggestions: ["Visit Contact Page"],
  },
  {
    keys: ["founder", "ceo", "director", "krish", "melwani", "leadership", "team"],
    answer: "HireApex HR Consultancy was founded by Krish Melwani, who serves as Director & CEO. The firm was established in 2024 with a clear focus on structured, ethical, and results-driven recruitment across India. For leadership details, visit our Leadership page.",
    suggestions: ["Contact Info"],
  },
  {
    keys: ["timeline", "how long", "days", "weeks", "turnaround", "time to hire"],
    answer: "Typical hiring timelines at HireApex depend on the role complexity and seniority:\n\n• Entry to Mid-level roles: 7–15 business days from brief confirmation\n• Senior / Specialist roles: 15–25 business days\n• Bulk Hiring projects: Timeline agreed at project kick-off\n\nWe provide weekly progress updates throughout the engagement, so you always know where things stand.",
    suggestions: ["Our Process", "Contact Info"],
  },
  {
    keys: ["success", "stats", "placement", "result", "track record", "achievement"],
    answer: "Our track record as of 2025:\n\n• 500+ Successful Placements\n• 50+ Client Companies\n• 95% Placement Success Rate\n• 8+ Industries Served\n\nWe also offer an annual retainer plan for companies with year-round hiring needs — providing a dedicated recruiter and consistent communication.",
    suggestions: ["Our Services", "Schedule a Consultation"],
  },
];

function FALLBACK_RESPONSE(): string {
  return "Sorry, I may not have that information. Please contact us directly.\n\nPhone: +91 8233897557 / +91 9928610677\nEmail (Candidates): hr@hireapex.in\nEmail (Hiring): business@hireapex.in";
}

function getBotResponse(message: string): { text: string; suggestions?: string[] } {
  const m = message.toLowerCase().trim();
  for (const item of KNOWLEDGE) {
    if (item.keys.some((k) => m.includes(k))) {
      return { text: item.answer, suggestions: item.suggestions };
    }
  }
  return { text: FALLBACK_RESPONSE() };
}

function mapSuggestionToAction(label: string): { href?: string; text: string } {
  if (label === "View Careers Page") return { href: "/career", text: label };
  if (label === "Visit Contact Page") return { href: "/contact", text: label };
  if (label === "Schedule a Consultation") return { href: "/contact", text: label };
  if (label === "Talk to a Hiring Expert") return { href: "/contact", text: label };
  return { text: label };
}

const QUICK_ACTIONS = [
  { label: "I'm a Job Seeker", query: "job vacancy opening" },
  { label: "I need to Hire", query: "hire talent recruitment services" },
  { label: "Our Services", query: "what services do you offer" },
  { label: "Our Process", query: "what is your process how do you work" },
  { label: "Industries We Serve", query: "which industries do you serve" },
  { label: "Contact Info", query: "contact phone email address" },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {/* ignore */}
    setMessages([{
      id: uid(), role: "bot", time: now(),
      text: "Hi! Welcome to HireApex HR Consultancy.\n\nAre you a Job Seeker or looking for Hiring Services?",
      suggestions: ["I'm a Job Seeker", "I need to Hire"],
    }]);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(messages)); } catch {/* ignore */}
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: uid(), role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTab("conversation");

    setTimeout(() => {
      const resp = getBotResponse(text);
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: resp.text, time: now(), suggestions: resp.suggestions }]);
      setTyping(false);
    }, 900);
  }

  function handleSuggestion(label: string) {
    const action = mapSuggestionToAction(label);
    if (!action.href) {
      sendMessage(label);
    }
  }

  function endConversation() {
    setMessages([{
      id: uid(), role: "bot", time: now(),
      text: "This conversation has been ended. Thank you for contacting HireApex!\n\nIf you need further assistance, feel free to start a new conversation or contact us directly.",
    }]);
    localStorage.removeItem(LS_KEY);
  }

  function newConversation() {
    const welcomeMsg: ChatMessage = {
      id: uid(), role: "bot", time: now(),
      text: "Hi! Welcome to HireApex HR Consultancy.\n\nAre you a Job Seeker or looking for Hiring Services?",
      suggestions: ["I'm a Job Seeker", "I need to Hire"],
    };
    setMessages([welcomeMsg]);
    localStorage.removeItem(LS_KEY);
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              data-testid="button-chatbot-open"
              className="w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white relative"
            >
              <MessageCircle className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "520px", maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Header */}
            <div className="bg-primary text-white px-5 pt-5 pb-4 shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">HireApex HR Consultancy</p>
                  <h2 className="text-lg font-extrabold leading-tight">We are here to help you!</h2>
                  <p className="text-sm text-white/60 mt-0.5">Chat with us now</p>
                </div>
                <button onClick={() => setOpen(false)} data-testid="button-chatbot-close"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex mt-4 bg-white/10 rounded-xl p-1 gap-1">
                {(["home", "conversation"] as Tab[]).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-white text-primary" : "text-white/70 hover:text-white"}`}>
                    {t === "home" ? <Home className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                    {t === "home" ? "Home" : "Conversation"}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden flex flex-col bg-white">
              {tab === "home" ? (
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="bg-[#F8FAFC] rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Welcome! I can answer questions about HireApex's services, hiring process, industries, and more. What would you like to know?
                    </p>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quick Actions</p>
                  <div className="space-y-2">
                    {QUICK_ACTIONS.map((a) => (
                      <button key={a.label} onClick={() => { sendMessage(a.query); setTab("conversation"); }}
                        className="w-full flex items-center justify-between p-3.5 bg-[#F8FAFC] hover:bg-secondary rounded-xl border border-border text-sm font-semibold text-primary transition-colors group">
                        {a.label}
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Action buttons */}
                  <div className="flex gap-2 px-4 pt-3 pb-2 border-b border-border shrink-0">
                    <button onClick={endConversation}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors">
                      <PhoneOff className="w-3.5 h-3.5" /> End Conversation
                    </button>
                    <button onClick={newConversation}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                      <RotateCcw className="w-3.5 h-3.5" /> New Conversation
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-[85%] space-y-2">
                          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                            msg.role === "user"
                              ? "bg-primary text-white rounded-br-sm"
                              : "bg-[#F8FAFC] text-foreground border border-border rounded-bl-sm"
                          }`}>
                            {msg.text}
                          </div>
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggestions.map((s) => {
                                const action = mapSuggestionToAction(s);
                                if (action.href) {
                                  return (
                                    <Link key={s} href={action.href} onClick={() => setOpen(false)}
                                      className="text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-white hover:bg-primary hover:text-white transition-colors">
                                      {s}
                                    </Link>
                                  );
                                }
                                return (
                                  <button key={s} onClick={() => handleSuggestion(s)}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-white hover:bg-primary hover:text-white transition-colors">
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          <p className="text-[10px] text-muted-foreground px-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex justify-start">
                        <div className="bg-[#F8FAFC] border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1 items-center h-4">
                            {[0, 1, 2].map((i) => (
                              <motion.span key={i} className="w-2 h-2 bg-muted-foreground/40 rounded-full"
                                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border shrink-0">
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        data-testid="input-chatbot-message"
                        className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-border bg-[#F8FAFC] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <button type="submit" data-testid="button-chatbot-send"
                        className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
