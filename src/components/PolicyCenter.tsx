import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { POLICIES, resolvePolicyStandard, POLICY_FRAMEWORK_OVERVIEW, TING_TING_BRAND } from '../data/tingTingData';
import type { PolicyStandard } from '../types';

export type PolicyCenterEntryMode = 'general' | 'caseSpecific';

interface PolicyCenterProps {
  isOpen: boolean;
  entryMode?: PolicyCenterEntryMode;
  initialPolicyId?: string | null;
  initialPolicyName?: string | null;
  onClose: () => void;
}

export const PolicyCenter: React.FC<PolicyCenterProps> = ({
  isOpen,
  entryMode = 'general',
  initialPolicyId,
  initialPolicyName,
  onClose,
}) => {
  // Selected policy ID ('OVERVIEW' or specific standard code like 'PR-4.2')
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('OVERVIEW');
  // Local search query for filtering policies in the index
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Mobile dropdown state
  const [isMobileSelectorOpen, setIsMobileSelectorOpen] = useState<boolean>(false);

  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync entry state when modal opens:
  // General entry (hamburger/footer) -> opens {POLICY_FRAMEWORK_OVERVIEW.title}
  // Case-specific entry (Screen 2 "View full policy") -> opens selected case policy
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setIsMobileSelectorOpen(false);

      if (entryMode === 'caseSpecific' && (initialPolicyId || initialPolicyName)) {
        const resolved = resolvePolicyStandard(
          initialPolicyId || undefined,
          initialPolicyName || undefined
        );
        setSelectedPolicyId(resolved.id);
      } else {
        // GENERAL ENTRY: open Policy Framework Overview
        setSelectedPolicyId('OVERVIEW');
      }
    }
  }, [isOpen, entryMode, initialPolicyId, initialPolicyName]);

  // Reset scroll to top of content when selected policy changes
  useEffect(() => {
    if (rightContentRef.current) {
      rightContentRef.current.scrollTop = 0;
    }
  }, [selectedPolicyId]);

  // Close mobile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target as Node)
      ) {
        setIsMobileSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered policies based on local search (by name or ID)
  const filteredPolicies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return POLICIES;
    return POLICIES.filter(
      (p) =>
        p.id.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Current active policy object (null if OVERVIEW is selected)
  const activePolicy: PolicyStandard | null = useMemo(() => {
    if (selectedPolicyId === 'OVERVIEW') return null;
    const found = POLICIES.find((p) => p.id === selectedPolicyId);
    return found || null;
  }, [selectedPolicyId]);

  // Check if overview matches search query
  const isOverviewMatchingSearch = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      'overview'.includes(query) ||
      'framework'.includes(query) ||
      'policy framework overview'.includes(query) ||
      POLICY_FRAMEWORK_OVERVIEW.frameworkName.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="policy-center-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-center-title"
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      {/* Modal Container */}
      <div
        id="policy-center-modal"
        className="w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* =========================================================================
            TOP CLOSE HEADER (Universal across both Desktop and Mobile)
            ========================================================================= */}
        <div
          id="policy-center-top-bar"
          className="px-5 py-3.5 border-b border-[#EAE5DC] bg-[#FAF9F6] flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
              {TING_TING_BRAND.policyCenterName}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C7B5A0]"></span>
            <span className="hidden sm:inline-block text-xs font-medium text-[#7A726A]">
              {POLICY_FRAMEWORK_OVERVIEW.referenceSubtitle}
            </span>
          </div>

          <button
            id="close-policy-center-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Policy Center"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A726A] hover:text-[#261E1A] hover:bg-[#EAE5DC]/60 active:bg-[#EAE5DC] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="text-lg font-bold leading-none">✕</span>
          </button>
        </div>

        {/* =========================================================================
            DESKTOP VIEW (hidden on mobile, flex on md+)
            ========================================================================= */}
        <div className="hidden md:flex flex-1 min-h-0 overflow-hidden">
          {/* LEFT SIDEBAR: INDEX & SEARCH */}
          <aside
            id="desktop-policy-sidebar"
            aria-label="Policy Index"
            className="w-80 lg:w-88 border-r border-[#EAE5DC] bg-[#FAF9F6] flex flex-col shrink-0 min-h-0"
          >
            {/* Sidebar Branding & Version Info */}
            <div className="p-5 border-b border-[#EAE5DC] flex flex-col gap-2">
              <h2
                id="policy-center-title"
                className="text-lg font-bold text-[#261E1A] tracking-tight"
              >
                POLICY CENTER
              </h2>
              <span className="text-xs font-medium text-[#5A524A]">
                {POLICY_FRAMEWORK_OVERVIEW.frameworkName}
              </span>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-[#7A726A]">
                  {`Framework v${POLICY_FRAMEWORK_OVERVIEW.frameworkVersion}`}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1E6B37]/10 text-[#1E6B37] text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B37]"></span>
                  {POLICY_FRAMEWORK_OVERVIEW.status}
                </span>
              </div>
            </div>

            {/* Policy Index Header & Search Box */}
            <div className="p-4 pb-2 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#7A726A]">
                  POLICY INDEX
                </span>
                <span className="text-[11px] font-mono text-[#7A726A]">
                  {filteredPolicies.length} of {POLICIES.length}
                </span>
              </div>

              {/* Search Field */}
              <div className="relative">
                <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#7A726A] pointer-events-none" />
                <input
                  id="desktop-policy-search-input"
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policy name or ID..."
                  className="w-full h-9 pl-9 pr-8 text-xs bg-white border border-[#EAE5DC] rounded-xl text-[#261E1A] placeholder-[#7A726A] focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A726A] hover:text-[#261E1A] text-xs font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Policy List */}
            <nav
              id="desktop-policy-list"
              className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5"
            >
              {/* Top Overview Item */}
              {isOverviewMatchingSearch && (
                <button
                  type="button"
                  id="policy-item-overview"
                  onClick={() => setSelectedPolicyId('OVERVIEW')}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedPolicyId === 'OVERVIEW'
                      ? 'bg-[#FAF7F2] border-[#8C6D53] text-[#261E1A] ring-1 ring-[#8C6D53]/40 shadow-xs'
                      : 'bg-white hover:bg-[#FAF9F6] border-[#EAE5DC] text-[#342820]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        selectedPolicyId === 'OVERVIEW'
                          ? 'text-[#8C6D53]'
                          : 'text-[#7A726A]'
                      }`}
                    >
                      OVERVIEW
                    </span>
                    {selectedPolicyId === 'OVERVIEW' && (
                      <span className="w-2 h-2 rounded-full bg-[#8C6D53]"></span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold leading-snug ${
                      selectedPolicyId === 'OVERVIEW'
                        ? 'text-[#261E1A]'
                        : 'text-[#342820]'
                    }`}
                  >
                    Policy Framework Overview
                  </span>
                </button>
              )}

              {filteredPolicies.length === 0 && !isOverviewMatchingSearch ? (
                <div className="py-8 text-center text-xs text-[#7A726A]">
                  No policies match &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredPolicies.map((policy) => {
                  const isSelected = selectedPolicyId === policy.id;
                  return (
                    <button
                      key={policy.id}
                      type="button"
                      id={`policy-item-${policy.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => setSelectedPolicyId(policy.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'bg-[#FAF7F2] border-[#8C6D53] text-[#261E1A] ring-1 ring-[#8C6D53]/40 shadow-xs'
                          : 'bg-white hover:bg-[#FAF9F6] border-[#EAE5DC] text-[#342820]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSelected ? 'text-[#8C6D53]' : 'text-[#7A726A]'
                          }`}
                        >
                          {policy.id}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#8C6D53]"></span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold leading-snug line-clamp-1 ${
                          isSelected ? 'text-[#261E1A]' : 'text-[#342820]'
                        }`}
                      >
                        {policy.name}
                      </span>
                    </button>
                  );
                })
              )}
            </nav>
          </aside>

          {/* RIGHT SIDE: {POLICY_FRAMEWORK_OVERVIEW.title} OR SPECIFIC STANDARD */}
          <section
            id="desktop-policy-content"
            ref={rightContentRef}
            aria-label={
              activePolicy
                ? `Policy Details for ${activePolicy.name}`
                : 'Policy Framework Overview'
            }
            className="flex-1 min-h-0 overflow-y-auto p-6 lg:p-8 bg-white"
          >
            <div className="max-w-3xl flex flex-col gap-6">
              {/* =============================================================
                  VIEW 1: {POLICY_FRAMEWORK_OVERVIEW.title} (General Entry State)
                  ============================================================= */}
              {selectedPolicyId === 'OVERVIEW' || !activePolicy ? (
                <>
                  {/* Overview Header */}
                  <div className="flex flex-col gap-2 border-b border-[#EAE5DC] pb-5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-sm font-bold text-[#8C6D53] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#C7B5A0]/60">
                        OVERVIEW
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E6B37]/10 text-[#1E6B37] text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B37]"></span>
                        {POLICY_FRAMEWORK_OVERVIEW.status}
                      </span>
                      <span className="text-xs text-[#7A726A] font-medium">
                        {`Framework v${POLICY_FRAMEWORK_OVERVIEW.frameworkVersion} · ${POLICY_FRAMEWORK_OVERVIEW.frameworkName}`}
                      </span>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold text-[#261E1A] tracking-tight mt-1">
                      {POLICY_FRAMEWORK_OVERVIEW.title}
                    </h1>
                  </div>

                  {/* Purpose */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      PURPOSE
                    </h3>
                    <div className="p-4 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                      <p className="text-sm text-[#342820] leading-relaxed">
                        {POLICY_FRAMEWORK_OVERVIEW.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Review Considerations */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      REVIEW CONSIDERATIONS
                    </h3>
                    <div className="p-4 bg-white border border-[#EAE5DC] rounded-xl">
                      <ul className="space-y-2.5">
                        {POLICY_FRAMEWORK_OVERVIEW.desktopReviewConsiderations.map((item) => (
                          <li key={item.title} className="text-xs sm:text-sm text-[#342820] leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0 mt-2"></span>
                            <span><strong>{item.title}:</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safety Standards Directory */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                        ACTIVE STANDARDS ({POLICIES.length})
                      </h3>
                      <span className="text-xs text-[#7A726A]">
                        Select any standard to view detailed policy
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {POLICIES.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPolicyId(p.id)}
                          className="p-3.5 bg-[#FAF9F6] hover:bg-[#FAF7F2] border border-[#EAE5DC] hover:border-[#8C6D53] rounded-xl flex flex-col gap-1.5 text-left transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-[#8C6D53]">
                              {p.id}
                            </span>
                            <span className="text-[11px] text-[#7A726A] group-hover:text-[#261E1A] font-medium flex items-center gap-0.5">
                              View standard →
                            </span>
                          </div>
                          <span className="text-xs font-bold text-[#261E1A]">
                            {p.name}
                          </span>
                          <p className="text-[11px] text-[#5A524A] line-clamp-2 leading-relaxed">
                            {p.purpose}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: POSSIBLE TREATMENTS (Exact Stitch Terminology) */}
                  <div className="flex flex-col gap-2.5 pb-4">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      POSSIBLE TREATMENTS
                    </h3>
                    <div className="p-4 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                      <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                        {POLICY_FRAMEWORK_OVERVIEW.desktopPossibleTreatments}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* =============================================================
                   VIEW 2: SPECIFIC POLICY STANDARD (Case-Specific Entry State)
                   ============================================================= */
                <>
                  {/* Header Badge & Revision Info */}
                  <div className="flex flex-col gap-2 border-b border-[#EAE5DC] pb-5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-sm font-bold text-[#8C6D53] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#C7B5A0]/60">
                        {activePolicy.id}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E6B37]/10 text-[#1E6B37] text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B37]"></span>
                        {activePolicy.status}
                      </span>
                      <span className="text-xs text-[#7A726A] font-medium">
                        {activePolicy.revisionInfo}
                      </span>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold text-[#261E1A] tracking-tight mt-1">
                      {activePolicy.name}
                    </h1>
                  </div>

                  {/* Section 1: PURPOSE */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      PURPOSE
                    </h3>
                    <div className="p-4 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                      <p className="text-sm text-[#342820] leading-relaxed">
                        {activePolicy.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Section 2: REVIEW CONSIDERATIONS */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      REVIEW CONSIDERATIONS
                    </h3>
                    <div className="p-4 bg-white border border-[#EAE5DC] rounded-xl">
                      <ul className="space-y-2.5">
                        {activePolicy.reviewConsiderations.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-[#342820] leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0 mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 3: CONTEXTUAL CONSIDERATIONS */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      CONTEXTUAL CONSIDERATIONS
                    </h3>
                    <div className="p-4 bg-[#FAF7F2] border border-[#C7B5A0]/60 rounded-xl">
                      <ul className="space-y-2.5">
                        {activePolicy.contextualConsiderations.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-[#342820] leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#261E1A] shrink-0 mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 4: POSSIBLE TREATMENTS (Exact Stitch Terminology) */}
                  <div className="flex flex-col gap-2.5 pb-4">
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      POSSIBLE TREATMENTS
                    </h3>
                    <div className="p-4 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                      <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                        {activePolicy.enforcementGuidance}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* =========================================================================
            MOBILE VIEW (visible on < md, hidden on md+)
            Single-column layout with mobile policy selector dropdown
            ========================================================================= */}
        <div
          id="mobile-policy-content"
          className="flex md:hidden flex-1 min-h-0 overflow-y-auto flex-col bg-white"
        >
          {/* Mobile Subheader */}
          <div className="p-4 border-b border-[#EAE5DC] bg-[#FAF9F6] flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#261E1A] tracking-tight">
                POLICY CENTER
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1E6B37]/10 text-[#1E6B37] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B37]"></span>
                {POLICY_FRAMEWORK_OVERVIEW.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#7A726A]">
              <span>{POLICY_FRAMEWORK_OVERVIEW.frameworkName}</span>
              <span className="font-mono text-[11px]">{`Framework v${POLICY_FRAMEWORK_OVERVIEW.frameworkVersion}`}</span>
            </div>

            {/* Mobile Policy Selector / Dropdown */}
            <div className="relative mt-1" ref={mobileDropdownRef}>
              <button
                id="mobile-policy-selector-trigger"
                type="button"
                aria-expanded={isMobileSelectorOpen}
                onClick={() => setIsMobileSelectorOpen((prev) => !prev)}
                className="w-full h-11 px-3.5 bg-white border border-[#EAE5DC] hover:border-[#8C6D53] rounded-xl flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#261E1A] shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono font-bold text-[#8C6D53] shrink-0">
                    {selectedPolicyId === 'OVERVIEW' || !activePolicy
                      ? 'OVERVIEW'
                      : activePolicy.id}
                  </span>
                  <span className="text-[#C7B5A0]">·</span>
                  <span className="truncate">
                    {selectedPolicyId === 'OVERVIEW' || !activePolicy
                      ? 'Policy Framework Overview'
                      : activePolicy.name}
                  </span>
                </div>
                {isMobileSelectorOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#7A726A] shrink-0 ml-1" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#7A726A] shrink-0 ml-1" />
                )}
              </button>

              {/* Mobile Dropdown Popover */}
              {isMobileSelectorOpen && (
                <div
                  id="mobile-policy-selector-dropdown"
                  className="absolute left-0 right-0 top-12 mt-1 z-40 bg-white border border-[#EAE5DC] rounded-xl shadow-2xl py-2 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#7A726A] uppercase border-b border-[#EAE5DC] mb-1">
                    FRAMEWORK &amp; STANDARDS
                  </div>

                  {/* Overview Item */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPolicyId('OVERVIEW');
                      setIsMobileSelectorOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      selectedPolicyId === 'OVERVIEW'
                        ? 'bg-[#FAF7F2] text-[#261E1A] font-bold'
                        : 'text-[#342820] hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono font-bold text-[#8C6D53]">
                        OVERVIEW
                      </span>
                      <span className="truncate">Policy Framework Overview</span>
                    </div>
                    {selectedPolicyId === 'OVERVIEW' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0"></span>
                    )}
                  </button>

                  <div className="my-1 border-t border-[#EAE5DC]"></div>

                  {POLICIES.map((p) => {
                    const isSelected = p.id === selectedPolicyId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedPolicyId(p.id);
                          setIsMobileSelectorOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF7F2] text-[#261E1A] font-bold'
                            : 'text-[#342820] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono font-bold text-[#8C6D53]">
                            {p.id}
                          </span>
                          <span className="truncate">{p.name}</span>
                        </div>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Content View */}
          <div className="p-4 flex flex-col gap-5">
            {selectedPolicyId === 'OVERVIEW' || !activePolicy ? (
              /* Mobile Overview Content */
              <>
                <div className="flex flex-col gap-1.5 border-b border-[#EAE5DC] pb-4">
                  <span className="text-[11px] font-mono text-[#7A726A]">
                    {`Framework v${POLICY_FRAMEWORK_OVERVIEW.frameworkVersion} · ${POLICY_FRAMEWORK_OVERVIEW.frameworkName}`}
                  </span>
                  <h1 className="text-xl font-bold text-[#261E1A] tracking-tight">
                    {POLICY_FRAMEWORK_OVERVIEW.title}
                  </h1>
                </div>

                {/* Mobile Purpose */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    PURPOSE
                  </h3>
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                    <p className="text-xs text-[#342820] leading-relaxed">
                      {POLICY_FRAMEWORK_OVERVIEW.purpose}
                    </p>
                  </div>
                </div>

                {/* Mobile Review Considerations */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    REVIEW CONSIDERATIONS
                  </h3>
                  <div className="p-3.5 bg-white border border-[#EAE5DC] rounded-xl">
                    <ul className="space-y-2">
                      {POLICY_FRAMEWORK_OVERVIEW.mobileReviewConsiderations.map((item) => (
                        <li key={item.title} className="text-xs text-[#342820] leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0 mt-1.5"></span>
                          <span><strong>{item.title}:</strong> {item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile Standards List */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    ACTIVE STANDARDS ({POLICIES.length})
                  </h3>
                  <div className="space-y-2">
                    {POLICIES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPolicyId(p.id)}
                        className="w-full p-3 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-xs font-bold text-[#8C6D53] shrink-0">
                            {p.id}
                          </span>
                          <span className="text-xs font-semibold text-[#261E1A] truncate">
                            {p.name}
                          </span>
                        </div>
                        <span className="text-xs text-[#8C6D53] font-medium shrink-0 ml-2">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Possible Treatments */}
                <div className="flex flex-col gap-1.5 pb-4">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    POSSIBLE TREATMENTS
                  </h3>
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                    <p className="text-xs text-[#5A524A] leading-relaxed">
                      {POLICY_FRAMEWORK_OVERVIEW.mobilePossibleTreatments}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Mobile Specific Standard Content */
              <>
                {/* Title & Revision */}
                <div className="flex flex-col gap-1.5 border-b border-[#EAE5DC] pb-4">
                  <span className="text-[11px] font-mono text-[#7A726A]">
                    {activePolicy.revisionInfo}
                  </span>
                  <h1 className="text-xl font-bold text-[#261E1A] tracking-tight">
                    {activePolicy.name}
                  </h1>
                </div>

                {/* Mobile Purpose */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    PURPOSE
                  </h3>
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                    <p className="text-xs text-[#342820] leading-relaxed">
                      {activePolicy.purpose}
                    </p>
                  </div>
                </div>

                {/* Mobile Review Considerations */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    REVIEW CONSIDERATIONS
                  </h3>
                  <div className="p-3.5 bg-white border border-[#EAE5DC] rounded-xl">
                    <ul className="space-y-2">
                      {activePolicy.reviewConsiderations.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-[#342820] leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] shrink-0 mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile Contextual Considerations */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    CONTEXTUAL CONSIDERATIONS
                  </h3>
                  <div className="p-3.5 bg-[#FAF7F2] border border-[#C7B5A0]/60 rounded-xl">
                    <ul className="space-y-2">
                      {activePolicy.contextualConsiderations.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-[#342820] leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#261E1A] shrink-0 mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile Possible Treatments (Exact Stitch Terminology) */}
                <div className="flex flex-col gap-1.5 pb-4">
                  <h3 className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    POSSIBLE TREATMENTS
                  </h3>
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                    <p className="text-xs text-[#5A524A] leading-relaxed">
                      {activePolicy.enforcementGuidance}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
