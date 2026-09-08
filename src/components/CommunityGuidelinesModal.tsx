import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Shield, Heart, Sparkles, UserCheck } from 'lucide-react';
import { COMMUNITY_GUIDELINE_CATEGORIES, COMMUNITY_RESPONSE_TREATMENTS, COMMUNITY_GUIDELINES_COPY } from '../data/tingTingData';

interface CommunityGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const ALL_SECTION_IDS = [
  'intro',
  ...COMMUNITY_GUIDELINE_CATEGORIES.map((category) => category.id),
  'response',
  'contextual-review',
  'reporting-appeals',
  'application-principles',
];

export const CommunityGuidelinesModal: React.FC<CommunityGuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeNavSection, setActiveNavSection] = useState<string>('intro');
  const [mobileSelectValue, setMobileSelectValue] = useState<string>('intro');
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);
  const programmaticScrollTimeout = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

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

  // Reset scroll to top when opened
  useEffect(() => {
    if (isOpen) {
      isProgrammaticScroll.current = false;
      setActiveNavSection('intro');
      setMobileSelectValue('intro');
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }
      if (sidebarRef.current) {
        sidebarRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Scroll spy: automatically track scroll position of the right content panel
  useEffect(() => {
    const container = contentContainerRef.current;
    if (!isOpen || !container) return;

    const updateActiveSection = () => {
      if (isProgrammaticScroll.current) return;

      const containerRect = container.getBoundingClientRect();
      // Threshold: 100px below the top of the container gives a natural, comfortable reading trigger
      const threshold = containerRect.top + 100;

      // Bottom proximity check (to activate the final section reliably when at the end of scroll)
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 50;

      if (isNearBottom) {
        const lastSection = ALL_SECTION_IDS[ALL_SECTION_IDS.length - 1];
        setActiveNavSection((prev) => (prev !== lastSection ? lastSection : prev));
        setMobileSelectValue((prev) => (prev !== lastSection ? lastSection : prev));
        return;
      }

      let activeId = ALL_SECTION_IDS[0];
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(`cg-section-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            activeId = id;
          } else {
            break;
          }
        }
      }

      setActiveNavSection((prev) => (prev !== activeId ? activeId : prev));
      setMobileSelectValue((prev) => (prev !== activeId ? activeId : prev));
    };

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateActiveSection);
    };

    // User gesture cancels programmatic scroll lock immediately so manual scrolling updates instantly
    const handleUserGesture = () => {
      if (isProgrammaticScroll.current) {
        isProgrammaticScroll.current = false;
        if (programmaticScrollTimeout.current) {
          window.clearTimeout(programmaticScrollTimeout.current);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleUserGesture, { passive: true });
    container.addEventListener('touchstart', handleUserGesture, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleUserGesture);
      container.removeEventListener('touchstart', handleUserGesture);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (programmaticScrollTimeout.current) {
        window.clearTimeout(programmaticScrollTimeout.current);
      }
    };
  }, [isOpen]);

  // Keep active sidebar item visible without unnecessary jumps
  useEffect(() => {
    if (sidebarRef.current) {
      const activeBtn = document.getElementById(`cg-nav-btn-${activeNavSection}`);
      if (activeBtn) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        if (btnRect.top < sidebarRect.top + 8 || btnRect.bottom > sidebarRect.bottom - 8) {
          activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }
  }, [activeNavSection]);

  // Scroll to designated section inside modal
  const scrollToSection = (sectionId: string) => {
    isProgrammaticScroll.current = true;
    if (programmaticScrollTimeout.current) {
      window.clearTimeout(programmaticScrollTimeout.current);
    }

    setActiveNavSection(sectionId);
    setMobileSelectValue(sectionId);

    const element = document.getElementById(`cg-section-${sectionId}`);
    if (element && contentContainerRef.current) {
      const topOffset = element.offsetTop - 24;
      contentContainerRef.current.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    }

    // Allow programmatic smooth scroll to complete before re-enabling scroll spy
    programmaticScrollTimeout.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 750);
  };

  if (!isOpen) return null;

  return (
    <div
      id="community-guidelines-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-guidelines-modal-title"
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      {/* Modal Container */}
      <div
        id="community-guidelines-modal"
        className="w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-[#FAF9F6] rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* =========================================================================
            TOP CLOSE BAR (Universal across Desktop and Mobile)
            ========================================================================= */}
        <div
          id="community-guidelines-top-bar"
          className="px-5 py-3.5 border-b border-[#EAE5DC] bg-[#FAF9F6] flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <span
              id="community-guidelines-modal-title"
              className="text-xs font-bold tracking-widest text-[#7A726A] uppercase"
            >
              COMMUNITY GUIDELINES
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C7B5A0]"></span>
            <span className="hidden sm:inline-block text-xs font-medium text-[#7A726A]">
              {COMMUNITY_GUIDELINES_COPY.standardName}
            </span>
          </div>

          <button
            id="close-community-guidelines-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Community Guidelines"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A726A] hover:text-[#261E1A] hover:bg-[#EAE5DC]/60 active:bg-[#EAE5DC] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="text-lg font-bold leading-none">✕</span>
          </button>
        </div>

        {/* =========================================================================
            MOBILE CATEGORY JUMP SELECTOR (Sticky sub-header for mobile view)
            ========================================================================= */}
        <div className="md:hidden px-4 py-2.5 bg-[#FAF7F2] border-b border-[#EAE5DC] shrink-0">
          <div className="relative">
            <select
              aria-label="Jump to guideline category"
              value={mobileSelectValue}
              onChange={(e) => scrollToSection(e.target.value)}
              className="w-full text-xs font-semibold text-[#261E1A] bg-white border border-[#EAE5DC] rounded-lg py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#8C6D53] cursor-pointer"
            >
              <option value="intro">Overview &amp; Principles</option>
              <optgroup label="Guideline Categories">
                {COMMUNITY_GUIDELINE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.number}. {c.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Enforcement &amp; Appeals">
                <option value="response">How Ting Ting May Respond</option>
                <option value="contextual-review">Contextual Review</option>
                <option value="reporting-appeals">Reporting &amp; Appeals</option>
                <option value="application-principles">How We Apply These Guidelines</option>
              </optgroup>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#7A726A]">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN BODY (Desktop 2-column sidebar + content; Mobile single-column scroll)
            ========================================================================= */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* DESKTOP LEFT NAVIGATION SIDEBAR */}
          <aside
            id="guidelines-desktop-sidebar"
            ref={sidebarRef}
            className="hidden md:flex flex-col w-72 shrink-0 border-r border-[#EAE5DC] bg-[#FAF9F6] overflow-y-auto p-4 space-y-4"
          >
            <div className="px-2 pt-1">
              <span className="text-[11px] font-bold tracking-widest text-[#8C6D53] uppercase">
                TABLE OF CONTENTS
              </span>
            </div>

            <nav className="space-y-0.5">
              <button
                id="cg-nav-btn-intro"
                type="button"
                onClick={() => scrollToSection('intro')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  activeNavSection === 'intro'
                    ? 'bg-[#EFEAE1] text-[#261E1A]'
                    : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A]'
                }`}
              >
                <span>Overview &amp; Principles</span>
                {activeNavSection === 'intro' && <Check className="w-3 h-3 text-[#8C6D53]" />}
              </button>

              <div className="pt-3 pb-1 px-3">
                <span className="text-[10px] font-bold tracking-wider text-[#9E958C] uppercase">
                  10 Standards
                </span>
              </div>

              {COMMUNITY_GUIDELINE_CATEGORIES.map((cat) => {
                const isActive = activeNavSection === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cg-nav-btn-${cat.id}`}
                    type="button"
                    onClick={() => scrollToSection(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#EFEAE1] text-[#261E1A] font-semibold'
                        : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A] font-normal'
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-[#8C6D53] font-medium mr-1.5">{cat.number}.</span>
                      {cat.title}
                    </span>
                    {isActive && <Check className="w-3 h-3 text-[#8C6D53] shrink-0 ml-1" />}
                  </button>
                );
              })}

              <div className="pt-3 pb-1 px-3">
                <span className="text-[10px] font-bold tracking-wider text-[#9E958C] uppercase">
                  Process &amp; Policies
                </span>
              </div>

              <button
                id="cg-nav-btn-response"
                type="button"
                onClick={() => scrollToSection('response')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  activeNavSection === 'response'
                    ? 'bg-[#EFEAE1] text-[#261E1A] font-semibold'
                    : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A]'
                }`}
              >
                <span className="truncate">How Ting Ting May Respond</span>
                {activeNavSection === 'response' && (
                  <Check className="w-3 h-3 text-[#8C6D53] shrink-0" />
                )}
              </button>

              <button
                id="cg-nav-btn-contextual-review"
                type="button"
                onClick={() => scrollToSection('contextual-review')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  activeNavSection === 'contextual-review'
                    ? 'bg-[#EFEAE1] text-[#261E1A] font-semibold'
                    : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A]'
                }`}
              >
                <span className="truncate">Contextual Review</span>
                {activeNavSection === 'contextual-review' && (
                  <Check className="w-3 h-3 text-[#8C6D53] shrink-0" />
                )}
              </button>

              <button
                id="cg-nav-btn-reporting-appeals"
                type="button"
                onClick={() => scrollToSection('reporting-appeals')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  activeNavSection === 'reporting-appeals'
                    ? 'bg-[#EFEAE1] text-[#261E1A] font-semibold'
                    : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A]'
                }`}
              >
                <span className="truncate">Reporting &amp; Appeals</span>
                {activeNavSection === 'reporting-appeals' && (
                  <Check className="w-3 h-3 text-[#8C6D53] shrink-0" />
                )}
              </button>

              <button
                id="cg-nav-btn-application-principles"
                type="button"
                onClick={() => scrollToSection('application-principles')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  activeNavSection === 'application-principles'
                    ? 'bg-[#EFEAE1] text-[#261E1A] font-semibold'
                    : 'text-[#5A524A] hover:bg-[#F2ECE3] hover:text-[#261E1A]'
                }`}
              >
                <span className="truncate">How We Apply These Guidelines</span>
                {activeNavSection === 'application-principles' && (
                  <Check className="w-3 h-3 text-[#8C6D53] shrink-0" />
                )}
              </button>
            </nav>
          </aside>

          {/* SCROLLABLE GUIDELINES CONTENT PANE */}
          <main
            id="guidelines-content-pane"
            ref={contentContainerRef}
            className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-10 lg:px-14 py-8 sm:py-12 space-y-12 sm:space-y-16"
          >
            {/* =====================================================================
                SECTION: HERO & INTRODUCTION
                ===================================================================== */}
            <section id="cg-section-intro" className="space-y-8 border-b border-[#EAE5DC] pb-10">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#8C6D53] uppercase">
                  {COMMUNITY_GUIDELINES_COPY.heroEyebrow}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#261E1A] tracking-tight leading-tight">
                  {COMMUNITY_GUIDELINES_COPY.heroTitleLine1}
                  <br />
                  {COMMUNITY_GUIDELINES_COPY.heroTitleLine2}
                </h1>
                <p className="text-base sm:text-lg text-[#4A3B31] leading-relaxed max-w-3xl pt-2">
                  {COMMUNITY_GUIDELINES_COPY.intro}
                </p>
              </div>

              {/* Context Matters Callout */}
              <div className="p-6 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8C6D53]"></span>
                  <h3 className="text-sm font-bold tracking-wide uppercase text-[#261E1A]">
                    Context matters.
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#342820] leading-relaxed pl-4">
                  {COMMUNITY_GUIDELINES_COPY.contextMatters}
                </p>
              </div>

              {/* 4 Community Principles */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                  OUR COMMUNITY PRINCIPLES
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* SAFETY */}
                  <div className="p-5 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EAE5DC] flex items-center justify-center text-[#8C6D53]">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                        {COMMUNITY_GUIDELINES_COPY.principles[0].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {COMMUNITY_GUIDELINES_COPY.principles[0].description}
                    </p>
                  </div>

                  {/* RESPECT */}
                  <div className="p-5 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EAE5DC] flex items-center justify-center text-[#8C6D53]">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                        {COMMUNITY_GUIDELINES_COPY.principles[1].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {COMMUNITY_GUIDELINES_COPY.principles[1].description}
                    </p>
                  </div>

                  {/* AUTHENTICITY */}
                  <div className="p-5 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EAE5DC] flex items-center justify-center text-[#8C6D53]">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                        {COMMUNITY_GUIDELINES_COPY.principles[2].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {COMMUNITY_GUIDELINES_COPY.principles[2].description}
                    </p>
                  </div>

                  {/* AGE-APPROPRIATE PARTICIPATION */}
                  <div className="p-5 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EAE5DC] flex items-center justify-center text-[#8C6D53]">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                        {COMMUNITY_GUIDELINES_COPY.principles[3].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {COMMUNITY_GUIDELINES_COPY.principles[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION: 10 GUIDELINE CATEGORIES
                ===================================================================== */}
            <div className="space-y-12">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                  STANDARDS BY CATEGORY
                </span>
                <p className="text-sm text-[#5A524A]">
                  {COMMUNITY_GUIDELINES_COPY.standardsIntro}
                </p>
              </div>

              {COMMUNITY_GUIDELINE_CATEGORIES.map((cat) => (
                <section
                  key={cat.id}
                  id={`cg-section-${cat.id}`}
                  className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-6"
                >
                  <div className="flex items-baseline gap-3 border-b border-[#EAE5DC] pb-4">
                    <span className="text-base font-bold text-[#8C6D53] tracking-wider">
                      {String(cat.number).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#261E1A] tracking-tight">
                      {cat.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-[#342820] leading-relaxed">
                    {cat.summary}
                  </p>

                  {/* What is not permitted */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold tracking-wider text-[#7A726A] uppercase">
                      What is not permitted:
                    </span>
                    <ul className="space-y-2">
                      {cat.prohibited.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-[#4A3B31] flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0 mt-1.5"></span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contextual Nuance / Exceptions */}
                  <div className="p-4 bg-[#FAF7F2] border border-[#EAE5DC] rounded-xl space-y-1.5">
                    <span className="text-xs font-bold tracking-wide text-[#8C6D53] uppercase block">
                      Contextual considerations &amp; exceptions:
                    </span>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {cat.exceptions}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            {/* =====================================================================
                SECTION: HOW TING TING MAY RESPOND
                ===================================================================== */}
            <section
              id="cg-section-response"
              className="space-y-6 border-t border-[#EAE5DC] pt-10"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                  ENFORCEMENT ACTIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#261E1A] tracking-tight">
                  {COMMUNITY_GUIDELINES_COPY.responseTitle}
                </h2>
                <p className="text-sm sm:text-base text-[#4A3B31] leading-relaxed">
                  {COMMUNITY_GUIDELINES_COPY.responseIntro}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMMUNITY_RESPONSE_TREATMENTS.map((treatment) => (
                  <div
                    key={treatment.name}
                    className="p-5 bg-white border border-[#EAE5DC] rounded-xl flex flex-col gap-2.5 shadow-xs"
                  >
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider border ${treatment.badgeClass}`}
                      >
                        {treatment.name}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================================================
                SECTION: CONTEXTUAL REVIEW
                ===================================================================== */}
            <section
              id="cg-section-contextual-review"
              className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-6"
            >
              <div className="space-y-1.5 border-b border-[#EAE5DC] pb-4">
                <span className="text-xs font-bold tracking-widest text-[#8C6D53] uppercase">
                  DECISION FRAMEWORK
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#261E1A] tracking-tight">
                  CONTEXTUAL REVIEW
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#342820] leading-relaxed">
                {COMMUNITY_GUIDELINES_COPY.contextualReviewIntro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMUNITY_GUIDELINES_COPY.contextualReviewFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FAF7F2] border border-[#EAE5DC] rounded-xl flex flex-col gap-1"
                  >
                    <span className="text-xs font-bold text-[#261E1A]">
                      {idx + 1}. {factor.title}
                    </span>
                    <span className="text-xs text-[#5A524A] leading-relaxed">
                      {factor.desc}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================================================
                SECTION: REPORTING CONTENT & APPEALS
                ===================================================================== */}
            <section
              id="cg-section-reporting-appeals"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* REPORTING CONTENT */}
              <div className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                  COMMUNITY PARTICIPATION
                </span>
                <h3 className="text-xl font-bold text-[#261E1A] tracking-tight">
                  REPORTING CONTENT
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                  {COMMUNITY_GUIDELINES_COPY.reporting.body}
                </p>
                <p className="text-xs text-[#7A726A] leading-relaxed">
                  {COMMUNITY_GUIDELINES_COPY.reporting.note}
                </p>
              </div>

              {/* APPEALS */}
              <div className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                  CREATOR RIGHTS
                </span>
                <h3 className="text-xl font-bold text-[#261E1A] tracking-tight">
                  APPEALS
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                  {COMMUNITY_GUIDELINES_COPY.appeals.body}
                </p>
                <p className="text-xs text-[#7A726A] leading-relaxed">
                  {COMMUNITY_GUIDELINES_COPY.appeals.note}
                </p>
              </div>
            </section>

            {/* =====================================================================
                SECTION: HOW WE APPLY THESE GUIDELINES
                ===================================================================== */}
            <section
              id="cg-section-application-principles"
              className="p-6 sm:p-8 bg-white border border-[#EAE5DC] rounded-2xl shadow-xs space-y-6"
            >
              <div className="space-y-1.5 border-b border-[#EAE5DC] pb-4">
                <span className="text-xs font-bold tracking-widest text-[#8C6D53] uppercase">
                  OPERATIONAL COMMITMENTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#261E1A] tracking-tight">
                  HOW WE APPLY THESE GUIDELINES
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[0].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[0].description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[1].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[1].description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[2].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[2].description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#261E1A] uppercase tracking-wide">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[3].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A3B31] leading-relaxed">
                    {COMMUNITY_GUIDELINES_COPY.applicationPrinciples[3].description}
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION: FRAMEWORK INFORMATION
                ===================================================================== */}
            <section
              id="cg-section-framework-info"
              className="pt-6 pb-4 border-t border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#7A726A]"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-[#261E1A] uppercase tracking-wider block">
                  {COMMUNITY_GUIDELINES_COPY.framework.name}
                </span>
                <span>Framework version: {COMMUNITY_GUIDELINES_COPY.framework.version}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Status: {COMMUNITY_GUIDELINES_COPY.framework.status}
                </span>
                <span>Last updated: {COMMUNITY_GUIDELINES_COPY.framework.lastUpdated}</span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
