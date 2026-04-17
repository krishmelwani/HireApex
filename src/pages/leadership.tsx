import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Shield, Eye, Users, Target, TrendingUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useContent } from "@/contexts/ContentContext";

import krishMelwani from "@/assets/krish-melwani.jpeg";

function AnimatedCounter({ end, suffix = "", dark = false }: { end: number; suffix?: string; dark?: boolean }) {
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
    <div ref={ref}>
      <div className={`text-3xl font-black ${dark ? "text-white" : "text-primary"}`}>{count}{suffix}</div>
    </div>
  );
}

export default function Leadership() {
  const { content } = useContent();
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background pb-24">
      
      {/* Section 1: HERO */}
      <section className="relative pt-32 pb-40 bg-[#F8FAFC] overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-6">{content.leadershipHeroHeading}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              {content.leadershipHeroSubheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: FOUNDER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 bg-[#0A111F] text-white p-12 md:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <img
                  src={krishMelwani}
                  alt="Krish Melwani — Director & CEO, HireApex"
                  className="w-32 h-32 rounded-2xl object-cover object-top shadow-xl border-2 border-white/10"
                />
              </div>

              <h2 className="text-4xl font-extrabold mb-2">Krish Melwani</h2>
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-12">Director & CEO</p>
              
              <div className="space-y-8 mt-auto border-t border-white/10 pt-12">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <AnimatedCounter end={500} suffix="+" dark />
                    <div className="text-sm text-white/70 font-medium mt-1">Placements</div>
                  </div>
                  <div>
                    <AnimatedCounter end={30} suffix="+" dark />
                    <div className="text-sm text-white/70 font-medium mt-1">Companies</div>
                  </div>
                  <div>
                    <AnimatedCounter end={8} suffix="+" dark />
                    <div className="text-sm text-white/70 font-medium mt-1">Industries</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">2024</div>
                    <div className="text-sm text-white/70 font-medium mt-1">Since</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 p-12 lg:p-20 flex flex-col justify-center bg-white">
              <p className="text-2xl md:text-3xl text-primary font-extrabold leading-[1.4] mb-10 tracking-tight">
                "Good hiring is the result of a good brief and honest evaluation — not luck or volume."
              </p>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Effective hiring is rarely accidental. It comes from clarity in requirements, structured evaluation, and consistent communication throughout the process.
                </p>
                <p>
                  HireApex was founded in 2024 with a focus on building a recruitment approach that prioritizes understanding before execution. The goal was straightforward — to create a firm that businesses can rely on for consistency, transparency, and quality outcomes.
                </p>
                <p>
                  Since then, the company has grown through long-term client relationships and referrals, reflecting a process that values precision over volume. Based in Jaipur, HireApex works with organizations across India, supporting hiring needs across multiple industries.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: COMPANY VALUES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#F8FAFC] p-10 rounded-3xl shadow-sm border border-border"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Accountability in Every Placement</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We take responsibility for the process from start to finish. If something isn't working, we flag it and fix it.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#F8FAFC] p-10 rounded-3xl shadow-sm border border-border"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Honest Communication</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We tell clients when a requirement needs more clarity. We tell candidates when they're not the right fit. It keeps everyone's time from being wasted.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#F8FAFC] p-10 rounded-3xl shadow-sm border border-border"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Long-Term Involvement</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our work doesn't end at placement. We follow up to ensure the hire is working out for both sides.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: WORK CULTURE & INTERNAL APPROACH */}
      <section className="py-32 bg-[#F8FAFC] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">How We Work</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 tracking-tight">Work Culture & Internal Approach</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At HireApex, every team member operates under a shared set of working standards — not as a policy document, but as a practical way of doing the work. Our internal approach is built on the principle that the quality of a hire depends entirely on the quality of the process behind it. We spend more time in the brief stage than most agencies spend across the entire search. That investment of time at the start is what allows the rest of the engagement to move with confidence.
                </p>
                <p>
                  Communication is treated as part of the work, not a side task. Our team is expected to provide updates proactively — to clients, to candidates, and internally. When a sourcing approach isn't producing the right results, we raise it early, adjust the strategy, and communicate the change. We don't wait until a deadline to flag a problem. This culture of transparency is what keeps our engagements on track and our client relationships intact.
                </p>
                <p>
                  Internally, we hold ourselves to the same standard we ask of our candidates — consistency, clarity, and follow-through. Each member of the team is accountable for the engagements they manage, with clear ownership and regular check-ins that ensure nothing falls through the gaps. This structure is not hierarchical for its own sake — it exists because accountability in hiring produces better outcomes for everyone involved.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-1 gap-5 pt-4"
            >
              {[
                { icon: <Target className="w-5 h-5 text-accent" />, title: "Brief-first discipline", desc: "No sourcing begins without a complete, confirmed role brief. This is non-negotiable, regardless of timeline pressure." },
                { icon: <Eye className="w-5 h-5 text-accent" />, title: "Proactive status communication", desc: "Clients and candidates receive updates at defined intervals — not only when something noteworthy happens." },
                { icon: <Shield className="w-5 h-5 text-accent" />, title: "Clear ownership per engagement", desc: "Every requirement has a named owner who is responsible for delivery and client communication from start to close." },
                { icon: <Users className="w-5 h-5 text-accent" />, title: "Quality review before every shortlist", desc: "Each profile presented goes through an internal review before it reaches the client — no profile is sent without evaluation notes." },
                { icon: <TrendingUp className="w-5 h-5 text-accent" />, title: "Learning from each engagement", desc: "Post-placement feedback is reviewed internally to identify patterns and improve how we brief, source, and evaluate in the future." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-6 flex gap-4 items-start hover:shadow-sm transition-all">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: FUTURE VISION & GROWTH */}
      <section className="py-32 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">Where We're Headed</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight">Future Vision & Growth</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  HireApex is currently focused on deepening its capabilities in the sectors where we already operate — improving sourcing depth, evaluation consistency, and post-placement support across each of our eight active industries. The near-term priority is not expansion for its own sake, but ensuring that the quality of every engagement remains consistent as we take on more requirements and serve more organizations. We believe sustainable growth in recruitment is built on a reputation that clients feel confident recommending.
                </p>
                <p>
                  Over the next two to three years, we plan to extend our hiring capabilities into additional sectors that have structural demand for structured mid-level talent acquisition — including e-commerce, hospitality, and financial services. Each new sector will be entered deliberately, with the same groundwork of domain knowledge and sourcing infrastructure that we've built in our current areas. We will not enter a market before we're confident in our ability to deliver the same standard our existing clients experience.
                </p>
                <p>
                  On the client relationship side, our goal is to grow the proportion of organizations that engage with us on a recurring or retainer basis — where we function as a genuine extension of their internal talent function. This model produces better outcomes for both sides: clients benefit from a partner who deeply understands their team and culture, and HireApex can allocate resources more effectively. The result is a more stable, higher-quality operation that benefits every organization we work with, new and existing alike.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-1 gap-5"
            >
              {[
                { label: "Sector Expansion", desc: "Planned entry into e-commerce, hospitality, and financial services with full sourcing infrastructure before launch." },
                { label: "Deeper Industry Knowledge", desc: "Continued investment in domain expertise for each sector we serve — so our evaluation quality improves with every engagement." },
                { label: "Retainer-Based Partnerships", desc: "Growing the share of clients on recurring models, allowing for deeper organizational understanding and faster hiring cycles." },
                { label: "Candidate Network Expansion", desc: "Strengthening our passive candidate network across cities and functions to reduce sourcing time on future requirements." },
                { label: "Multi-City Hiring Capability", desc: "Building operational capacity to manage simultaneous multi-city hiring drives more effectively for expanding organizations." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <h4 className="font-bold text-white text-base mb-2">{item.label}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: COMPANY SNAPSHOT */}
      <section className="py-20 border-y border-border bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
               <div className="text-2xl font-extrabold text-primary">500+ Placements</div>
               <div className="hidden md:block w-px h-12 bg-border"></div>
               <div className="text-2xl font-extrabold text-primary">30+ Companies</div>
               <div className="hidden md:block w-px h-12 bg-border"></div>
               <div className="text-2xl font-extrabold text-primary">Mon–Sat 10AM–6PM</div>
               <div className="hidden md:block w-px h-12 bg-border"></div>
               <div className="text-2xl font-extrabold text-accent">+91 8233897557</div>
            </div>
         </div>
      </section>

      {/* Section 7: JOIN THE TEAM */}
      <section className="relative py-32 overflow-hidden bg-[#0A111F] text-white">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Join Our Team</h2>
          <p className="text-xl text-slate-300 mb-12 font-medium">
            We're always open to working with experienced recruiters who take quality seriously. If you're interested in being part of a team that focuses on doing the work right, reach out.
          </p>
          <Link href="/contact">
            <MagneticButton size="lg" className="h-16 px-10 text-lg rounded-full bg-accent hover:bg-accent/90 text-primary-foreground font-bold shadow-2xl">
              Get in Touch
            </MagneticButton>
          </Link>
        </div>
      </section>

    </motion.div>
  );
}
