import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export default function PoshPolicy() {
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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Prevention of Sexual Harassment Policy
            </h1>
            <p className="text-lg text-white/70 max-w-2xl font-medium leading-relaxed">
              This policy is established in compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) and the rules thereunder.
            </p>
            <p className="text-sm text-white/40 mt-6">Effective Date: January 2024 · Last Reviewed: April 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">

        {/* 1. Policy Objective */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">1. Policy Objective</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              HireApex HR Consultancy is committed to providing a safe, respectful, and dignified work environment for all individuals — including permanent employees, contractual staff, interns, trainees, consultants, and third-party vendors — who interact with or are engaged by the organization.
            </p>
            <p>
              This policy is designed to prevent sexual harassment at the workplace, establish a clear reporting and redressal mechanism, and protect the rights and dignity of all individuals covered under its scope. The objectives of this policy are to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Create and sustain a workplace free from sexual harassment in any form;</li>
              <li>Establish a formal and accessible mechanism for filing complaints;</li>
              <li>Ensure prompt, fair, and confidential investigation of all complaints;</li>
              <li>Protect complainants and witnesses from retaliation or victimization;</li>
              <li>Comply with all provisions of the POSH Act, 2013 and Rules thereunder.</li>
            </ul>
          </div>
        </motion.div>

        {/* 2. Scope */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">2. Scope of This Policy</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This policy applies to all individuals who work at, with, or for HireApex HR Consultancy, regardless of designation or nature of engagement. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Full-time and part-time employees at all levels;</li>
              <li>Contract workers, consultants, and freelancers;</li>
              <li>Interns and trainees;</li>
              <li>Clients, vendors, and third-party representatives;</li>
              <li>Any individual visiting or interacting with staff in a professional capacity.</li>
            </ul>
            <p>
              The policy covers conduct occurring at the workplace (including remote work settings), at any location where work-related duties are being performed, at employer-sponsored events, and through digital or electronic communication platforms used for work purposes.
            </p>
          </div>
        </motion.div>

        {/* 3. Definition of Sexual Harassment */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">3. Definition of Sexual Harassment</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Sexual harassment, as defined under the POSH Act, 2013, includes unwelcome acts or behavior (whether directly or by implication) such as:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Physical contact or advances of a sexual nature;</li>
              <li>Demand or request for sexual favors;</li>
              <li>Sexually colored remarks or innuendos;</li>
              <li>Showing pornography or sexually explicit material;</li>
              <li>Any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature.</li>
            </ul>
            <p>
              Circumstances that may also constitute sexual harassment include, but are not limited to: implied or explicit promises of preferential treatment in exchange for sexual favors; threats or creation of a hostile, intimidating, or offensive work environment; humiliation based on gender or sexual identity.
            </p>
          </div>
        </motion.div>

        {/* 4. Internal Complaints Committee */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">4. Internal Complaints Committee (ICC)</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              In accordance with Section 4 of the POSH Act, HireApex HR Consultancy has constituted an Internal Complaints Committee (ICC) to receive, investigate, and resolve complaints of sexual harassment. The committee is composed of:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>A Presiding Officer — a senior woman employee;</li>
              <li>At least two members from among the employees committed to causes of women or with legal knowledge;</li>
              <li>One external member from an NGO or association committed to the cause of women or a legal expert.</li>
            </ul>
            <p>
              The ICC shall meet within ten days of receiving a written complaint and shall complete the inquiry process within ninety days from the receipt of the complaint.
            </p>
          </div>
        </motion.div>

        {/* 5. Reporting Mechanism */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">5. Reporting Mechanism</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Any individual who experiences or witnesses sexual harassment may file a written complaint with the Internal Complaints Committee within three months from the date of the incident, or within three months of the last incident in a series of incidents.
            </p>
            <p>
              The complaint should be submitted in writing to the ICC Presiding Officer or through the following official channel:
            </p>
            <div className="bg-secondary/40 rounded-xl px-5 py-4 border border-border space-y-1">
              <p className="text-sm font-semibold text-foreground">ICC Contact</p>
              <p className="text-sm">Email: <a href="mailto:hr@hireapex.in" className="text-primary font-medium hover:underline">hr@hireapex.in</a></p>
              <p className="text-sm">Phone: <a href="tel:+918233897557" className="text-primary font-medium hover:underline">+91 8233897557</a></p>
              <p className="text-sm">Address: 267 B, Sindhi Colony, Raja Park, Jaipur – 302004, Rajasthan</p>
            </div>
            <p>
              In cases where the aggrieved individual is unable to make a written complaint due to physical or mental incapacity, a complaint may be submitted by a legal heir, friend, relative, co-worker, or any other person on behalf of the individual, with appropriate authorization.
            </p>
          </div>
        </motion.div>

        {/* 6. Investigation Process */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">6. Investigation Process</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Upon receipt of a written complaint, the Internal Complaints Committee shall follow the prescribed inquiry process:
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Acknowledgment", desc: "The ICC shall acknowledge receipt of the complaint within five business days and provide a copy to the respondent." },
                { step: "02", title: "Preliminary Assessment", desc: "The ICC shall conduct a preliminary review to determine whether the complaint falls within the purview of the POSH Act and this policy." },
                { step: "03", title: "Conciliation (Optional)", desc: "Before initiating a formal inquiry, the ICC may, at the request of the complainant, attempt conciliation between the parties. No monetary compensation shall be the basis of conciliation." },
                { step: "04", title: "Formal Inquiry", desc: "If conciliation fails or is not sought, the ICC shall conduct a formal inquiry, providing both parties an opportunity to present evidence and witnesses. The inquiry shall be completed within ninety days." },
                { step: "05", title: "Findings & Recommendations", desc: "The ICC shall prepare a report of its findings and submit it to the employer within ten days of the completion of the inquiry, along with recommended actions." },
                { step: "06", title: "Action & Implementation", desc: "HireApex management shall act on the ICC's recommendations within sixty days of receipt of the report, including appropriate disciplinary action, if warranted." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{item.step}</div>
                  <div>
                    <p className="font-bold text-primary mb-1">{item.title}</p>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 7. Confidentiality */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">7. Confidentiality</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              All complaints, evidence, proceedings, and findings related to sexual harassment shall be treated as strictly confidential. The identity of the complainant, respondent, and witnesses shall not be disclosed to any unauthorized person or the media.
            </p>
            <p>
              Any member of the ICC or HireApex management who breaches confidentiality shall be subject to disciplinary action as per applicable law and internal policy. Disclosure of information shall be permitted only where required by applicable law or as necessary to enforce any penalties imposed.
            </p>
          </div>
        </motion.div>

        {/* 8. Protection Against Retaliation */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-primary text-white rounded-2xl shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-extrabold mb-5 tracking-tight">8. Protection Against Retaliation</h2>
          <div className="space-y-4 text-white/75 leading-relaxed">
            <p>
              HireApex HR Consultancy strictly prohibits any form of retaliation against individuals who file a complaint of sexual harassment in good faith, participate in any related inquiry, or support a complainant in exercising their rights under this policy or the POSH Act.
            </p>
            <p>
              Retaliation includes, but is not limited to, demotion, termination, unfavorable transfers, exclusion from opportunities, harassment, or any adverse employment action taken against an individual because of their complaint or participation in the process.
            </p>
            <p>
              Any act of retaliation shall be treated as a separate and serious violation of this policy and shall be subject to independent disciplinary action, up to and including termination of employment or engagement.
            </p>
            <p className="text-white/60 text-sm mt-6">
              This policy is reviewed annually. For questions or to report a concern, contact hr@hireapex.in
            </p>
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center pb-8">
          &copy; 2024–2026 HireApex HR Consultancy. All rights reserved. · 267 B Sindhi Colony, Raja Park, Jaipur – 302004
        </p>
      </div>
    </motion.div>
  );
}
