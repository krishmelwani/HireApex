import React from "react";
import { motion } from "framer-motion";

export default function Terms() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-12">Effective Date: January 1, 2025</p>

        <div className="space-y-12 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website and services of HireApex HR Consultancy ("we," "us," or "our"), you agree to comply with and be bound by these Terms & Conditions. This agreement applies to all visitors, clients, candidates, and others who access our platform. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Services</h2>
            <p>
              HireApex provides professional HR solutions, including recruitment, staffing, executive search, bulk hiring, and HR consulting services. The specifics of any engagement, including timelines, deliverables, and fees, will be governed by a separate, customized agreement or engagement letter executed between HireApex and the client company.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Use of Website</h2>
            <p>
              Our website is intended to provide information about our services and facilitate communication. You agree to use the site only for lawful purposes. You are strictly prohibited from engaging in data scraping, attempting to breach site security, distributing malware, or using the website to transmit unsolicited commercial communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Client Responsibilities</h2>
            <p>
              Client companies engaging our services agree to provide accurate and comprehensive role briefs, job descriptions, and compensation details. Clients are expected to provide timely feedback on submitted profiles to ensure a smooth hiring process. Clients also agree not to directly approach or hire candidates introduced by HireApex outside of the terms specified in their specific engagement contract, to circumvent agreed-upon fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Candidate Responsibilities</h2>
            <p>
              Candidates agree that all information provided to HireApex, including resumes, work history, and qualifications, is accurate, current, and complete. Candidates are expected to maintain professional conduct during interviews and all communications with both HireApex and prospective employers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Confidentiality</h2>
            <p>
              Both HireApex and its clients/candidates agree to maintain the strict confidentiality of all proprietary or sensitive information shared during the recruitment process. This includes business strategies, compensation frameworks, and personal candidate details. Such information will only be used for the purpose of the specific recruitment engagement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of HireApex HR Consultancy and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Payment Terms</h2>
            <p>
              Service fees, payment schedules, and replacement guarantees are defined in the specific contract agreed upon prior to the commencement of services. Invoices are to be paid according to the terms specified therein. Failure to meet payment deadlines may result in late payment consequences as outlined in the individual client agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Limitation of Liability</h2>
            <p>
              While HireApex conducts thorough screening and evaluation, we act as a facilitator in the hiring process. We do not guarantee the performance, character, or long-term tenure of any candidate placed. The final hiring decision rests solely with the client company. HireApex shall not be liable for any direct, indirect, incidental, or consequential damages arising from hiring decisions or the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Termination</h2>
            <p>
              Either party may terminate an engagement or the use of services with appropriate notice, as detailed in the specific client agreement. Upon termination, any outstanding financial obligations or ongoing confidentiality commitments remain in full effect. We reserve the right to suspend access to our website for violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Changes will be effective immediately upon posting to the website. Continued use of our site or services constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">13. Contact</h2>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-secondary/30 rounded-2xl border border-border">
              <p><strong>HireApex HR Consultancy</strong></p>
              <p><strong>Email:</strong> business@hireapex.in</p>
              <p><strong>Phone:</strong> +91 8233897557</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
