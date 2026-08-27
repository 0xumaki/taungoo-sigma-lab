import projectsData from "./projects-data.json";

export interface Project {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languages?: string[];
  stars: number;
  forks: number;
  openIssues: number;
  loc: string;
  budget: string;
  intlBudget: string;
  updated: string;
  created: string;
  topics: string[];
  htmlUrl: string;
  size: number;
  defaultBranch: string;
  image: string;
  code: string;
  category: string;
  accent: string;
}

export const PROJECTS: Project[] = projectsData as Project[];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
