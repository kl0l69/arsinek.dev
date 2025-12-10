
import React, { useState, useEffect, useRef } from 'react';
import { LocationIcon, MailIcon, GitHubIcon, UsersIcon } from './Icons';
import { SKILLS, SOCIAL_LINKS, PROJECTS } from '../constants';
import { ProjectCard } from './ProjectCard';
import InteractiveAvatar from './InteractiveAvatar';
import { CodeBlock } from './CodeBlock';
import ContactModal from './ContactModal';

// Utility component for fade-in animations on scroll
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once visible to run animation only once
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before fully entering
      }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div 
      ref={domRef}
      className={`${className} transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components for Stats & Achievements ---

const GithubAchievements: React.FC = () => {
  const achievements = [
    { 
      name: 'Pull Shark', 
      desc: 'Merged pull requests',
      tier: 'x2',
      color: 'from-blue-400 to-blue-600',
      glow: 'shadow-blue-500/50',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6 text-white">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    { 
      name: 'Quickdraw', 
      desc: 'Closed issue quickly',
      color: 'from-yellow-400 to-yellow-600',
      glow: 'shadow-yellow-500/50',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6 text-white">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    { 
      name: 'Starstruck', 
      desc: 'Created popular repo',
      tier: 'x3',
      color: 'from-amber-400 to-orange-600',
      glow: 'shadow-orange-500/50',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6 text-white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    { 
      name: 'YOLO', 
      desc: 'Merged without review',
      color: 'from-green-400 to-emerald-600',
      glow: 'shadow-emerald-500/50',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6 text-white">
           <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        </svg>
      )
    },
    { 
      name: 'Arctic Code Vault', 
      desc: 'Code preserved',
      color: 'from-cyan-400 to-slate-500',
      glow: 'shadow-cyan-500/50',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6 text-white">
           <path d="M12 2L3 7v9c0 5 9 8 9 8s9-3 9-8V7l-9-5z" />
           <path d="M12 22V12" />
           <path d="M20 7l-8 5-8-5" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-github-light-bg/80 dark:bg-github-dark-bg/80 border border-github-light-border dark:border-github-dark-border rounded-xl p-4 md:p-5 shadow-sm backdrop-blur-sm w-full transition-all hover:shadow-md hover:border-github-light-muted dark:hover:border-github-dark-muted">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-sm font-semibold text-github-light-text dark:text-github-dark-text">Achievements</h3>
        <span className="text-xs text-github-light-muted dark:text-github-dark-muted hover:text-github-accent cursor-pointer">View all</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide px-1 w-full">
        {achievements.map((badge) => (
          <div key={badge.name} className="flex-shrink-0 group relative flex flex-col items-center">
             <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-br ${badge.color} shadow-lg ${badge.glow} hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                <div className="w-full h-full rounded-full bg-github-light-bg dark:bg-[#0d1117] flex items-center justify-center relative overflow-hidden">
                    {/* Inner glossy highlight */}
                    <div className="absolute top-0 w-full h-1/2 bg-white opacity-10 rounded-t-full pointer-events-none"></div>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${badge.color} opacity-90`}>
                        {badge.icon}
                    </div>
                </div>
                {/* Tier Badge */}
                {badge.tier && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-github-dark-bg shadow-sm z-10">
                    {badge.tier}
                  </div>
                )}
             </div>
             
             {/* Tooltip-like Caption */}
             <div className="mt-2 text-center opacity-70 group-hover:opacity-100 transition-opacity">
               <span className="block text-[10px] font-semibold whitespace-nowrap">{badge.name}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contribution Graph Component
const ContributionGraph: React.FC = () => {
  const [contributionData, setContributionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/kl0l69?y=last');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        if (data && data.contributions) {
           const days = data.contributions.slice(-364); 
           setContributionData(days);
        }
      } catch (error) {
        console.warn("Could not fetch GitHub data, using fallback simulation.");
        const today = new Date();
        const days = [];
        for (let i = 364; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          let level = 0;
          if (Math.random() > (isWeekend ? 0.8 : 0.4)) {
             level = Math.floor(Math.random() * 4) + 1;
          }
          days.push({ date: d.toISOString().split('T')[0], level });
        }
        setContributionData(days);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const weeks = [];
  if (contributionData.length > 0) {
    for (let i = 0; i < contributionData.length; i += 7) {
      weeks.push(contributionData.slice(i, i + 7));
    }
  }

  const getLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-[#9be9a8] dark:bg-[#0e4429]';
      case 2: return 'bg-[#40c463] dark:bg-[#006d32]';
      case 3: return 'bg-[#30a14e] dark:bg-[#26a641]';
      case 4: return 'bg-[#216e39] dark:bg-[#39d353]';
      default: return 'bg-github-light-subtle dark:bg-[#161b22]';
    }
  };

  return (
    <div className="border border-github-light-border dark:border-github-dark-border rounded-md p-4 bg-github-light-bg/80 dark:bg-github-dark-bg/80 backdrop-blur-sm shadow-sm w-full transition-all hover:shadow-md hover:border-github-light-muted dark:hover:border-github-dark-muted">
      <h3 className="text-sm font-semibold mb-2">Contribution Activity (Last Year)</h3>
      
      {loading ? (
        <div className="h-32 flex items-center justify-center text-xs text-github-light-muted dark:text-github-dark-muted">
           Loading contributions...
        </div>
      ) : (
        <div className="overflow-x-auto pb-2 scrollbar-hide w-full">
          <div className="flex gap-[2px] md:gap-[3px] min-w-max">
            {weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-[2px] md:gap-[3px]">
                {week.map((day: any, dIndex: number) => (
                  <div 
                    key={dIndex} 
                    className={`w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-[1px] md:rounded-[2px] ${getLevelColor(day.level)} hover:scale-125 transition-transform duration-150`} 
                    title={`${day.date}: ${day.level > 0 ? 'Contributions' : 'No contributions'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-3 text-xs text-github-light-muted dark:text-github-dark-muted">
          <span>{loading ? '...' : `${contributionData.filter(d => d.level > 0).length * 4 + 120} contributions`}</span>
          <div className="hidden sm:flex items-center gap-1">
            <span>Less</span>
            <div className="w-[10px] h-[10px] bg-github-light-subtle dark:bg-[#161b22] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#9be9a8] dark:bg-[#0e4429] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#40c463] dark:bg-[#006d32] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#30a14e] dark:bg-[#26a641] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#216e39] dark:bg-[#39d353] rounded-[2px]"></div>
            <span>More</span>
          </div>
      </div>
    </div>
  );
};

// Hero Section
export const Hero: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Sidebar / Profile Info */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start space-y-4 md:sticky md:top-24 h-fit">
            
            {/* Animated Character / Avatar Area */}
            <FadeIn className="w-full flex justify-center md:justify-start">
              <div 
                className="relative group mb-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setIsContactOpen(true)}
              >
                 <InteractiveAvatar />
              </div>
            </FadeIn>
            
            <FadeIn delay={100} className="w-full">
              <div className="text-center md:text-left space-y-1 w-full relative z-20">
                <h1 className="text-2xl md:text-3xl font-bold text-github-light-text dark:text-github-dark-text tracking-tight">
                  Mohamed Hussein
                </h1>
                <h2 className="text-xl text-github-light-muted dark:text-github-dark-muted font-light">
                  Arsinek
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="w-full">
              <div className="text-center md:text-left text-sm text-github-light-text dark:text-github-dark-text relative z-20 w-full">
                <p className="mb-4 text-base leading-relaxed">
                  Full-Stack Developer • Graphic Designer • AI Enthusiast. Building tools for developers and designing experiences.
                </p>
                
                {/* Updated Button */}
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="w-full bg-github-light-btn dark:bg-github-dark-btn border border-github-light-btnBorder dark:border-github-dark-btnBorder rounded-md py-1.5 px-4 font-medium hover:bg-github-light-border dark:hover:bg-github-dark-border transition-all hover:scale-[1.02] active:scale-[0.98] mb-4 text-github-light-text dark:text-white"
                >
                  تواصل معي
                </button>
                
                {/* Followers Count */}
                <div className="flex items-center gap-2 justify-center md:justify-start text-github-light-muted dark:text-github-dark-muted text-sm group cursor-pointer hover:text-github-accent transition-colors">
                   <UsersIcon className="w-4 h-4" />
                   <span><b className="text-github-light-text dark:text-github-dark-text group-hover:text-github-accent">14</b> followers</span>
                   <span>·</span>
                   <span><b className="text-github-light-text dark:text-github-dark-text group-hover:text-github-accent">27</b> following</span>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} className="w-full">
              <div className="w-full pt-4 space-y-2 text-sm text-github-light-text dark:text-github-dark-text relative z-20 border-t border-github-light-border dark:border-github-dark-border mt-2">
                 <div className="flex items-center gap-2 justify-center md:justify-start pt-2 group">
                   <LocationIcon className="w-4 h-4 text-github-light-muted dark:text-github-dark-muted group-hover:text-github-accent transition-colors flex-shrink-0" />
                   <span className="truncate">Beheira Governorate, Egypt</span>
                 </div>
                 <div className="flex items-center gap-2 justify-center md:justify-start group">
                   <MailIcon className="w-4 h-4 text-github-light-muted dark:text-github-dark-muted group-hover:text-github-accent transition-colors flex-shrink-0" />
                   <a href="mailto:ayrn194@gmail.com" className="hover:text-github-accent truncate">ayrn194@gmail.com</a>
                 </div>
                 <div className="flex items-center gap-2 justify-center md:justify-start group">
                   <GitHubIcon className="w-4 h-4 text-github-light-muted dark:text-github-dark-muted group-hover:text-github-accent transition-colors flex-shrink-0" />
                   <a href="https://github.com/kl0l69" className="hover:text-github-accent truncate">@kl0l69</a>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6 relative z-20 min-w-0">
            
            {/* Achievements Row (Full Width) */}
            <FadeIn delay={150}>
               <GithubAchievements />
            </FadeIn>

            {/* Real Contribution Graph */}
            <FadeIn delay={250}>
               <ContributionGraph />
            </FadeIn>

            {/* Projects Grid */}
            <FadeIn delay={350}>
              <div id="projects" className="pt-2">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-base font-semibold">Repositories</h3>
                   <a href="https://github.com/kl0l69?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-xs text-github-light-muted dark:text-github-dark-muted hover:text-github-accent">View all</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {PROJECTS.map((project, idx) => (
                     // Use wrapper div for staggered delay
                     <FadeIn key={project.id} delay={idx * 50} className="h-full">
                        <ProjectCard project={project} />
                     </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
    </>
  );
};

// Skills Section
export const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-12 border-t border-github-light-border dark:border-github-dark-border bg-github-light-subtle/50 dark:bg-github-dark-subtle/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Tech Stack & Skills</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <FadeIn key={cat} delay={idx * 100} className="h-full">
              <div className="bg-github-light-bg/80 dark:bg-github-dark-bg/80 border border-github-light-border dark:border-github-dark-border rounded-md p-4 shadow-sm backdrop-blur-sm h-full hover:border-github-accent hover:shadow-[0_4px_20px_rgba(47,129,247,0.1)] transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-semibold mb-3 border-b border-github-light-border dark:border-github-dark-border pb-2 text-sm uppercase tracking-wider min-h-[3rem] flex items-center text-github-accent">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.filter(s => s.category === cat).map(skill => (
                    <span 
                      key={skill.name} 
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-transparent hover:border-blue-500 hover:scale-105 transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Code Snippets Section
export const Snippets: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const snippets = [
    {
      id: 'python-love',
      title: 'Python Love',
      lang: 'python',
      filename: 'love.py',
      code: `
import time

def my_heart():
    feelings = ["Passion", "Care", "Adoration"]
    target = "You"
    
    while True:
        for emotion in feelings:
            print(f"I feel {emotion} for {target}")
            time.sleep(1)
        print("I Love You <3")

if __name__ == "__main__":
    my_heart()
`
    },
    {
      id: 'ts-promise',
      title: 'TS Promise',
      lang: 'typescript',
      filename: 'feelings.ts',
      code: `
interface Feelings {
  love: boolean;
  forever: boolean;
  intensity: number;
}

const confession = async (name: string): Promise<string> => {
  const myStatus: Feelings = {
    love: true,
    forever: true,
    intensity: Infinity
  };

  return new Promise((resolve) => {
    if (myStatus.love) {
      resolve(\`I Love You, \${name}\`);
    }
  });
};

confession("You").then(console.log);
`
    },
    {
      id: 'cpp-endgame',
      title: 'C++ 3000',
      lang: 'cpp',
      filename: 'endgame.cpp',
      code: `
#include <iostream>

using namespace std;

int main() {
    // Avengers Endgame Reference
    int love_level = 3000;
    
    cout << "I Love You " << love_level << endl;
    
    return 0;
}
`
    }
  ];

  return (
    <section id="snippets" className="py-16 border-t border-github-light-border dark:border-github-dark-border bg-github-light-bg dark:bg-github-dark-bg relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Code Snippets</h2>
              <p className="text-github-light-muted dark:text-github-dark-muted">
                How programmers express feelings across different languages.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <FadeIn delay={100} className="w-full lg:w-1/4">
             <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0">
               {snippets.map((snippet, idx) => (
                 <button
                   key={snippet.id}
                   onClick={() => setActiveTab(idx)}
                   className={`px-4 py-3 text-left rounded-md text-sm font-medium transition-all whitespace-nowrap flex items-center gap-3 ${
                     activeTab === idx 
                       ? 'bg-github-accent text-white shadow-md' 
                       : 'bg-github-light-subtle dark:bg-github-dark-subtle hover:bg-gray-200 dark:hover:bg-[#21262d] text-github-light-text dark:text-github-dark-text'
                   }`}
                 >
                   <span className="font-mono opacity-70">0{idx + 1}</span>
                   <span>{snippet.title}</span>
                 </button>
               ))}
             </div>
          </FadeIn>

          {/* Code Area */}
          <FadeIn delay={200} className="w-full lg:w-3/4">
             <div className="h-full">
               <CodeBlock 
                  code={snippets[activeTab].code} 
                  language={snippets[activeTab].lang}
                  filename={snippets[activeTab].filename}
               />
             </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// Contact Section
export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 border-t border-github-light-border dark:border-github-dark-border bg-github-light-subtle/50 dark:bg-github-dark-subtle/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-20">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-github-light-muted dark:text-github-dark-muted mb-10">
            Have a question or want to work together? 
          </p>
        </FadeIn>

        {/* Minimalist Icon Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
          {SOCIAL_LINKS.map((link, idx) => {
            const IconComponent = link.icon;
            return (
              <FadeIn key={link.name} delay={idx * 50} className="inline-block">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex items-center justify-center p-3 rounded-full bg-github-light-bg/80 dark:bg-github-dark-bg/80 border border-github-light-border dark:border-github-dark-border shadow-sm hover:border-github-accent dark:hover:border-github-accent hover:text-github-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(47,129,247,0.3)] dark:hover:shadow-[0_0_15px_rgba(47,129,247,0.5)] transform hover:-translate-y-2 hover:scale-110"
                >
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                  <span className="sr-only">{link.name}</span>
                  {/* Minimal tooltip */}
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-github-dark-bg text-white dark:bg-white dark:text-github-dark-bg text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg translate-y-2 group-hover:translate-y-0">
                    {link.name}
                  </span>
                </a>
              </FadeIn>
            );
          })}
        </div>

        {/* Contact Form */}
        <FadeIn delay={200}>
          <div className="bg-github-light-bg/80 dark:bg-github-dark-bg/80 border border-github-light-border dark:border-github-dark-border rounded-lg p-6 md:p-8 text-left shadow-sm backdrop-blur-sm transition-all hover:shadow-lg hover:border-github-light-muted dark:hover:border-github-dark-muted">
            <form className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="group">
                   <label className="block text-sm font-semibold mb-1 group-focus-within:text-github-accent transition-colors">Name</label>
                   <input type="text" className="w-full bg-github-light-subtle dark:bg-[#0d1117] border border-github-light-border dark:border-github-dark-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-github-accent focus:border-transparent outline-none transition-all" placeholder="Your name" />
                 </div>
                 <div className="group">
                   <label className="block text-sm font-semibold mb-1 group-focus-within:text-github-accent transition-colors">Email</label>
                   <input type="email" className="w-full bg-github-light-subtle dark:bg-[#0d1117] border border-github-light-border dark:border-github-dark-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-github-accent focus:border-transparent outline-none transition-all" placeholder="contact@example.com" />
                 </div>
               </div>
               <div className="group">
                 <label className="block text-sm font-semibold mb-1 group-focus-within:text-github-accent transition-colors">Message</label>
                 <textarea rows={4} className="w-full bg-github-light-subtle dark:bg-[#0d1117] border border-github-light-border dark:border-github-dark-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-github-accent focus:border-transparent outline-none transition-all" placeholder="Leave a comment"></textarea>
               </div>
               <div className="flex justify-end">
                 <button type="submit" className="bg-[#238636] text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-[#2ea043] transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
                   Send Message
                 </button>
               </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
