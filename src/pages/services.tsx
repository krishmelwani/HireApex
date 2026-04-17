import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, Users, Settings, LineChart, CheckCircle2 } from "lucide-react";


const serviceCards = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Recruitment & Staffing",
    desc: "We fill mid-level positions across most industries. Each shortlist is tailored to the role brief and delivered within a timeline agreed upon at intake."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Bulk Hiring",
    desc: "Large-scale hiring across multiple cities or functions. We've managed high-volume drives with structured coordination, standardized evaluation, and weekly progress reporting."
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "HR Consulting",
    desc: "We work inside your hiring process to identify gaps and improve how you evaluate and onboard talent — from screening frameworks to onboarding checklists."
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "HR Advisory",
    desc: "Compensation benchmarking, role structuring, and workforce planning support for growing organizations navigating headcount decisions."
  }
];

const faqs = [
  {
    q: "How quickly can we expect candidates?",
    a: "Timelines depend on the complexity and nature of the role. For straightforward mid-level positions with a reasonable talent pool, clients typically start receiving profiles within 7–10 business days of a completed briefing session. For niche or specialized roles, we set a transparent timeline during intake based on the actual market availability of suitable candidates. We never chase an arbitrary speed target at the expense of quality. Every profile we present has gone through our full screening process, and we prefer to communicate realistic timelines upfront rather than overpromise and underdeliver."
  },
  {
    q: "How do you evaluate candidates before presenting them?",
    a: "Every candidate goes through a multi-stage evaluation before we share their profile. This covers role-specific technical skills, relevant industry experience, and cultural fit indicators based on the detailed brief we collect at intake. We also have a structured conversation around compensation expectations, notice period, career goals, and why the candidate is exploring a change. You receive written evaluation notes alongside each profile — not just a resume — so your hiring manager has full context before the first conversation. This approach significantly reduces time spent on interviews with poor-fit candidates and improves offer acceptance rates."
  },
  {
    q: "What makes HireApex different from other recruitment agencies in Jaipur?",
    a: "Most recruitment agencies in Jaipur and across India optimize for volume — the more resumes submitted, the better the odds of a placement. This puts the screening burden on your internal team and inflates time-to-hire. HireApex takes the opposite approach: we present role-specific shortlisted candidates, each with written evaluation notes that provide your team the context they need to make informed interview decisions. We stay involved throughout the process — from interview scheduling to offer negotiation — and provide 90 days of post-placement support. That level of structured involvement is rare among agencies, and it's why most of our clients come back for their next requirement."
  },
  {
    q: "Do you work with companies outside Jaipur?",
    a: "Yes, our engagement model is not location-dependent. While HireApex is based in Jaipur, we work with client organizations across India including Bangalore, Mumbai, Hyderabad, Delhi NCR, Pune, and Chennai. All briefings, updates, and candidate presentations are handled over email and video calls, making the process smooth regardless of where your team is located. We've also supported multi-city hiring drives where sourcing happened simultaneously in different locations, with centralized coordination managed from our end."
  },
  {
    q: "Can you handle bulk or high-volume hiring?",
    a: "Yes. Bulk hiring is one of our structured service offerings. We've managed large-scale hiring drives for clients in logistics, manufacturing, retail, and BPO — including cross-city engagements with 20–50+ positions. For high-volume requirements, we build a specific process framework before sourcing begins: defined evaluation criteria, daily progress reporting, and a clear delivery timeline. We assign dedicated bandwidth for bulk mandates to ensure the quality standard doesn't drop as volume increases. Coordination and communication are what separate successful bulk hiring drives from chaotic ones, and we put significant effort into both."
  },
  {
    q: "What industries do you specialize in?",
    a: "We have placed candidates across eight major sectors: technology, healthcare, finance and banking, retail and e-commerce, manufacturing, logistics and supply chain, BPO and call centers, and professional services. In each sector, we've developed a sourcing approach that accounts for what actually makes candidates succeed in those roles — not just matching keywords on a resume. This means our assessment criteria vary by industry and function, ensuring relevant evaluation for every requirement regardless of which sector your company operates in."
  },
  {
    q: "What happens if a placed candidate doesn't work out?",
    a: "We offer a replacement guarantee within a defined period, the specifics of which are agreed upon during the engagement. In most cases, if a candidate exits within the replacement window for performance or fit-related reasons, we initiate a fresh sourcing process at no additional cost. More importantly, we conduct structured 90-day post-placement support for every placement — checking in with both client and candidate to catch early friction before it becomes a resignation. This proactive follow-up is one reason our long-term retention rates are above the industry average. Replacement is always a fallback — our goal is to avoid it through better upfront evaluation."
  },
  {
    q: "How does your pricing work?",
    a: "Our fees are success-based for most standard engagements — meaning you pay only upon a successful placement. The fee is calculated as a percentage of the placed candidate's annual CTC, benchmarked to industry norms. For retained mandates where dedicated bandwidth is required, we offer a different structure involving a smaller upfront component. For bulk hiring, we provide a per-head fee model that scales with volume. All pricing is discussed and confirmed before any work begins — no hidden charges, no mid-engagement surprises. We believe pricing clarity is as important as hiring quality."
  },
  {
    q: "Do candidates pay any fees to HireApex?",
    a: "No. Candidates are never charged for any part of the placement process. This includes profile review, interview preparation, application support, and any other assistance we provide to job seekers. Our fees are paid entirely by the hiring organization. If any individual or entity claims to represent HireApex while asking candidates for money, it is fraudulent activity. Please report such instances to compliance@hireapex.in immediately."
  },
  {
    q: "How do you handle candidate expectations around salary and role?",
    a: "Expectation alignment is built into our screening process — not treated as an afterthought. During our structured evaluation conversation with each candidate, we document their current compensation, expected range, notice period, and specific reasons for exploring a change. We cross-check this against the client's brief before presenting the profile. If there's a meaningful gap between what the candidate expects and what the client can offer, we flag it before presenting — not after the first interview. This prevents wasted interview rounds and reduces the rate of offer rejections significantly."
  },
  {
    q: "What roles do you typically hire for?",
    a: "We focus on small to mid-level professional roles across functions. In HR, we hire HR Executives, HR Analysts, HR Generalists, Recruiters, and Talent Coordinators. In finance and accounts, we handle Junior Accountants and Accounts Executives. In sales, we fill Sales Executive, Customer Support Executive, Team Leader, and Sales Manager positions. In marketing, we place Digital Marketing Executives and Marketing Analysts. Our focus is on roles where strong evaluation at the mid-level leads to long-term organizational performance — not high-level leadership or C-suite placements."
  },
  {
    q: "How do we get started?",
    a: "The fastest way to start is to contact us directly at business@hireapex.in or call us at +91 8233897557. We'll schedule a briefing call within 24 hours. During that call, we understand the role requirements, team structure, timeline, and ideal candidate profile. There's no lengthy onboarding or paperwork required to begin. Once the requirement is clear and the brief is confirmed, we begin sourcing immediately. Timelines are set at intake based on the actual complexity of the role — so you always know what to expect from the moment we start."
  }
];

export default function Services() {
  const { content } = useContent();
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background pb-24">
      
      {/* Section 1: HERO */}
      <section className="relative pt-32 pb-48 bg-[#0A111F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">{content.servicesHeroHeading}</h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
              {content.servicesHeroSubheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: TALENT ACQUISITION OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-16 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-primary mb-6">Talent Acquisition</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                End-to-end recruitment support from brief to post-joining follow-up. We manage the process so your team stays focused on their work.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Structured role brief and sourcing strategy",
                  "Direct sourcing through network and targeted outreach",
                  "Multi-stage screening for skills, experience, and cultural fit",
                  "Interview coordination and scheduling",
                  "Regular status updates throughout the process",
                  "90-day post-placement support"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

            </div>
            
            <div className="rounded-3xl border border-border bg-[#F8FAFC] h-full min-h-[400px] p-8 grid grid-cols-2 gap-4 content-center">
              {[
                { value: "500+", label: "Successful Placements" },
                { value: "30+", label: "Client Companies" },
                { value: "8+", label: "Industries Covered" },
                { value: "90 Days", label: "Post-Placement Support" },
                { value: "Role-Specific", label: "Shortlisted Candidates" },
                { value: "Transparent", label: "Timelines at Intake" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 text-center shadow-sm">
                  <div className="text-xl font-extrabold text-primary tracking-tight mb-1 leading-tight">{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* KEY OUTCOMES */}
      <section className="py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Why It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Key Outcomes of Our Talent Acquisition Approach</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Faster Time-to-Fill",
                body: "A structured intake process and targeted sourcing strategy eliminate guesswork from day one. By defining the role clearly before sourcing begins, we compress the time between mandate and shortlist — reducing unnecessary back-and-forth and keeping the hiring timeline predictable."
              },
              {
                title: "Higher-Quality Candidate Pool",
                body: "Every profile we present has passed multi-stage screening for skills, experience, cultural alignment, and motivation. We don't send volume — we send candidates who have been evaluated against your specific brief, so your team spends less time filtering and more time deciding."
              },
              {
                title: "Lower Effective Hiring Cost",
                body: "By focusing only on qualified candidates and coordinating interviews efficiently, we reduce the total effort your hiring team invests per role. Fewer unqualified submissions means fewer wasted interview slots, faster closure, and a significantly lower cost per successful hire."
              },
              {
                title: "Improved Early Retention",
                body: "Our process includes honest role briefing with candidates — not overselling the position. This alignment between expectation and reality, combined with our 90-day post-placement follow-up, results in placements that last well beyond the probation period."
              },
              {
                title: "Consistent Process Across Roles",
                body: "Whether you need one specialist or an entire team, the process remains structured and documented. Every engagement follows the same standard — role brief, sourcing strategy, evaluation framework, interview coordination, and post-placement check-in — regardless of scale or urgency."
              },
              {
                title: "Transparent Timelines and Communication",
                body: "We set timeline expectations at intake and provide regular progress updates throughout the search. You always know where the sourcing stands, how many candidates are in pipeline, and what the next step is — without having to chase for updates."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-6 p-7 rounded-2xl border border-border bg-[#F8FAFC] hover:border-primary/20 hover:bg-white transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mt-0.5">
                  <span className="text-accent font-extrabold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: SERVICE CARDS */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary">Specialized Solutions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {serviceCards.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-10 border border-border group transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow text-lg">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: OUR PROCESS */}
      <section className="py-32 bg-[#F8FAFC] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">How We Operate</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-5 tracking-tight">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured six-stage engagement model that delivers consistent hiring outcomes across every role — from HR Executives to Sales Managers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Role Discovery & Brief", desc: "We conduct a detailed intake session covering the position, reporting structure, team culture, and success benchmarks. This foundation determines the quality of everything that follows — and eliminates misaligned profiles from the outset. Timelines are also set transparently at this stage based on role complexity." },
              { step: "02", title: "Sourcing Strategy", desc: "Based on the brief, we build a targeted sourcing plan defining which channels to activate, what evaluation criteria to apply, and what passive candidate communities to approach — before a single outreach is made. No generic job board blasts." },
              { step: "03", title: "Candidate Sourcing", desc: "We source through our proprietary network, direct headhunting on professional platforms, and referral channels. Every candidate contacted is evaluated for role relevance before being moved to formal screening." },
              { step: "04", title: "Multi-Stage Screening", desc: "Each candidate is assessed across technical competency, industry knowledge, communication, cultural fit, notice period, and compensation expectations. Only candidates who clear all criteria are considered for the shortlist." },
              { step: "05", title: "Shortlist Delivery", desc: "You receive role-specific shortlisted candidates with written evaluation notes covering background, our assessment of strengths and considerations, and compensation expectations. Your team gets full context before the first interview." },
              { step: "06", title: "Closure & Post-Placement Support", desc: "We coordinate interviews, manage candidate communication, support offer negotiations, and provide structured 90-day post-placement support to ensure smooth onboarding, early retention, and long-term fit." },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl border border-border p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-4xl font-black text-primary/10 mb-4 tracking-tight">{step.step}</div>
                <h3 className="text-xl font-extrabold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: WHY DIFFERENT (Value Comparison) */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Our Approach</p>
            <h2 className="text-4xl font-extrabold text-primary">The HireApex Difference</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Here is how our structured approach compares to what most organizations experience with standard hiring methods.
            </p>
          </div>
          
          <div className="bg-white rounded-[2rem] border border-border overflow-hidden shadow-xl">
            <div className="grid grid-cols-2 bg-secondary/50 border-b border-border p-6 text-center">
              <div className="text-lg font-semibold text-muted-foreground">Common Hiring Challenges</div>
              <div className="text-xl font-extrabold text-primary">HireApex Solution</div>
            </div>
            
            {[
              ["Unscreened resumes require extensive internal filtering", "Role-specific shortlisted candidates delivered with evaluation notes — ready for interviews"],
              ["Agencies go silent after submitting profiles", "Structured communication and updates at every stage of the process"],
              ["Support ends at the offer stage", "90-day post-placement support including check-ins with both client and candidate"],
              ["High volume with low relevance", "Fit-focused hiring with role-specific criteria agreed upon at intake"],
              ["Generic keyword-based resume screening", "Multi-stage evaluation covering skills, cultural fit, compensation, and career alignment"],
              ["Unpredictable timelines cause planning difficulties", "Transparent timelines set at intake, based on actual role complexity — no guesswork"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-border last:border-0 p-6 md:p-8 text-center items-center">
                <div className="text-muted-foreground font-medium pr-4 border-r border-border/50 text-left">{row[0]}</div>
                <div className="font-bold text-accent pl-4 text-left">{row[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: ROLES WE HIRE FOR */}
      <section className="py-32 bg-[#F8FAFC] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Role Coverage</p>
            <h2 className="text-4xl font-extrabold text-primary mb-5">Roles We Typically Hire For</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We focus on small to mid-level professional roles across functions where strong placement leads to long-term organizational performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                fn: "HR & Talent",
                roles: [
                  "HR Executive",
                  "HR Analyst",
                  "HR Generalist",
                  "Recruiter",
                  "Talent Coordinator",
                  "HR Operations Executive",
                ],
              },
              {
                fn: "Finance & Accounts",
                roles: [
                  "Junior Accountant",
                  "Accounts Executive",
                  "Accounts Payable / Receivable Executive",
                  "Finance Assistant",
                  "MIS Executive",
                  "Billing Executive",
                ],
              },
              {
                fn: "Sales & Business Development",
                roles: [
                  "Sales Executive",
                  "Customer Support Executive",
                  "Team Leader – Sales",
                  "Sales Manager",
                  "Inside Sales Executive",
                  "Business Development Executive",
                ],
              },
              {
                fn: "Digital Marketing",
                roles: [
                  "Digital Marketing Executive",
                  "Marketing Analyst",
                  "Social Media Executive",
                  "SEO Executive",
                  "Performance Marketing Executive",
                  "Content Executive",
                ],
              },
              {
                fn: "Operations & Support",
                roles: [
                  "Operations Executive",
                  "Back Office Executive",
                  "Data Entry Operator",
                  "Customer Service Representative",
                  "Process Associate",
                  "Coordination Executive",
                ],
              },
              {
                fn: "Logistics & Supply Chain",
                roles: [
                  "Warehouse Executive",
                  "Logistics Coordinator",
                  "Dispatch Executive",
                  "Inventory Executive",
                  "Supply Chain Executive",
                  "Delivery Operations Executive",
                ],
              },
            ].map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl border border-border p-8 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-extrabold text-primary mb-5 pb-4 border-b border-border">{cat.fn}</h3>
                <ul className="space-y-2.5">
                  {cat.roles.map((role, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {role}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: INDUSTRIES DEEP DIVE */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Sector Expertise</p>
            <h2 className="text-4xl font-extrabold text-primary mb-5">Industries We Specialize In</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each industry has its own talent dynamics, compensation benchmarks, and evaluation criteria. Here is how we approach each one.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                industry: "Technology",
                detail: "Technology hiring requires evaluating candidates on both technical depth and practical problem-solving. We assess candidates not just on programming languages or tools, but on how they approach real work scenarios and collaborate across teams. Our sourcing covers both active job seekers and passive professionals open to the right opportunity.",
              },
              {
                industry: "Healthcare & Pharma",
                detail: "Healthcare hiring demands both domain knowledge and compliance awareness. We understand the regulatory environment that shapes hiring decisions in this sector — certifications, compliance requirements, and the sensitivity around patient-facing roles. Our healthcare placements span hospital administration, pharma sales and support, and clinical coordination roles.",
              },
              {
                industry: "Finance & Banking",
                detail: "Finance roles require candidates with specific technical expertise — whether that is accounting knowledge for accounts executives, reconciliation experience for finance assistants, or credit analysis experience for banking operations roles. We conduct function-specific assessments and verify credentials rigorously before presenting any profile.",
              },
              {
                industry: "BPO & Call Centers",
                detail: "BPO hiring often involves volume, urgency, and multiple simultaneous requirements across functions and shifts. HireApex has experience managing structured bulk hiring for BPO clients — defining evaluation criteria for process roles, coordinating high-volume interview rounds, and delivering candidates with verified communication skills and shift flexibility.",
              },
              {
                industry: "Manufacturing & Industrial",
                detail: "Manufacturing roles require candidates who combine technical knowledge with operational experience — whether that is quality control, production planning, or warehouse coordination. We understand the seniority expectations and compensation norms in this sector, and our sourcing approach focuses on candidates with hands-on operational backgrounds.",
              },
              {
                industry: "Logistics & Supply Chain",
                detail: "Logistics is a high-velocity sector where gaps in key roles directly impact operations and customer commitments. We have supported logistics clients through both targeted individual placements and large multi-city bulk hiring drives covering warehouse management, logistics coordination, dispatch operations, and inventory management roles.",
              },
            ].map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="bg-[#F8FAFC] rounded-2xl border border-border p-7 grid grid-cols-[140px_1fr] gap-6 items-start"
              >
                <div className="text-sm font-extrabold text-accent uppercase tracking-widest pt-1">{ind.industry}</div>
                <p className="text-muted-foreground leading-relaxed">{ind.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: HIRING CHALLENGES WE SOLVE */}
      <section className="py-32 bg-[#F8FAFC] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">Problems We Fix</p>
            <h2 className="text-4xl font-extrabold text-primary mb-5">Hiring Challenges We Solve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most organizations come to HireApex after experiencing one or more of these recurring problems with their current hiring approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                problem: "Too many irrelevant resumes to review",
                solution: "We present role-specific shortlisted candidates with evaluation notes. Your team spends zero time filtering — only interviewing candidates who have already been assessed for skills, experience, cultural fit, and compensation alignment.",
              },
              {
                problem: "Long time-to-fill causing operational pressure",
                solution: "Our structured process ensures delivery timelines are agreed upon at intake based on actual role complexity. Understanding requirements clearly from day one means no wasted cycles, no course-corrections, and no surprises mid-process.",
              },
              {
                problem: "High attrition within the first 90 days",
                solution: "Our multi-stage screening evaluates cultural fit, career alignment, and long-term motivation — not just technical skills. Our 90-day post-placement support catches early friction before it becomes resignation, significantly reducing early exits.",
              },
              {
                problem: "Agencies that disappear after sending profiles",
                solution: "We provide structured updates throughout the process. Post-submission, we remain involved through interview rounds, offer stage, and 90 days post-joining. You always know where things stand — without having to chase for updates.",
              },
              {
                problem: "Candidates who reject offers or don't show up",
                solution: "Candidate expectation management is built into our screening. We align compensation, role scope, and start date expectations before any profile is presented — reducing offer rejection and no-show rates from the outset.",
              },
              {
                problem: "Inconsistent quality across different roles",
                solution: "Every engagement follows the same structured methodology regardless of role or volume. Our quality standard doesn't vary based on which requirement we're handling — the same rigorous process applies every time.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 bg-primary/5 border-b border-border">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">The Problem</span>
                  <p className="font-extrabold text-primary text-lg leading-tight">{item.problem}</p>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">How We Solve It</span>
                  <p className="text-muted-foreground leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-primary text-center mb-16">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4 w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-border rounded-2xl px-6 data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-left text-lg font-bold text-primary hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section 10: CTA */}
      <section className="py-32 bg-primary text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight">Ready to improve your hiring?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg rounded-full border-white/20 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
            <Link href="/contact">
              <MagneticButton size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-full bg-accent hover:bg-accent/90 text-primary-foreground font-bold border-none shadow-xl">
                Schedule a Call
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
