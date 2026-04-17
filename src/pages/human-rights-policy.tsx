import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const SCOPE_ITEMS = [
  {
    title: "Safe & Healthy Workplace",
    desc: "HireApex is committed to maintaining a safe and healthy working environment for all employees, associates, and on-site personnel. We adhere to applicable occupational health and safety standards and continuously review our practices to eliminate risk.",
  },
  {
    title: "Diversity, Inclusion & Non-Discrimination",
    desc: "We uphold a workplace free from discrimination on the basis of gender, religion, caste, ethnicity, nationality, age, disability, or sexual orientation. Every individual is treated with equal dignity and respect in all aspects of employment.",
  },
  {
    title: "Equal Opportunity Employment",
    desc: "Recruitment, promotion, compensation, and training at HireApex are governed strictly by merit and business requirements. We do not permit bias — conscious or unconscious — to influence employment decisions.",
  },
  {
    title: "Prevention of Harassment",
    desc: "We maintain a zero-tolerance policy toward workplace harassment in any form, including verbal, physical, or psychological conduct. Designated channels exist for confidential reporting, and all complaints are investigated promptly and impartially.",
  },
  {
    title: "No Child or Forced Labor",
    desc: "HireApex strictly prohibits the engagement of child labor or any form of forced, bonded, or compulsory labor — in our own operations and across our client and vendor relationships. We perform due diligence to ensure compliance throughout our supply chain.",
  },
  {
    title: "Privacy & Data Rights",
    desc: "We respect the privacy and personal data rights of all individuals — including job applicants, placed candidates, and client personnel. Personal information is collected, stored, and processed in accordance with applicable data protection laws and only for legitimate business purposes.",
  },
  {
    title: "Anti-Corruption & Ethical Conduct",
    desc: "We conduct all business with integrity. HireApex prohibits bribery, corruption, fraudulent misrepresentation, and any form of unethical conduct in dealings with clients, candidates, partners, or regulators.",
  },
  {
    title: "Community Engagement & Social Responsibility",
    desc: "We recognize our responsibility toward the communities in which we operate. HireApex actively supports fair employment, local talent development, and the broader social objective of creating dignified and sustainable livelihoods.",
  },
];

export default function HumanRightsPolicy() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-[#F7F8FA] pb-24">

      {/* Hero */}
      <section className="relative bg-primary text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">Corporate Governance</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight">Human Rights Policy</h1>
            <p className="text-lg text-white/70 max-w-2xl font-medium leading-relaxed">
              This policy sets out HireApex HR Consultancy's commitment to upholding fundamental human rights in our operations, employment practices, and business relationships.
            </p>
            <p className="text-sm text-white/40 mt-6">Effective Date: January 2024 · Last Reviewed: April 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">

        {/* Section 1: Why this Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">1. Purpose of This Policy</h2>
          <div className="prose prose-slate max-w-none space-y-4 text-muted-foreground leading-relaxed">
            <p>
              HireApex HR Consultancy was established with a clear mandate: to connect organizations with qualified talent through a process grounded in ethics, transparency, and professional integrity. As a recruitment agency operating across multiple sectors and geographies within India, we interact with a broad spectrum of individuals — job seekers, employed professionals, client organizations, business partners, and the communities in which we operate.
            </p>
            <p>
              This Human Rights Policy formalizes our commitment to respecting the fundamental rights and dignity of every individual we engage with. It reflects our recognition that sustainable business is inseparable from ethical conduct, and that our responsibilities extend beyond commercial objectives to encompass the welfare of people and society.
            </p>
            <p>
              This policy is guided by the United Nations Guiding Principles on Business and Human Rights (UNGPs), the International Labour Organization (ILO) Core Conventions, and applicable Indian labor and employment legislation. It applies across HireApex's operations, including client engagements, candidate interactions, vendor relationships, and internal workforce management.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Scope */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-2 tracking-tight">2. Scope of This Policy</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The following areas define the specific commitments made by HireApex HR Consultancy under this policy. These principles apply to our employees, candidates, clients, partners, and all third parties engaged in our business operations.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {SCOPE_ITEMS.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-[#F8FAFC] border border-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-primary text-base leading-tight">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: Accountability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">3. Accountability & Grievance Mechanisms</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The Director and senior leadership of HireApex HR Consultancy are accountable for ensuring that this policy is implemented, communicated, and upheld across all levels of the organization. Responsibility for day-to-day policy adherence rests with all employees and associates in their respective functions.
            </p>
            <p>
              Any individual — whether a candidate, employee, client representative, or third-party associate — who believes that HireApex has not upheld the principles set forth in this policy is encouraged to raise the matter through the following channels:
            </p>
            <div className="bg-secondary/40 rounded-xl px-5 py-4 border border-border space-y-1">
              <p className="text-sm font-semibold text-foreground">Primary Contact</p>
              <p className="text-sm">Email: <a href="mailto:hr@hireapex.in" className="text-primary font-medium hover:underline">hr@hireapex.in</a></p>
              <p className="text-sm">Phone: <a href="tel:+918233897557" className="text-primary font-medium hover:underline">+91 8233897557</a></p>
              <p className="text-sm">Address: 267 B, Sindhi Colony, Raja Park, Jaipur – 302004, Rajasthan</p>
            </div>
            <p>
              All grievances will be acknowledged within five business days and investigated in a fair, confidential, and timely manner. We are committed to non-retaliation against anyone who raises a concern in good faith.
            </p>
          </div>
        </motion.div>

        {/* Section 4: Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-primary text-white rounded-2xl shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold mb-4 tracking-tight">4. Policy Review & Updates</h2>
          <p className="text-white/75 leading-relaxed mb-4">
            This policy will be reviewed annually or as required in response to changes in applicable laws, business operations, or evolving international human rights standards. All updates will be communicated to relevant stakeholders in a timely manner.
          </p>
          <p className="text-white/75 leading-relaxed">
            HireApex HR Consultancy remains committed to continuously improving its practices and to being a responsible employer, partner, and participant in the broader Indian business ecosystem.
          </p>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center pb-8">
          &copy; 2024–2026 HireApex HR Consultancy. All rights reserved. · 267 B Sindhi Colony, Raja Park, Jaipur – 302004
        </p>
      </div>
    </motion.div>
  );
}
