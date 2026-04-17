import React, { useEffect, useState, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ArrowRight, CheckCircle2, Target, Users, MessageSquare, Quote } from "lucide-react";

import hawaMahalImg from "@/assets/pexels-ashwani-17911339_1775286555346.jpg";
import womanImg from "@/assets/Untitled-design-1-1-1024x1024.png_1775286555345.webp";
import bpoManImg from "@/assets/NATS-1-rdisi17totwbub11t5b8e25qcilec0vcw3hqodz96u_1775286555346.png";
import founditLogo from "@/assets/founditLogo-primary-removebg-preview_1775327117913.png";
import indeedLogo from "@/assets/images-removebg-preview_1775327117915.png";
import scalarLogo from "@/assets/scalar-CmYNp8_e-removebg-preview_1775327117916.png";
import shineLogo from "@/assets/shine_1775327117917.png";
import imarticusLogo from "@/assets/imarticus-8jXUWa2r-removebg-preview_1775327129882.png";
import internshalaLogo from "@/assets/internshala_og_image-removebg-preview_1775327140837.png";
import simplicanceLogo from "@/assets/simpliance-BR6oNuA7-removebg-preview_(1)_1775327151467.png";
import skillVertexLogo from "@/assets/skill_vertex-CGjAG45Y-removebg-preview_1775327151469.png";
import vakilSearchLogo from "@/assets/vakil_search-DqO1lqyC-removebg-preview_1775327151469.png";

function AnimatedCounter({ end, label, prefix = "", suffix = "" }: { end: number; label: string; prefix?: string; suffix?: string }) {
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
    <motion.div ref={ref} whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
      className="text-center p-8 bg-card rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center h-full transition-all duration-300"
      data-testid={`counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-4xl md:text-5xl font-extrabold text-primary mb-3 font-mono tracking-tight">{prefix}{count}{suffix}</div>
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

const testimonials = [
  { quote: "We opted for their annual plan since we hire throughout the year. It has been a convenient and cost-effective solution. Their recruiter shares weekly updates and ensures positions are closed on time. We are satisfied with the consistency.", author: "Rajesh Khanna", role: "HR Lead", company: "BrightEdge Analytics Pvt Ltd, Gurgaon" },
  { quote: "HireApex helped us close multiple roles within tight deadlines. The quality of candidates was much better compared to previous agencies. We appreciated how they understood our technical requirements without needing multiple briefings.", author: "Priya Sharma", role: "HR Manager", company: "FinEdge Solutions, Mumbai" },
  { quote: "Their understanding of our requirements reduced unnecessary interviews. We were able to hire faster with better fit. I would recommend them to any company that values their hiring manager's time.", author: "Amit Verma", role: "Talent Acquisition Head", company: "Nexa Retail Pvt Ltd, Bangalore" },
  { quote: "The team is responsive and professional. They follow up consistently and don't disappear once the profile is shared. That reliability made a big difference in how we managed our hiring cycles.", author: "Sunita Batra", role: "People Operations Manager", company: "Cloudnine Infotech, Hyderabad" },
  { quote: "We had been struggling to find mid-level finance professionals for over three months. HireApex closed two positions in three weeks. Their finance sector knowledge is strong.", author: "Vikram Iyer", role: "CFO Office - HR Partner", company: "Meritas Capital Advisors, Chennai" },
  { quote: "What stood out was that they didn't push candidates just to fill the position. They held back profiles that didn't match and were transparent about it. That kind of integrity is rare.", author: "Meera Pillai", role: "HR Director", company: "Ashoka Healthcare Systems, Kochi" },
  { quote: "Their bulk hiring support for our logistics expansion was well-coordinated. Over 30 positions closed across two cities in 45 days. Good communication throughout.", author: "Rohit Nair", role: "Head of Operations", company: "IndusSwift Logistics, Pune" },
  { quote: "We've been working with HireApex on a retainer basis for the past eight months. They've become an extended part of our recruitment team. Consistent, dependable, and easy to work with.", author: "Ananya Krishnamurthy", role: "HR Business Partner", company: "InnovateTech Solutions, Bangalore" },
];

export default function Home() {
  const { content } = useContent();
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="flex flex-col min-h-screen">

      {/* ── HERO: Hawa Mahal Background ── */}
      <SkeletonLoader>
        <section
          className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden"
          style={{ backgroundImage: `url('${hawaMahalImg}')`, backgroundSize: "cover", backgroundPosition: "center top" }}
        >
          <div className="absolute inset-0 bg-[#0A111F]/65" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-3xl space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-sm font-bold text-accent uppercase tracking-[0.2em]"
              >
                Best HR Consultancy in Jaipur
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-white leading-[1.05] whitespace-pre-line"
              >
                {content.homeHeroHeading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-white/75 leading-relaxed max-w-xl font-medium"
              >
                {content.homeHeroSubheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/contact">
                  <MagneticButton size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-accent hover:bg-accent/90 text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all" data-testid="button-hero-hire">
                    Schedule a Call <ArrowRight className="ml-2 h-5 w-5" />
                  </MagneticButton>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 rounded-full border-white/30 text-white hover:bg-white/10 transition-all" data-testid="button-hero-services">
                    View Our Services
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </SkeletonLoader>

      {/* ── STATS ── */}
      <section className="py-20 bg-secondary/30 relative z-20 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AnimatedCounter end={parseInt(content.statPlacements) || 500} label="Successful Placements" suffix={content.statPlacements.replace(/[0-9]/g, "")} />
            <AnimatedCounter end={parseInt(content.statCompanies) || 30} label="Client Companies" suffix={content.statCompanies.replace(/[0-9]/g, "")} />
            <AnimatedCounter end={parseInt(content.statIndustries) || 8} label="Industries Served" suffix={content.statIndustries.replace(/[0-9]/g, "")} />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE HIREAPEX ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
                <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Why Work With Us</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">
                  A Hiring Solutions Company Built on Precision
                </h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  Most organizations lose significant time and resources on hiring that doesn't last. As a dedicated hiring solutions company, HireApex ensures every placement is backed by rigorous screening, cultural assessment, and long-term fit evaluation.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: <Target className="w-6 h-6" />, title: "We begin with a thorough role brief", desc: "Before sourcing begins, we invest time understanding the position, team structure, and what success in the role looks like — ensuring we search with precision, not assumption." },
                  { icon: <Users className="w-6 h-6" />, title: "Role-specific shortlisted candidates", desc: "We present carefully shortlisted candidates with detailed evaluation notes. You spend less time reviewing and more time making confident decisions." },
                  { icon: <MessageSquare className="w-6 h-6" />, title: "Structured communication at every stage", desc: "We provide regular progress updates throughout the engagement. No chasing us for status — we keep you informed proactively." },
                  { icon: <CheckCircle2 className="w-6 h-6" />, title: "Focused on retention, not just placement", desc: "Our screening accounts for long-term compatibility — work culture, career trajectory, and team dynamics — reducing early attrition significantly." },
                ].map((feature, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1 }} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-center justify-center rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border p-8 min-h-[520px]"
            >
              <img
                src={womanImg}
                alt="HR professional at HireApex — talent acquisition services India"
                className="w-full max-w-sm object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIRING CHALLENGES ── */}
      <section className="py-32 bg-[#F8FAFC] border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">The Real Problem</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-5 tracking-tight">Hiring Challenges Companies Face Today</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Organizations across India lose months and significant resources to hiring processes that produce little result. HireApex, as a dedicated recruitment firm in Jaipur, was built to solve these exact pain points.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Too Many Irrelevant Profiles",
                body: "Most recruitment agencies send high volumes of resumes with little to no screening. Hiring managers end up spending hours filtering through candidates who don't meet even basic requirements. This wastes internal bandwidth and slows the entire process. A structured shortlisting approach — where only pre-evaluated candidates are presented — eliminates this problem entirely."
              },
              {
                title: "Slow Time-to-Fill",
                body: "Unfilled roles cost organizations in lost productivity, team overload, and missed business targets. Many companies in India report extended time-to-fill for specialized positions. As a recruitment agency in Jaipur with structured processes, HireApex delivers initial shortlists within timelines that depend on role complexity — agreed upon at intake so expectations are always aligned."
              },
              {
                title: "High Early Attrition",
                body: "Replacing an employee within the first 90 days is one of the most expensive hiring outcomes. It typically happens because candidates were screened for skills alone, without assessing cultural fit, career alignment, or the manager's working style. Our multi-stage evaluation specifically addresses these variables before any profile is presented."
              },
              {
                title: "No Communication After Submission",
                body: "A recurring complaint from hiring managers is that agencies disappear after sending profiles. There are no updates, no follow-through, and no support during the interview-to-offer stage. HireApex provides structured communication at every stage — from sourcing updates to offer negotiation support — so you're never left without visibility."
              },
              {
                title: "Misaligned Candidate Expectations",
                body: "Candidates who show up expecting a different role, salary range, or team structure disrupt interview panels and waste everyone's time. We conduct thorough pre-screening conversations that align expectations on compensation, notice period, growth trajectory, and role fit — before presenting any profile to the client."
              },
              {
                title: "Inconsistent Hiring Quality Across Roles",
                body: "Companies scaling across functions often struggle to maintain hiring quality consistently — what works for one function rarely works for another. As a full-service HR consultancy in Jaipur, we bring role-specific domain knowledge to each function, ensuring the same rigour across every requirement regardless of department."
              },
            ].map((challenge, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl border border-border p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <span className="text-accent font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{challenge.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">{challenge.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANDIDATE EXPERIENCE ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-end justify-center rounded-[2.5rem] bg-gradient-to-br from-[#1B3A6B]/8 to-accent/5 border border-border overflow-hidden min-h-[540px]"
            >
              <img
                src={bpoManImg}
                alt="Candidate support consultant at HireApex — job consultancy in Jaipur"
                className="w-full max-w-xs object-contain"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">For Job Seekers</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight leading-tight">
                The Candidate Experience at HireApex
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As a job consultancy in Jaipur, we believe that how a candidate is treated during the hiring process reflects directly on the organization they join. We apply the same rigor and respect to every candidate interaction that we do with clients.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Whether you're actively searching for a new role or passively exploring options, our team takes the time to understand your background, career goals, and the kind of environment where you'll perform best. We don't send your profile to a company unless we have a clear, specific reason to believe it's a strong match.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Honest, transparent communication", desc: "We tell you what we know about the role, the team, and realistic timelines. No vague promises or pressure." },
                  { title: "Profile presented with context", desc: "When we share your resume with a client, we accompany it with notes that position your experience correctly — not just a resume blast." },
                  { title: "Interview preparation support", desc: "We brief you before every client interaction, covering the company's expectations, interview format, and what to highlight." },
                  { title: "Feedback after every stage", desc: "We follow up after interviews and share whatever feedback the client provides. You're never left wondering what happened." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-primary">{item.title} — </span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES & SUCCESS STORIES ── */}
      <section className="py-32 bg-[#F8FAFC] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Proven Results</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-5 tracking-tight">Case Studies & Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real hiring outcomes from our work with companies across India — reflecting the mid-level talent acquisition we do every day.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "HR & Talent",
                headline: "4 HR Executive & Recruiter Roles Closed for a Growing BPO",
                client: "A mid-sized BPO in Jaipur needed to build their internal HR team from scratch — specifically HR Executives and Recruiters who could manage high-volume intake and onboarding independently.",
                challenge: "Previous hiring attempts produced candidates with theoretical knowledge but no hands-on experience managing bulk hiring cycles. The team needed people who could be productive within the first two weeks.",
                solution: "HireApex conducted a detailed brief with the operations team, profiled the right experience tier, and sourced candidates from comparable BPO environments. Each candidate was pre-assessed on practical HR tasks before presentation.",
                result: "4 roles closed · All candidates retained beyond 90 days · Zero repeat sourcing required"
              },
              {
                tag: "Sales & Accounts",
                headline: "Sales Executives & Accounts Team Hired for Retail Expansion",
                client: "A retail brand expanding into three new cities needed Sales Executives and Accounts Executives within a tight timeline to support store launch operations.",
                challenge: "Coordination across multiple city-based requirements simultaneously, with each location needing candidates who understood local market dynamics and could contribute from day one.",
                solution: "HireApex built a parallel sourcing process for all three cities, standardized the evaluation criteria across locations, and managed interview scheduling centrally to avoid delays. Candidates were pre-briefed on the role scope and city-specific expectations.",
                result: "3 cities · Sales + Accounts roles filled · On-schedule store launches achieved"
              },
              {
                tag: "Digital Marketing",
                headline: "Marketing Team Built for D2C Brand — Analyst to Team Leader",
                client: "A growing D2C brand needed to build a lean but capable digital marketing team — from a Digital Marketing Executive to a Marketing Analyst and a Team Leader to oversee performance campaigns.",
                challenge: "The client had previously hired generalists who lacked specific performance marketing skills. They needed candidates with proven hands-on experience in paid media and analytics, not just broad marketing knowledge.",
                solution: "HireApex designed role-specific evaluation criteria for each position, assessed candidates on actual campaign scenarios, and matched profiles with clear documentation of their relevant experience. The Team Leader search focused on candidates with demonstrated leadership in digital-first environments.",
                result: "3-person marketing team assembled · Role-specific shortlisting · All hires retained beyond 6 months"
              },
            ].map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-white rounded-3xl border border-border p-8 flex flex-col hover:shadow-xl transition-all duration-300"
              >
                <span className="inline-block bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5 self-start">{cs.tag}</span>
                <h3 className="text-xl font-extrabold text-primary mb-4 leading-tight">{cs.headline}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground font-semibold">Client Requirement: </strong>{cs.client}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground font-semibold">Hiring Challenge: </strong>{cs.challenge}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6"><strong className="text-foreground font-semibold">Solution Provided: </strong>{cs.solution}</p>
                <div className="mt-auto pt-4 border-t border-border text-xs font-bold text-accent tracking-wider uppercase">{cs.result}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR HIRING ECOSYSTEM ── */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Hiring Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We work with a structured ecosystem of platforms across talent sourcing, upskilling, and compliance to support efficient and reliable hiring outcomes.</p>
          </motion.div>

          <div className="flex flex-col gap-12">

            {/* Category 1: Talent Sourcing Platforms */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-8 pt-7 pb-4">
                <h3 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Talent Sourcing Platforms</h3>
                <p className="text-sm text-muted-foreground">Internshala &nbsp;·&nbsp; Foundit &nbsp;·&nbsp; Indeed &nbsp;·&nbsp; Shine</p>
              </div>
              <div className="overflow-hidden border-t border-border bg-[#FAFAFA] py-5">
                <motion.div
                  className="flex items-center gap-14 px-8"
                  style={{ width: "max-content" }}
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" as const }}
                >
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={i}>
                      <img src={internshalaLogo} alt="Internshala" className="h-9 object-contain shrink-0" />
                      <img src={founditLogo} alt="Foundit" className="h-8 object-contain shrink-0" />
                      <img src={indeedLogo} alt="Indeed" className="h-8 object-contain shrink-0" />
                      <img src={shineLogo} alt="Shine" className="h-10 object-contain shrink-0" />
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Category 2: Training & Upskilling */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-8 pt-7 pb-4">
                <h3 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Training & Upskilling</h3>
                <p className="text-sm text-muted-foreground">SkillVertex &nbsp;·&nbsp; Imarticus Learning &nbsp;·&nbsp; Scaler</p>
              </div>
              <div className="overflow-hidden border-t border-border bg-[#FAFAFA] py-5">
                <motion.div
                  className="flex items-center gap-16 px-8"
                  style={{ width: "max-content" }}
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" as const }}
                >
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={i}>
                      <img src={skillVertexLogo} alt="SkillVertex" className="h-11 object-contain shrink-0" />
                      <img src={imarticusLogo} alt="Imarticus Learning" className="h-9 object-contain shrink-0" />
                      <img src={scalarLogo} alt="Scaler" className="h-8 object-contain shrink-0" />
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Category 3: Legal & Compliance */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-8 pt-7 pb-4">
                <h3 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Legal & Compliance</h3>
                <p className="text-sm text-muted-foreground">Vakilsearch &nbsp;·&nbsp; Simpliance</p>
              </div>
              <div className="overflow-hidden border-t border-border bg-[#FAFAFA] py-5">
                <motion.div
                  className="flex items-center gap-16 px-8"
                  style={{ width: "max-content" }}
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 14, ease: "linear" as const }}
                >
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={i}>
                      <img src={vakilSearchLogo} alt="Vakilsearch" className="h-10 object-contain shrink-0" />
                      <img src={simplicanceLogo} alt="Simpliance" className="h-9 object-contain shrink-0" />
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── RECRUITMENT INSIGHTS ── */}
      <section className="py-32 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Hiring Knowledge</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-5 tracking-tight">Recruitment Insights</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Practical hiring knowledge from a placement consultancy in Jaipur that works across industries daily.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Hiring Strategy",
                title: "Why Role-Specific Shortlisting Leads to Better Hires",
                summary: "The instinct in hiring is often to get more options. More candidates, more resumes, more choice. But research consistently shows that hiring quality drops when decision-makers are overwhelmed with options. The real goal isn't more candidates — it's better-evaluated ones. When a recruiter presents role-specific shortlisted candidates instead of a bulk list, interview conversion rates improve, offer acceptance rates go up, and early attrition goes down. Structured shortlisting is the hallmark of a quality talent acquisition partner.",
              },
              {
                category: "Candidate Assessment",
                title: "What a Structured Screening Process Actually Looks Like",
                summary: "Most agencies screen for keywords — job title, years of experience, educational qualification. Structured screening goes further: it assesses role-specific competency, evaluates alignment between the candidate's career trajectory and the role's growth path, and checks for cultural fit indicators based on the hiring team's working style. It also includes a compensation alignment conversation — because a technically perfect candidate who's significantly above budget is not a viable shortlist candidate. This is what separates a staffing agency in Jaipur that delivers results from one that just sends resumes.",
              },
              {
                category: "Retention",
                title: "The 90-Day Post-Placement Check-In That Prevents Early Exits",
                summary: "Industry data in India shows that 30–40% of exits happen within the first three months of joining. The root cause is almost always a disconnect between what was promised and what the candidate experienced — in terms of role scope, team culture, or management style. A structured 90-day post-joining check-in, conducted by the recruiting partner, surfaces these misalignments early. Most of the time, what feels like a hiring problem is actually a communication problem — and it can be addressed before the candidate starts looking elsewhere.",
              },
              {
                category: "Hiring Approach",
                title: "How Briefing Quality Determines Hiring Speed",
                summary: "One of the most overlooked drivers of hiring speed is the quality of the initial role brief. When a recruiter understands the requirement precisely from day one — including team structure, must-have competencies, and cultural expectations — every downstream step moves faster because there's no course-correction mid-process. At HireApex, the intake session is treated as the most important step in any engagement. Timelines depend on role complexity, and understanding that complexity upfront is what makes those timelines realistic.",
              },
              {
                category: "HR Outsourcing",
                title: "HR Outsourcing vs Internal Hiring: What Growing Companies Should Know",
                summary: "Early-stage and scaling companies often debate whether to build an internal HR function or use an HR outsourcing services provider in India. The answer depends on hiring volume, role diversity, and budget. For companies hiring across varied functions with lean internal teams, outsourcing to a specialist recruitment firm produces better quality at a lower total cost than maintaining full-time in-house recruiters. For companies hiring at scale in a single function, an embedded model often makes the most sense.",
              },
              {
                category: "Market Trends",
                title: "What the Current Job Market Means for Employers in 2025",
                summary: "India's talent market has shifted meaningfully over the past two years. Candidate expectations around compensation, flexibility, and role clarity have increased. Notice periods remain long in most sectors, making planning critical. In-demand skills — particularly in technology, data, and finance — are being competed for aggressively. For hiring companies, this means that a strong candidate receiving your offer is likely also evaluating two or three others. Speed of process, quality of communication, and clarity of offer are now as important as the compensation itself.",
              },
            ].map((insight, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-3xl border border-border p-8 flex flex-col hover:shadow-lg transition-all duration-300 group"
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-4 self-start">{insight.category}</span>
                <h3 className="text-xl font-extrabold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">{insight.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed flex-grow">{insight.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 bg-[#0A111F] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Client Feedback</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">What Our Clients Say</h2>
          </div>
          <div className="flex overflow-hidden relative w-[200%] sm:w-[150%] md:w-[120%] lg:w-[110%] -ml-[50%] sm:-ml-[25%] md:-ml-[10%] lg:-ml-[5%] pb-8">
            <motion.div animate={{ x: [0, -1600] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" as const }} className="flex gap-8 px-4">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="bg-white text-primary p-8 rounded-3xl w-[400px] shrink-0 border border-border/10 shadow-xl flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-accent mb-6 opacity-80" />
                    <p className="text-lg font-medium leading-relaxed mb-8">"{t.quote}"</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{t.author}</p>
                    <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{t.company}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-primary to-primary opacity-90" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Ready to Build a Stronger Team?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="text-xl text-white/80 mb-12 font-medium max-w-2xl mx-auto">
            Whether you need one strategic hire or a structured volume hiring engagement, our team is ready to deliver. Connect with the leading HR consultancy in Jaipur today.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/contact">
              <MagneticButton size="lg" className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-full shadow-2xl">
                Schedule a Consultation
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
