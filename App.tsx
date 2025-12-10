
import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/LayoutComponents';
import { Hero, Skills, Contact, Snippets } from './components/Sections';
import BackgroundAnimation from './components/BackgroundAnimation';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <BackgroundAnimation />
      <div className="z-10 flex flex-col min-h-screen">
        <Header toggleTheme={toggleTheme} isDark={isDark} />
        
        <main className="flex-grow">
          <Hero />
          <Skills />
          <Snippets />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;