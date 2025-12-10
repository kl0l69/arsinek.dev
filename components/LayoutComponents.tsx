
import React, { useState, useEffect } from 'react';
import { LogoIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon, GitHubIcon } from './Icons';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Overview', 'Projects', 'Skills', 'Snippets', 'Contact'];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-github-light-bg/80 dark:bg-github-dark-bg/80 backdrop-blur-md border-b border-github-light-border dark:border-github-dark-border' 
        : 'bg-github-light-bg dark:bg-github-dark-bg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 group" aria-label="Home">
              <div className="bg-github-dark-bg text-white dark:bg-white dark:text-github-dark-bg p-1.5 rounded-full transition-transform group-hover:scale-110 shadow-sm border border-transparent group-hover:border-github-accent">
                <LogoIcon className="w-6 h-6" />
              </div>
              <span className="font-mono font-bold text-xl tracking-tighter text-github-light-text dark:text-github-dark-text group-hover:text-github-accent transition-colors">A.DEV</span>
            </button>
            
            <nav className="hidden md:flex ml-8 space-x-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-github-light-subtle dark:hover:bg-github-dark-subtle transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center relative">
               <input 
                 type="text" 
                 placeholder="Search or jump to..." 
                 className="bg-github-light-subtle dark:bg-github-dark-subtle border border-github-light-border dark:border-github-dark-border rounded-md px-3 py-1 text-sm w-48 focus:w-64 transition-all focus:outline-none focus:ring-2 focus:ring-github-accent focus:border-transparent text-github-light-text dark:text-github-dark-text placeholder-gray-500"
               />
               <span className="absolute right-2 text-xs text-gray-400 border border-gray-600 rounded px-1 hidden lg:block">/</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-github-light-subtle dark:hover:bg-github-dark-subtle transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-github-light-text" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md hover:bg-github-light-subtle dark:hover:bg-github-dark-subtle"
            >
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-github-light-border dark:border-github-dark-border bg-github-light-bg dark:bg-github-dark-bg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-github-light-subtle dark:hover:bg-github-dark-subtle"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-github-light-border dark:border-github-dark-border mt-16 py-8 px-4 bg-github-light-subtle dark:bg-github-dark-subtle">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-github-light-muted dark:text-github-dark-muted">
        <div className="flex items-center gap-2">
          <GitHubIcon className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          <span>© {new Date().getFullYear()} Arsinek Portfolio</span>
        </div>
        <div className="flex gap-4">
            <a href="#" className="hover:text-github-accent">Privacy</a>
            <a href="#" className="hover:text-github-accent">Security</a>
            <a href="#" className="hover:text-github-accent">Status</a>
            <a href="#" className="hover:text-github-accent">Docs</a>
            <a href="#" className="hover:text-github-accent">Contact</a>
        </div>
      </div>
    </footer>
  );
};