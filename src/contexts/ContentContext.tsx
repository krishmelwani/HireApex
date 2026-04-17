import React, { createContext, useContext, useState, useCallback } from "react";

export interface SiteContent {
  phone1: string;
  phone2: string;
  emailBusiness: string;
  emailHR: string;
  emailCompliance: string;
  address: string;
  footerTagline: string;
  statPlacements: string;
  statCompanies: string;
  statIndustries: string;
  homeHeroHeading: string;
  homeHeroSubheading: string;
  homeCtaPrimary: string;
  homeCtaSecondary: string;
  aboutHeroHeading: string;
  aboutHeroSubheading: string;
  servicesHeroHeading: string;
  servicesHeroSubheading: string;
  leadershipHeroHeading: string;
  leadershipHeroSubheading: string;
  careersHeroHeading: string;
  careersHeroSubheading: string;
}

export interface ContentVersion {
  id: string;
  timestamp: string;
  label: string;
  content: SiteContent;
}

export const DEFAULT_CONTENT: SiteContent = {
  phone1: "+91 8233897557",
  phone2: "+91 9928610677",
  emailBusiness: "business@hireapex.in",
  emailHR: "hr@hireapex.in",
  emailCompliance: "compliance@hireapex.in",
  address: "267B, Sindhi Colony, Raja Park, Jaipur, Rajasthan – 302004",
  footerTagline: "HireApex is a recruitment consultancy focused on structured hiring, consistent communication, and long-term talent fit.",
  statPlacements: "500+",
  statCompanies: "30+",
  statIndustries: "8+",
  homeHeroHeading: "We Find the Right People.\nNot Just Resumes.",
  homeHeroSubheading: "HireApex is a Jaipur-based recruitment consultancy helping companies across India hire mid-level professionals through a structured, transparent process.",
  homeCtaPrimary: "Hire Talent",
  homeCtaSecondary: "Browse Services",
  aboutHeroHeading: "About HireApex",
  aboutHeroSubheading: "Founded in 2024, HireApex is a recruitment consultancy based in Jaipur, India. We work with companies across industries to close positions that require more than a job posting.",
  servicesHeroHeading: "Recruitment Services",
  servicesHeroSubheading: "We offer structured hiring support across talent acquisition, bulk hiring, and HR consulting. Every engagement is built around your specific requirement — not a template.",
  leadershipHeroHeading: "Leadership",
  leadershipHeroSubheading: "The people behind HireApex and how we think about hiring.",
  careersHeroHeading: "Work With Us",
  careersHeroSubheading: "We're building a team that takes hiring seriously. If that sounds like you, take a look at what's open.",
};

const STORAGE_KEY = "hireapex_cms_content";
const VERSIONS_KEY = "hireapex_cms_versions";
const MAX_VERSIONS = 20;

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
  } catch { /* empty */ }
  return DEFAULT_CONTENT;
}

function loadVersions(): ContentVersion[] {
  try {
    const raw = localStorage.getItem(VERSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* empty */ }
  return [];
}

function saveContent(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function saveVersions(versions: ContentVersion[]) {
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
}

interface ContentContextType {
  content: SiteContent;
  versions: ContentVersion[];
  updateContent: (patch: Partial<SiteContent>, label?: string) => void;
  restoreVersion: (id: string) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);
  const [versions, setVersions] = useState<ContentVersion[]>(loadVersions);

  const pushVersion = useCallback((old: SiteContent, label: string) => {
    const newVersion: ContentVersion = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      label,
      content: old,
    };
    setVersions((prev) => {
      const updated = [newVersion, ...prev].slice(0, MAX_VERSIONS);
      saveVersions(updated);
      return updated;
    });
  }, []);

  const updateContent = useCallback((patch: Partial<SiteContent>, label = "Content updated") => {
    setContent((prev) => {
      pushVersion(prev, label);
      const next = { ...prev, ...patch };
      saveContent(next);
      return next;
    });
  }, [pushVersion]);

  const restoreVersion = useCallback((id: string) => {
    const version = versions.find((v) => v.id === id);
    if (!version) return;
    setContent((prev) => {
      pushVersion(prev, "Before restore");
      saveContent(version.content);
      return version.content;
    });
  }, [versions, pushVersion]);

  const resetToDefaults = useCallback(() => {
    setContent((prev) => {
      pushVersion(prev, "Before reset to defaults");
      saveContent(DEFAULT_CONTENT);
      return DEFAULT_CONTENT;
    });
  }, [pushVersion]);

  return (
    <ContentContext.Provider value={{ content, versions, updateContent, restoreVersion, resetToDefaults }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
