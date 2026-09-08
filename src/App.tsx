import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { NewsCarousel } from './components/NewsCarousel';
import { QueueFilterBar } from './components/QueueFilterBar';
import { CaseCard } from './components/CaseCard';
import { Footer } from './components/Footer';
import { CaseReview } from './components/CaseReview';
import { PolicyCenter } from './components/PolicyCenter';
import { AboutModal } from './components/AboutModal';
import { CommunityGuidelinesModal } from './components/CommunityGuidelinesModal';
import { INITIAL_CASES } from './data/tingTingData';
import { PriorityFilter, StatusFilter, PolicyFilter, CaseRecord, ActiveOverlay, FinalAction } from './types';

/**
 * Parse Queue age strings into total minutes for chronological waiting-time comparison.
 * Examples: "3m" -> 3, "2h 10m" -> 130, "7h 45m" -> 465, "22h 40m" -> 1360
 */
function parseQueueAgeToMinutes(ageStr: string): number {
  if (!ageStr) return 0;
  let totalMinutes = 0;
  const daysMatch = ageStr.match(/(\d+)\s*d/i);
  if (daysMatch) {
    totalMinutes += parseInt(daysMatch[1], 10) * 1440;
  }
  const hoursMatch = ageStr.match(/(\d+)\s*h/i);
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1], 10) * 60;
  }
  const minsMatch = ageStr.match(/(\d+)\s*m/i);
  if (minsMatch) {
    totalMinutes += parseInt(minsMatch[1], 10);
  }
  return totalMinutes;
}

/**
 * Prioritized Review Queue comparator:
 * 1. PENDING REVIEW cases take precedence over COMPLETED cases.
 * 2. FIRST: Priority: Top -> Medium -> Low
 * 3. SECOND: Within the same priority, order by Queue age from LONGEST waiting time to SHORTEST waiting time.
 */
function compareCases(a: CaseRecord, b: CaseRecord): number {
  // Pending review cases are prioritized ahead of completed cases
  if (a.status === 'Pending' && b.status !== 'Pending') return -1;
  if (a.status !== 'Pending' && b.status === 'Pending') return 1;

  // Priority: Top (1) -> Medium (2) -> Low (3)
  const priorityRank: Record<string, number> = { Top: 1, Medium: 2, Low: 3 };
  const rankA = priorityRank[a.priority] ?? 4;
  const rankB = priorityRank[b.priority] ?? 4;
  if (rankA !== rankB) {
    return rankA - rankB;
  }

  // Within the same priority: LONGEST waiting time to SHORTEST waiting time (descending)
  const ageA = parseQueueAgeToMinutes(a.queueAge);
  const ageB = parseQueueAgeToMinutes(b.queueAge);
  if (ageA !== ageB) {
    return ageB - ageA;
  }

  return a.id.localeCompare(b.id);
}

export default function App() {
  const [cases, setCases] = useState<CaseRecord[]>(() => [...INITIAL_CASES].sort(compareCases));
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [policyFilter, setPolicyFilter] = useState<PolicyFilter>('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  const [selectedPolicyForCenter, setSelectedPolicyForCenter] = useState<{
    id?: string;
    name?: string;
  } | null>(null);

  // In-memory scroll position retention for Screen 1
  const screen1ScrollYRef = useRef<number>(0);
  const isReturningToQueueRef = useRef<boolean>(false);

  const handleOpenGeneralPolicy = (overlay: ActiveOverlay) => {
    if (overlay === 'policy') {
      setSelectedPolicyForCenter(null);
    }
    setActiveOverlay(overlay);
  };

  const handleSelectPolicyForCenter = (policyName: string, policyId?: string) => {
    setSelectedPolicyForCenter({ name: policyName, id: policyId });
    setActiveOverlay('policy');
  };

  const handleClosePolicyCenter = () => {
    setActiveOverlay(null);
  };

  // Filtered cases: Search ONLY by Case ID + combine with Priority / Status / Policy filters
  // Preserves prioritized intake queue ordering: Top -> Medium -> Low, then longest waiting time first
  const filteredCases = useMemo(() => {
    return cases
      .filter((c) => {
        // Search ONLY by Case ID (case-insensitive, partial match)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesId = c.id.toLowerCase().includes(q);
          if (!matchesId) {
            return false;
          }
        }

        // Priority filter
        if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'ALL' && c.status !== statusFilter) {
          return false;
        }

        // Policy filter
        if (policyFilter !== 'ALL' && c.policy !== policyFilter) {
          return false;
        }

        return true;
      })
      .sort(compareCases);
  }, [cases, searchQuery, priorityFilter, statusFilter, policyFilter]);

  const pendingCount = useMemo(() => {
    return cases.filter((c) => c.status === 'Pending').length;
  }, [cases]);

  const completedCount = useMemo(() => {
    return cases.filter((c) => c.status === 'Completed').length;
  }, [cases]);

  // Clicking ALL: reset Priority to All, Status to All, Policy to All
  const handleResetAll = () => {
    setPriorityFilter('ALL');
    setStatusFilter('ALL');
    setPolicyFilter('ALL');
  };

  // Clicking START REVIEW / VIEW DECISION opens Screen 2 for the exact clicked case
  const handleSelectCase = (caseId: string) => {
    // 1. Save exact Screen 1 vertical scroll position before switching screens
    screen1ScrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    isReturningToQueueRef.current = false;
    // 2. Open selected case in Screen 2
    setSelectedCaseId(caseId);
  };

  // Returning to Screen 1 via Back to Queue
  const handleBackToQueue = () => {
    isReturningToQueueRef.current = true;
    setSelectedCaseId(null);
  };

  // Decision confirmation from Screen 2
  const handleConfirmDecision = (action: FinalAction, basis: string, note: string) => {
    if (!selectedCaseId) return;
    setCases((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCaseId
          ? {
              ...c,
              status: 'Completed' as const,
              recordedAction: action,
              recordedDecisionBasis: basis,
              recordedModeratorNote: note,
            }
          : c
      );
      return [...updated].sort(compareCases);
    });
    // Return to Screen 1 and restore scroll position
    isReturningToQueueRef.current = true;
    setSelectedCaseId(null);
  };

  // Manage browser scroll position between Screen 1 and Screen 2
  useEffect(() => {
    if (selectedCaseId !== null) {
      // Screen 2 opened or switched (READ MORE, VIEW DECISION, Previous, Next):
      // Immediately position Screen 2 at the TOP
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const rafId = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(rafId);
    } else if (isReturningToQueueRef.current) {
      // Returned to Screen 1 (Back to Queue / Decision confirmation):
      // Restore previous Screen 1 scroll position
      isReturningToQueueRef.current = false;
      const targetY = screen1ScrollYRef.current;
      const rafId = requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        });
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [selectedCaseId]);

  // Currently selected case for Screen 2
  const currentCaseIndex = useMemo(() => {
    if (!selectedCaseId) return -1;
    return cases.findIndex((c) => c.id === selectedCaseId);
  }, [cases, selectedCaseId]);

  const currentCase = currentCaseIndex >= 0 ? cases[currentCaseIndex] : null;

  // Main App View
  return (
    <>
      {selectedCaseId && currentCase ? (
        <CaseReview
          caseData={currentCase}
          hasPrevious={currentCaseIndex > 0}
          hasNext={currentCaseIndex < cases.length - 1}
          onBackToQueue={handleBackToQueue}
          onPrevious={() => {
            if (currentCaseIndex > 0) {
              setSelectedCaseId(cases[currentCaseIndex - 1].id);
            }
          }}
          onNext={() => {
            if (currentCaseIndex < cases.length - 1) {
              setSelectedCaseId(cases[currentCaseIndex + 1].id);
            }
          }}
          onConfirmDecision={handleConfirmDecision}
          onOverlaySelect={handleOpenGeneralPolicy}
          onSelectPolicyForCenter={handleSelectPolicyForCenter}
        />
      ) : (
        <div className="bg-[#FAF9F6] font-body text-[#261E1A] antialiased min-h-screen flex flex-col">
          {/* Approved Header */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOverlaySelect={handleOpenGeneralPolicy}
          />

          {/* Main Content (Offset for fixed header) */}
          <main className="w-full flex-1 pt-20 bg-[#FAF9F6]">
            <div className="flex flex-col w-full min-w-0">
              {/* Internal News Carousel Section */}
              <NewsCarousel />

              {/* Review Queue Header & Filters */}
              <QueueFilterBar
                priorityFilter={priorityFilter}
                statusFilter={statusFilter}
                policyFilter={policyFilter}
                onPriorityChange={setPriorityFilter}
                onStatusChange={setStatusFilter}
                onPolicyChange={setPolicyFilter}
                onResetAll={handleResetAll}
                pendingCount={pendingCount}
                completedCount={completedCount}
              />

              {/* Moderation Cases Grid */}
              <section id="cases-grid-section" className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 pb-16">
                <div className="max-w-[1440px] mx-auto">
                  {filteredCases.length === 0 ? (
                    /* Restrained empty state */
                    <div
                      id="no-cases-state"
                      className="w-full py-16 px-4 text-center rounded-xl border border-[#EAE5DC] bg-white flex flex-col items-center justify-center"
                    >
                      <p className="text-sm font-medium text-[#7A726A]">No matching cases.</p>
                    </div>
                  ) : (
                    /* Desktop: 4 + 4 + 2 grid; Mobile: single-column vertical card design */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {filteredCases.map((caseItem) => (
                        <CaseCard
                          key={caseItem.id}
                          caseData={caseItem}
                          isSelected={selectedCaseId === caseItem.id}
                          onReadMore={handleSelectCase}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </main>

          {/* Approved Footer */}
          <Footer onOverlaySelect={handleOpenGeneralPolicy} />
        </div>
      )}

      {/* Screen 4: Policy Center Overlay */}
      <PolicyCenter
        isOpen={activeOverlay === 'policy'}
        entryMode={selectedPolicyForCenter ? 'caseSpecific' : 'general'}
        initialPolicyId={selectedPolicyForCenter?.id || null}
        initialPolicyName={selectedPolicyForCenter?.name || null}
        onClose={handleClosePolicyCenter}
      />

      {/* Screen: About Ting Ting Overlay */}
      <AboutModal
        isOpen={activeOverlay === 'about'}
        onClose={() => setActiveOverlay(null)}
      />

      {/* Screen: Community Guidelines Overlay */}
      <CommunityGuidelinesModal
        isOpen={activeOverlay === 'communityGuidelines'}
        onClose={() => setActiveOverlay(null)}
      />
    </>
  );
}
