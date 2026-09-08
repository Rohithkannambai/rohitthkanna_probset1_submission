import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { TING_TING_BRAND, MAYA_PROFILE } from '../data/tingTingData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOverlaySelect?: (overlay: 'about' | 'policy' | 'communityGuidelines') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOverlaySelect,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const desktopHamburgerRef = useRef<HTMLDivElement>(null);
  const mobileHamburgerRef = useRef<HTMLDivElement>(null);
  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  // Close hamburger menu & profile popover when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktopHamb = desktopHamburgerRef.current?.contains(target);
      const insideMobileHamb = mobileHamburgerRef.current?.contains(target);
      if (!insideDesktopHamb && !insideMobileHamb) {
        setIsHamburgerOpen(false);
      }

      const insideDesktopProf = desktopProfileRef.current?.contains(target);
      const insideMobileProf = mobileProfileRef.current?.contains(target);
      if (!insideDesktopProf && !insideMobileProf) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#EAE5DC] shadow-[0_1px_6px_rgba(38,30,26,0.03)]"
      >
        {/* =========================================================================
            A. DESKTOP HEADER (visible only at desktop breakpoint: hidden md:flex)
            Preserved exactly as approved
            ========================================================================= */}
        <div className="hidden md:flex h-20 w-full px-6 lg:px-12 items-center justify-between relative">
          {/* Left: Navigation & Branding */}
          <div className="flex items-center gap-4 z-10">
            <div className="relative" ref={desktopHamburgerRef}>
              <button
                id="desktop-header-menu-btn"
                aria-label="Menu"
                aria-expanded={isHamburgerOpen}
                onClick={() => setIsHamburgerOpen((prev) => !prev)}
                className="p-1 text-[#261E1A] hover:text-[#8C6D53] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                type="button"
              >
                <Menu className="w-[26px] h-[26px]" />
              </button>

              {/* Anchored Hamburger Popover Menu */}
              {isHamburgerOpen && (
                <div
                  id="desktop-hamburger-popover"
                  className="absolute top-12 left-0 w-56 rounded-xl bg-white border border-[#EAE5DC] shadow-xl z-50 py-1.5 text-sm text-[#261E1A] animate-in fade-in zoom-in-95 duration-100"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onOverlaySelect?.('about');
                      setIsHamburgerOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                  >
                    About
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOverlaySelect?.('policy');
                      setIsHamburgerOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                  >
                    Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOverlaySelect?.('communityGuidelines');
                      setIsHamburgerOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                  >
                    Community Guidelines
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                alt="Ting Ting Logo"
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-lg object-contain shadow-xs select-none"
                src={TING_TING_BRAND.logoUrl}
              />
              <span className="text-xl tracking-wide uppercase text-[#261E1A] font-bold select-none">
                {TING_TING_BRAND.name}
              </span>
            </div>
          </div>

          {/* Center: Safety Review (Optically Centered in desktop view) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-base lg:text-lg tracking-widest uppercase text-[#261E1A] font-semibold select-none">
                {TING_TING_BRAND.productName}
              </span>
            </div>
          </div>

          {/* Right: Search & User Profile */}
          <div className="flex items-center gap-6 z-10">
            {/* Desktop Search Case ID Input with small X clear button */}
            <div className="flex items-center relative">
              <Search className="w-[18px] h-[18px] absolute left-3 text-[#7A726A] pointer-events-none" />
              <input
                id="header-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-56 lg:w-64 h-10 pl-9 pr-8 bg-[#FAF9F6] border border-[#EAE5DC] text-[#261E1A] text-sm rounded-lg placeholder-[#7A726A] focus:outline-none focus:border-[#8C6D53] focus:bg-white transition-all font-mono"
                placeholder="Search Case ID"
                type="text"
              />
              {searchQuery && (
                <button
                  id="search-clear-btn"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 w-5 h-5 flex items-center justify-center rounded-full text-[#7A726A] hover:text-[#261E1A] hover:bg-[#EAE5DC] transition-colors cursor-pointer text-xs font-bold select-none"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Desktop User Profile Area (Maya Tan + Avatar) */}
            <div
              ref={desktopProfileRef}
              className="relative flex items-center gap-3 pl-2 border-l border-[#EAE5DC]"
            >
              <button
                id="desktop-header-profile-btn"
                type="button"
                aria-label={`Open ${MAYA_PROFILE.name} profile`}
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
              >
                <div className="flex flex-col text-right">
                  <span className="text-sm font-semibold text-[#261E1A] group-hover:text-[#8C6D53] transition-colors leading-tight">
                    {MAYA_PROFILE.name}
                  </span>
                  <span className="text-xs text-[#7A726A] leading-tight">
                    {MAYA_PROFILE.role}
                  </span>
                </div>
                <div className="relative flex-shrink-0">
                  <img
                    alt={`${MAYA_PROFILE.name} Profile`}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#EAE5DC] group-hover:ring-[#8C6D53] transition-all"
                    src={MAYA_PROFILE.avatarUrl}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            B. MOBILE HEADER — EXACT APPROVED STITCH SINGLE ROW (hidden on md+)
            Compact, single horizontal bar matching Stitch mobile reference
            ========================================================================= */}
        <div className="block md:hidden w-full">
          <div className="px-4 py-2 flex items-center justify-between gap-1.5 h-12">
            {/* LEFT: hamburger icon + Ting Ting logo + TING TING */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative" ref={mobileHamburgerRef}>
                <button
                  id="mobile-header-menu-btn"
                  aria-label="Menu"
                  aria-expanded={isHamburgerOpen}
                  onClick={() => setIsHamburgerOpen((prev) => !prev)}
                  className="w-7 h-7 flex items-center justify-center text-[#261E1A] hover:text-[#8C6D53] transition-colors focus:outline-none cursor-pointer"
                  type="button"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Anchored Hamburger Popover Menu for mobile */}
                {isHamburgerOpen && (
                  <div
                    id="mobile-hamburger-popover"
                    className="absolute top-9 left-0 w-52 rounded-xl bg-white border border-[#EAE5DC] shadow-xl z-50 py-1.5 text-sm text-[#261E1A] animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onOverlaySelect?.('about');
                        setIsHamburgerOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                    >
                      About
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOverlaySelect?.('policy');
                        setIsHamburgerOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                    >
                      Policy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOverlaySelect?.('communityGuidelines');
                        setIsHamburgerOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] text-[#342820] hover:text-[#261E1A] font-medium transition-colors cursor-pointer block"
                    >
                      Community Guidelines
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <img
                  alt="Ting Ting Logo"
                  referrerPolicy="no-referrer"
                  className="h-5 w-5 rounded-md object-contain shadow-xs select-none"
                  src={TING_TING_BRAND.logoUrl}
                />
                <span className="text-[13px] tracking-tight uppercase text-[#261E1A] font-bold select-none leading-none whitespace-nowrap">
                  {TING_TING_BRAND.name}
                </span>
              </div>
            </div>

            {/* CENTER: Restrained uppercase SAFETY REVIEW (non-overlapping flex-1 centered area) */}
            <div className="text-center flex-1 min-w-0 px-1">
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#261E1A] font-bold select-none block truncate leading-none">
                {TING_TING_BRAND.productName}
              </span>
            </div>

            {/* RIGHT: search icon & Maya Tan avatar only */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                id="mobile-search-toggle"
                type="button"
                aria-label="Toggle mobile search"
                className={`flex items-center justify-center w-7 h-7 rounded-full border transition-colors cursor-pointer ${
                  mobileSearchOpen
                    ? 'bg-[#261E1A] border-[#261E1A] text-white'
                    : 'bg-white border-[#EAE5DC] text-[#7A726A] hover:text-[#261E1A]'
                }`}
                onClick={() => setMobileSearchOpen((prev) => !prev)}
              >
                {mobileSearchOpen ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
              </button>

              <div ref={mobileProfileRef} className="relative flex items-center">
                <button
                  id="mobile-header-profile-btn"
                  type="button"
                  aria-label={`Open ${MAYA_PROFILE.name} profile`}
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="focus:outline-none cursor-pointer flex items-center"
                >
                  <img
                    alt={`${MAYA_PROFILE.name} Profile`}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-[#EAE5DC] shadow-xs"
                    src={MAYA_PROFILE.avatarUrl}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE SEARCH EXPANDED ROW (compact row below the single header row) */}
          {mobileSearchOpen && (
            <div className="px-4 py-2 border-t border-[#EAE5DC] bg-white">
              <div className="flex items-center relative w-full">
                <Search className="w-4 h-4 absolute left-2.5 text-[#7A726A] pointer-events-none" />
                <input
                  id="mobile-search-input"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full h-8 pl-8 pr-8 bg-[#FAF9F6] border border-[#EAE5DC] text-[#261E1A] text-xs rounded-lg placeholder-[#7A726A] focus:outline-none focus:border-[#8C6D53] focus:bg-white transition-all font-mono"
                  placeholder="Search Case ID"
                  type="text"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 w-4 h-4 flex items-center justify-center rounded-full text-[#7A726A] hover:text-[#261E1A] hover:bg-[#EAE5DC] transition-colors text-[10px] font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Approved Maya Tan Employee Profile Popover (Stitch Reference) */}
      {isProfileOpen && (
        <div
          id="profile-popover-overlay"
          className="fixed inset-0 z-50 bg-black/15 backdrop-blur-[2px] transition-opacity flex items-start justify-center sm:justify-end sm:px-6 lg:px-12 pt-16 sm:pt-20"
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            id="profile-popover-card"
            className="w-80 max-w-[92vw] bg-white rounded-2xl p-6 shadow-2xl border border-[#EAE5DC] text-[#261E1A] flex flex-col mt-2 sm:mt-0 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top row: Avatar + Close X button */}
            <div className="flex items-start justify-between">
              <img
                alt={MAYA_PROFILE.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#EAE5DC]"
                src={MAYA_PROFILE.avatarUrl}
              />
              <button
                id="close-profile-popover-btn"
                aria-label="Close Profile"
                onClick={() => setIsProfileOpen(false)}
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-full text-[#7A726A] hover:text-[#261E1A] hover:bg-[#FAF9F6] transition-colors focus:outline-none cursor-pointer"
              >
                <span className="text-sm font-semibold">✕</span>
              </button>
            </div>

            {/* Maya Tan Name */}
            <div className="mt-4 flex flex-col">
              <h2 className="text-lg font-bold text-[#261E1A] tracking-tight leading-tight">
                {MAYA_PROFILE.name}
              </h2>
            </div>

            {/* Exact Employee Details */}
            <div className="mt-4 pt-3 border-t border-[#EAE5DC] flex flex-col gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7A726A] font-medium block">
                  Employee ID
                </span>
                <span className="text-sm font-semibold text-[#261E1A] font-mono tracking-wide block mt-0.5">
                  {MAYA_PROFILE.employeeId}
                </span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7A726A] font-medium block">
                  Role
                </span>
                <span className="text-sm font-semibold text-[#261E1A] block mt-0.5">
                  {MAYA_PROFILE.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
