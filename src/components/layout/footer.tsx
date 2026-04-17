import { Link } from "wouter";
import hireApexLogo from "@/assets/hireapex-logo-transparent.png";
import { useContent } from "@/contexts/ContentContext";

export function Footer() {
  const { content } = useContent();
  return (
    <footer className="bg-[#0A111F] text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand + MSME */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src={hireApexLogo} alt="HireApex" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed mb-5">
              {content.footerTagline}
            </p>
            <div className="mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">MSME Registration</p>
              <p className="text-sm text-slate-300 font-mono tracking-wide">UDYAM-RJ-17-0477438</p>
            </div>
            <a
              href="/msme-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg border border-slate-600 text-sm text-slate-300 hover:border-accent hover:text-accent transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              MSME Certificate
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Home</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">About</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Services</Link></li>
              <li><Link href="/leadership" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Leadership</Link></li>
              <li><Link href="/career" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Terms & Conditions</Link></li>
              <li><Link href="/human-rights-policy" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Human Rights Policy</Link></li>
              <li><Link href="/prevention-of-sexual-harassment-policy" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">POSH Policy</Link></li>
              <li><Link href="/business-policy" className="hover:text-white hover:underline transition-all underline-offset-4 decoration-accent">Payment & Service Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Business Inquiries</p>
                <a href={`mailto:${content.emailBusiness}`} className="hover:text-white transition-colors">{content.emailBusiness}</a>
              </li>
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Job Seekers</p>
                <a href={`mailto:${content.emailHR}`} className="hover:text-white transition-colors">{content.emailHR}</a>
              </li>
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Fraud Reporting</p>
                <a href={`mailto:${content.emailCompliance}`} className="hover:text-white transition-colors">{content.emailCompliance}</a>
              </li>
              <li>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                <a href={`tel:${content.phone1.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{content.phone1}</a><br />
                <a href={`tel:${content.phone2.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{content.phone2}</a>
              </li>
              <li className="pt-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Registered Address</p>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">{content.address}</p>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/50 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>&copy; 2025 HireApex HR Consultancy. All rights reserved.</p>
          <p className="text-slate-600 text-xs">CIN: Sole Proprietorship &nbsp;|&nbsp; MSME: UDYAM-RJ-17-0477438 &nbsp;|&nbsp; Jaipur, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
