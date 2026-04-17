import React from "react";
import { motion } from "framer-motion";

export default function BusinessPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <section className="bg-[#0A111F] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">HireApex HR Consultancy</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Payment, Replacement &amp; Service Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Effective Date: January 1, 2025 &nbsp;|&nbsp; Jurisdiction: Jaipur, Rajasthan, India
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-slate max-w-none">

          <div className="text-slate-600 text-sm leading-relaxed mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
            This document constitutes a binding policy governing the service engagement between HireApex HR Consultancy ("the Firm", "HireApex") and its clients ("the Client", "the Employer"). By engaging HireApex's recruitment services, the Client acknowledges having read, understood, and agreed to all terms and conditions set forth herein. This Policy is to be read in conjunction with any separately executed engagement letter, scope of work document, or recruitment mandate agreement.
          </div>

          <PolicySection number="1" title="Scope of Services">
            <p>
              HireApex HR Consultancy provides professional recruitment and talent acquisition services to organisations across India. The Firm's core scope of services includes, but is not limited to: candidate sourcing through both active and passive channels; multi-stage screening and competency-based evaluation of candidates; structured interview coordination and scheduling; post-offer follow-up; and 90-day post-placement support.
            </p>
            <p>
              HireApex operates exclusively as a recruitment intermediary and does not function as an employer of record, staffing agency, or manpower supplier. The Firm's responsibility is to identify, evaluate, and present suitable candidates in alignment with the Client's stated requirements. The final decision regarding selection, offer, and employment shall rest solely with the Client.
            </p>
            <p>
              The scope of each engagement is defined at the time of mandate initiation and may include role-specific sourcing, bulk hiring campaigns, HR consulting support, or talent market advisory. Any services beyond the agreed scope shall require a separate written mandate or addendum.
            </p>
          </PolicySection>

          <PolicySection number="2" title="Fee Structure">
            <p>
              HireApex charges a professional recruitment fee ranging between <strong>6% to 8% of the candidate's confirmed annual Cost to Company (CTC)</strong> per successfully placed candidate. The applicable percentage within this range shall be determined based on the seniority of the role, functional complexity, urgency of the mandate, and the level of dedicated resourcing required.
            </p>
            <p>
              The applicable fee rate shall be agreed upon in writing prior to commencement of sourcing activity. In the absence of a written agreement specifying an alternative rate, the standard fee of 8% of annual CTC shall apply. All fees are exclusive of applicable Goods and Services Tax (GST) and any other statutory levies as prescribed under Indian law.
            </p>
            <p>
              For bulk hiring mandates involving multiple positions, a separate pricing structure may be negotiated and documented at the commencement of the engagement. The Firm reserves the right to revise its fee structure for new mandates with adequate prior notice to the Client.
            </p>
          </PolicySection>

          <PolicySection number="3" title="Payment Terms">
            <p>
              Payment of the recruitment fee shall become due and payable within <strong>30 calendar days</strong> from the date of the candidate's official joining in the Client's organisation. The joining date shall be confirmed in writing by the Client to HireApex upon the candidate's commencement of employment.
            </p>
            <p>
              The Firm shall raise a formal tax invoice upon confirmation of joining. Payment shall be made via bank transfer (NEFT/RTGS/IMPS) to the Firm's designated account as indicated on the invoice. Any applicable TDS deductions, if made, must be accompanied by the corresponding TDS certificate issued within the statutory timelines under the Income Tax Act, 1961.
            </p>
            <p>
              Failure to make payment within the prescribed period shall be treated as a material breach of the engagement terms. In such circumstances, HireApex reserves the right to suspend active mandates, withhold the replacement guarantee, and pursue recovery through appropriate legal channels. A monthly interest charge of 1.5% per month may be levied on overdue amounts, compounded from the date payment was due.
            </p>
          </PolicySection>

          <PolicySection number="4" title="Replacement Policy">
            <p>
              HireApex extends a <strong>90-day replacement guarantee</strong> for every successfully placed candidate. This guarantee commences from the candidate's confirmed date of joining and remains valid through the entire 90-calendar-day period, including during any probationary period stipulated by the Client.
            </p>
            <p>
              In the event that a placed candidate resigns or is terminated for performance-related reasons during this 90-day window, HireApex shall undertake a single replacement search at no additional charge, subject to the conditions enumerated herein.
            </p>
            <p>
              <strong>The replacement guarantee is valid only where the following conditions are satisfied:</strong> (a) the recruitment fee has been paid in full within the stipulated 30-day period; (b) the role for which the candidate was placed remains substantively unchanged in terms of responsibilities, reporting structure, and remuneration; and (c) the work environment and employment conditions provided to the candidate are consistent with what was represented to the Firm at the time of mandate acceptance.
            </p>
            <p>
              <strong>The replacement guarantee shall not apply in the following circumstances:</strong> the candidate's exit is attributable to company-initiated layoffs, redundancy, or workforce reduction; the role is materially altered, reassigned, or restructured following the candidate's joining; the candidate departs due to breach of employment terms, non-payment of salary, or demonstrably unfair work conditions; or the Client fails to provide a timely written notice of exit as required under Section 6 of this Policy.
            </p>
          </PolicySection>

          <PolicySection number="5" title="One-Time Replacement Clause">
            <p>
              The replacement guarantee extended by HireApex applies on a <strong>one-time basis</strong> per filled position. Once a replacement candidate has been sourced, evaluated, and successfully placed for a given role, the replacement guarantee for that particular mandate is considered fulfilled and does not extend to the replacement candidate.
            </p>
            <p>
              The replacement candidate is placed under the same terms as the original placement, including the applicable fee structure if a new invoice becomes relevant. Continued placement obligations beyond the one-time replacement are subject to a new commercial agreement between the Firm and the Client.
            </p>
          </PolicySection>

          <PolicySection number="6" title="Notice Requirement for Replacement Claims">
            <p>
              To invoke the replacement guarantee, the Client is required to notify HireApex in writing within <strong>7 calendar days</strong> of the date on which the placed candidate's employment terminates or resignation is accepted. This notice must be submitted via email to <a href="mailto:business@hireapex.in" className="text-blue-600 hover:underline">business@hireapex.in</a> and must include: the candidate's name and designation, the date of last working day or resignation acceptance, and a brief account of the circumstances surrounding the exit.
            </p>
            <p>
              Failure to provide written notice within the prescribed 7-day window shall result in the automatic forfeiture of the replacement entitlement for that position. Verbal communication, social media messages, or informal notifications shall not constitute valid notice under this clause. The Firm acknowledges receipt of notice in writing, and replacement sourcing shall commence only upon such acknowledgement.
            </p>
          </PolicySection>

          <PolicySection number="7" title="Refund Policy">
            <p>
              HireApex operates on a <strong>no-refund basis</strong>. Once a candidate has been placed and the joining is confirmed, the recruitment fee becomes fully earned and non-refundable, irrespective of subsequent events such as candidate attrition, performance issues, or business changes on the Client's side.
            </p>
            <p>
              The Firm's commitment to the Client is fulfilled through the replacement guarantee described in Section 4 of this Policy. The replacement mechanism is the exclusive remedy available to the Client in the event of early attrition, and no monetary refund shall be issued under any circumstances. This policy is consistent with industry standards for professional recruitment services.
            </p>
          </PolicySection>

          <PolicySection number="8" title="Termination of Engagement">
            <p>
              Either party may terminate an ongoing recruitment engagement by providing written notice to the other party. A minimum notice period of <strong>7 business days</strong> is recommended to allow for an orderly wind-down of active sourcing activities, candidate communication, and documentation handover.
            </p>
            <p>
              Upon receipt of a termination notice, HireApex shall cease active sourcing for the relevant mandate. Any candidate whose profile has already been submitted and who subsequently joins the Client's organisation within 90 days of the termination date shall still attract the applicable recruitment fee, as the placement shall be deemed to have originated from HireApex's sourcing effort.
            </p>
            <p>
              Termination of a single mandate does not affect other active engagements between the parties unless explicitly stated in the termination notice. Outstanding fee obligations that have accrued prior to termination remain enforceable regardless of the termination.
            </p>
          </PolicySection>

          <PolicySection number="9" title="Limitation of Liability">
            <p>
              HireApex's role is limited to identifying, evaluating, and presenting candidates who meet the Client's specified requirements. The Firm does not guarantee the performance, conduct, productivity, or long-term retention of any candidate placed through its services. All employment decisions, including final selection, offer terms, onboarding, and performance management, remain the sole responsibility of the Client.
            </p>
            <p>
              HireApex shall not be held liable for any business losses, revenue shortfalls, project delays, or consequential damages arising from the non-performance or early exit of a placed candidate. The Firm's aggregate liability to the Client under any engagement shall not exceed the total recruitment fees paid for the specific position in question during the preceding 12-month period.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Jurisdiction and Governing Law">
            <p>
              This Policy and all engagement agreements arising therefrom shall be governed by and construed in accordance with the laws of India, specifically as applicable in the State of Rajasthan. In the event of any dispute, disagreement, or claim arising out of or in connection with the services rendered by HireApex, the parties shall first endeavour to resolve the matter through good-faith negotiation.
            </p>
            <p>
              If the dispute cannot be resolved within 30 days of written notice by either party, it shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Jaipur, Rajasthan, India</strong>. Both parties expressly consent to this forum and waive any objection to the jurisdiction or venue of such courts.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Confidentiality of Client Data">
            <p>
              HireApex treats all information shared by the Client — including but not limited to organisational structure, compensation benchmarks, hiring plans, headcount projections, strategic initiatives, and internal role descriptions — as strictly confidential. Such information shall be used exclusively for the purpose of fulfilling the recruitment mandate and shall not be disclosed to any third party without the Client's prior written consent.
            </p>
            <p>
              This confidentiality obligation shall survive the termination of any individual engagement or the overall commercial relationship between the parties and shall remain in force for a period of <strong>two (2) years</strong> from the date of last engagement activity.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Candidate Data Protection">
            <p>
              HireApex collects, stores, and processes candidate personal data — including resumes, contact details, educational qualifications, and employment history — solely for the purpose of recruitment. All candidate data is handled in accordance with applicable Indian data protection norms and HireApex's Privacy Policy.
            </p>
            <p>
              Candidate profiles are shared with the Client strictly on a need-to-know basis for the purpose of evaluating suitability for a specific role. The Client agrees not to use candidate data for purposes other than evaluation and hiring, and not to retain candidate information beyond the requirements of the recruitment process. Clients are expected to maintain their own data handling practices in compliance with applicable law.
            </p>
          </PolicySection>

          <PolicySection number="13" title="Non-Solicitation">
            <p>
              The Client agrees that, for a period of <strong>12 months</strong> following the submission of any candidate profile by HireApex — whether or not the candidate is formally placed — the Client shall not directly solicit, engage, or hire the said candidate through any channel other than through HireApex, without the Firm's prior written consent. Should such direct engagement occur, the applicable recruitment fee shall become immediately payable.
            </p>
            <p>
              This clause applies equally to referrals made by HireApex-introduced candidates and to any individuals whom the Client contacts through HireApex's professional network, whether or not a formal placement results.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Ethical Hiring Practices">
            <p>
              HireApex is committed to ethical, transparent, and fair recruitment practices. The Firm does not charge any fee to job seekers or candidates for placement, and strictly prohibits any associate, partner, or representative from doing so on its behalf. Candidates are evaluated solely on the basis of professional merit, relevant experience, and role suitability.
            </p>
            <p>
              HireApex does not engage in discriminatory practices on the basis of gender, religion, caste, nationality, disability, or any other protected characteristic. Clients are likewise expected to maintain fair, inclusive, and legally compliant employment practices. The Firm reserves the right to withdraw from a mandate where the Client's hiring practices are found to be discriminatory, coercive, or in violation of applicable labour law.
            </p>
          </PolicySection>

          <PolicySection number="15" title="No Guarantee of Offer Acceptance">
            <p>
              While HireApex endeavours to present candidates who are genuinely interested and motivated to join the Client's organisation, the Firm cannot guarantee that any shortlisted or interviewed candidate will ultimately accept an offer of employment. Offer acceptance is a voluntary decision made by the candidate based on personal, professional, and financial considerations at the time of the offer.
            </p>
            <p>
              In the event that a candidate declines an offer post-selection, HireApex shall make reasonable efforts to identify an alternative candidate without additional charge, provided that the engagement remains active and the mandate terms have not changed materially. This commitment does not constitute an extension of the replacement guarantee and is offered on a best-effort basis.
            </p>
          </PolicySection>

          <PolicySection number="16" title="Timeline Expectations">
            <p>
              Recruitment timelines at HireApex are determined by the complexity of the role, the depth of screening required, and the availability of suitable candidates in the relevant talent market. While the Firm makes every reasonable effort to present qualified candidates promptly, timelines are not guaranteed and may vary based on factors outside the Firm's control, including candidate availability, client scheduling, and market conditions.
            </p>
            <p>
              Indicative timelines for different engagement types — such as entry-level, mid-level, or specialised roles — are communicated at the time of mandate initiation. These are estimates provided in good faith and do not constitute contractual commitments. Clients are encouraged to communicate role urgency at the outset so that appropriate prioritisation can be applied.
            </p>
          </PolicySection>

          {/* Bottom notice */}
          <div className="mt-16 p-6 bg-[#0A111F] rounded-xl text-slate-400 text-sm leading-relaxed">
            <p className="text-white font-semibold mb-2">Questions about this Policy?</p>
            <p>
              For any queries regarding this Policy, please contact us at{" "}
              <a href="mailto:business@hireapex.in" className="text-accent hover:underline">business@hireapex.in</a>.
              Our registered office is located at 267B, Sindhi Colony, Raja Park, Jaipur, Rajasthan – 302004.
            </p>
            <p className="mt-3 text-slate-600 text-xs">
              HireApex HR Consultancy &nbsp;|&nbsp; MSME Registration: UDYAM-RJ-17-0477438 &nbsp;|&nbsp; Last Updated: January 2025
            </p>
          </div>

        </div>
      </section>
    </motion.div>
  );
}

function PolicySection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-start gap-3">
        <span className="text-accent font-mono text-base mt-0.5">{number}.</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed pl-7">
        {children}
      </div>
    </div>
  );
}
