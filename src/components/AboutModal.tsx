import React, { useEffect, useRef } from 'react';
import { ABOUT_TING_TING } from '../data/tingTingData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset scroll to top when opening
  useEffect(() => {
    if (isOpen && contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="about-ting-ting-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-ting-ting-modal-title"
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      {/* Modal Container */}
      <div
        id="about-ting-ting-modal"
        className="w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-[#FAF9F6] rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* =========================================================================
            TOP CLOSE BAR (Universal across Desktop and Mobile)
            ========================================================================= */}
        <div
          id="about-ting-ting-top-bar"
          className="px-5 py-3.5 border-b border-[#EAE5DC] bg-[#FAF9F6] flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <span
              id="about-ting-ting-modal-title"
              className="text-xs font-bold tracking-widest text-[#7A726A] uppercase"
            >
              {ABOUT_TING_TING.modalTitle}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C7B5A0]"></span>
            <span className="hidden sm:inline-block text-xs font-medium text-[#7A726A]">
              {ABOUT_TING_TING.modalSubtitle}
            </span>
          </div>

          <button
            id="close-about-overlay-btn"
            type="button"
            onClick={onClose}
            aria-label="Close About Ting Ting"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A726A] hover:text-[#261E1A] hover:bg-[#EAE5DC]/60 active:bg-[#EAE5DC] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="text-lg font-bold leading-none">✕</span>
          </button>
        </div>

        {/* =========================================================================
            INTERNAL SCROLLABLE CONTENT
            ========================================================================= */}
        <div
          id="about-ting-ting-scroll-content"
          ref={contentScrollRef}
          className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-10 lg:px-14 py-8 sm:py-12 space-y-12 sm:space-y-16"
        >
          {/* =====================================================================
              1. BRAND HERO & 5. FOUNDER
              ===================================================================== */}
          {/* Desktop Layout (md+) */}
          <section
            id="brand-hero-desktop"
            className="hidden md:flex items-center justify-between gap-10 lg:gap-14 border-b border-[#EAE5DC] pb-12 lg:pb-16"
          >
            {/* Left: Brand Hero Text */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-[#8C6D53] uppercase">
                  {ABOUT_TING_TING.heroLabel}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#261E1A] tracking-tight leading-tight">
                  {ABOUT_TING_TING.brandName}
                </h1>
              </div>

              <div className="flex flex-col space-y-1.5 text-xl lg:text-2xl text-[#4A3B31] font-normal leading-snug">
                {ABOUT_TING_TING.taglineLines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>

            {/* Right: Founder Card */}
            <div
              id="desktop-founder-card"
              className="shrink-0 flex flex-col items-center bg-white p-3.5 rounded-2xl border border-[#EAE5DC] shadow-xs w-64 lg:w-72"
            >
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#EAE5DC]">
                <img
                  src={ABOUT_TING_TING.founder.imageUrl}
                  alt={ABOUT_TING_TING.founder.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-3.5 pb-1 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#261E1A] tracking-tight">
                  {ABOUT_TING_TING.founder.name}
                </span>
                <span className="text-xs text-[#7A726A] font-medium mt-0.5">
                  {ABOUT_TING_TING.founder.role}
                </span>
              </div>
            </div>
          </section>

          {/* Mobile Layout (< md) - Strictly following Mobile Content Order */}
          <section
            id="brand-hero-mobile"
            className="flex md:hidden flex-col items-center text-center gap-6 border-b border-[#EAE5DC] pb-10"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-[#8C6D53] uppercase">
                {ABOUT_TING_TING.modalTitle}
              </span>
              <h1 className="text-3xl font-bold text-[#261E1A] tracking-tight">
                {ABOUT_TING_TING.brandName}
              </h1>
            </div>

            <div className="flex flex-col space-y-1 text-lg text-[#4A3B31] font-normal leading-snug">
              {ABOUT_TING_TING.taglineLines.map((line) => <p key={line}>{line}</p>)}
            </div>

            {/* Mobile Founder Image */}
            <div
              id="mobile-founder-card"
              className="flex flex-col items-center bg-white p-3 rounded-2xl border border-[#EAE5DC] shadow-xs w-full max-w-[260px]"
            >
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#EAE5DC]">
                <img
                  src={ABOUT_TING_TING.founder.imageUrl}
                  alt={ABOUT_TING_TING.founder.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-3 pb-1 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#261E1A]">
                  {ABOUT_TING_TING.founder.name}
                </span>
                <span className="text-xs text-[#7A726A] font-medium mt-0.5">
                  {ABOUT_TING_TING.founder.role}
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================================
              2. WHO WE ARE
              ===================================================================== */}
          <section id="about-who-we-are" className="flex flex-col gap-3.5">
            <h2 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
              WHO WE ARE
            </h2>
            <div className="max-w-3xl space-y-3">
              {ABOUT_TING_TING.whoWeAre.map((paragraph) => (
                <p key={paragraph} className="text-base sm:text-lg text-[#342820] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* =====================================================================
              3. OUR MISSION
              ===================================================================== */}
          <section id="about-our-mission" className="flex flex-col gap-3.5">
            <h2 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
              OUR MISSION
            </h2>
            <div className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs">
              <p className="font-headline text-2xl sm:text-3xl lg:text-4xl text-[#261E1A] font-normal italic leading-snug">
                &ldquo;{ABOUT_TING_TING.mission}&rdquo;
              </p>
            </div>
          </section>

          {/* =====================================================================
              4. WHAT WE BELIEVE
              ===================================================================== */}
          <section id="about-what-we-believe" className="flex flex-col gap-5">
            <h2 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
              WHAT WE BELIEVE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {ABOUT_TING_TING.principles.map((principle) => (
                <div key={principle.title} className="p-5 sm:p-6 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8C6D53]"></span>
                    <h3 className="text-sm font-bold tracking-wide uppercase text-[#261E1A]">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#4A3B31] leading-relaxed pl-4">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================================
              5. GLOBAL PRESENCE
              ===================================================================== */}
          <section id="about-global-presence" className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                GLOBAL PRESENCE
              </h2>
              <p className="text-sm text-[#4A3B31]">
                {ABOUT_TING_TING.globalPresenceIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white border border-[#EAE5DC] rounded-2xl">
              {ABOUT_TING_TING.globalPresence.map((group) => (
                <div key={group.region} className="flex flex-col gap-3">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-[#8C6D53]">
                    {group.region}
                  </h3>
                  <ul className="space-y-2 text-sm text-[#342820]">
                    {group.offices.map((office) => (
                      <li key={office} className={group.headquarters === office ? 'font-semibold flex items-center gap-2' : undefined}>
                        <span>{office}</span>
                        {group.headquarters === office && (
                          <span className="text-[11px] font-medium text-[#7A726A] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#C7B5A0]/50">
                            Headquarters
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================================
              6. CLOSING BRAND LINE
              ===================================================================== */}
          <section
            id="about-closing-brand-line"
            className="pt-6 pb-4 border-t border-[#EAE5DC] flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5"
          >
            <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
              {ABOUT_TING_TING.closingEntity}
            </span>
            <p className="text-sm sm:text-base text-[#5A524A] font-medium">
              {ABOUT_TING_TING.closingLine}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
