export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'fullstack' | 'frontend' | 'app' | 'tool';
  categoryLabel: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  isProduction?: boolean;
  isPrivateRepo?: boolean;
  metrics?: { label: string; value: string }[];
  keyFeatures?: string[];
  challengesSolved?: string;
  techStackDetailed?: { category: string; items: string[] }[];
}

export interface SkillItem {
  name: string;
  level: 'Proficient' | 'Familiar';
  icon: string;
  category: 'languages' | 'dbms' | 'frameworks' | 'tools' | 'ai';
}

export interface SkillCategory {
  id: 'languages' | 'dbms' | 'frameworks' | 'tools' | 'ai';
  title: string;
  proficient: SkillItem[];
  familiar: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'experience' | 'education';
  description: string;
  location?: string;
  cgpa?: string;
  technologies?: string[];
  achievements?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  location?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface LeadershipItem {
  id: string;
  title: string;
  role: string;
  period: string;
  location: string;
  iconName: string;
  highlights: string[];
  link?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
