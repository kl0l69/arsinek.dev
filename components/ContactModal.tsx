import React from 'react';
import InteractiveAvatar from './InteractiveAvatar';
import { SOCIAL_LINKS } from '../constants';
import { CloseIcon } from './Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-github-light-bg/60 dark:bg-black/60 backdrop-blur-xl transition-all duration-500"
        onClick={onClose}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-github-light-subtle dark:bg-github-dark-btn text-github-light-text dark:text-white hover:scale-110 transition-transform z-[110]"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      {/* Content Container */}
      <div className="relative z-[105] flex flex-col items-center justify-center animate-fade-in">
        
        {/* The Robot & The Ring */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
          
          {/* Central Avatar */}
          <div className="relative z-20 scale-125">
             <InteractiveAvatar />
          </div>

          {/* Holographic Ring (The "Tray" or Field) */}
          <div className="absolute inset-0 rounded-full border border-github-accent/30 shadow-[0_0_50px_rgba(47,129,247,0.2)] animate-spin-slow pointer-events-none z-10" />
          <div className="absolute inset-4 rounded-full border border-dashed border-github-accent/20 animate-spin-slow pointer-events-none z-10" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />

          {/* Social Icons Orbiting */}
          {SOCIAL_LINKS.map((link, index) => {
            const total = SOCIAL_LINKS.length;
            const angle = (index / total) * 2 * Math.PI; // Calculate angle in radians
            const radius = 160; // Distance from center (md)
            // Using CSS variables to position them circularly
            const style = {
              transform: `rotate(${index * (360 / total)}deg) translate(${140}px) rotate(-${index * (360 / total)}deg)`,
            } as React.CSSProperties;

            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-github-light-bg dark:bg-github-dark-bg border border-github-accent text-github-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(47,129,247,0.4)] hover:scale-125 hover:bg-github-accent hover:text-white hover:shadow-[0_0_25px_rgba(47,129,247,0.8)] transition-all duration-300 z-30"
                style={style}
                title={link.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        <h2 className="mt-8 text-2xl md:text-3xl font-bold text-github-light-text dark:text-white tracking-tight drop-shadow-lg">
          Connect with Arsinek
        </h2>
        <p className="mt-2 text-github-light-muted dark:text-gray-400">
          Select a platform to start a conversation
        </p>

      </div>
    </div>
  );
};

export default ContactModal;
