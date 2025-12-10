export interface Project {
  id: number;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  isPrivate?: boolean;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string; // For accessibility
}
