import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Briefcase, User } from "lucide-react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTPCY8qMHHNiw6JreG7uOtJsjfPh6R0ws92ekQ6ndNbFF6r81TRDFSYBO3SeIlcDYt/exec";

const jobSeekerSchema = z.object({
  form_type: z.literal("job_seeker"),
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  preferred_role: z.string().min(2, "Please enter your preferred role."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const businessSchema = z.object({
  form_type: z.literal("business"),
  company_name: z.string().min(2, "Company name must be at least 2 characters."),
  name: z.string().min(2, "Contact person name must be at least 2 characters."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  hiring_requirement: z.string().min(5, "Please describe your hiring requirement."),
  num_positions: z.string().min(1, "Please enter number of positions."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type JobSeekerValues = z.infer<typeof jobSeekerSchema>;
type BusinessValues = z.infer<typeof businessSchema>;

const inputClass = "h-14 bg-[#F8FAFC] border-border rounded-2xl text-base px-5 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200";
const labelClass = "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block";

function JobSeekerForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const form = useForm<JobSeekerValues>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: { form_type: "job_seeker", name: "", phone: "", email: "", preferred_role: "", message: "" },
  });

  async function onSubmit(data: JobSeekerValues) {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("type", "job");
      fd.append("name", data.name);
      fd.append("phone", data.phone);
      fd.append("email", data.email);
      fd.append("role", data.preferred_role);
      fd.append("about", data.message);
      await fetch(APPS_SCRIPT_URL, { method: "POST", body: fd });
      form.reset();
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Arjun Sharma" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Email Address *</FormLabel>
              <FormControl>
                <Input placeholder="arjun@email.com" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="preferred_role" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Preferred Job Role *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Finance Manager" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Tell Us About Yourself *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief background, current experience level, what kind of opportunity you're looking for..."
                className="min-h-[160px] bg-[#F8FAFC] border-border rounded-3xl text-base p-5 resize-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {submitError && (
          <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
        )}
        <MagneticButton
          type="submit"
          className="w-full h-16 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl font-bold"
          disabled={isLoading}
          data-testid="button-submit-contact"
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </MagneticButton>
      </form>
    </Form>
  );
}

function BusinessForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const form = useForm<BusinessValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: { form_type: "business", company_name: "", name: "", phone: "", email: "", hiring_requirement: "", num_positions: "", message: "" },
  });

  async function onSubmit(data: BusinessValues) {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("type", "business");
      fd.append("company", data.company_name);
      fd.append("contact", data.name);
      fd.append("phone", data.phone);
      fd.append("email", data.email);
      fd.append("requirement", data.hiring_requirement);
      fd.append("positions", data.num_positions);
      fd.append("details", data.message);
      await fetch(APPS_SCRIPT_URL, { method: "POST", body: fd });
      form.reset();
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="company_name" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Technologies Pvt Ltd" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Contact Person *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Priya Sharma" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Work Email *</FormLabel>
              <FormControl>
                <Input placeholder="priya@company.com" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="hiring_requirement" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Hiring Requirement *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`${inputClass} w-full`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Permanent Staffing" className="text-base py-3">Permanent Staffing</SelectItem>
                  <SelectItem value="Executive Search" className="text-base py-3">Executive Search</SelectItem>
                  <SelectItem value="Bulk Hiring" className="text-base py-3">Bulk Hiring</SelectItem>
                  <SelectItem value="HR Consulting" className="text-base py-3">HR Consulting</SelectItem>
                  <SelectItem value="HR Advisory" className="text-base py-3">HR Advisory</SelectItem>
                  <SelectItem value="Other" className="text-base py-3">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="num_positions" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Number of Positions *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`${inputClass} w-full`}>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1" className="text-base py-3">1 position</SelectItem>
                  <SelectItem value="2-5" className="text-base py-3">2–5 positions</SelectItem>
                  <SelectItem value="6-10" className="text-base py-3">6–10 positions</SelectItem>
                  <SelectItem value="11-25" className="text-base py-3">11–25 positions</SelectItem>
                  <SelectItem value="25+" className="text-base py-3">25+ positions</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Additional Details *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the roles, seniority levels, industries, timeline, or any specific requirements..."
                className="min-h-[160px] bg-[#F8FAFC] border-border rounded-3xl text-base p-5 resize-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {submitError && (
          <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
        )}
        <MagneticButton
          type="submit"
          className="w-full h-16 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl font-bold"
          disabled={isLoading}
          data-testid="button-submit-contact"
        >
          {isLoading ? "Submitting..." : "Get Started"}
        </MagneticButton>
      </form>
    </Form>
  );
}

export default function Contact() {
  const { content } = useContent();
  const [formType, setFormType] = React.useState<"job_seeker" | "business" | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const formRef = React.useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTypeSelect = (type: "job_seeker" | "business") => {
    setFormType(type);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 },
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-background pb-24">

      {/* HERO */}
      <section className="relative py-32 bg-white overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4"
            >
              Best HR Consultancy in Jaipur
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-primary"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-medium"
            >
              Whether you have a role to fill or you're looking for your next opportunity, we're here to help.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <MagneticButton onClick={scrollToForm} size="lg" className="h-16 px-10 text-lg rounded-full shadow-lg">
                Send a Message
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TYPE SELECTOR */}
      <section className="py-16 bg-[#F8FAFC] border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-3">How can we help you?</h2>
            <p className="text-muted-foreground text-lg">Select the option that applies to you to see the right form.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={() => handleTypeSelect("job_seeker")}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(27,58,107,0.18)" }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full text-left p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer group ${
                formType === "job_seeker"
                  ? "border-primary bg-primary text-white shadow-2xl"
                  : "border-border bg-white hover:border-primary/40"
              }`}
              data-testid="select-job-seeker"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${formType === "job_seeker" ? "bg-white/15" : "bg-secondary"}`}>
                <User className={`w-7 h-7 ${formType === "job_seeker" ? "text-white" : "text-primary"}`} />
              </div>
              <h3 className={`text-xl font-extrabold mb-2 ${formType === "job_seeker" ? "text-white" : "text-primary"}`}>Job Seeker</h3>
              <p className={`text-base leading-relaxed ${formType === "job_seeker" ? "text-white/80" : "text-muted-foreground"}`}>
                Looking for placement? Share your profile and we'll match you with the right opportunities.
              </p>
              {formType === "job_seeker" && (
                <div className="absolute top-6 right-6">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
              )}
            </motion.button>

            <motion.button
              onClick={() => handleTypeSelect("business")}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(27,58,107,0.18)" }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full text-left p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer group ${
                formType === "business"
                  ? "border-primary bg-primary text-white shadow-2xl"
                  : "border-border bg-white hover:border-primary/40"
              }`}
              data-testid="select-business"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${formType === "business" ? "bg-white/15" : "bg-secondary"}`}>
                <Briefcase className={`w-7 h-7 ${formType === "business" ? "text-white" : "text-primary"}`} />
              </div>
              <h3 className={`text-xl font-extrabold mb-2 ${formType === "business" ? "text-white" : "text-primary"}`}>Business</h3>
              <p className={`text-base leading-relaxed ${formType === "business" ? "text-white/80" : "text-muted-foreground"}`}>
                Need to hire? Tell us your requirements and we'll start sourcing the right candidates.
              </p>
              {formType === "business" && (
                <div className="absolute top-6 right-6">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24 bg-[#F8FAFC]" ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* LEFT COL: INFO */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-extrabold text-primary mb-10">Contact Details</h2>
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-1">Phone</h3>
                      <p className="text-xl font-bold text-primary">{content.phone1}</p>
                      <p className="text-lg font-semibold text-primary/70">{content.phone2}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-1">Email</h3>
                      <p className="text-lg font-bold text-primary mb-1">{content.emailBusiness}</p>
                      <p className="text-lg font-bold text-primary">{content.emailHR}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-1">Office</h3>
                      <p className="text-lg font-medium text-primary leading-relaxed whitespace-pre-line">
                        {content.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-1">Hours</h3>
                      <p className="text-lg font-medium text-primary">Monday–Saturday: 10:00 AM – 6:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl border border-primary/10 p-8">
                <h3 className="text-lg font-extrabold text-primary mb-4">Expect a response within</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <span className="text-base font-semibold text-foreground">Email inquiries — within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <span className="text-base font-semibold text-foreground">Call requests — same business day</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <span className="text-base font-semibold text-foreground">First shortlist — within 7–10 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COL: FORM */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border shadow-xl text-center py-20"
                  >
                    <div className="w-24 h-24 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-primary mb-4">Request Submitted</h3>
                    <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
                      Thank you for reaching out. We will be in touch within one business day.
                    </p>
                    <Button onClick={() => { setIsSuccess(false); setFormType(null); }} variant="outline" size="lg" className="h-14 px-8 text-base rounded-full">
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : !formType ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border shadow-xl flex flex-col items-center justify-center min-h-[400px] text-center"
                  >
                    <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mb-6">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-primary mb-3">Select an option above</h3>
                    <p className="text-muted-foreground text-lg max-w-sm">
                      Choose whether you are a job seeker or a business to see the relevant form.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={formType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border shadow-xl"
                  >
                    <div className="mb-8">
                      <span className="inline-block bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                        {formType === "job_seeker" ? "Job Seeker Form" : "Business Inquiry Form"}
                      </span>
                      <h3 className="text-2xl font-extrabold text-primary">
                        {formType === "job_seeker" ? "Tell us about yourself" : "Tell us about your hiring needs"}
                      </h3>
                    </div>

                    {formType === "job_seeker" ? (
                      <JobSeekerForm onSuccess={() => setIsSuccess(true)} />
                    ) : (
                      <BusinessForm onSuccess={() => setIsSuccess(true)} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
