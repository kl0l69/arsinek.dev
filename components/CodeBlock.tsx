import React, { useEffect, useRef } from 'react';

// Declare Prism global to avoid TS errors since we load it via CDN
declare const Prism: any;

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof Prism !== 'undefined' && codeRef.current) {
      // Small timeout to ensure Prism is loaded if it's async, though script tags are usually blocking or ready by render
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="rounded-lg overflow-hidden bg-[#1e1e1e] text-[#d4d4d4] border border-github-light-border dark:border-github-dark-border shadow-lg font-mono text-sm transition-all hover:shadow-xl group">
      {filename && (
        <div className="bg-[#252526] px-4 py-3 flex items-center justify-between border-b border-[#333]">
           <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="ml-3 text-xs text-gray-400 font-sans">{filename}</span>
           </div>
           <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {language.toUpperCase()}
           </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="!m-0 !p-0 !bg-transparent" style={{ margin: 0 }}>
          <code ref={codeRef} className={`language-${language} !bg-transparent !text-[13px] leading-relaxed`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};