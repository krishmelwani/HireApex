import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Effective Date: January 1, 2025</p>

        <div className="space-y-12 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p>
              Welcome to HireApex HR Consultancy ("we," "us," or "our"). We are committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website, use our services, or communicate with us. It covers both client companies seeking recruitment services and candidates seeking employment opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
            <p>
              We collect information that is necessary to provide our recruitment and HR advisory services effectively. This includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and job title.</li>
              <li><strong>Candidate Information:</strong> Resumes/CVs, work history, skills, qualifications, educational background, compensation details, and any other information shared voluntarily during the screening process.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, operating system, and data collected through cookies when you visit our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
            <p>
              The information we collect is used strictly for professional and recruitment-related purposes. Specifically, we use your data to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide recruitment, staffing, and HR consulting services.</li>
              <li>Match candidate profiles with relevant job opportunities.</li>
              <li>Communicate status updates, interview schedules, and feedback.</li>
              <li>Improve our website, services, and overall user experience.</li>
              <li>Maintain necessary business records and comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Data Storage and Security</h2>
            <p>
              We take data security seriously. Your information is stored on secure, industry-standard servers with restricted access. We implement technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data. Where we use third-party processors for data storage or communication, we ensure they comply with strict security standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and analyze site traffic. We use essential cookies for site functionality and analytical cookies to understand how visitors interact with our platform. You have the option to manage or disable cookie preferences through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Sharing Your Information</h2>
            <p>
              We do not sell your personal data. We may share your information only under the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>With Client Companies:</strong> Candidate profiles are shared with prospective employers only after obtaining the candidate's explicit consent.</li>
              <li><strong>With Service Providers:</strong> Trusted third-party tools that assist us in operating our business (e.g., email platforms, applicant tracking systems), bound by confidentiality agreements.</li>
              <li><strong>Legal Disclosures:</strong> If required by law, regulation, or legal process to protect the rights, property, or safety of HireApex HR Consultancy, our clients, or others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights</h2>
            <p>
              You maintain control over your personal data. You have the right to request access to the information we hold about you, ask for corrections to inaccurate data, or request the deletion of your data from our records. Candidates may withdraw their consent to be considered for roles at any time. To exercise these rights, please contact us using the details provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary to fulfill the purposes outlined in this policy or as required by law. Candidate profiles may be kept on file to match with future opportunities, unless deletion is explicitly requested. Client records are maintained for the duration of the business relationship and subsequent necessary accounting periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any modifications will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-secondary/30 rounded-2xl border border-border">
              <p><strong>HireApex HR Consultancy</strong></p>
              <p>Jaipur, Rajasthan, India</p>
              <p><strong>Email:</strong> business@hireapex.in</p>
              <p><strong>Phone:</strong> +91 8233897557</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
