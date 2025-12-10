
import React from 'react';
import { Project } from '../types';
import { RepoIcon, StarIcon, ForkIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group flex flex-col justify-between p-4 border border-github-light-border dark:border-github-dark-border rounded-md bg-github-light-bg dark:bg-github-dark-bg hover:border-github-accent dark:hover:border-github-accent transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(47,129,247,0.1)] relative overflow-hidden">
      {/* Subtle background flash on hover */}
      <div className="absolute inset-0 bg-github-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <RepoIcon className="w-4 h-4 text-github-light-muted dark:text-github-dark-muted group-hover:text-github-accent transition-colors" />
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-github-accent hover:underline truncate">
            {project.name}
          </a>
          <span className="text-xs border border-github-light-border dark:border-github-dark-border rounded-full px-2 py-0.5 text-github-light-muted dark:text-github-dark-muted ml-auto group-hover:border-github-accent/50 transition-colors">
            Public
          </span>
        </div>
        <p className="text-sm text-github-light-muted dark:text-github-dark-muted mb-4 line-clamp-3 group-hover:text-github-light-text dark:group-hover:text-github-dark-text transition-colors">
          {project.description}
        </p>
      </div>
      
      <div className="relative z-10 flex items-center gap-4 text-xs text-github-light-muted dark:text-github-dark-muted mt-2">
        <div className="flex items-center gap-1">
          <span 
            className="w-3 h-3 rounded-full shadow-sm" 
            style={{ backgroundColor: project.languageColor }}
          />
          <span>{project.language}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-github-accent cursor-pointer transition-colors">
          <StarIcon className="w-4 h-4" />
          <span>{project.stars}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-github-accent cursor-pointer transition-colors">
          <ForkIcon className="w-4 h-4" />
          <span>{project.forks}</span>
        </div>
      </div>
    </div>
  );
};
