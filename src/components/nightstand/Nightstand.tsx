import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const Nightstand = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [thought, setThought] = useState('');
  
  const isSubmitted = searchParams.get('state') === 'rested';

  const handleRest = () => {
    if (thought.trim()) {
      setSearchParams({ state: 'rested' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRest();
    }
  };

  return (
    <div 
      className="w-full bg-midnight text-slate-300 min-h-screen flex flex-col font-serif antialiased overflow-hidden relative selection:bg-white/10 selection:text-slate-200"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center opacity-30 hover:opacity-80 transition-opacity duration-700">
        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="material-symbols-outlined text-sm font-light text-slate-500 group-hover:text-slate-300 transition-colors">nightlight</span>
          <span className="text-xs font-inter tracking-[0.15em] uppercase text-slate-500 group-hover:text-slate-300 transition-colors">Nightstand</span>
        </div>
        <div className="cursor-pointer group">
          <span className="material-symbols-outlined text-xl font-light text-slate-500 group-hover:text-slate-300 transition-colors">history</span>
        </div>
      </header>

        {!isSubmitted ? (
          <main
            key="input-state"
            className="relative flex flex-col w-full h-screen"
          >
            {/* Top Section */}
            <section className="relative z-10 flex-1 flex flex-col items-center justify-end pb-16 w-full bg-midnight" style={{ backgroundColor: '#05070A' }}>
              <div className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-200 tracking-tight leading-tight"
                >
                  What is keeping you awake?
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[1px] bg-slate-700/30 mx-auto my-4"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-slate-500 text-sm font-serif italic tracking-wide"
                >
                  A quiet place for heavy thoughts.
                </motion.p>
              </div>
            </section>

            {/* Gradient Separator */}
            <div className="w-full h-32 -my-16 z-20 pointer-events-none bg-gradient-to-b from-midnight via-midnight/95 to-transparent"></div>

            {/* Bottom Section (Input) */}
            <section className="relative z-30 flex-[1.4] w-full bg-gradient-to-b from-[#0a0d12] to-charcoal flex flex-col items-center pt-12">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-slate-800/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="w-full max-w-4xl px-8 md:px-16 h-full pb-20 relative flex flex-col items-center">
                <textarea
                  autoFocus
                  data-testid="thought-input"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full text-3xl md:text-4xl lg:text-5xl font-serif italic font-light text-slate-300 placeholder:text-slate-600 resize-none text-center leading-relaxed caret-slate-600 focus:outline-none bg-transparent scrollbar-hide"
                  placeholder="Type your burden here..."
                  spellCheck={false}
                />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-charcoal to-transparent pointer-events-none"></div>
              </div>

              <div 
                data-testid="rest-button"
                className="absolute bottom-10 text-center w-full opacity-30 hover:opacity-60 transition-opacity duration-500 cursor-pointer" 
                onClick={handleRest}
              >
                <div className="text-[11px] font-serif italic tracking-widest text-slate-500">
                  Press <span className="not-italic font-medium text-slate-400">Enter</span> to rest
                </div>
              </div>
            </section>
          </main>
        ) : (
          <div
            key="success-state"
            data-testid="success-message"
            className="absolute inset-0 flex items-center justify-center bg-midnight z-50"
            style={{ backgroundColor: '#05070A' }}
          >
             <div className="text-center space-y-6">
                <motion.div
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 2, delay: 0.5 }}
                   className="w-16 h-[1px] bg-slate-800 mx-auto"
                />
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ duration: 2, delay: 1 }}
                  className="text-slate-500 font-serif italic text-lg"
                >
                  Your thought is secure. Rest now.
                </motion.p>
             </div>
          </div>
        )}

      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-[60] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
    </div>
  );
};

export default Nightstand;
