import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

function AnimatedCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="border border-white/20 bg-white/5 backdrop-blur p-6 rounded-2xl text-center">
      <div className="text-3xl font-bold text-accent mb-1">{count}{suffix}</div>
      <div className="text-sm font-semibold uppercase tracking-wider text-slate-300">{label}</div>
    </div>
  );
}

const timeline = [
  { year: "2024", text: "Founded in Jaipur with a focus on structured, quality-first recruitment" },
  { year: "2024", text: "First wave of client partnerships established through direct referrals" },
  { year: "2025", text: "Extended coverage to 8+ industries including tech, healthcare, and logistics" },
  { year: "2025", text: "Consistent client return rate — the majority of our work comes from repeat engagements" }
];

export default function About() {
  const { content } = useContent();
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0 }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background">
      
      {/* Section 1: HERO */}
      <section className="relative pt-32 pb-40 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">{content.aboutHeroHeading}</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium mb-12">
              {content.aboutHeroSubheading}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <AnimatedCounter end={parseInt(content.statPlacements) || 500} label="Placements" suffix={content.statPlacements.replace(/[0-9]/g, "")} />
              <AnimatedCounter end={parseInt(content.statCompanies) || 30} label="Companies" suffix={content.statCompanies.replace(/[0-9]/g, "")} />
              <AnimatedCounter end={parseInt(content.statIndustries) || 8} label="Industries" suffix={content.statIndustries.replace(/[0-9]/g, "")} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: OUR STORY */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-extrabold text-primary mb-8">Our Story</h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
                <p>
                  HireApex was founded in 2024 by Krish Melwani with a straightforward goal: to offer recruitment support that companies could actually rely on. Based in Jaipur, we entered an industry dominated by volume-first approaches and made a deliberate choice to operate differently.
                </p>
                <p>
                  Most staffing agencies in India are optimized for throughput — the more resumes sent, the higher the perceived effort. But this approach consistently fails hiring managers, who end up spending valuable time sorting through unsuitable candidates. We saw this gap and built HireApex around the opposite principle: role-specific shortlisted candidates, rigorously evaluated, with clear documentation on why each candidate deserves consideration.
                </p>
                <p>
                  Since our first engagement, we've grown through referrals. Clients who've worked with us have recommended us to peers in their networks, which speaks to the quality of the experience we deliver — for both companies and candidates. Today, as a hiring consultancy in Jaipur with a growing national footprint, we serve clients across eight industries and multiple cities without compromising on the quality of our work.
                </p>
                <p>
                  We remain a focused, founder-led team. That means every engagement gets senior-level attention, not a junior recruiter who's never spoken to the hiring manager. This structure allows us to maintain the standard we set from day one — and the reason our clients continue working with us beyond their first hire.
                </p>
              </div>
            </motion.div>
            
            {/* Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              <div className="absolute left-[39px] md:left-8 top-2 bottom-2 w-[2px] bg-border"></div>
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <div key={i} className="relative pl-12 md:pl-20">
                    <div className="absolute left-[29px] md:left-[22px] top-1 w-5 h-5 rounded-full bg-white border-4 border-accent shadow-sm z-10"></div>
                    <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                      <h3 className="text-xl font-bold text-primary mb-2">{item.year}</h3>
                      <p className="text-muted-foreground font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: MISSION, VISION, VALUES */}
      <section className="py-32 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -8 }} className="bg-white p-10 rounded-3xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To help businesses hire the right people through a structured, transparent, and outcome-focused process.
              </p>
            </motion.div>
            
            <motion.div whileHover={{ y: -8 }} className="bg-white p-10 rounded-3xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A hiring environment where clarity and trust replace guesswork and volume.
              </p>
            </motion.div>
            
            <motion.div whileHover={{ y: -8 }} className="bg-primary p-10 rounded-3xl shadow-xl border border-primary text-white">
              <div className="w-12 h-12 bg-white/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Values</h3>
              <ul className="space-y-5 text-slate-300 font-medium">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 shrink-0"></div>
                  <span><strong className="text-white">Excellence:</strong> We maintain quality at every step, from sourcing to post-placement follow-up.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 shrink-0"></div>
                  <span><strong className="text-white">Partnership:</strong> We function as an extension of your team, not an outside vendor.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 shrink-0"></div>
                  <span><strong className="text-white">Integrity:</strong> We communicate honestly about what we can deliver and when.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: CORE STRENGTHS */}
      <section className="py-32 bg-[#F8FAFC] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">What Sets Us Apart</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-5">Our Core Strengths</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                As a hiring consultancy in Jaipur built from the ground up, every operational decision we've made reflects what actually works in recruitment — not what looks good on paper.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Proprietary Candidate Network",
                body: "Over time, HireApex has built a direct candidate network across industries and experience levels. This means we don't rely on public job boards as a primary sourcing channel — we reach candidates who aren't actively looking but are open to the right opportunity. This passive talent pool is one of the most significant differentiators in how quickly we close roles.\n\nAccess to passive candidates also means less competition for the profiles we present. You're not evaluating candidates who are simultaneously interviewing at ten other companies, which improves offer acceptance rates considerably."
              },
              {
                title: "Structured, Repeatable Process",
                body: "Consistency in recruitment is rare. Most agencies perform differently depending on who handles the role, how motivated they are, and how competitive the fee arrangement is. At HireApex, every engagement follows the same structured process regardless of role, fee size, or seniority — role brief, sourcing strategy, multi-stage evaluation, shortlist presentation, and post-placement follow-up.\n\nThis structure means clients know exactly what to expect. There are no surprises in quality, no gaps in communication, and no inconsistency between how we handle any role."
              },
              {
                title: "Speed Without Compromising Quality",
                body: "Speed is often used as an excuse to skip screening steps. At HireApex, we've built our process to be fast and thorough simultaneously. The key is investing time at the brief stage — when we understand the requirement properly from day one, every subsequent step moves faster because we're not course-correcting later.\n\nTimelines depend on role complexity. For each engagement, we set a clear delivery timeline during intake so there are no unrealistic expectations on either side. This speed does not come at the expense of evaluation quality."
              },
            ].map((strength, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-border p-10 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <span className="text-accent font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-extrabold text-primary mb-5">{strength.title}</h3>
                {strength.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed text-base mb-4 last:mb-0">{para}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: HIRING PHILOSOPHY */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">How We Think About Hiring</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-5">Our Hiring Philosophy</h2>
            </motion.div>
          </div>
          <div className="space-y-8">
            {[
              { q: "Hiring is a decision, not a transaction", body: "The dominant model in recruitment treats placements as transactions — something to close as quickly as possible to move on to the next one. HireApex approaches hiring as a decision that has lasting organizational consequences. A wrong hire can cost a company months of productivity, cultural disruption, and the time spent searching again. When we evaluate a candidate, we're thinking about what happens 90 days after they join, not just whether they clear the interview." },
              { q: "Fit is more than skills", body: "Technical skills can be assessed on a checklist. Cultural fit, working style, and long-term trajectory alignment require a different kind of evaluation — one that involves conversation, context, and judgment. Our screening process always includes questions about how a candidate operates in teams, how they handle ambiguity, and what they want from their next two to three years. We present this context alongside the resume so your hiring team can make informed decisions." },
              { q: "Transparency builds better outcomes", body: "Many agencies tell clients what they want to hear — faster timelines, wider searches, guaranteed results. We prefer honesty. If a role is genuinely hard to fill, we say so and explain why. If a candidate has a consideration we think the client should know, we include it in the evaluation notes. This kind of transparency sometimes makes conversations harder in the short term, but it builds the trust that keeps clients coming back for every subsequent hire." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-3xl border border-border p-8 md:p-10"
              >
                <h3 className="text-xl font-extrabold text-primary mb-4">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CLIENT RELATIONSHIP */}
      <section className="py-32 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">Long-Term Partnerships</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight">Our Client Relationship Approach</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Most of HireApex's ongoing work comes from clients who came back after their first engagement. This isn't accidental. From the first briefing call, we operate as a partner rather than a vendor — asking questions that most agencies don't bother with, pushing back when a requirement seems underspecified, and sharing our honest assessment when we think the brief needs to be revised.
                </p>
                <p>
                  A strong client relationship in recruitment means the agency genuinely understands the organization — its team structure, culture, how hiring decisions get made, and what has and hasn't worked in the past. This depth of context allows us to deliver better shortlists on subsequent requirements because we're not starting from scratch every time.
                </p>
                <p>
                  We also believe in proactive communication, not reactive responses. We don't wait for clients to chase us for updates. We provide regular status reports, flag potential delays early, and keep everyone aligned throughout the process — including post-placement, where our 90-day post-placement support ensures early friction is caught and managed before it becomes an exit.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-1 gap-5"
            >
              {[
                { title: "Briefing before action", desc: "Every engagement starts with a proper intake — we never start sourcing based on a job description alone." },
                { title: "Role-specific context", desc: "We develop a deep understanding of each role, not just its title and requirements." },
                { title: "Consistent senior attention", desc: "Every client has access to senior-level attention — not passed to junior recruiters." },
                { title: "Retainer model available", desc: "For clients with ongoing needs, we offer a retainer model that provides dedicated bandwidth and faster cycle times." },
                { title: "Referral-based growth", desc: "Most new clients come from existing client referrals — the clearest indicator of satisfaction." },
              ].map((point, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-6 flex gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">{point.title} — </span>
                    <span className="text-slate-300">{point.desc}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: MARKET UNDERSTANDING */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Industry Knowledge</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-5">Market Understanding</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Effective talent acquisition requires current, granular knowledge of what the market looks like — compensation benchmarks, talent supply, and what candidates actually want.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                Because HireApex works across eight industries simultaneously, we have a real-time view of what candidates in different functions are being offered, how quickly they're finding new roles, and what is causing them to reject or accept offers. This market intelligence directly improves the quality of our briefings and our advice to clients on compensation positioning.
              </p>
              <p>
                For instance, if a client's compensation band for a role is significantly below current market expectations, we raise this at the briefing stage — before sourcing begins — so the client can make an informed decision. This saves everyone time and prevents the disappointment of strong candidates declining offers.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                We also track hiring trends by sector — which industries are growing headcount, which are contracting, where notice periods are elongating, and where candidate supply for specific skills is tightening. This context helps clients plan their hiring timelines realistically rather than being surprised mid-process.
              </p>
              <p>
                Our understanding of the Jaipur talent market is particularly strong, but our network extends nationally across all major Indian cities. Whether a client is hiring locally or across multiple cities, we bring relevant market knowledge to the table from the first conversation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: COMMITMENT TO QUALITY */}
      <section className="py-32 bg-[#F8FAFC] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Our Standard</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-5">Commitment to Quality</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Quality in recruitment isn't just a positioning statement for us — it's an operational choice reflected in every stage of our process.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { metric: "Role-Specific", label: "Shortlisted candidates", note: "We never send resumes in bulk. Every shortlisted profile has been evaluated against the specific role brief." },
              { metric: "90 Days", label: "Post-placement support", note: "We check in with both client and candidate for 90 days after every placement to ensure smooth onboarding and retention." },
              { metric: "8+", label: "Industries covered", note: "Active placement experience across technology, finance, retail, logistics, healthcare, BPO, manufacturing, and professional services." },
              { metric: "500+", label: "Successful placements", note: "Placements made since founding, measured by candidates who remained active and performing beyond the first 90 days." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl border border-border p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl font-extrabold text-primary tracking-tight mb-2">{item.metric}</div>
                <div className="text-sm font-bold text-accent uppercase tracking-wider mb-4">{item.label}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.note}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 bg-white rounded-3xl border border-border p-8 md:p-12 grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                Quality commitment begins at the brief stage. We will not start sourcing on an underspecified requirement — instead, we'll push back with specific questions until the brief is clear enough to produce a relevant shortlist. This upfront investment prevents the downstream cost of sourcing the wrong candidate pool.
              </p>
              <p>
                It extends through evaluation. Every candidate we present has been assessed against the role's technical requirements, cultural indicators, and career alignment — not just screened for keywords. We document our assessment and share it alongside each profile.
              </p>
            </div>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                And it continues post-placement. Our 90-day post-placement support is not a formality — it's a structured conversation with both the client and the placed candidate, designed to surface any early friction before it becomes a resignation. This single step has prevented numerous early exits across our client base.
              </p>
              <p>
                We also track our placement success rate and use it to continuously evaluate where our sourcing or screening process can improve. Quality is not a static standard — it's something we actively measure and work to maintain across every engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9: CTA */}
      <section className="py-32 bg-[#0A111F] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Looking for a recruitment partner that keeps things straightforward?</h2>
          <Link href="/contact">
            <MagneticButton size="lg" className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-full">
              Get in Touch
            </MagneticButton>
          </Link>
        </div>
      </section>

    </motion.div>
  );
}
